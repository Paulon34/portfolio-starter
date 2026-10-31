import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function GeometricBg() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.10),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.09),transparent_45%),radial-gradient(ellipse_at_center,rgba(14,165,233,0.05),transparent_55%)]" />
      <div className="absolute inset-0 grid-diag opacity-45" />
      <div className="absolute inset-0 dot-field opacity-35" />

      {!reduced ? (
        <>
          <motion.div
            className="geo-orb absolute -left-20 top-24 hidden h-64 w-64 rounded-full bg-cyan/10 blur-3xl sm:block"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="geo-orb absolute -right-16 top-40 h-48 w-48 rounded-full bg-blue/12 blur-3xl sm:h-72 sm:w-72 sm:bg-blue/15"
            animate={{ x: [0, -24, 0], y: [0, 28, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="geo-orb absolute bottom-24 left-1/3 hidden h-56 w-56 rounded-full bg-sky/10 blur-3xl md:block"
            animate={{ x: [0, 18, 0], y: [0, -16, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <svg
            className="absolute right-[6%] top-[16%] h-28 w-28 text-border opacity-80 sm:right-[8%] sm:top-[18%] sm:h-40 sm:w-40 sm:opacity-100"
            viewBox="0 0 160 160"
            fill="none"
          >
            <motion.path
              d="M10 120 L80 20 L150 120"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M30 100 L80 40 L130 100"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeOpacity="0.45"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.circle
              cx="80"
              cy="70"
              r="4"
              fill="#3B82F6"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            />
            <motion.circle
              cx="118"
              cy="88"
              r="2.5"
              fill="#22D3EE"
              animate={{ opacity: [0.25, 0.9, 0.25] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: 0.4 }}
            />
          </svg>
        </>
      ) : null}
    </div>
  )
}
