import { ScreenShell, ScreenTitle } from '../components/ScreenShell'
import { ChoiceCard, OptionGrid } from '../components/ChoiceCard'
import { hangoutOptions } from '../data/options'
import { useInvitation } from '../context/InvitationContext'

export function HangoutSelection() {
  const { selectHangout } = useInvitation()

  return (
    <ScreenShell>
      <ScreenTitle
        eyebrow="куда-нибудь"
        title="Куда отправимся? ☕"
        subtitle="Выбери место — или оставь сюрприз"
      />
      <OptionGrid>
        {hangoutOptions.map((m, i) => (
          <ChoiceCard
            key={m.label}
            emoji={m.emoji}
            title={m.label}
            delay={i * 0.06}
            onClick={() => selectHangout(m.label)}
          />
        ))}
      </OptionGrid>
    </ScreenShell>
  )
}
