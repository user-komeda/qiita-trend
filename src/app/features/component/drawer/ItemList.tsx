import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'
import { BASE_URL_CLIENT } from '@/app/const/const'
import getLastDate from '@/app/util/getLastDate'

const MONTH_OFFSET = 1

interface Props {
  monthList: number[]
  date: Date
  year: number
}

/**
 *LastYearListItem
 */
const ItemList = ({ monthList, date, year }: Props): JSX.Element => {
  return (
    <List>
      {monthList.map((month) => {
        date.setFullYear(year, month - MONTH_OFFSET)
        const dateString = `${date.getFullYear()}-${date.getMonth() + MONTH_OFFSET}-01`

        const endDateString = `${date.getFullYear()}-${date.getMonth() + MONTH_OFFSET}-${getLastDate(date.getFullYear(), date.getMonth() + MONTH_OFFSET)}`
        return (
          <ListItemComponent
            key={month}
            primary={`${month}月`}
            href={`${BASE_URL_CLIENT}/?startDate=${dateString}&endDate=${endDateString}`}
          ></ListItemComponent>
        )
      })}
    </List>
  )
}
export default ItemList
