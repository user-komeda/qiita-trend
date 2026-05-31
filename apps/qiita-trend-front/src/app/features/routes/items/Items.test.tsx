import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'

import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/path'
import Items from '@/app/features/routes/items/Items'
import fetchWithJwt, { type FetchWithJwtResult } from '@/app/util/fetchWithJwt'

type FetchWithJwtMock = <T>(
  path: string,
  init?: RequestInit,
) => Promise<FetchWithJwtResult<T>>

const fetchWithJwtMock = vi.hoisted(() => vi.fn<FetchWithJwtMock>())

vi.mock(import('@/app/util/fetchWithJwt'), () => ({
  default: fetchWithJwtMock as typeof fetchWithJwt,
}))

vi.mock(import('react-markdown'), () => {
  const ReactMarkdown = (props: { children?: ReactNode }) => {
    return <>{props.children}</>
  }

  return {
    default: ReactMarkdown,
  }
})

vi.mock(import('remark-gfm'), () => ({
  default: vi.fn<typeof import('remark-gfm').default>(),
}))

vi.mock(import('@/app/features/routes/items/comments/Comments'), () => {
  const MockComments = ({ id }: { id: string }) => (
    <div data-testid="comments">Comments for {id}</div>
  )

  return {
    Comments: MockComments as never,
  }
})

describe('items component', () => {
  beforeEach(() => {
    fetchWithJwtMock.mockReset()
  })

  test('renders the fetched data correctly', async () => {
    expect.hasAssertions()

    const mockBody = {
      title: 'Test Title',
      tags: ['tag1', 'tag2'],
      body: 'Test Body',
    }
    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })

    render(await Items({ id: 'test-id' }))

    const titleElement = screen.getByText('Test Title')

    expect(titleElement).toBeInTheDocument()

    const tag1Element = screen.getByText('tag1')

    expect(tag1Element).toBeInTheDocument()

    const tag2Element = screen.getByText('tag2')

    expect(tag2Element).toBeInTheDocument()

    const bodyElement = screen.getByText('Test Body')

    expect(bodyElement).toBeInTheDocument()
  })

  test('calls the correct API endpoint', async () => {
    expect.hasAssertions()

    const mockBody = {
      title: 'Test Title',
      tags: ['tag1', 'tag2'],
      body: 'Test Body',
    }
    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })

    render(await Items({ id: 'test-id' }))

    expect(fetchWithJwtMock).toHaveBeenCalledWith(
      `${BASE_URL}${GET_ALL_ITEM_API_URL}test-id`,
    )
  })

  test('renders error alert when fetch fails', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: false,
      message: 'Fetch failed',
    })

    render(await Items({ id: 'test-id' }))

    expect(screen.getByText('Fetch failed')).toBeInTheDocument()
  })
})
