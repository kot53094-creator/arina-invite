import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { EscapeButton } from '../components/EscapeButton'
import { useInvitation } from '../context/InvitationContext'

function SummaryChip({ emoji, text }: { emoji: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-sm text-white/90 backdrop-blur-md"
    >
      <span className="mr-2">{emoji}</span>
      {text}
    </motion.div>
  )
}

export function FinalScreen() {
  const { choice, confirmYes, confirmNo } = useInvitation()

  return (
    <ScreenShell>
      <p className="mb-2 text-[11px] font-semibold tracking-[0.28em] text-white/70 uppercase">
        почти финал
      </p>
      <h2 className="font-display mb-6 text-center text-[clamp(1.6rem,4.5vw,2.3rem)] text-white">
        Кажется, мы определились
      </h2>

      <div className="mb-10 flex w-full max-w-md flex-col gap-2">
        {choice.activity ? <SummaryChip emoji="🎯" text={choice.activity} /> : null}
        {choice.game ? <SummaryChip emoji="🎮" text={choice.game} /> : null}
        {choice.mood ? <SummaryChip emoji="🌸" text={choice.mood} /> : null}
        {choice.movie ? <SummaryChip emoji="🍿" text={choice.movie} /> : null}
        {choice.hangout ? <SummaryChip emoji="☕" text={choice.hangout} /> : null}
        {choice.custom ? <SummaryChip emoji="✨" text={choice.custom} /> : null}
        {choice.date ? <SummaryChip emoji="📅" text={choice.date} /> : null}
      </div>

      <h3 className="font-display mb-8 text-center text-[clamp(1.35rem,4vw,1.9rem)] text-peach">
        Ну что, Арина?
      </h3>

      <div className="relative flex min-h-[140px] w-full max-w-md flex-col items-center justify-center gap-5 sm:flex-row">
        <motion.button
          type="button"
          onClick={confirmYes}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full bg-gradient-to-r from-rose to-lilac px-10 py-4 text-base font-semibold text-white shadow-[0_14px_40px_rgba(232,160,191,0.4)]"
        >
          ДА
        </motion.button>
        <EscapeButton onCaught={confirmNo} />
      </div>
    </ScreenShell>
  )
}
