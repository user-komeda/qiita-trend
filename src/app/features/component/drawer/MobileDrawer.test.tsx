import { render } from '@testing-library/react'
import React from 'react'

import useDrawerStore from '../../../store/drawerStore'

import MobileDrawerMenu from './MobileDrawer'
import '@testing-library/jest-dom'

describe('DrawerMenu', () => {
  beforeEach(() => {
    const mockDate = new Date(2023, 10, 28).getTime()
    Date.now = jest.fn(() => {
      return mockDate
    })
  })
  it('should render MobileDrawerMenu visible', () => {
    useDrawerStore.setState({ isOpen: true })
    const handleDrawerClose = jest.fn()
    render(
      <MobileDrawerMenu
        isModalOpen={true}
        handleDrawerClose={handleDrawerClose}
      />,
    )
    const rootElement = document.querySelector('div[role="presentation"]')
    expect(rootElement).toBeVisible()
    const allListItem = document.querySelectorAll('li')
    expect(allListItem).toHaveLength(12 * 11 + 4 + 11)
  })

  it('should render MobileDrawerMenu not visible', () => {
    const handleDrawerClose = jest.fn()
    render(
      <MobileDrawerMenu
        isModalOpen={false}
        handleDrawerClose={handleDrawerClose}
      />,
    )
    const rootElement = document.querySelector('div[role="presentation"]')
    expect(rootElement).not.toBeVisible()
  })
})
