import { render, fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, vi, test } from 'vitest'

import DrawerMenu from '@/app/features/component/drawer/DrawerMenu'
import useDrawerStore from '@/app/store/drawerStore'

interface MockDrawerState {
  isOpen: boolean
  changeIsOpen: (flag: boolean) => void
}

vi.mock(import('@/app/component/WrapDrawer'), () => ({
  default: () => <div data-testid="wrap-drawer">Wrap Drawer</div>,
}))

vi.mock(import('@/app/features/component/drawer/MobileDrawer'), () => ({
  default: ({
    isModalOpen,
    handleDrawerClose,
  }: {
    isModalOpen: boolean
    handleDrawerClose: () => void
  }) => (
    <div data-testid="mobile-drawer">
      <span>{isModalOpen ? 'open' : 'closed'}</span>
      <button onClick={handleDrawerClose} data-testid="close-button">
        Close
      </button>
    </div>
  ),
}))

vi.mock(import('@/app/store/drawerStore'), () => {
  return {
    // eslint-disable-next-line vitest/require-mock-type-parameters
    default: vi.fn(),
  } as unknown as Partial<typeof import('@/app/store/drawerStore')>
})

describe('drawerMenu Component', () => {
  test('正しい状態とハンドラーをMobileDrawerに渡すこと', () => {
    expect.hasAssertions()

    const changeIsOpen = vi.fn<(flag: boolean) => void>()
    const mockState: MockDrawerState = {
      isOpen: true,
      changeIsOpen,
    }

    vi.mocked(useDrawerStore).mockImplementation(
      (selector?: (state: MockDrawerState) => unknown) => {
        return selector === undefined ? mockState : selector(mockState)
      },
    )

    render(<DrawerMenu />)

    expect(screen.getByTestId('wrap-drawer')).toBeDefined()
    expect(screen.getByText('open')).toBeDefined()

    fireEvent.click(screen.getByTestId('close-button'))

    expect(changeIsOpen).toHaveBeenCalledWith(false)
  })
})
