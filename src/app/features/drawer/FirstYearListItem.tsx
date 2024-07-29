import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

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

export default FirstYearListItem
