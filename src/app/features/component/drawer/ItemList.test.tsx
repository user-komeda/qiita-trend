import { render } from '@testing-library/react'
import React from 'react'
import { expect, test } from 'vitest'

import ItemList from './ItemList'

test('renders a list of months', () => {
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const { getAllByRole } = render(
    <ItemList monthList={monthList} year={2023} />,
  )

  const listItem = getAllByRole('listitem')
  expect(listItem).toHaveLength(11)

  listItem.forEach((item, index) => {
    expect(item.textContent).toBe(`${index + 1}月`)
  })
})

test('renders an empty list when endDateLastMonthList is empty', () => {
  const monthList: number[] = []
  const { container } = render(<ItemList monthList={monthList} year={2023} />)

  expect(container.querySelector('ul')?.children.length).toBe(0)
})
