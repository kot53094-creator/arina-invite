import { ScreenShell, ScreenTitle } from '../components/ScreenShell'
import { ChoiceCard, OptionGrid } from '../components/ChoiceCard'
import { activities } from '../data/options'
import { useInvitation } from '../context/InvitationContext'

export function ChoiceScreen() {
  const { selectActivity } = useInvitation()

  return (
    <ScreenShell>
      <ScreenTitle
        eyebrow="шаг 01"
        title="Чем займёмся?"
        subtitle="Выбери то, что хочется прямо сейчас"
      />
      <OptionGrid>
        {activities.map((a, i) => (
          <ChoiceCard
            key={a.id}
            emoji={a.emoji}
            title={a.label}
            hint={a.hint}
            delay={i * 0.06}
            onClick={() => selectActivity(a.id)}
          />
        ))}
      </OptionGrid>
    </ScreenShell>
  )
}
