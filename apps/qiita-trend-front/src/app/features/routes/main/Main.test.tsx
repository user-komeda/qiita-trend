import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/path'
import MainComponent from '@/app/features/routes/main/Main'
import fetchWithJwt, { type FetchWithJwtResult } from '@/app/util/fetchWithJwt'

type FetchWithJwtMock = <T>(
  path: string,
  init?: RequestInit,
) => Promise<FetchWithJwtResult<T>>

const fetchWithJwtMock = vi.hoisted(() => vi.fn<FetchWithJwtMock>())

vi.mock(import('@/app/util/fetchWithJwt'), () => ({
  default: fetchWithJwtMock as typeof fetchWithJwt,
}))

const mockFetchWithJwt = fetchWithJwtMock

describe('main component', () => {
  beforeEach(() => {
    mockFetchWithJwt.mockReset()
  })

  test('renders by list empty', async () => {
    expect.hasAssertions()

    const mockBody: unknown = []
    mockFetchWithJwt.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })
    render(
      await MainComponent({ startDate: '2023-01-01', endDate: '2023-01-31' }),
    )
    const list = screen.getByRole('list')

    expect(list).toBeInTheDocument()

    await waitFor(() => {
      expect(mockFetchWithJwt).toHaveBeenCalledWith(
        `${BASE_URL}${GET_ALL_ITEM_API_URL}?startDate=2023-01-01&endDate=2023-01-31`,
      )
    })
  })

  test('renders list items correctly', async () => {
    expect.hasAssertions()

    const mockBody = [
      { id: 1, title: 'Test Title' },
      { id: 2, title: 'Test2 Title' },
      { id: 3, title: 'Test3 Title' },
    ]
    mockFetchWithJwt.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })
    render(
      await MainComponent({ startDate: '2023-01-01', endDate: '2023-01-31' }),
    )

    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('fetches data from the correct API endpoint', async () => {
    expect.hasAssertions()

    const mockBody = [
      { id: 1, title: 'Test Title' },
      { id: 2, title: 'Test2 Title' },
      { id: 3, title: 'Test3 Title' },
    ]
    mockFetchWithJwt.mockResolvedValueOnce({
      ok: true,
      data: mockBody,
    })
    render(await MainComponent({}))
    await waitFor(() => {
      expect(mockFetchWithJwt).toHaveBeenCalledWith(
        `${BASE_URL}${GET_ALL_ITEM_API_URL}?`,
      )
    })
  })

  test('renders error alert when fetch fails', async () => {
    expect.hasAssertions()

    mockFetchWithJwt.mockResolvedValueOnce({
      ok: false,
      message: 'Fetch failed',
    })

    render(await MainComponent({}))

    expect(screen.getByText('Fetch failed')).toBeInTheDocument()
  })
})
