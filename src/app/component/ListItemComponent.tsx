import { ListItem, ListItemButton, ListItemText } from '@mui/material'

import NextLink from './NextLink'

interface Props {
  keyId: number | string
  primary?: string
  childComponent?: JSX.Element
}

/** ListItemComponent */
const ListItemComponent = ({
  keyId,
  primary,
  childComponent,
}: Props): JSX.Element => {
  return (
    <NextLink href={`items/${keyId}`}>
      <ListItem disablePadding key={keyId}>
        <ListItemButton>
          {childComponent ? childComponent : <ListItemText primary={primary} />}
        </ListItemButton>
      </ListItem>
    </NextLink>
  )
}

export default ListItemComponent
