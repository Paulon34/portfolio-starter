import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'

function terminalLines() {
  const whoami = `${profile.firstName}-${profile.lastName}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const featured = projects
    .filter((p) => p.featured)
    .map((p) => p.id)
    .slice(0, 4)
    .join(' · ')
  return [
    '$ whoami',
    whoami,
    '$ focus --list',
    'linux · infra · automation · software',
    '$ projects --featured',
    featured || 'portfolio',
    '$ seeking --remote',
    String(profile.seekingRemote),
  ] as const
}

export function Terminal() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const lines = terminalLines()
  const [visibleCount, setVisibleCount] = useState(reduced ? lines.length : 0)

  useEffect(() => {
    if (reduced) return

    let cancelled = false
    let i = 0
    const id = window.setInterval(() => {
      if (cancelled) return
      i += 1
      setVisibleCount(i)
      if (i >= lines.length) window.clearInterval(id)
    }, 420)

    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [reduced, lines.length])

  const count = reduced ? lines.length : visibleCount

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg/95 font-mono text-xs shadow-[inset_0_0_0_1px_rgba(56,189,248,0.08)]">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-muted">
        <span className="min-w-0 truncate text-cyan">{t.hero.terminalTitle}</span>
        <span className="shrink-0 rounded border border-blue/40 bg-blue/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-sky">
          {t.hero.demoBadge}
        </span>
      </div>
      <div className="min-h-[152px] space-y-1 overflow-x-auto p-3 text-[11px] leading-relaxed sm:min-h-[180px] sm:text-[12px]">
        {lines.slice(0, count).map((line, index) => {
          const isCmd = line.startsWith('$')
          return (
            <p
              key={`${line}-${index}`}
              className={`whitespace-nowrap ${isCmd ? 'text-sky' : 'text-cyan/90'}`}
            >
              {line}
            </p>
          )
        })}
        {!reduced && count < lines.length ? (
          <span className="inline-block h-4 w-2 animate-pulse bg-cyan align-middle" />
        ) : (
          <span className="inline-block h-4 w-2 bg-cyan/70 align-middle" />
        )}
      </div>
      <p className="border-t border-border px-3 py-2 text-[10px] leading-snug text-muted">
        {t.hero.terminalHint}
      </p>
    </div>
  )
}
