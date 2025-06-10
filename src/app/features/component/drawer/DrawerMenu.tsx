'use client'
import React from 'react'

import WrapDrawer from '@/app/component/WrapDrawer'
import MobileDrawerMenu from '@/app/features/component/drawer/MobileDrawer'
import useDrawerStore from '@/app/store/drawerStore'

/** Drawer */
const DrawerMenu = () => {
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
