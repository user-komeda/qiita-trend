import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'

import '@testing-library/jest-dom'
import { BASE_URL, GET_ALL_TAG_URL } from '../../../const/const'

import Tags from './Tags'

const mockFetch = vi.spyOn(global, 'fetch')

beforeEach(() => {
  mockFetch.mockReset()
})
test('renders list items correctly', async () => {
  const mockBody = [
    { id: 'tag1', itemsCount: 200 },
    { id: 'tag2', itemsCount: 500 },
  ]
  const mockParams = {
    status: 200,
    statusText: 'OK',
  }
  mockFetch.mockResolvedValueOnce(
    new Response(JSON.stringify(mockBody), mockParams),
  )
  render(await Tags())
  expect(screen.getByText('tag1')).toBeInTheDocument()
  expect(screen.getByText('200')).toBeInTheDocument()
  expect(screen.getByText('tag2')).toBeInTheDocument()
  expect(screen.getByText('500')).toBeInTheDocument()
})

test('fetches data from the correct API endpoint', async () => {
  const mockBody = [
    { id: 'tag1', itemsCount: 200 },
    { id: 'tag2', itemsCount: 500 },
  ]
  const mockParams = {
    status: 200,
    statusText: 'OK',
  }
  mockFetch.mockResolvedValueOnce(
    new Response(JSON.stringify(mockBody), mockParams),
  )
  render(await Tags())
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}${GET_ALL_TAG_URL}`, {
      next: { revalidate: 3600 },
    })
  })
})
