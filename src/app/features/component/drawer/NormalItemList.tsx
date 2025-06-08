import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'

const MONTH_LENGTH = 12
const MONTH_FIRST_INDEX = 1

/**
 *NormalItemList
 */
const NormalItemList = () => {
  const monthList = [...Array(MONTH_LENGTH)].map((_, i) => {
    return i + MONTH_FIRST_INDEX
  })
  return (
    <List>
      {monthList.map((month) => {
        return (
          <ListItemComponent
            key={month}
            keyId={month}
            primary={`${month}月`}
          ></ListItemComponent>
        )
      })}
    </List>
  )
}
export default NormalItemList
