import { motion } from 'motion/react'
import { useState } from 'react'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/useI18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function PhotoFrame() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`

  return (
    <motion.div
      className="relative mx-auto w-full max-w-sm"
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.55 }}
    >
      {/* Solid sky ring only — no multi-stop gradients (those can hue-shift through yellow/green). */}
      <div
        className="relative overflow-hidden rounded-2xl bg-surface"
        style={{
          border: '2px solid #38bdf8',
          boxShadow:
            '0 0 0 1px rgba(14,165,233,0.45), 0 18px 50px rgba(0,0,0,0.28), 0 0 24px rgba(56,189,248,0.22)',
        }}
      >
        <div className="aspect-[4/5] w-full overflow-hidden">
          {!failed ? (
            <motion.img
              src={profile.photoSrc}
              alt={t.about.photoAlt}
              className="h-full w-full object-cover"
              onError={() => setFailed(true)}
              animate={
                reduced
                  ? undefined
                  : {
                      // Lighter float on small screens — preserve presence without heavy motion
                      y: [0, -4, 0],
                      filter: [
                        'brightness(1)',
                        'brightness(1.03)',
                        'brightness(1)',
                      ],
                    }
              }
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-3"
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, rgba(56,189,248,0.14), transparent 45%), linear-gradient(160deg, var(--p-surface), var(--p-bg))',
              }}
            >
              <span className="font-display text-6xl font-extrabold tracking-tight text-text">
                {initials}
              </span>
              <span className="px-4 text-center font-mono text-[11px] text-muted">
                {t.about.photoHint}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
