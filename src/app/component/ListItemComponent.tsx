import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

interface Props {
  key: number
  primary: string
}

/** ListItemComponent */
const ListItemComponent = ({ key, primary }: Props): JSX.Element => {
  return (
    <ListItem disablePadding key={key}>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemComponent
