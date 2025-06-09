import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, expect, test, vi } from 'vitest'

import { BASE_URL, GET_ALL_ITEM_API_URL } from '../../../const/const'

import MainComponent from './Main'

const mockFetch = vi.spyOn(global, 'fetch')

beforeEach(() => {
  mockFetch.mockReset()
})

test('renders by list empty', async () => {
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
