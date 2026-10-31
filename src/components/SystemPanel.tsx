import { motion } from 'motion/react'
import { Box, GitBranch, Network, Server, Sparkles, Workflow } from 'lucide-react'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Terminal } from './Terminal'

const techCards = [
  { icon: Server, label: 'Linux', tone: 'accent' as const },
  { icon: Network, label: 'Networks', tone: 'cyan' as const },
  { icon: Box, label: 'Docker', tone: 'sky' as const },
  { icon: Workflow, label: 'n8n', tone: 'cyan' as const },
  { icon: Sparkles, label: 'AI tooling', tone: 'accent' as const },
  { icon: GitBranch, label: 'Open Source', tone: 'blue' as const },
]

const toneClass = {
  accent: 'text-accent group-hover:text-sky',
  cyan: 'text-cyan group-hover:text-cyan',
  sky: 'text-sky group-hover:text-sky',
  blue: 'text-blue group-hover:text-blue',
}

export function SystemPanel() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const featured = projects.filter((p) => p.featured)

  return (
    <motion.aside
      className="relative panel-surface rounded-xl border border-border/90 p-4 backdrop-blur-sm sm:p-5"
      initial={reduced ? false : { opacity: 0, x: 28 }}
      animate={reduced ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
      />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky">
            {t.hero.panelTitle}
          </p>
          <p className="mt-1 max-w-[28ch] text-xs leading-relaxed text-muted">
            {t.hero.panelSubtitle}
          </p>
        </div>
        <span className="rounded border border-cyan/40 bg-cyan/5 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan">
          {t.hero.demoBadge}
        </span>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {t.hero.stackLabel}
        </p>
        <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:grid-cols-3 sm:gap-2">
          {techCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                className="group min-w-0 rounded-lg border border-border bg-bg/75 p-2.5 transition-colors hover:border-cyan/35 hover:bg-bg sm:p-3"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.06 }}
              >
                <Icon
                  size={16}
                  className={`mb-1.5 transition-colors sm:mb-2 ${toneClass[card.tone]}`}
                />
                <p className="truncate font-mono text-[10px] text-text sm:text-[11px]">
                  {card.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-bg/65 p-3 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.06)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sky">
            {t.hero.focusLabel}
          </p>
          <p className="mt-2 text-sm leading-snug text-text">
            {profile.roles[0]} · {profile.roles[2]}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg/65 p-3 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.06)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
            {t.hero.projectsLabel}
          </p>
          <ul className="mt-2 space-y-1 font-mono text-[11px] text-cyan">
            {featured.map((project) => (
              <li key={project.id} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                {project.id}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative">
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-2 -top-6 hidden h-10 w-full lg:block"
          viewBox="0 0 320 40"
          fill="none"
        >
          <path
            d="M10 30 C 80 5, 160 5, 230 28 S 300 35, 310 10"
            stroke="#26282e"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <path
            d="M24 28 C 90 10, 170 8, 240 24"
            stroke="#38BDF8"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
          <circle cx="10" cy="30" r="2.5" fill="#38BDF8" />
          <circle cx="310" cy="10" r="2.5" fill="#22D3EE" />
        </svg>
        <Terminal />
      </div>
    </motion.aside>
  )
}
