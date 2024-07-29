import {
  Box,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

import { DRAWER_WIDTH } from '@/app/const/const'

import FirstYearListItem from './FirstYearListItem'
import LastYearListItem from './LastYearListItem'
import NormalItemList from './NormalItemList'

interface DateObject {
  firstDateLastMonth: number
  firstDateYear: number
  EndDateLastMonth: number
  EndDateYear: number
}

const ARRAY_FIRST_INDEX = 0
const ARRAY_LAST_INDEX_MINUS = 1
const ADD_YEAR_AND_MONTH = 1

/** AccordionMenu */
const AccordionMenu = (): JSX.Element => {
  const dateObject = getDateObject()
  const yearList = yearArray(dateObject)
  const firstDateLastMonthList = monthArray(dateObject.firstDateLastMonth)
  const endDateLastMonthList = monthArray(dateObject.EndDateLastMonth)
  return (
    <Box sx={{ width: DRAWER_WIDTH }} role="presentation">
      {yearList.map((year) => {
        return (
          <Accordion key={year}>
            <AccordionSummary>{year}</AccordionSummary>
            <AccordionDetails>
              <nav aria-label="main mailbox folders">
                <List>
                  {isNormalYear(yearList, year) ? (
                    <NormalItemList></NormalItemList>
                  ) : isLastYear(yearList, year) ? (
                    <LastYearListItem
                      endDateLastMonthList={endDateLastMonthList}
                    ></LastYearListItem>
                  ) : (
                    <FirstYearListItem
                      firstDateLastMonthList={firstDateLastMonthList}
                    ></FirstYearListItem>
                  )}
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
    firstDateLastMonth: firstDate.getMonth(),
    firstDateYear: firstDate.getFullYear(),
    EndDateLastMonth: endDate.getMonth(),
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
const monthArray = (lastMonth: number): number[] => {
  const firstMonth = 1
  const tmpArray = [...Array(lastMonth + ADD_YEAR_AND_MONTH)]
  return tmpArray.map((_, i) => {
    return firstMonth + i
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
