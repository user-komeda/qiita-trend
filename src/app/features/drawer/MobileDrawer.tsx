import { Drawer } from '@mui/material'

import { DRAWER_WIDTH } from '@/app/const/const'

import DrawerList from './DrawerList'

interface Props {
  isModalOpen: boolean
  handleDrawerClose: () => void
}

/** MobileDrawerMenu */
const MobileDrawerMenu = ({
  isModalOpen,
  handleDrawerClose,
}: Props): JSX.Element => {
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
          width: DRAWER_WIDTH,
        },
      }}
    >
      {DrawerList}
    </Drawer>
  )
}
export default MobileDrawerMenu
