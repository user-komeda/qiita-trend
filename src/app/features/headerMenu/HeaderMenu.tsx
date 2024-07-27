'use client'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'

import useDrawerStore from '../drawer/drawerStore'

/**
 *HeaderMenu
 */
const HeaderMenu = (): JSX.Element => {
  const changeIsOpen = useDrawerStore((state) => {
    return state.changeIsOpen
  })

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, display: { sm: 'none' } }}
        onClick={() => {
          return changeIsOpen(true)
        }}
      >
        <MenuIcon />
      </IconButton>
    </>
  )
}
export default HeaderMenu
