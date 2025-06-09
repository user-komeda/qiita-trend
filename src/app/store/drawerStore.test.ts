import { expect, test } from 'vitest'

import useDrawerStore from './drawerStore'

test('should initialize with isOpen as false', () => {
  const { isOpen } = useDrawerStore.getState()
  expect(isOpen).toBe(false)
})

test('should change isOpen to true', () => {
  expect(useDrawerStore.getState().isOpen).toBe(false)
  useDrawerStore.getState().changeIsOpen(true)
  const { isOpen } = useDrawerStore.getState()
  expect(isOpen).toBe(true)
})

test('should change isOpen to false', () => {
  useDrawerStore.getState().changeIsOpen(false)
  const { isOpen } = useDrawerStore.getState()
  expect(isOpen).toBe(false)
})
