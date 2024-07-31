import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'

interface Props {
  firstDateLastMonthList: number[]
}

/**
 *FirstYearListItem
 */
const FirstYearListItem = ({ firstDateLastMonthList }: Props): JSX.Element => {
  return (
    <List>
      {firstDateLastMonthList.map((month) => {
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

export default FirstYearListItem
