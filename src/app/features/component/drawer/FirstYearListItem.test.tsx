import { render } from '@testing-library/react'
import React from 'react'

import FirstYearListItem from './FirstYearListItem'

describe('FirstYearListItem', () => {
  it('renders a list of months', () => {
    const firstDateLastMonthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const { getAllByRole } = render(
      <FirstYearListItem firstDateLastMonthList={firstDateLastMonthList} />,
    )

    const listItem = getAllByRole('listitem')
    expect(listItem).toHaveLength(12)

    listItem.forEach((item, index) => {
      expect(item.textContent).toBe(`${index + 1}月`)
    })
  })

  it('renders an empty list when endDateLastMonthList is empty', () => {
    const firstDateLastMonthList: number[] = []
    const { container } = render(
      <FirstYearListItem firstDateLastMonthList={firstDateLastMonthList} />,
    )

    expect(container.querySelector('ul')?.children.length).toBe(0)
  })
})
