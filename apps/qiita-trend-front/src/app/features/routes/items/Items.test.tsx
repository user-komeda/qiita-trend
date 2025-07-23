/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unsafe-return: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint  @typescript-eslint/no-empty-function: 0 */

import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'

import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/const'
import Items from '@/app/features/routes/items/Items'

const mockFetch = vi.spyOn(global, 'fetch')

vi.mock('react-markdown', () => {
  return {
    __esModule: true,

    default: (props: any) => {
      return props.children
    },
  }
})

vi.mock('remark-gfm', () => {
  return {
    __esModule: true,

    default: () => {},
  }
})

describe('items component', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  test('renders the fetched data correctly', async () => {
    expect.hasAssertions()

    const mockBody = {
      title: 'Test Title',
      tags: ['tag1', 'tag2'],
      body: 'Test Body',
    }
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockBody), mockParams),
    )

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
    const mockParams = {
      status: 200,
      statusText: 'OK',
    }
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockBody), mockParams),
    )

    render(await Items({ id: 'test-id' }))

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}${GET_ALL_ITEM_API_URL}test-id`,
      { next: { revalidate: 3600 } },
    )
  })
})
