import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

const MONTH_LENGTH = 12
const MONTH_FIRST_INDEX = 1

/**
 *NormalItemList
 */
const NormalItemList = (): JSX.Element => {
  const monthList = [...Array(MONTH_LENGTH)].map((_, i) => {
    return i + MONTH_FIRST_INDEX
  })
  return (
    <List>
      {monthList.map((month) => {
        return (
          <ListItem disablePadding key={month}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={`${month}月`} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
export default NormalItemList
