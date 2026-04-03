import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface Store {
    theme: Theme
    setTheme: (theme: Theme) => void
} 

export const useTheme = create<Store>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'theme', // name of the item in the storage (must be unique)
    },
  ),
)