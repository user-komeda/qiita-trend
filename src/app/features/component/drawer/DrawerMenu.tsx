'use client'
import React from 'react'

import WrapDrawer from '../../../component/WrapDrawer'

import useDrawerStore from './drawerStore'
import MobileDrawerMenu from './MobileDrawer'

/** Drawer */
const DrawerMenu = (): JSX.Element => {
  const isModalOpen = useDrawerStore((state) => {
    return state.isOpen
  })
  const changeIsOpen = useDrawerStore((state) => {
    return state.changeIsOpen
  })
  const handleDrawerClose = (): void => {
    changeIsOpen(false)
  }

  return (
    <>
      <MobileDrawerMenu
        isModalOpen={isModalOpen}
        handleDrawerClose={handleDrawerClose}
      ></MobileDrawerMenu>
      <WrapDrawer></WrapDrawer>
    </>
  )
}
export default DrawerMenu
