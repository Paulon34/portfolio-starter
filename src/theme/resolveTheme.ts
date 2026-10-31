import {
  isThemeId,
  THEME_STORAGE_KEY,
  type ThemeId,
} from './types'

/** Resolve initial theme: localStorage → prefers-color-scheme → Obsidian. */
export function resolveInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return 'obsidian'

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemeId(stored)) return stored
  } catch {
    /* ignore */
  }

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light-pro'
  }

  return 'obsidian'
}

export function applyThemeToDocument(theme: ThemeId) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme =
    theme === 'light-pro' ? 'light' : 'dark'
}

export function persistTheme(theme: ThemeId) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}
