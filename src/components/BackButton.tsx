import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInvitation } from '../context/InvitationContext'

export function BackButton() {
  const { canGoBack, goBack } = useInvitation()
  if (!canGoBack) return null

  return (
    <motion.button
      type="button"
      onClick={goBack}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-5 left-5 z-40 flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(28,24,72,0.3)] backdrop-blur-md"
      style={{ top: 'max(1.25rem, env(safe-area-inset-top))' }}
    >
      <ArrowLeft size={16} />
      Назад
    </motion.button>
  )
}
