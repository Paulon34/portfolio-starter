import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="mb-10 max-w-3xl"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-extrabold tracking-tight text-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </motion.div>
  )
}
