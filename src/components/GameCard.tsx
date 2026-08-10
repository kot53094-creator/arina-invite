import { motion } from 'framer-motion'

type Game = {
  name: string
  desc: string
  cover: string
  accent: string
}

export function GameCard({
  game,
  onSelect,
  delay = 0,
}: {
  game: Game
  onSelect: () => void
  delay?: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative w-[min(100%,240px)] shrink-0 overflow-hidden rounded-[1.6rem] border border-white/20 bg-white/10 shadow-[0_16px_40px_rgba(20,16,50,0.35)] backdrop-blur-md"
      style={{ boxShadow: undefined }}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={game.cover}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0 opacity-55 transition-opacity duration-400 group-hover:opacity-35"
          style={{
            background: `linear-gradient(160deg, ${game.accent}cc, rgba(28,24,72,0.75))`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 40px ${game.accent}88` }}
        />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-display text-lg text-white">{game.name}</h3>
        <p className="min-h-[2.5rem] text-sm leading-snug text-white/70">{game.desc}</p>
        <motion.button
          type="button"
          onClick={onSelect}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/15 px-3 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-white/25"
          style={{
            boxShadow: `0 0 0 0 ${game.accent}`,
          }}
        >
          Выбрать
        </motion.button>
      </div>
    </motion.article>
  )
}
