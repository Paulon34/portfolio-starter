import { Mail, FileDown, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/Button'
import { SectionHeading } from '@/components/SectionHeading'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { presentation, resumePath } from '@/data/presentation'
import { getPhoneHref, getVisibleSocials, profile } from '@/data/profile'
import { tLocal } from '@/data/types'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Contact() {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()
  const socials = getVisibleSocials()
  const phoneHref = getPhoneHref()
  const resumeHref = resumePath(locale, presentation.cvFocus)

  const iconFor = (id: string) => {
    switch (id) {
      case 'github':
        return GitHubIcon
      case 'linkedin':
        return LinkedInIcon
      case 'email':
        return Mail
      default:
        return Mail
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] py-16 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <motion.div
          className="panel-surface rounded-2xl border border-border/90 p-5 sm:p-8"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
        >
          {profile.seekingRemote ? (
            <p className="mb-6 inline-flex max-w-full items-center gap-2 rounded-md border border-cyan/30 bg-bg/60 px-3 py-2 font-mono text-xs leading-snug text-cyan">
              <MapPin size={14} className="shrink-0" />
              {t.contact.remote}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {socials.map((social) => {
              const Icon = iconFor(social.id)
              const label =
                social.id === 'github'
                  ? t.contact.github
                  : social.id === 'linkedin'
                    ? t.contact.linkedin
                    : social.id === 'email'
                      ? t.contact.email
                      : social.label
              return (
                <Button
                  key={social.id}
                  href={social.href}
                  variant={social.id === 'email' ? 'primary' : 'secondary'}
                  external={social.id !== 'email'}
                >
                  <Icon size={16} />
                  {typeof label === 'string' ? label : tLocal(social.label, locale)}
                </Button>
              )
            })}

            {phoneHref ? (
              <Button href={phoneHref} variant="ghost">
                {t.contact.phone}
              </Button>
            ) : null}

            <Button href={resumeHref} variant="ghost" external download>
              <FileDown size={16} />
              {t.contact.resume}
            </Button>
          </div>

          <p className="mt-8 font-mono text-sm text-muted">{profile.email}</p>
        </motion.div>
      </div>
    </section>
  )
}
