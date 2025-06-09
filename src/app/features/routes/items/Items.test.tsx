import { render } from '@testing-library/react'
import { expect, Mock, test, vi } from 'vitest'

import '@testing-library/jest-dom'
import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/const'
import { ItemsData } from '@/app/types/ItemsData'

import Items from './Items'

// Mock fetch
global.fetch = vi.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve({
        title: 'Test Title',
        tags: ['tag1', 'tag2'],
        body: 'Test Body',
      } as ItemsData)
    },
  })
}) as Mock
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

test('renders the fetched data correctly', async () => {
  const { getByText } = render(await Items({ id: 'test-id' }))

  const titleElement = getByText('Test Title')
  expect(titleElement).toBeInTheDocument()

  const tag1Element = getByText('tag1')
  expect(tag1Element).toBeInTheDocument()

  const tag2Element = getByText('tag2')
  expect(tag2Element).toBeInTheDocument()

  const bodyElement = getByText('Test Body')
  expect(bodyElement).toBeInTheDocument()
})

test('calls the correct API endpoint', async () => {
  render(await Items({ id: 'test-id' }))

  expect(global.fetch).toHaveBeenCalledWith(
    `${BASE_URL}${GET_ALL_ITEM_API_URL}test-id`,
    { next: { revalidate: 3600 } },
  )
})
