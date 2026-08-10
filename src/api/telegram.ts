import type { InvitationChoice } from '../types'

export type ChoiceEvent =
  | 'start'
  | 'activity'
  | 'game'
  | 'mood'
  | 'movie'
  | 'hangout'
  | 'custom'
  | 'date'
  | 'yes'
  | 'no'
  | 'final'

export async function submitChoice(
  choice: InvitationChoice,
  event: ChoiceEvent,
): Promise<void> {
  try {
    await fetch('/api/choice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...choice, event }),
    })
  } catch {
    // UX: never block the invitation flow on network/Telegram errors
  }
}
