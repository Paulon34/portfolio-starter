import { localeLabels, type Locale } from '@/i18n'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/lib/cn'

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  const options: Locale[] = ['pt-BR', 'en']

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-surface/80 p-0.5 font-mono text-xs',
        className,
      )}
      role="group"
      aria-label={t.nav.language}
    >
      {options.map((option) => {
        const active = locale === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            className={cn(
              'relative z-10 min-h-10 min-w-10 touch-manipulation rounded px-2.5 py-1.5 transition-colors',
              active
                ? 'bg-blue text-text'
                : 'text-muted hover:text-text',
            )}
            aria-pressed={active}
            aria-label={
              option === 'pt-BR' ? 'Português (Brasil)' : 'English'
            }
          >
            {localeLabels[option]}
          </button>
        )
      })}
    </div>
  )
}
