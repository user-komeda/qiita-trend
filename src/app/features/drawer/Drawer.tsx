import Drawer from '@mui/material/Drawer/Drawer'

import { DRAWER_WIDTH } from '@/app/const/const'

import DrawerList from './DrawerList'

/**
 *WrapDrawer
 */
const WrapDrawer = (): JSX.Element => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: DRAWER_WIDTH,
        },
      }}
      open
    >
      {DrawerList}
    </Drawer>
  )
}
export default WrapDrawer
