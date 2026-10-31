import { motion } from 'motion/react'
import { SectionHeading } from '@/components/SectionHeading'
import { experience } from '@/data/experience'
import { tLocal, tLocalList } from '@/data/types'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

export function Experience() {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] py-16 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} />

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-accent via-border to-cyan sm:left-4"
          />

          <ol className="space-y-5 sm:space-y-6">
            {experience.map((item, index) => {
              const details = tLocalList(item.summary, locale)

              return (
                <motion.li
                  key={item.id}
                  className="relative grid min-w-0 gap-3 pl-10 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4 sm:pl-12"
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <div
                    aria-hidden
                    className="absolute left-1.5 top-2 h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent glow-accent sm:left-2.5"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted">
                      {tLocal(item.periodLabel, locale)}
                    </p>
                    <p
                      className={cn(
                        'mt-2 inline-flex rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                        item.kind === 'work'
                          ? 'border-cyan/40 text-cyan'
                          : 'border-accent/40 text-accent',
                      )}
                    >
                      {item.kind === 'work' ? t.experience.work : t.experience.education}
                    </p>
                  </div>
                  <div className="card-surface min-w-0 rounded-xl border border-border/90 p-4 transition-colors hover:border-cyan/25 sm:p-5">
                    <h3 className="text-lg font-bold text-text sm:text-xl">
                      {tLocal(item.title, locale)}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {tLocal(item.org, locale)}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                          <span className="min-w-0">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    {item.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-border px-2 py-1 font-mono text-[10px] text-text"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
