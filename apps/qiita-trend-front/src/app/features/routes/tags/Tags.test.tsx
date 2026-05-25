import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import '@testing-library/jest-dom'

import { BASE_URL, GET_ALL_TAG_URL } from '@/app/const/path'
import Tags from '@/app/features/routes/tags/Tags'
import fetchWithJwt, { FetchWithJwtResult } from '@/app/util/fetchWithJwt'

type FetchWithJwtMock = <T>(
  path: string,
  init?: RequestInit,
) => Promise<FetchWithJwtResult<T>>

const fetchWithJwtMock = vi.hoisted(() => vi.fn<FetchWithJwtMock>())

vi.mock(import('@/app/util/fetchWithJwt'), () => ({
  default: fetchWithJwtMock as typeof fetchWithJwt,
}))

describe('tags component', () => {
  beforeEach(() => {
    fetchWithJwtMock.mockReset()
  })

  test('renders list items correctly', async () => {
    expect.hasAssertions()

    const mockBody = [
      { id: 'tag1', itemsCount: 200 },
      { id: 'tag2', itemsCount: 500 },
    ]

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })

    render(await Tags())

    expect(screen.getByText('tag1')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('tag2')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  test('fetches data from the correct API endpoint', async () => {
    expect.hasAssertions()

    const mockBody = [
      { id: 'tag1', itemsCount: 200 },
      { id: 'tag2', itemsCount: 500 },
    ]

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })

    render(await Tags())

    await waitFor(() => {
      expect(fetchWithJwtMock).toHaveBeenCalledWith(
        `${BASE_URL}${GET_ALL_TAG_URL}`,
      )
    })
  })

  test('renders error alert when fetch fails', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: false,
      message: 'Fetch failed',
    })

    render(await Tags())

    expect(screen.getByText('Fetch failed')).toBeInTheDocument()
  })
})
