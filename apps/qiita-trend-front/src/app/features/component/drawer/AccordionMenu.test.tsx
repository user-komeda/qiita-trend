/* eslint testing-library/no-node-access: 0 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe } from 'vitest'
import { expect, test, vi } from 'vitest'

import AccordionMenu from '@/app/features/component/drawer/AccordionMenu'

describe('accordion_menu component', () => {
  test('renders without crashing', () => {
    expect.hasAssertions()

    // 基準日が0なので月は-1
    const mockDate = new Date(2023, 10, 28).getTime()
    vi.spyOn(Date, 'now').mockImplementation(() => {
      return mockDate
    })
    render(<AccordionMenu />)

    const div = screen.getByRole('presentation')
    const list = div.children
    const firstYear = list[0].querySelector('button')
    const firstYearMonthList = list[0].children[1].querySelectorAll('li')
    const endYear = list[list.length - 1].querySelector('button')
    const endYearMonthList =
      list[list.length - 1].children[1].querySelectorAll('li')
    const otherYear = list[1].querySelector('button')
    const otherYearMonthList = list[1].children[1].querySelectorAll('li')

    assert(firstYearMonthList, firstYear?.textContent ?? '', '2011', 4)
    checkMonthText(9, firstYearMonthList)

    assert(endYearMonthList, endYear?.textContent ?? '', '2023', 11)
    checkMonthText(1, endYearMonthList)

    assert(otherYearMonthList, otherYear?.textContent ?? '', '2012', 12)
    checkMonthText(1, otherYearMonthList)
  })

  const checkMonthText = (
    startIndex = 1,
    monthList: NodeListOf<HTMLLIElement>,
  ): void => {
    monthList.forEach((month, index) => {
      expect(month.textContent).toBe(`${(startIndex + index).toString()}月`)
    })
  }

  const assert = (
    element: NodeListOf<HTMLLIElement>,
    checkYear: string,
    year: string,
    monthCount: number,
  ) => {
    expect(checkYear).toBe(year)
    expect(element).toHaveLength(monthCount)
  }
})
