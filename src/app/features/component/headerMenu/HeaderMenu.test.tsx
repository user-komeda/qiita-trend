import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'
import { describe, expect, test } from 'vitest'

import HeaderMenu from '@/app/features/component/headerMenu/HeaderMenu'
import useDrawerStore from '@/app/store/drawerStore'

describe('header_menu component', () => {
  test('renders the menu button', () => {
    expect.hasAssertions()

    render(<HeaderMenu />)
    const button = screen.getByRole('button', { name: 'menu' })

    expect(button).toBeInTheDocument()
  })

  test('calls changeIsOpen when the button is clicked', async () => {
    expect.hasAssertions()

    render(<HeaderMenu />)
    const button = screen.getByRole('button', { name: 'menu' })

    expect(useDrawerStore.getState().isOpen).toBe(false)

    await userEvent.click(button)

    expect(useDrawerStore.getState().isOpen).toBe(true)
  })
})
