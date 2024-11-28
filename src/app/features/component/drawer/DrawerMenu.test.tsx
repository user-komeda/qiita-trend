import { render } from '@testing-library/react'
import React from 'react'

import DrawerMenu from './DrawerMenu'
import '@testing-library/jest-dom'

//TODO: あとで見直す(Drawerのクローズが発火しない)
describe('DrawerMenu', () => {
  beforeEach(() => {
    const mockDate = new Date(2023, 10, 28).getTime()
    Date.now = jest.fn(() => {
      return mockDate
    })
    // useDrawerStore.setState({ isOpen: true })
  })
  it('should render MobileDrawerMenu and WrapDrawer components', async () => {
    render(<DrawerMenu />)
    const allItem = document.querySelectorAll('li')
    expect(allItem).toHaveLength((12 * 11 + 4 + 11) * 2)
    // await userEvent.keyboard('{esc}')
    // expect(useDrawerStore.getState().isOpen).toBeFalsy()
  })
})
