import { render } from '@testing-library/react'

import '@testing-library/jest-dom'
import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/const'
import { ItemsData } from '@/app/types/ItemsData'

import Items from './Items'

// Mock fetch
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve({
        title: 'Test Title',
        tags: ['tag1', 'tag2'],
        body: 'Test Body',
      } as ItemsData)
    },
  })
}) as jest.Mock
jest.mock('react-markdown', () => {
  return {
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    default: (props: any) => {
      return props.children
    },
  }
})

jest.mock('remark-gfm', () => {
  return {
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    default: () => {},
  }
})

describe('Items Component', () => {
  it('renders the fetched data correctly', async () => {
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

  it('calls the correct API endpoint', async () => {
    render(await Items({ id: 'test-id' }))

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}${GET_ALL_ITEM_API_URL}test-id`,
      { next: { revalidate: 3600 } },
    )
  })
})
