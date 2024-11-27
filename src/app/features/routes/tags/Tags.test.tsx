import { render, screen, waitFor } from '@testing-library/react'
import fetch, { enableFetchMocks, MockParams } from 'jest-fetch-mock'

import '@testing-library/jest-dom'
import { BASE_URL, GET_ALL_TAG_URL } from '../../../const/Const'

import Tags from './Tags'

enableFetchMocks()

describe('Main Component', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  it('renders list items correctly', async () => {
    const mockBody = [
      { id: 'tag1', itemsCount: 200 },
      { id: 'tag2', itemsCount: 500 },
    ]
    const mockParams: MockParams = {
      status: 200,
      statusText: 'OK',
    }
    fetch.mockResponseOnce(JSON.stringify(mockBody), mockParams)
    render(await Tags())
    expect(screen.getByText('tag1')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('tag2')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('fetches data from the correct API endpoint', async () => {
    const mockBody = [
      { id: 'tag1', itemsCount: 200 },
      { id: 'tag2', itemsCount: 500 },
    ]
    const mockParams: MockParams = {
      status: 200,
      statusText: 'OK',
    }
    fetch.mockResponseOnce(JSON.stringify(mockBody), mockParams)
    render(await Tags())
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}${GET_ALL_TAG_URL}`,
        {
          next: { revalidate: 3600 },
        },
      )
    })
  })
})
