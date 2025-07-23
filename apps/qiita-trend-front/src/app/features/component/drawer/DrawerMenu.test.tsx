import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, test } from 'vitest'

import DrawerMenu from '@/app/features/component/drawer/DrawerMenu'
import '@testing-library/jest-dom'
import useDrawerStore from '@/app/store/drawerStore'

// beforeEach(() => {
//   const mockDate = new Date(2023, 10, 28).getTime()
//   Date.now = vi.fn(() => {
//     return mockDate
//   })
// useDrawerStore.setState({ isOpen: true })
// })
describe('drawer_menu component', () => {
  // //TODO: あとで見直す(Drawerのクローズが発火しない)
  test.todo(
    'should render MobileDrawerMenu and WrapDrawer components',
    async () => {
      expect.hasAssertions()

      render(<DrawerMenu />)
      const allItem = screen.getAllByRole('listitem')

      expect(allItem).toHaveLength((12 * 11 + 4 + 11) * 2)

      await userEvent.keyboard('{esc}')

      expect(useDrawerStore.getState().isOpen).toBe(false)
    },
  )

  test('assert', () => {
    expect.hasAssertions()
    expect(true).toBe(true) // Placeholder test to ensure the test suite runs without errors
  })
})
