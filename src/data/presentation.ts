import type { PresentationPrefs } from './types'
import raw from './content/presentation.json'

export const presentation = raw as PresentationPrefs

export function resumePath(
  locale: 'pt-BR' | 'en',
  focus: PresentationPrefs['cvFocus'] = presentation.cvFocus,
): string {
  const localeToken = locale === 'pt-BR' ? 'pt' : 'en'
  return presentation.resumePathTemplate
    .replace('{locale}', localeToken)
    .replace('{focus}', focus)
}
