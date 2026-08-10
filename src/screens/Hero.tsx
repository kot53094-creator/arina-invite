import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { useInvitation } from '../context/InvitationContext'

export function Hero() {
  const { start } = useInvitation()

  return (
    <ScreenShell>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="relative mb-8 flex h-28 w-40 items-center justify-center"
      >
        <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-rose/80 to-lilac/80 shadow-[0_20px_50px_rgba(180,100,180,0.35)]" />
        <div className="absolute -top-1 left-0 h-14 w-full origin-top rounded-t-[1.4rem] bg-gradient-to-br from-peach to-dusk/80 [clip-path:polygon(0_0,100%_0,50_70%)]" />
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="relative text-3xl"
        >
          ✨
        </motion.span>
      </motion.div>

      <p className="mb-3 text-[11px] font-semibold tracking-[0.32em] text-white/70 uppercase">
        специально для тебя
      </p>
      <h1 className="font-display max-w-xl text-center text-[clamp(2.2rem,7vw,3.8rem)] leading-[1.05] text-white">
        Арина
      </h1>
      <p className="mt-3 max-w-md text-center font-display text-[clamp(1.15rem,3.4vw,1.55rem)] text-peach/95">
        у меня к тебе предложение
      </p>
      <p className="mt-4 max-w-sm text-center text-sm text-white/70">
        Небольшой интерактивный маршрут — только для тебя.
      </p>

      <motion.button
        type="button"
        onClick={start}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 rounded-full bg-gradient-to-r from-rose via-lilac to-teal-glow px-8 py-4 text-sm font-semibold text-night shadow-[0_14px_40px_rgba(126,232,224,0.25)]"
      >
        Узнать что такое →
      </motion.button>
    </ScreenShell>
  )
}
