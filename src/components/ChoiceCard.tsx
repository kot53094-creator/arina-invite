import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function ChoiceCard({
  emoji,
  title,
  hint,
  onClick,
  delay = 0,
}: {
  emoji: string
  title: string
  hint?: string
  onClick: () => void
  delay?: number
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 18, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/25 bg-white/12 px-5 py-5 text-left shadow-[0_18px_50px_rgba(28,24,72,0.28)] backdrop-blur-xl transition-[box-shadow,background] hover:bg-white/18 hover:shadow-[0_22px_60px_rgba(126,232,224,0.18)]"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,232,163,0.35),transparent_70%)] opacity-60 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-start gap-4">
        <span className="text-3xl drop-shadow-sm">{emoji}</span>
        <span>
          <span className="block font-display text-lg text-white">{title}</span>
          {hint ? <span className="mt-1 block text-sm text-white/65">{hint}</span> : null}
        </span>
      </div>
    </motion.button>
  )
}

export function OptionGrid({ children }: { children: ReactNode }) {
  return <div className="grid w-full gap-3 sm:grid-cols-2">{children}</div>
}
