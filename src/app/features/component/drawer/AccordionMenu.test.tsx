import { render } from '@testing-library/react'
import React from 'react'

import AccordionMenu from './AccordionMenu'

describe('AccordionMenu', () => {
  test('renders without crashing', () => {
    const mockDate = new Date(2023, 3, 1).getTime()
    Date.now = jest.fn(() => {
      return mockDate
    })
    const { getByRole } = render(<AccordionMenu />)

    const div = getByRole('presentation')
    const list = div.children
    const firstYear = list[0].querySelector('div')
    const firstYearMonthList = list[0].children[1].querySelectorAll('li')
    const endYear = list[list.length - 1].querySelector('div')
    const endYearMonthList =
      list[list.length - 1].children[1].querySelectorAll('li')
    const otherYear = list[1].querySelector('div')
    const otherYearMonthList = list[1].children[1].querySelectorAll('li')

    expect(firstYear?.textContent).toBe('2011')
    expect(firstYearMonthList).toHaveLength(4)
    checkMonthText(9, firstYearMonthList)
    expect(endYear?.textContent).toBe('2023')
    expect(endYearMonthList).toHaveLength(3)
    checkMonthText(1, endYearMonthList)
    expect(otherYear?.textContent).toBe('2012')
    expect(otherYearMonthList).toHaveLength(12)
    checkMonthText(1, otherYearMonthList)
  })
})

const checkMonthText = (
  startIndex = 1,
  monthList: NodeListOf<HTMLLIElement>,
) => {
  monthList.forEach((month, index) => {
    expect(month.textContent).toBe(`${startIndex + index}月`)
  })
}
