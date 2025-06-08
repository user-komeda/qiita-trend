import {
  Box,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

import { DRAWER_WIDTH } from '@/app/const/const'

import ItemList from './ItemList'

interface DateObject {
  firstDateLastMonth: number
  firstDateYear: number
  EndDateLastMonth: number
  EndDateYear: number
}

const ARRAY_FIRST_INDEX = 0
const ARRAY_LAST_INDEX_MINUS = 1
const ADD_YEAR_AND_MONTH = 1
const MONTH_OFFSET = 1

/** AccordionMenu */
const AccordionMenu = () => {
  const dateObject = getDateObject()
  const yearList = yearArray(dateObject)
  // eslint-disable-next-line no-magic-numbers
  const monthList = monthArray(1, dateObject.firstDateLastMonth)
  // eslint-disable-next-line no-magic-numbers
  const firstDateLastMonthList = monthArray(9, dateObject.firstDateLastMonth)
  // eslint-disable-next-line no-magic-numbers
  const endDateLastMonthList = monthArray(1, dateObject.EndDateLastMonth)
  return (
    <Box sx={{ width: DRAWER_WIDTH }} role="presentation">
      {yearList.map((year) => {
        return (
          <Accordion key={year}>
            <AccordionSummary>{year}</AccordionSummary>
            <AccordionDetails>
              <nav aria-label="main mailbox folders">
                <List>
                  <ItemList
                    year={year}
                    monthList={
                      isNormalYear(yearList, year)
                        ? monthList
                        : isLastYear(yearList, year)
                          ? endDateLastMonthList
                          : firstDateLastMonthList
                    }
                  ></ItemList>
                </List>
              </nav>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}

const getDateObject = (): DateObject => {
  const firstDate = new Date('2011/09')
  const endDate = new Date(Date.now())
  return {
    firstDateLastMonth: 12,
    firstDateYear: firstDate.getFullYear(),
    EndDateLastMonth: endDate.getMonth() + MONTH_OFFSET,
    EndDateYear: endDate.getFullYear(),
  }
}
const yearArray = (dateObject: DateObject): number[] => {
  const tmpArray = [
    ...Array(
      dateObject.EndDateYear - dateObject.firstDateYear + ADD_YEAR_AND_MONTH,
    ),
  ]
  return tmpArray.map((_, i) => {
    return dateObject.firstDateYear + i
  })
}
const monthArray = (startMonth: number, lastMonth: number): number[] => {
  const tmpArray = [...Array(lastMonth - startMonth + ADD_YEAR_AND_MONTH)]
  return tmpArray.map((_, i) => {
    return startMonth + i
  })
}

const isNormalYear = (yearList: number[], currentYear: number): boolean => {
  if (
    currentYear !== yearList[ARRAY_FIRST_INDEX] &&
    currentYear !== yearList[yearList.length - ARRAY_LAST_INDEX_MINUS]
  ) {
    return true
  }
  return false
}

const isLastYear = (yearList: number[], currentYear: number): boolean => {
  if (currentYear === yearList[yearList.length - ARRAY_LAST_INDEX_MINUS]) {
    return true
  }
  return false
}

export default AccordionMenu
