import { createContext } from 'react'
import type { ThemeId } from './types'

export type ThemeContextValue = {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  cycleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
