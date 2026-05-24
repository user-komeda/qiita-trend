import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import '@testing-library/jest-dom'
import { BASE_URL, GET_ITEMS_BY_TAG_URL } from '@/app/const/path'
import TagItems from '@/app/features/routes/tagItems/TagItems'
import fetchWithJwt, { type FetchWithJwtResult } from '@/app/util/fetchWithJwt'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

type FetchWithJwtMock = <T>(
  path: string,
  init?: RequestInit,
) => Promise<FetchWithJwtResult<T>>

const fetchWithJwtMock = vi.hoisted(() => vi.fn<FetchWithJwtMock>())

vi.mock(import('@/app/util/fetchWithJwt'), () => ({
  default: fetchWithJwtMock as typeof fetchWithJwt,
}))

describe('tag_items component', () => {
  beforeEach(() => {
    fetchWithJwtMock.mockReset()
  })

  test('renders by list empty', async () => {
    expect.hasAssertions()

    const mockBody: unknown = []
    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })

    render(await TagItems({ tagName: '品質' }))
    const list = screen.getByRole('list')

    expect(list).toBeInTheDocument()
  })

  test('renders list items correctly', async () => {
    expect.hasAssertions()

    const mockBody = [
      { id: 1, title: 'Test Title' },
      { id: 2, title: 'Test2 Title' },
      { id: 3, title: 'Test3 Title' },
    ]
    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })

    render(await TagItems({ tagName: '品質' }))

    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('fetches data from the correct API endpoint', async () => {
    expect.hasAssertions()

    const mockBody = [
      { id: 1, title: 'Test Title' },
      { id: 2, title: 'Test2 Title' },
      { id: 3, title: 'Test3 Title' },
    ]
    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })

    render(await TagItems({ tagName: '品質' }))

    await waitFor(() => {
      expect(fetchWithJwtMock).toHaveBeenCalledWith(
        replaceUrlParameter(
          `${BASE_URL}${GET_ITEMS_BY_TAG_URL}`,
          ':tagName',
          '品質',
        ),
      )
    })
  })

  test('renders error alert when fetch fails', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: false,
      message: 'Fetch failed',
    })

    render(await TagItems({ tagName: '品質' }))

    expect(screen.getByText('Fetch failed')).toBeInTheDocument()
  })
})
