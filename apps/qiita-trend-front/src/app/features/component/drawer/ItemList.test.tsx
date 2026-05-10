import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import { BASE_URL_CLIENT } from '@/app/const/path'
import ItemList from '@/app/features/component/drawer/ItemList'

describe('item_list component', () => {
  test('renders a list of months', () => {
    expect.hasAssertions()

    const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    render(<ItemList monthList={monthList} year={2023} />)

    const listItem = screen.getAllByRole('listitem')

    expect(listItem).toHaveLength(11)

    listItem.forEach((item, index) => {
      expect(item.textContent).toBe(`${(index + 1).toString()}月`)
    })
  })

  test('sets correct href values for each month', () => {
    expect.hasAssertions()

    const monthList = [1, 2, 3]
    render(<ItemList monthList={monthList} year={2023} />)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute(
      'href',
      `${BASE_URL_CLIENT}/?startDate=2023-1-01&endDate=2023-1-31`,
    )
    expect(links[1]).toHaveAttribute(
      'href',
      `${BASE_URL_CLIENT}/?startDate=2023-2-01&endDate=2023-2-28`,
    )
    expect(links[2]).toHaveAttribute(
      'href',
      `${BASE_URL_CLIENT}/?startDate=2023-3-01&endDate=2023-3-31`,
    )
  })

  test('renders an empty list when endDateLastMonthList is empty', () => {
    expect.hasAssertions()

    render(<ItemList monthList={[]} year={2023} />)
    const container = screen.getByRole('list')

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.children).toHaveLength(0)
  })
})
