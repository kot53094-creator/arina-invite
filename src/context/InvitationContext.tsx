import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ActivityId, InvitationChoice, ScreenId } from '../types'
import { activities } from '../data/options'
import { submitChoice } from '../api/telegram'

type InvitationContextValue = {
  screen: ScreenId
  choice: InvitationChoice
  canGoBack: boolean
  goTo: (screen: ScreenId) => void
  goBack: () => void
  start: () => void
  selectActivity: (id: ActivityId) => void
  selectGame: (game: string) => void
  selectMood: (mood: string) => void
  selectMovie: (movie: string) => void
  selectHangout: (hangout: string) => void
  selectCustom: (custom: string) => void
  selectDate: (date: string) => void
  confirmYes: () => void
  confirmNo: () => void
  rethinkYes: () => void
  restart: () => void
}

const InvitationContext = createContext<InvitationContextValue | null>(null)

const initialChoice: InvitationChoice = { name: 'Арина' }

function nextDetailScreen(id: ActivityId): ScreenId {
  switch (id) {
    case 'play':
      return 'games'
    case 'walk':
      return 'walk'
    case 'movie':
      return 'movie'
    case 'hangout':
      return 'hangout'
    case 'custom':
      return 'custom'
  }
}

function clearDetail(choice: InvitationChoice): InvitationChoice {
  return {
    name: choice.name,
    activity: choice.activity,
  }
}

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>('hero')
  const [choice, setChoice] = useState<InvitationChoice>(initialChoice)
  const [history, setHistory] = useState<ScreenId[]>([])

  const push = useCallback((next: ScreenId) => {
    setHistory((h) => [...h, screen])
    setScreen(next)
  }, [screen])

  const goTo = useCallback((next: ScreenId) => {
    setHistory((h) => [...h, screen])
    setScreen(next)
  }, [screen])

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setScreen(prev)
      if (prev === 'activity') {
        setChoice({ name: 'Арина' })
      } else if (prev === 'games' || prev === 'walk' || prev === 'movie' || prev === 'hangout' || prev === 'custom') {
        setChoice((c) => clearDetail(c))
      } else if (prev === 'date') {
        setChoice((c) => {
          const next = { ...c }
          delete next.date
          delete next.finalChoice
          return next
        })
      } else if (prev === 'final') {
        setChoice((c) => {
          const next = { ...c }
          delete next.finalChoice
          return next
        })
      }
      return h.slice(0, -1)
    })
  }, [])

  const start = useCallback(() => {
    void submitChoice({ name: 'Арина' }, 'start')
    push('activity')
  }, [push])

  const selectActivity = useCallback(
    (id: ActivityId) => {
      const meta = activities.find((a) => a.id === id)
      if (!meta) return
      const next = { name: 'Арина', activity: meta.label }
      setChoice(next)
      void submitChoice(next, 'activity')
      push(nextDetailScreen(id))
    },
    [push],
  )

  const selectGame = useCallback(
    (game: string) => {
      setChoice((prev) => {
        const next = { ...prev, game }
        void submitChoice(next, 'game')
        return next
      })
      push('date')
    },
    [push],
  )

  const selectMood = useCallback(
    (mood: string) => {
      setChoice((prev) => {
        const next = { ...prev, mood }
        void submitChoice(next, 'mood')
        return next
      })
      push('date')
    },
    [push],
  )

  const selectMovie = useCallback(
    (movie: string) => {
      setChoice((prev) => {
        const next = { ...prev, movie }
        void submitChoice(next, 'movie')
        return next
      })
      push('date')
    },
    [push],
  )

  const selectHangout = useCallback(
    (hangout: string) => {
      setChoice((prev) => {
        const next = { ...prev, hangout }
        void submitChoice(next, 'hangout')
        return next
      })
      push('date')
    },
    [push],
  )

  const selectCustom = useCallback(
    (custom: string) => {
      setChoice((prev) => {
        const next = { ...prev, custom }
        void submitChoice(next, 'custom')
        return next
      })
      push('date')
    },
    [push],
  )

  const selectDate = useCallback(
    (date: string) => {
      setChoice((prev) => {
        const next = { ...prev, date }
        void submitChoice(next, 'date')
        return next
      })
      push('final')
    },
    [push],
  )

  const confirmYes = useCallback(() => {
    setChoice((prev) => {
      const next = { ...prev, finalChoice: 'yes' as const }
      void submitChoice(next, 'yes')
      return next
    })
    push('success')
  }, [push])

  const confirmNo = useCallback(() => {
    setChoice((prev) => {
      const next = { ...prev, finalChoice: 'no' as const }
      void submitChoice(next, 'no')
      return next
    })
    push('caught')
  }, [push])

  const rethinkYes = useCallback(() => {
    setChoice((prev) => {
      const next = { ...prev, finalChoice: 'yes' as const }
      void submitChoice(next, 'yes')
      return next
    })
    push('success')
  }, [push])

  const restart = useCallback(() => {
    setChoice(initialChoice)
    setHistory([])
    setScreen('hero')
  }, [])

  const value = useMemo(
    () => ({
      screen,
      choice,
      canGoBack:
        history.length > 0 &&
        screen !== 'hero' &&
        screen !== 'success' &&
        screen !== 'caught',
      goTo,
      goBack,
      start,
      selectActivity,
      selectGame,
      selectMood,
      selectMovie,
      selectHangout,
      selectCustom,
      selectDate,
      confirmYes,
      confirmNo,
      rethinkYes,
      restart,
    }),
    [
      screen,
      choice,
      history.length,
      goTo,
      goBack,
      start,
      selectActivity,
      selectGame,
      selectMood,
      selectMovie,
      selectHangout,
      selectCustom,
      selectDate,
      confirmYes,
      confirmNo,
      rethinkYes,
      restart,
    ],
  )

  return <InvitationContext.Provider value={value}>{children}</InvitationContext.Provider>
}

export function useInvitation() {
  const ctx = useContext(InvitationContext)
  if (!ctx) throw new Error('useInvitation must be used within InvitationProvider')
  return ctx
}
