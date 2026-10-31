import { motion } from 'motion/react'
import { ExperienceCounter } from '@/components/ExperienceCounter'
import { PhotoFrame } from '@/components/PhotoFrame'
import { SectionHeading } from '@/components/SectionHeading'
import { presentation } from '@/data/presentation'
import { profile } from '@/data/profile'
import { tLocal, tLocalList } from '@/data/types'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function About() {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()
  const bio = tLocalList(profile.bio, locale)

  return (
    <section id="about" className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] py-16 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <PhotoFrame />

          <motion.div
            className="min-w-0 space-y-6"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5 }}
          >
            {presentation.showExperienceCounter ? (
              <ExperienceCounter />
            ) : null}

            <div className="space-y-4 text-[length:var(--type-body)] leading-relaxed text-muted sm:text-lg">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: tLocal(profile.roleLabel, locale),
                  value: tLocal(profile.roleValue, locale),
                },
                {
                  label: tLocal(profile.focusLabel, locale),
                  value: tLocal(profile.focusValue, locale),
                },
                {
                  label: tLocal(profile.seekingLabel, locale),
                  value: tLocal(profile.seekingValue, locale),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-w-0 rounded-lg border border-border bg-surface/70 p-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-text">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                {t.about.favoritesLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteTechs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-accent/25 bg-bg px-3 py-1.5 font-mono text-xs text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
