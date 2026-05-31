import Drawer from '@mui/material/Drawer'

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
          width: '12%',
        },
      }}
      open
    >
      {<AccordionMenu></AccordionMenu>}
    </Drawer>
  )
}
export default WrapDrawer
