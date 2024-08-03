import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

interface Props {
  keyId: number | string
  primary: string
}

/** ListItemComponent */
const ListItemComponent = ({ keyId, primary }: Props): JSX.Element => {
  return (
    <ListItem disablePadding key={keyId}>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemComponent
