/* eslint testing-library/no-node-access: 0 */

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import MobileDrawerMenu from '@/app/features/component/drawer/MobileDrawer'
import useDrawerStore from '@/app/store/drawerStore'

import '@testing-library/jest-dom'

const mobileTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 2000,
      md: 3000,
      lg: 4000,
      xl: 5000,
    },
  },
})

describe('mobile_drawer_menu component', () => {
  beforeEach(() => {
    const mockDate = new Date(2023, 10, 28).getTime()
    vi.spyOn(Date, 'now').mockImplementation(() => {
      return mockDate
    })
  })

  test('should render MobileDrawerMenu visible', () => {
    expect.hasAssertions()

    useDrawerStore.setState({ isOpen: true })
    const handleDrawerClose = vi.fn<() => void>()
    render(
      <ThemeProvider theme={mobileTheme}>
        <MobileDrawerMenu
          isModalOpen={true}
          handleDrawerClose={handleDrawerClose}
        />
      </ThemeProvider>,
    )
    const rootElement = document.querySelector('div[role="presentation"]')

    expect(rootElement).toBeVisible()

    const allListItem = document.querySelectorAll('li')

    expect(allListItem).toHaveLength(12 * 11 + 4 + 11)
  })

  test('should render MobileDrawerMenu not visible', () => {
    expect.hasAssertions()

    const handleDrawerClose = vi.fn<() => void>()
    render(
      <ThemeProvider theme={mobileTheme}>
        <MobileDrawerMenu
          isModalOpen={false}
          handleDrawerClose={handleDrawerClose}
        />
      </ThemeProvider>,
    )
    const rootElement = document.querySelector('div[role="presentation"]')

    expect(rootElement).not.toBeVisible()
  })
})
