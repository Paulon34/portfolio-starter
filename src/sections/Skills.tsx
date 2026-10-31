import {
  Bot,
  Boxes,
  Code2,
  Database,
  Network,
  Server,
  Activity,
} from 'lucide-react'
import { motion } from 'motion/react'
import { SectionHeading } from '@/components/SectionHeading'
import { skills, type SkillCategoryId } from '@/data'
import { tLocal } from '@/data/types'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const icons: Record<SkillCategoryId, typeof Server> = {
  linux: Server,
  networks: Network,
  virtualization: Boxes,
  development: Code2,
  ai: Bot,
  databases: Database,
  devops: Activity,
}

export function Skills() {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()

  return (
    <section id="skills" className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] py-16 sm:py-28">
      <div className="absolute inset-0 -z-10 opacity-40 dot-field" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {skills.map((category, index) => {
            const Icon = icons[category.id]
            const title = tLocal(category.title, locale)
            return (
              <motion.article
                key={category.id}
                className="card-surface group min-w-0 rounded-xl border border-border/90 p-4 transition-[border-color,transform] hover:border-cyan/35 sm:p-5"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={reduced ? undefined : { y: -4 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg text-cyan transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-base font-bold text-text">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-mono text-xs text-muted"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
