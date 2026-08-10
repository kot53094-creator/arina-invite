import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { useInvitation } from '../context/InvitationContext'

export function CaughtScreen() {
  const { rethinkYes } = useInvitation()

  return (
    <ScreenShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[2rem] border border-white/20 bg-white/12 px-8 py-12 text-center backdrop-blur-xl"
      >
        <div className="mb-3 text-4xl">😭</div>
        <h2 className="font-display text-2xl text-white">Хорошо 😭 Я понял...</h2>
        <p className="mt-3 text-sm text-white/70">Но кнопку всё-таки удалось поймать.</p>
        <motion.button
          type="button"
          onClick={rethinkYes}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 rounded-full bg-gradient-to-r from-rose to-lilac px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(232,160,191,0.35)]"
        >
          Передумала?
        </motion.button>
      </motion.div>
    </ScreenShell>
  )
}
