import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'

interface Props {
  endDateLastMonthList: number[]
}

/**
 *LastYearListItem
 */
const LastYearListItem = ({ endDateLastMonthList }: Props): JSX.Element => {
  return (
    <List>
      {endDateLastMonthList.map((month) => {
        return (
          <ListItemComponent
            key={month}
            primary={`${month}月`}
          ></ListItemComponent>
        )
      })}
    </List>
  )
}
export default LastYearListItem
