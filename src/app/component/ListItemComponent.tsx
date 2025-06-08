/* eslint  @typescript-eslint/strict-boolean-expressions: 0 */
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { ReactNode } from 'react'

import NextLink from './NextLink'

interface Props {
  keyId: number | string
  primary?: string
  childComponent?: ReactNode
  href?: string
  dateString?: string
  endDateString?: string
}

/** ListItemComponent */
const ListItemComponent = ({ keyId, primary, childComponent, href }: Props) => {
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
