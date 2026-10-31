import { en } from './en'
import { ptBR } from './pt-BR'
import type { Dictionary, Locale } from './types'

export type { Dictionary, Locale }

export const dictionaries: Record<Locale, Dictionary> = {
  'pt-BR': ptBR,
  en,
}

export const defaultLocale: Locale = 'pt-BR'

export const localeLabels: Record<Locale, string> = {
  'pt-BR': 'PT',
  en: 'EN',
}

export function isLocale(value: string): value is Locale {
  return value === 'pt-BR' || value === 'en'
}
