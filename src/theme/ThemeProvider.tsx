import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import {
  applyThemeToDocument,
  persistTheme,
  resolveInitialTheme,
} from './resolveTheme'
import { THEME_IDS, type ThemeId } from './types'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => resolveInitialTheme())

  useEffect(() => {
    applyThemeToDocument(theme)
    persistTheme(theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      try {
        if (window.localStorage.getItem('portfolio-theme-v1')) return
      } catch {
        /* ignore */
      }
      setThemeState(mq.matches ? 'light-pro' : 'obsidian')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = (next: ThemeId) => setThemeState(next)
  const cycleTheme = () => {
    setThemeState((current) => {
      const idx = THEME_IDS.indexOf(current)
      return THEME_IDS[(idx + 1) % THEME_IDS.length]
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
