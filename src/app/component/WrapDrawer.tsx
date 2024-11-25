import { Drawer } from '@mui/material/'

import { DRAWER_WIDTH } from '@/app/const/Const'

import AccordionMenu from '../features/component/drawer/AccordionMenu'

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
      {<AccordionMenu></AccordionMenu>}
    </Drawer>
  )
}
export default WrapDrawer
