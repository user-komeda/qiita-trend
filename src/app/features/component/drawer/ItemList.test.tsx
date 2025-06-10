/* eslint testing-library/no-node-access: 0 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

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

  test('renders an empty list when endDateLastMonthList is empty', () => {
    expect.hasAssertions()

    const monthList: number[] = []
    render(<ItemList monthList={monthList} year={2023} />)
    const container = screen.getByRole('list')

    expect(container.children).toHaveLength(0)
  })
})
