import { render, screen, waitFor } from '@testing-library/react'
import fetch, { enableFetchMocks, MockParams } from 'jest-fetch-mock'

import '@testing-library/jest-dom'
import { BASE_URL, GET_ALL_ITEM_API_URL } from '../../../const/Const'

import MainComponent from './Main'

enableFetchMocks()

describe('Main Component', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('renders by list empty', async () => {
    const mockBody = []
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    fetch.mockResponseOnce(JSON.stringify(mockBody), mockParams)
    render(await MainComponent())
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })
  it('renders list items correctly', async () => {
    const mockBody = [
      { id: 1, title: 'Test Title' },
      { id: 2, title: 'Test2 Title' },
      { id: 3, title: 'Test3 Title' },
    ]
    const mockParams: MockParams = {
      status: 200,
      statusText: 'OK',
    }
    fetch.mockResponseOnce(JSON.stringify(mockBody), mockParams)
    render(await MainComponent())
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('fetches data from the correct API endpoint', async () => {
    const mockBody = [
      { id: 1, title: 'Test Title' },
      { id: 2, title: 'Test2 Title' },
      { id: 3, title: 'Test3 Title' },
    ]
    const mockParams: MockParams = {
      status: 200,
      statusText: 'OK',
    }
    fetch.mockResponseOnce(JSON.stringify(mockBody), mockParams)
    render(await MainComponent())
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}${GET_ALL_ITEM_API_URL}`,
        {
          next: { revalidate: 3600 },
        },
      )
    })
  })
})
