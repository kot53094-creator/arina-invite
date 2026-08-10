import { AnimatePresence } from 'framer-motion'
import { InvitationProvider, useInvitation } from './context/InvitationContext'
import { AmbientBackground } from './components/AmbientBackground'
import { MusicToggle } from './components/MusicToggle'
import { BackButton } from './components/BackButton'
import { Hero } from './screens/Hero'
import { ChoiceScreen } from './screens/ChoiceScreen'
import { GameSelection } from './screens/GameSelection'
import { WalkSelection } from './screens/WalkSelection'
import { MovieSelection } from './screens/MovieSelection'
import { HangoutSelection } from './screens/HangoutSelection'
import { CustomSelection } from './screens/CustomSelection'
import { DateSelection } from './screens/DateSelection'
import { FinalScreen } from './screens/FinalScreen'
import { SuccessScreen } from './screens/SuccessScreen'
import { CaughtScreen } from './screens/CaughtScreen'

function Flow() {
  const { screen } = useInvitation()

  return (
    <AnimatePresence mode="wait">
      {screen === 'hero' && <Hero key="hero" />}
      {screen === 'activity' && <ChoiceScreen key="activity" />}
      {screen === 'games' && <GameSelection key="games" />}
      {screen === 'walk' && <WalkSelection key="walk" />}
      {screen === 'movie' && <MovieSelection key="movie" />}
      {screen === 'hangout' && <HangoutSelection key="hangout" />}
      {screen === 'custom' && <CustomSelection key="custom" />}
      {screen === 'date' && <DateSelection key="date" />}
      {screen === 'final' && <FinalScreen key="final" />}
      {screen === 'success' && <SuccessScreen key="success" />}
      {screen === 'caught' && <CaughtScreen key="caught" />}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <InvitationProvider>
      <AmbientBackground />
      <MusicToggle />
      <BackButton />
      <main className="relative z-10 min-h-[100svh] overflow-x-hidden">
        <Flow />
      </main>
    </InvitationProvider>
  )
}
