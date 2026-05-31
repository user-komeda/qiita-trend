import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  childComponent: ReactNode
}

/** SideMenu */
const SideMenu = ({ childComponent }: Props) => {
  return (
    <Box component="nav" aria-label="mailbox folders">
      {childComponent}
    </Box>
  )
}
export default SideMenu
