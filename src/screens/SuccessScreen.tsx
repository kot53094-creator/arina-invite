import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { CelebrationFx } from '../components/Effects'
import { useInvitation } from '../context/InvitationContext'

export function SuccessScreen() {
  const { restart } = useInvitation()

  return (
    <>
      <CelebrationFx active />
      <ScreenShell>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14 }}
          className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/25 bg-white/12 px-8 py-12 text-center shadow-[0_30px_80px_rgba(28,24,72,0.45)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,232,163,0.28),transparent_55%)]" />
          <div className="relative">
            <div className="mb-4 text-5xl">🎉</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,2.6rem)] text-white">
              ТОГДА РЕШЕНО
            </h2>
            <p className="mt-4 text-lg text-white/85">Теперь осталось только выбрать день 😉</p>
            <p className="mt-2 text-sm text-white/60">Готово</p>
            <button
              type="button"
              onClick={restart}
              className="mt-8 text-sm text-white/55 underline-offset-4 hover:text-white/80 hover:underline"
            >
              пройти ещё раз
            </button>
          </div>
        </motion.div>
      </ScreenShell>
    </>
  )
}
