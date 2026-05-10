import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'
import { BASE_URL_CLIENT } from '@/app/const/path'
import getLastDate from '@/app/util/getLastDate'

interface Props {
  monthList: number[]
  year: number
}

/**
 *LastYearListItem
 */
const ItemList = ({ monthList, year }: Props) => {
  return (
    <List>
      {monthList.map((month) => {
        const date = new Date(year, month)
        const dateString = `${date.getFullYear().toString()}-${date.getMonth().toString()}-01`
        const endDateString = `${date.getFullYear().toString()}-${date.getMonth().toString()}-${getLastDate(date.getFullYear(), date.getMonth()).toString()}`
        return (
          <ListItemComponent
            key={month}
            keyId={month}
            primary={`${month.toString()}月`}
            href={`${BASE_URL_CLIENT}/?startDate=${dateString}&endDate=${endDateString}`}
          ></ListItemComponent>
        )
      })}
    </List>
  )
}
export default ItemList
