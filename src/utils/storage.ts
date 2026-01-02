import { STORAGE_KEYS } from './constants'

/**
 * Type-safe localStorage wrapper
 */
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}

/**
 * Get authentication token from storage
 */
export const getAuthToken = (): string | null => {
  return storage.get(STORAGE_KEYS.AUTH_TOKEN)
}

/**
 * Set authentication token in storage
 */
export const setAuthToken = (token: string): void => {
  storage.set(STORAGE_KEYS.AUTH_TOKEN, token)
}

/**
 * Remove authentication token from storage
 */
export const removeAuthToken = (): void => {
  storage.remove(STORAGE_KEYS.AUTH_TOKEN)
}
