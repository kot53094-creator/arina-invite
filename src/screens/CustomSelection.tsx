import { ScreenShell, ScreenTitle } from '../components/ScreenShell'
import { ChoiceCard, OptionGrid } from '../components/ChoiceCard'
import { customOptions } from '../data/options'
import { useInvitation } from '../context/InvitationContext'

export function CustomSelection() {
  const { selectCustom } = useInvitation()

  return (
    <ScreenShell>
      <ScreenTitle
        eyebrow="своё"
        title="Тогда без жёсткого плана"
        subtitle="Как хочешь провести это время?"
      />
      <OptionGrid>
        {customOptions.map((m, i) => (
          <ChoiceCard
            key={m.label}
            emoji={m.emoji}
            title={m.label}
            delay={i * 0.06}
            onClick={() => selectCustom(m.label)}
          />
        ))}
      </OptionGrid>
    </ScreenShell>
  )
}
