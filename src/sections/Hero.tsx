import { FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { GeometricBg } from '@/components/GeometricBg'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { SystemPanel } from '@/components/SystemPanel'
import { presentation, resumePath } from '@/data/presentation'
import { profile } from '@/data/profile'
import { tLocal } from '@/data/types'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion()
  const chars = text.split('')

  if (reduced) {
    return <span>{text}</span>
  }

  return (
    <span className="inline-flex max-w-full whitespace-nowrap" aria-label={text}>
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.45,
            delay: delay + index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function RotatingRoles() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % profile.roles.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [reduced])

  if (reduced) {
    return (
      <p className="font-mono text-sm text-cyan sm:text-base">
        {profile.roles.join(' · ')}
      </p>
    )
  }

  return (
    <div className="relative h-7 overflow-hidden font-mono text-sm text-cyan sm:h-8 sm:text-base">
      <AnimatePresence mode="wait">
        <motion.p
          key={profile.roles[index]}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-x-0"
        >
          {profile.roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export function Hero() {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()
  const resumeHref = resumePath(locale, presentation.cvFocus)

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden pt-[calc(4.25rem+env(safe-area-inset-top,0px))] sm:pt-[calc(5rem+env(safe-area-inset-top,0px))]"
    >
      <GeometricBg />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-14 pt-6 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-center lg:gap-10 lg:pb-24 lg:pt-14 xl:gap-14">
        <div className="min-w-0">
          <motion.p
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted sm:mb-5 sm:text-xs sm:tracking-[0.3em]"
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            portfolio · systems · remote-ready
          </motion.p>

          <h1 className="max-w-full text-[clamp(2.15rem,11vw,5.75rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-text sm:text-[clamp(2.4rem,8.5vw,5.75rem)] sm:tracking-tight">
            <span className="block">
              <LetterReveal text={profile.firstName.toUpperCase()} />
            </span>
            <span className="block text-accent">
              <LetterReveal text="DEV_" delay={0.28} />
            </span>
          </h1>

          <div className="mt-5 sm:mt-6">
            <RotatingRoles />
          </div>

          <motion.p
            className="mt-4 max-w-xl text-[length:var(--type-lead)] text-muted sm:mt-5"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            {tLocal(profile.headline, locale)}
          </motion.p>

          <motion.div
            className="mt-5 sm:mt-6"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {t.hero.interestsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.interestAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-md border border-border bg-surface/70 px-2.5 py-1.5 font-mono text-[11px] text-text transition-colors hover:border-cyan/35"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-7 flex flex-wrap items-stretch gap-2.5 sm:mt-8 sm:items-center sm:gap-3"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <Button
              href="#projects"
              className="touch-cta min-w-[min(100%,9.5rem)] flex-1 px-5 py-3 text-[15px] sm:flex-none"
            >
              {t.hero.exploreProjects}
            </Button>
            <Button href="#about" variant="secondary" className="touch-cta flex-1 sm:flex-none">
              {t.hero.aboutMe}
            </Button>
            <Button
              href={resumeHref}
              variant="ghost"
              external
              download
              className="touch-cta"
            >
              <FileText size={16} />
              {t.hero.resume}
            </Button>
            <Button
              href={profile.githubUrl}
              variant="ghost"
              external
              className="touch-cta"
            >
              <GitHubIcon size={16} />
              {t.hero.github}
            </Button>
            <Button
              href={profile.linkedinUrl}
              variant="ghost"
              external
              className="touch-cta"
            >
              <LinkedInIcon size={16} />
              {t.hero.linkedin}
            </Button>
          </motion.div>
        </div>

        <div className="min-w-0 lg:justify-self-stretch">
          <SystemPanel />
        </div>
      </div>
    </section>
  )
}
