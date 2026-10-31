import { createContext } from 'react'
import type { Dictionary, Locale } from './index'

export type I18nContextValue = {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

export const I18nContext = createContext<I18nContextValue | null>(null)
