import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/const'
import MainComponent from '@/app/features/routes/main/Main'

const mockFetch = vi.spyOn(global, 'fetch')

describe('main component', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  test('renders by list empty', async () => {
    expect.hasAssertions()

    const mockBody: unknown = []
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockBody), mockParams),
    )
    render(
      await MainComponent({ startDate: '2023-01-01', endDate: '2023-01-31' }),
    )
    const list = screen.getByRole('list')

    expect(list).toBeInTheDocument()

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
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
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockBody), mockParams),
    )
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
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockBody), mockParams),
    )
    render(await MainComponent({}))
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}${GET_ALL_ITEM_API_URL}?`,
      )
    })
  })
})
