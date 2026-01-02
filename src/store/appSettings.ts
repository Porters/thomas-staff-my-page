import { create } from 'zustand'
import { storage, STORAGE_KEYS } from '@/utils'

type Theme = 'light' | 'dark'
type Language = 'en' | 'ja'

interface AppSettingsState {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  toggleTheme: () => void
}

export const useAppSettings = create<AppSettingsState>((set) => ({
  theme: (storage.get(STORAGE_KEYS.THEME) as Theme) || 'light',
  language: (storage.get(STORAGE_KEYS.LANGUAGE) as Language) || 'en',

  setTheme: (theme) => {
    storage.set(STORAGE_KEYS.THEME, theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme })
  },

  setLanguage: (language) => {
    storage.set(STORAGE_KEYS.LANGUAGE, language)
    set({ language })
  },

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      storage.set(STORAGE_KEYS.THEME, newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: newTheme }
    }),
}))

// Initialize theme on load
const storedTheme = localStorage.getItem('theme') as Theme
if (storedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}
