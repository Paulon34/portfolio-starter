import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
  href?: string
  external?: boolean
  /** Force download attribute (useful for resume PDF). */
  download?: boolean | string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-bg border border-accent shadow-[0_0_24px_var(--p-glow)] hover:brightness-110 hover:shadow-[0_0_32px_var(--p-glow)]',
  secondary:
    'bg-transparent text-text border border-sky/35 hover:border-cyan hover:text-cyan hover:bg-sky/5',
  ghost:
    'bg-surface/70 text-muted border border-border hover:text-text hover:border-accent/45 hover:bg-bg/80',
}

export function Button({
  children,
  variant = 'primary',
  className,
  href,
  external,
  download,
  type = 'button',
  onClick,
}: Props) {
  const reduced = useReducedMotion()
  const classes = cn(
    'inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold tracking-wide transition-[filter,color,border-color,background-color,box-shadow,transform] duration-200',
    variants[variant],
    className,
  )

  const motionProps = reduced
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.98 },
      }

  if (href) {
    const isHash = href.startsWith('#')
    const openExternal = Boolean(external) && !isHash

    return (
      <motion.a
        href={href}
        className={classes}
        target={openExternal ? '_blank' : undefined}
        rel={openExternal ? 'noopener noreferrer' : undefined}
        download={download === true ? true : download || undefined}
        onClick={(event) => {
          // Keep hash navigation in-page; never let asset links inherit section hashes.
          if (openExternal) {
            event.stopPropagation()
          }
          onClick?.()
        }}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} className={classes} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}
