import { render } from '@testing-library/react'
import React from 'react'

import ItemList from './ItemList'

describe('LastYearListItem', () => {
  it('renders a list of months', () => {
    const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const { getAllByRole } = render(
      <ItemList monthList={monthList} year={2023} date={new Date('2023/11')} />,
    )

    const listItem = getAllByRole('listitem')
    expect(listItem).toHaveLength(11)

    listItem.forEach((item, index) => {
      expect(item.textContent).toBe(`${index + 1}月`)
    })
  })

  it('renders an empty list when endDateLastMonthList is empty', () => {
    const monthList: number[] = []
    const { container } = render(
      <ItemList monthList={monthList} year={2023} date={new Date('2023/11')} />,
    )

    expect(container.querySelector('ul')?.children.length).toBe(0)
  })
})
