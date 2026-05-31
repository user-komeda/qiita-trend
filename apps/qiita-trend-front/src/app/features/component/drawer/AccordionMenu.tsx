/* eslint-disable max-lines */
import {
  Box,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

import ItemList from '@/app/features/component/drawer/ItemList'

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
// eslint-disable-next-line max-lines-per-function
const AccordionMenu = () => {
  const dateObject = getDateObject()
  const yearList = yearArray(dateObject)

  const monthList = monthArray(1, dateObject.firstDateLastMonth)
  const firstDateLastMonthList = monthArray(9, dateObject.firstDateLastMonth)
  const endDateLastMonthList = monthArray(1, dateObject.EndDateLastMonth)

  const summaryHeight = `calc(100dvh / ${yearList.length.toString()})`
  return (
    <Box role="presentation">
      {yearList.map((year) => {
        return (
          <Accordion
            key={year}
            sx={{
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <AccordionSummary
              sx={{
                minHeight: summaryHeight,
              }}
            >
              {year}
            </AccordionSummary>

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
                  />
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
  const tmpArray: unknown[] = Array.from({
    length:
      dateObject.EndDateYear - dateObject.firstDateYear + ADD_YEAR_AND_MONTH,
  })

  return tmpArray.map((_, i) => {
    return dateObject.firstDateYear + i
  })
}
const monthArray = (startMonth: number, lastMonth: number): number[] => {
  const tmpArray: unknown[] = Array.from({
    length: lastMonth - startMonth + ADD_YEAR_AND_MONTH,
  })
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
