import { render, screen, waitFor } from '@testing-library/react'
import fetch, { enableFetchMocks, MockParams } from 'jest-fetch-mock'

import '@testing-library/jest-dom'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

import { BASE_URL, GET_ITEMS_BY_TAG_URL } from '../../../const/Const'

import TagItems from './TagItems'

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
    render(await TagItems({ tagName: '品質' }))
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
    render(await TagItems({ tagName: '品質' }))
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
    render(await TagItems({ tagName: '品質' }))
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        replaceUrlParameter(
          `${BASE_URL}${GET_ITEMS_BY_TAG_URL}`,
          'tagName',
          '品質',
        ),
        {
          next: { revalidate: 3600 },
        },
      )
    })
  })
})
