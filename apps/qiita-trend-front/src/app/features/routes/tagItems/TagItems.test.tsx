import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import '@testing-library/jest-dom'
import { BASE_URL, GET_ITEMS_BY_TAG_URL } from '@/app/const/const'
import TagItems from '@/app/features/routes/tagItems/TagItems'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

const mockFetch = vi.spyOn(global, 'fetch')

describe('tag_items component', () => {
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
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockBody), mockParams),
    )
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
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockBody), mockParams),
    )
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
