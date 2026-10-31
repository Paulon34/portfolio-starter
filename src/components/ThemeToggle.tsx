import { Palette } from 'lucide-react'
import { useTheme, type ThemeId } from '@/theme'
import { applyThemeToDocument, persistTheme } from '@/theme/resolveTheme'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/lib/cn'

const ORDER: ThemeId[] = ['obsidian', 'electric-blue', 'light-pro']

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()

  const labels: Record<ThemeId, string> = {
    obsidian: t.theme.obsidian,
    'electric-blue': t.theme.electricBlue,
    'light-pro': t.theme.lightPro,
  }

  const select = (id: ThemeId) => {
    applyThemeToDocument(id)
    persistTheme(id)
    setTheme(id)
  }

  return (
    <div
      className={cn(
        'relative z-[60] inline-flex items-center gap-1 rounded-md border border-border bg-surface p-1',
        compact && 'gap-0.5',
      )}
      role="group"
      aria-label={t.theme.label}
      data-testid="theme-toggle"
    >
      <span className="hidden items-center gap-1 px-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted xl:inline-flex">
        <Palette size={12} className="text-accent" aria-hidden />
        {t.theme.label}
      </span>
      {ORDER.map((id) => (
        <button
          key={id}
          type="button"
          data-theme-option={id}
          aria-pressed={theme === id}
          aria-label={`${t.theme.label}: ${labels[id]}`}
          title={labels[id]}
          onClick={() => select(id)}
          className={cn(
            'relative z-[60] min-h-10 min-w-10 cursor-pointer touch-manipulation rounded px-2.5 py-2 font-mono text-[10px] transition-colors sm:text-[11px]',
            theme === id
              ? 'bg-accent text-bg'
              : 'text-muted hover:bg-bg hover:text-text',
            compact && 'min-h-9 min-w-9 px-2 py-1.5',
          )}
        >
          {compact
            ? id === 'obsidian'
              ? 'O'
              : id === 'electric-blue'
                ? 'B'
                : 'L'
            : labels[id]}
        </button>
      ))}
    </div>
  )
}
