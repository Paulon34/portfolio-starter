import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/lib/cn'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '#about', key: 'about' as const },
  { href: '#experience', key: 'experience' as const },
  { href: '#skills', key: 'skills' as const },
  { href: '#projects', key: 'projects' as const },
  { href: '#contact', key: 'contact' as const },
]

export function Nav() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`)
        },
        { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[60] border-b transition-[background,border-color,backdrop-filter,box-shadow] duration-300',
        'pt-[env(safe-area-inset-top,0px)]',
        scrolled || open
          ? 'border-border/80 bg-bg/88 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <a
          href="#top"
          className="min-w-0 truncate font-mono text-[12px] font-semibold tracking-[0.12em] text-text transition-colors hover:text-accent sm:text-sm sm:tracking-[0.14em]"
          onClick={() => setActive('#top')}
        >
          <span className="sm:hidden">
            {profile.firstName.toUpperCase()}
            <span className="text-accent">_</span>
          </span>
          <span className="hidden sm:inline">
            {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
            <span className="text-accent">_</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'touch-cta rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-blue/15 text-sky'
                    : 'text-muted hover:bg-sky/5 hover:text-sky',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {t.nav[link.key]}
              </a>
            )
          })}
          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:hidden">
          <ThemeToggle compact />
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md border border-border bg-surface text-text hover:border-cyan/40"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-h-[min(70vh,calc(100svh-4rem))] overflow-y-auto overflow-x-hidden border-t border-border bg-bg md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'touch-cta rounded-md px-3 py-3 text-base transition-colors',
                    active === link.href
                      ? 'bg-blue/15 text-sky'
                      : 'text-text hover:bg-surface hover:text-sky',
                  )}
                  onClick={() => {
                    setActive(link.href)
                    setOpen(false)
                  }}
                >
                  {t.nav[link.key]}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
