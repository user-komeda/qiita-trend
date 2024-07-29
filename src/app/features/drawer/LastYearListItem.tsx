import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

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
export default LastYearListItem
