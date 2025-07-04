import Drawer from '@mui/material/Drawer'

import { DRAWER_WIDTH } from '@/app/const/const'
import AccordionMenu from '@/app/features/component/drawer/AccordionMenu'

/**
 *WrapDrawer
 */
const WrapDrawer = () => {
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
