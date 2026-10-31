import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { experience } from '@/data/experience'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  computeExperienceDuration,
  formatExperienceDuration,
  formatExperienceSince,
} from '@/lib/experienceDuration'

export function ExperienceCounter() {
  const { locale, t } = useI18n()
  const reduced = useReducedMotion()
  const [now] = useState(() => new Date())
  const [frame, setFrame] = useState(0)

  const parts = useMemo(
    () => computeExperienceDuration(experience, now),
    [now],
  )

  const sinceLine = useMemo(
    () => formatExperienceSince(experience, locale, t.experience.sincePrefix),
    [locale, t.experience.sincePrefix],
  )

  useEffect(() => {
    if (reduced) return
    let current = 0
    const totalFrames = 24
    const id = window.setInterval(() => {
      current += 1
      setFrame(current)
      if (current >= totalFrames) window.clearInterval(id)
    }, 30)
    return () => window.clearInterval(id)
  }, [parts.totalMonths, reduced])

  const shown = reduced
    ? parts.totalMonths
    : Math.round((parts.totalMonths * Math.min(frame, 24)) / 24)

  const liveLabel = formatExperienceDuration(
    {
      totalMonths: shown,
      years: Math.floor(shown / 12),
      months: shown % 12,
    },
    locale,
  )

  return (
    <motion.div
      className="inline-flex max-w-full flex-col gap-1.5 rounded-lg border border-cyan/25 bg-bg/70 px-4 py-3 shadow-[0_0_24px_var(--p-glow)]"
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
        {t.experience.counterLabel}
      </p>
      <p className="text-base font-semibold leading-snug text-text sm:text-lg">
        {sinceLine ??
          (locale === 'pt-BR'
            ? 'Início em TI a confirmar'
            : 'IT start month to confirm')}
      </p>
      <p className="font-mono text-sm text-accent sm:text-base">
        {liveLabel}
        <span className="text-muted">
          {locale === 'pt-BR' ? ' · meses de calendário' : ' · calendar months'}
        </span>
      </p>
      <p className="max-w-prose font-mono text-[11px] leading-relaxed text-muted">
        {t.experience.counterHint}
      </p>
    </motion.div>
  )
}
