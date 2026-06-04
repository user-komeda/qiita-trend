import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { describe, expect, test, vi } from 'vitest'

import { BASE_URL_CLIENT } from '@/app/const/path'
import { Pagination } from '@/app/features/component/pagination/Pagination'

vi.mock(import('next/navigation'), () => ({
  useSearchParams: vi.fn<typeof useSearchParams>(),
}))

describe('pagination component', () => {
  test('renders pagination with correct links when no search params', () => {
    expect.hasAssertions()

    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('') as unknown as ReadonlyURLSearchParams,
    )

    expect.hasAssertions()

    render(<Pagination count={10} />)

    const page2Link = screen.getByRole('link', { name: /^go to page 2$/i })

    expect(page2Link).toHaveAttribute('href', `${BASE_URL_CLIENT}?page=2`)

    const page1Link = screen.getByRole('link', { name: /^page 1$/i })

    expect(page1Link).toHaveAttribute('href', BASE_URL_CLIENT)
  })

  test('renders pagination with correct links when search params exist', () => {
    expect.hasAssertions()

    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams(
        'startDate=2024-01-01&endDate=2024-01-31',
      ) as unknown as ReadonlyURLSearchParams,
    )

    expect.hasAssertions()

    render(<Pagination count={10} />)

    const page2Link = screen.getByRole('link', { name: /^go to page 2$/i })

    expect(page2Link).toHaveAttribute(
      'href',
      `${BASE_URL_CLIENT}?startDate=2024-01-01&endDate=2024-01-31&page=2`,
    )

    const page1Link = screen.getByRole('link', { name: /^page 1$/i })

    expect(page1Link).toHaveAttribute(
      'href',
      `${BASE_URL_CLIENT}?startDate=2024-01-01&endDate=2024-01-31`,
    )
  })

  test('renders 10 pages as specified in the component', () => {
    expect.hasAssertions()

    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('') as unknown as ReadonlyURLSearchParams,
    )

    expect.hasAssertions()

    render(<Pagination count={10} />)

    // Check if the last page (10) link exists
    const page10Link = screen.getByRole('link', { name: /^go to page 10$/i })

    expect(page10Link).toBeInTheDocument()
    expect(page10Link).toHaveAttribute('href', `${BASE_URL_CLIENT}?page=10`)
  })

  test('limits to 100 pages and shows warning when count exceeds 100', () => {
    expect.hasAssertions()

    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('') as unknown as ReadonlyURLSearchParams,
    )

    render(<Pagination count={150} />)

    // 警告メッセージが表示されていることを確認
    expect(
      screen.getByText(
        /Qiita APIの制限により、101ページ目以降は表示できません。/,
      ),
    ).toBeInTheDocument()

    // 100ページ目へのリンクがあることを確認
    const page100Link = screen.getByRole('link', { name: /go to page 100/i })

    expect(page100Link).toBeInTheDocument()
    expect(page100Link).toHaveAttribute('href', `${BASE_URL_CLIENT}?page=100`)

    // 101ページ目へのリンクがないことを確認
    expect(
      screen.queryByRole('link', { name: /go to page 101/i }),
    ).not.toBeInTheDocument()
  })
})
