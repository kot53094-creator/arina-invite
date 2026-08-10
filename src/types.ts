export type FinalChoice = 'yes' | 'no'

export type InvitationChoice = {
  name: string
  activity?: string
  game?: string
  mood?: string
  movie?: string
  hangout?: string
  custom?: string
  date?: string
  finalChoice?: FinalChoice
}

export type ScreenId =
  | 'hero'
  | 'activity'
  | 'games'
  | 'walk'
  | 'movie'
  | 'hangout'
  | 'custom'
  | 'date'
  | 'final'
  | 'success'
  | 'caught'

export type ActivityId = 'play' | 'walk' | 'movie' | 'hangout' | 'custom'
