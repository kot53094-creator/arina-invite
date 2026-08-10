import { ScreenShell, ScreenTitle } from '../components/ScreenShell'
import { ChoiceCard, OptionGrid } from '../components/ChoiceCard'
import { dateOptions } from '../data/options'
import { useInvitation } from '../context/InvitationContext'

export function DateSelection() {
  const { choice, selectDate } = useInvitation()

  return (
    <ScreenShell>
      <ScreenTitle
        eyebrow="когда"
        title="Отличный выбор"
        subtitle={
          choice.game
            ? `${choice.game} — когда будем играть?`
            : 'Когда встретимся?'
        }
      />
      <OptionGrid>
        {dateOptions.map((d, i) => (
          <ChoiceCard
            key={d.label}
            emoji={d.emoji}
            title={d.label}
            delay={i * 0.06}
            onClick={() => selectDate(d.label)}
          />
        ))}
      </OptionGrid>
    </ScreenShell>
  )
}
