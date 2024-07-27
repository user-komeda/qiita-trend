import { create, StoreApi, UseBoundStore } from 'zustand'

interface Store {
  isOpen: boolean
  changeIsOpen: (flag: boolean) => void
}
/** DrawerState */
const useDrawerStore: UseBoundStore<StoreApi<Store>> = create<Store>((set) => {
  return {
    isOpen: false,
    changeIsOpen: (flag): void => {
      return set(() => {
        return { isOpen: flag }
      })
    },
  }
})
export default useDrawerStore
