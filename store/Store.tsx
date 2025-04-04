import { create } from 'zustand'
import { FiltersType } from '../type'

type Store = {
  count: FiltersType
  inc: (data:FiltersType) => void
}

export const useStore = create<Store>()((set) => ({
  count: {
    orientation: 'all',
    order: 'popular',
    image_type: 'all',
  },
  inc: (data:FiltersType) => set((state) => ({ count: data })),
}))