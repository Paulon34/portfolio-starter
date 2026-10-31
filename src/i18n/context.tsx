import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultLocale,
  dictionaries,
  isLocale,
  type Locale,
} from './index'
import { I18nContext, type I18nContextValue } from './I18nContext'

const STORAGE_KEY = 'ph-portfolio-locale'

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isLocale(stored)) return stored
  } catch {
    /* ignore */
  }
  return defaultLocale
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? defaultLocale : readStoredLocale(),
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR')
  }, [locale, setLocale])

  useEffect(() => {
    document.documentElement.lang = locale
    const dict = dictionaries[locale]
    document.title = dict.meta.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', dict.meta.description)
  }, [locale])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
