import { ScreenShell, ScreenTitle } from '../components/ScreenShell'
import { GameCard } from '../components/GameCard'
import { games } from '../data/options'
import { useInvitation } from '../context/InvitationContext'

export function GameSelection() {
  const { selectGame } = useInvitation()

  return (
    <ScreenShell className="!justify-start pt-16 sm:justify-center">
      <ScreenTitle
        eyebrow="игры"
        title="Тогда выбирай игру 🎮"
        subtitle="Листай в сторону — и жми «Выбрать»"
      />
      <div className="flex w-full gap-4 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-w-min gap-4 px-1">
          {games.map((g, i) => (
            <GameCard
              key={g.name}
              game={g}
              delay={i * 0.05}
              onSelect={() => selectGame(g.name)}
            />
          ))}
        </div>
      </div>
    </ScreenShell>
  )
}
