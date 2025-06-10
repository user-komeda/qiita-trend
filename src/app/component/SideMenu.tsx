import { Box } from '@mui/material'
import { ReactNode } from 'react'

import { DRAWER_WIDTH } from '@/app/const/const'

interface Props {
  childComponent: ReactNode
}

/** SideMenu */
const SideMenu = ({ childComponent }: Props) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {childComponent}
    </Box>
  )
}
export default SideMenu
