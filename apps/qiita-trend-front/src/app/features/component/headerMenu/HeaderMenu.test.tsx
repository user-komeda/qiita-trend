import { createTheme, ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'
import { describe, expect, test } from 'vitest'

import HeaderMenu from '@/app/features/component/headerMenu/HeaderMenu'
import useDrawerStore from '@/app/store/drawerStore'

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

describe('header_menu component', () => {
  test('renders the menu button', () => {
    expect.hasAssertions()

    render(
      <ThemeProvider theme={mobileTheme}>
        <HeaderMenu />
      </ThemeProvider>,
    )
    const button = screen.getByRole('button', { name: 'menu' })

    expect(button).toBeInTheDocument()
  })

  test('calls changeIsOpen when the button is clicked', async () => {
    expect.hasAssertions()

    render(
      <ThemeProvider theme={mobileTheme}>
        <HeaderMenu />
      </ThemeProvider>,
    )
    const button = screen.getByRole('button', { name: 'menu' })

    expect(useDrawerStore.getState().isOpen).toBe(false)

    await userEvent.click(button)

    expect(useDrawerStore.getState().isOpen).toBe(true)
  })
})
