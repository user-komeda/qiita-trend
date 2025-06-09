import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'
import { expect, test } from 'vitest'

import useDrawerStore from '../../../store/drawerStore'

import HeaderMenu from './HeaderMenu'

test('renders the menu button', () => {
  render(<HeaderMenu />)
  const button = screen.getByRole('button', { name: 'menu' })
  expect(button).toBeInTheDocument()
})

test('calls changeIsOpen when the button is clicked', async () => {
  render(<HeaderMenu />)
  const button = screen.getByRole('button', { name: 'menu' })
  expect(useDrawerStore.getState().isOpen).toBeFalsy()
  await userEvent.click(button)
  expect(useDrawerStore.getState().isOpen).toBeTruthy()
})
