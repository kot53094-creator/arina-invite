import { ScreenShell, ScreenTitle } from '../components/ScreenShell'
import { ChoiceCard, OptionGrid } from '../components/ChoiceCard'
import { walkMoods } from '../data/options'
import { useInvitation } from '../context/InvitationContext'

export function WalkSelection() {
  const { selectMood } = useInvitation()

  return (
    <ScreenShell>
      <ScreenTitle
        eyebrow="прогулка"
        title="Тогда выбирай настроение 🌸"
        subtitle="Какой вайб тебе ближе?"
      />
      <OptionGrid>
        {walkMoods.map((m, i) => (
          <ChoiceCard
            key={m.label}
            emoji={m.emoji}
            title={m.label}
            delay={i * 0.06}
            onClick={() => selectMood(m.label)}
          />
        ))}
      </OptionGrid>
    </ScreenShell>
  )
}
