import React from 'react'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import useDrawerStore from '../drawer/drawerStore'

import HeaderMenu from './HeaderMenu'

describe('HeaderMenu Component', () => {
  it('renders the menu button', () => {
    render(<HeaderMenu />)
    const button = screen.getByRole('button', { name: 'menu' })
    expect(button).toBeInTheDocument()
  })

  it('calls changeIsOpen when the button is clicked', async () => {
    render(<HeaderMenu />)
    const button = screen.getByRole('button', { name: 'menu' })
    expect(useDrawerStore.getState().isOpen).toBeFalsy()
    await userEvent.click(button)
    expect(useDrawerStore.getState().isOpen).toBeTruthy()
  })
})
