import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'
import { BASE_URL_CLIENT } from '@/app/const/const'
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
        const dateString = `${date.getFullYear().toLocaleString()}-${date.getMonth().toLocaleString()}-01`

        const endDateString = `${date.getFullYear().toLocaleString()}-${date.getMonth().toLocaleString()}-${getLastDate(date.getFullYear(), date.getMonth()).toLocaleString()}`
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
