import { describe, expect, test } from 'vitest'

import useDrawerStore from '@/app/store/drawerStore'

describe(useDrawerStore, () => {
  test('should initialize with isOpen as false', () => {
    expect.hasAssertions()

    const { isOpen } = useDrawerStore.getState()

    expect(isOpen).toBe(false)
  })

  test('should change isOpen to true', () => {
    expect.hasAssertions()
    expect(useDrawerStore.getState().isOpen).toBe(false)

    useDrawerStore.getState().changeIsOpen(true)
    const { isOpen } = useDrawerStore.getState()

    expect(isOpen).toBe(true)
  })

  test('should change isOpen to false', () => {
    expect.hasAssertions()

    useDrawerStore.getState().changeIsOpen(false)
    const { isOpen } = useDrawerStore.getState()

    expect(isOpen).toBe(false)
  })
})
