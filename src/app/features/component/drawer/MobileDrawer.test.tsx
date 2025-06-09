import { render } from '@testing-library/react'
import React from 'react'
import { beforeEach, expect, test, vi } from 'vitest'

import useDrawerStore from '../../../store/drawerStore'

import MobileDrawerMenu from './MobileDrawer'
import '@testing-library/jest-dom'

beforeEach(() => {
  const mockDate = new Date(2023, 10, 28).getTime()
  Date.now = vi.fn(() => {
    return mockDate
  })
})
test('should render MobileDrawerMenu visible', () => {
  useDrawerStore.setState({ isOpen: true })
  const handleDrawerClose = vi.fn()
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

test('should render MobileDrawerMenu not visible', () => {
  const handleDrawerClose = vi.fn()
  render(
    <MobileDrawerMenu
      isModalOpen={false}
      handleDrawerClose={handleDrawerClose}
    />,
  )
  const rootElement = document.querySelector('div[role="presentation"]')
  expect(rootElement).not.toBeVisible()
})
