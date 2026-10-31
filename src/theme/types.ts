export type ThemeId = 'obsidian' | 'electric-blue' | 'light-pro'

export const THEME_IDS: ThemeId[] = ['obsidian', 'electric-blue', 'light-pro']

export const THEME_STORAGE_KEY = 'portfolio-theme-v1'

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === 'obsidian' || value === 'electric-blue' || value === 'light-pro'
}
