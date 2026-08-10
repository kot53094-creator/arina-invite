import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const variants = {
  initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(10px)',
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function ScreenShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.section
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`safe-pad relative mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col items-center justify-center px-5 py-10 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function ScreenTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-10 max-w-xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-white/70 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[clamp(1.7rem,5vw,2.6rem)] leading-tight text-white drop-shadow-sm">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 font-body text-base text-white/75">{subtitle}</p>
      ) : null}
    </div>
  )
}
