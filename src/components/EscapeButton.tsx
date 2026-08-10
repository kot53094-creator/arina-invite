import { useCallback, useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { escapeMessages } from '../data/options'

const MAX_ESCAPES = 6

export function EscapeButton({
  onCaught,
  disabled,
}: {
  onCaught: () => void
  disabled?: boolean
}) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [escaping, setEscaping] = useState(false)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [toast, setToast] = useState<{ text: string; x: number; y: number } | null>(null)
  const toastTimer = useRef<number | null>(null)

  const showToast = (text: string, x: number, y: number) => {
    setToast({ text, x, y })
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1400)
  }

  const escape = useCallback(() => {
    if (disabled) return false
    if (attempts >= MAX_ESCAPES) return false

    const btn = btnRef.current
    const bw = btn?.offsetWidth ?? 120
    const bh = btn?.offsetHeight ?? 52
    const margin = 16
    const maxX = window.innerWidth - bw - margin
    const maxY = window.innerHeight - bh - margin

    let left = Math.random() * (maxX - margin) + margin
    let top = Math.random() * (maxY - margin) + margin
    left = Math.max(margin, Math.min(maxX, left))
    top = Math.max(margin, Math.min(maxY, top))

    // Keep away from vertical center band where main copy lives
    const centerY = window.innerHeight / 2
    if (Math.abs(top + bh / 2 - centerY) < 90) {
      top = top < centerY ? Math.max(margin, centerY - 140) : Math.min(maxY, centerY + 100)
    }

    setEscaping(true)
    setPos({ left, top })
    const next = attempts + 1
    setAttempts(next)
    const msg = escapeMessages[Math.min(next - 1, escapeMessages.length - 1)]
    showToast(msg, left + bw / 2, top)
    return true
  }, [attempts, disabled])

  const onInteract = (e: MouseEvent | TouchEvent) => {
    if (attempts >= MAX_ESCAPES) return
    e.preventDefault()
    e.stopPropagation()
    escape()
  }

  const onClick = (e: MouseEvent) => {
    if (attempts < MAX_ESCAPES) {
      e.preventDefault()
      escape()
      return
    }
    onCaught()
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  return (
    <>
      <motion.button
        ref={btnRef}
        type="button"
        onMouseEnter={onInteract}
        onTouchStart={onInteract}
        onClick={onClick}
        style={
          escaping && pos
            ? { position: 'fixed', left: pos.left, top: pos.top, zIndex: 50 }
            : undefined
        }
        animate={escaping && pos ? { left: pos.left, top: pos.top } : undefined}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="rounded-full border-2 border-rose/50 bg-white/55 px-8 py-4 font-semibold text-[#a5658a] shadow-[0_10px_30px_rgba(40,20,60,0.2)] backdrop-blur-md touch-none select-none"
      >
        НЕТ
      </motion.button>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.text + toast.x}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed z-[60] max-w-[220px] rounded-2xl bg-white px-3 py-2 text-center text-sm text-[#8a3d66] shadow-lg"
            style={{
              left: Math.max(10, Math.min(window.innerWidth - 230, toast.x - 110)),
              top: Math.max(10, toast.y - 52),
            }}
          >
            {toast.text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
