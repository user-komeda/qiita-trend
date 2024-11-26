import { ListItem, ListItemButton, ListItemText } from '@mui/material'

import NextLink from './NextLink'

interface Props {
  keyId: number | string
  primary?: string
  childComponent?: JSX.Element
  href?: string
}

/** ListItemComponent */
const ListItemComponent = ({
  keyId,
  primary,
  childComponent,
  href,
}: Props): JSX.Element => {
  return (
    <NextLink href={href ?? ''}>
      <ListItem disablePadding key={keyId}>
        <ListItemButton>
          {childComponent ? childComponent : <ListItemText primary={primary} />}
        </ListItemButton>
      </ListItem>
    </NextLink>
  )
}

export default ListItemComponent
