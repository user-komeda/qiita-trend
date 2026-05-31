import { Drawer } from '@mui/material'
import React from 'react'

import AccordionMenu from '@/app/features/component/drawer/AccordionMenu'

interface Props {
  isModalOpen: boolean
  handleDrawerClose: () => void
}

/** MobileDrawerMenu */
const MobileDrawerMenu = ({ isModalOpen, handleDrawerClose }: Props) => {
  return (
    <Drawer
      variant="temporary"
      open={isModalOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '50%',
        },
      }}
    >
      {<AccordionMenu></AccordionMenu>}
    </Drawer>
  )
}
export default MobileDrawerMenu
