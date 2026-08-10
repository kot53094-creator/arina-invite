import { ScreenShell, ScreenTitle } from '../components/ScreenShell'
import { ChoiceCard, OptionGrid } from '../components/ChoiceCard'
import { movieOptions } from '../data/options'
import { useInvitation } from '../context/InvitationContext'

export function MovieSelection() {
  const { selectMovie } = useInvitation()

  return (
    <ScreenShell>
      <ScreenTitle
        eyebrow="кино"
        title="Тогда выбирай 🍿"
        subtitle="Что включаем?"
      />
      <OptionGrid>
        {movieOptions.map((m, i) => (
          <ChoiceCard
            key={m.label}
            emoji={m.emoji}
            title={m.label}
            delay={i * 0.06}
            onClick={() => selectMovie(m.label)}
          />
        ))}
      </OptionGrid>
    </ScreenShell>
  )
}
