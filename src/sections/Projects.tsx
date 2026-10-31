import { Lock, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { projects } from '@/data/projects'
import { tLocal } from '@/data/types'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

export function Projects() {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] py-16 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          {featured.map((project, index) => {
            const isOpen = openId === project.id
            const canLink =
              Boolean(project.href) &&
              project.href !== '#' &&
              project.repoPublic

            return (
              <motion.article
                key={project.id}
                className="card-surface min-w-0 overflow-hidden rounded-xl border border-border/90 transition-[border-color,box-shadow] hover:border-cyan/30"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <button
                  type="button"
                  className="w-full touch-manipulation p-4 text-left transition-colors hover:bg-bg/35 sm:p-5"
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded border border-cyan/35 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan">
                          {t.projects.status[project.status]}
                        </span>
                        {!project.repoPublic ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted">
                            <Lock size={11} />
                            {t.projects.privateNote}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="text-xl font-bold text-text">
                        {tLocal(project.title, locale)}
                      </h3>
                      <p className="mt-2 text-sm text-muted">
                        {tLocal(project.summary, locale)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'mt-1 font-mono text-accent transition-transform',
                        isOpen && 'rotate-45',
                      )}
                    >
                      +
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border px-2 py-1 font-mono text-[10px] text-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      className="border-t border-border"
                    >
                      <div className="space-y-4 p-5 pt-4">
                        <p className="text-sm leading-relaxed text-muted">
                          {tLocal(project.detail, locale)}
                        </p>
                        {canLink && project.href ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
                          >
                            {t.projects.view}
                            <ArrowUpRight size={14} />
                          </a>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
