import useDrawerStore from './DrawerStore'

describe('useDrawerStore', () => {
  it('should initialize with isOpen as false', () => {
    const { isOpen } = useDrawerStore.getState()
    expect(isOpen).toBe(false)
  })

  it('should change isOpen to true', () => {
    expect(useDrawerStore.getState().isOpen).toBe(false)
    useDrawerStore.getState().changeIsOpen(true)
    const { isOpen } = useDrawerStore.getState()
    expect(isOpen).toBe(true)
  })

  it('should change isOpen to false', () => {
    useDrawerStore.getState().changeIsOpen(false)
    const { isOpen } = useDrawerStore.getState()
    expect(isOpen).toBe(false)
  })
})
