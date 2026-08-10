import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
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
  const [toast, setToast] = useState<{ text: string; x: number; y: number } | null>(null)
  const [ready, setReady] = useState(false)
  const toastTimer = useRef<number | null>(null)
  const cooldownUntil = useRef(0)
  const attemptsRef = useRef(0)

  useEffect(() => {
    setReady(true)
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  const showToast = (text: string, x: number, y: number) => {
    setToast({ text, x, y })
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1400)
  }

  const pickPosition = useCallback(() => {
    const btn = btnRef.current
    const bw = btn?.offsetWidth ?? 120
    const bh = btn?.offsetHeight ?? 52
    const margin = 16
    const maxX = Math.max(margin, window.innerWidth - bw - margin)
    const maxY = Math.max(margin, window.innerHeight - bh - margin)

    let left = margin + Math.random() * Math.max(1, maxX - margin)
    let top = margin + Math.random() * Math.max(1, maxY - margin)
    left = Math.max(margin, Math.min(maxX, left))
    top = Math.max(margin, Math.min(maxY, top))

    // Avoid the middle text band
    const centerY = window.innerHeight / 2
    if (Math.abs(top + bh / 2 - centerY) < 100) {
      top = top < centerY ? Math.max(margin, centerY - 150) : Math.min(maxY, centerY + 110)
    }

    // Prefer staying away from current position so the jump is obvious
    const cur = btn?.getBoundingClientRect()
    if (cur) {
      const tooClose =
        Math.abs(left - cur.left) < 80 && Math.abs(top - cur.top) < 50
      if (tooClose) {
        left = left < window.innerWidth / 2 ? Math.min(maxX, left + 120) : Math.max(margin, left - 120)
        top = top < window.innerHeight / 2 ? Math.min(maxY, top + 90) : Math.max(margin, top - 90)
      }
    }

    return { left, top, bw, bh }
  }, [])

  const escape = useCallback(() => {
    if (disabled) return false
    if (attemptsRef.current >= MAX_ESCAPES) return false
    if (Date.now() < cooldownUntil.current) return true

    const { left, top, bw } = pickPosition()
    const next = attemptsRef.current + 1
    attemptsRef.current = next
    setEscaping(true)
    setPos({ left, top })
    cooldownUntil.current = Date.now() + 280

    const msg = escapeMessages[Math.min(next - 1, escapeMessages.length - 1)]
    showToast(msg, left + bw / 2, top)
    return true
  }, [disabled, pickPosition])

  const onPointerEnter = (e: PointerEvent<HTMLButtonElement>) => {
    // Desktop hover chase
    if (e.pointerType === 'mouse' && attemptsRef.current < MAX_ESCAPES) {
      e.preventDefault()
      escape()
    }
  }

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (attemptsRef.current >= MAX_ESCAPES) return
    e.preventDefault()
    e.stopPropagation()
    escape()
  }

  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (attemptsRef.current < MAX_ESCAPES) {
      escape()
      return
    }
    onCaught()
  }

  const button = (
    <motion.button
      ref={btnRef}
      type="button"
      onPointerEnter={onPointerEnter}
      onPointerDown={onPointerDown}
      onClick={onClick}
      initial={false}
      animate={
        escaping && pos
          ? { left: pos.left, top: pos.top, opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      style={
        escaping && pos
          ? {
              position: 'fixed',
              left: pos.left,
              top: pos.top,
              zIndex: 80,
              margin: 0,
            }
          : undefined
      }
      className="rounded-full border-2 border-rose/50 bg-white/55 px-8 py-4 font-semibold text-[#a5658a] shadow-[0_10px_30px_rgba(40,20,60,0.2)] backdrop-blur-md touch-none select-none"
    >
      НЕТ
    </motion.button>
  )

  const toastNode =
    toast && ready ? (
      <motion.div
        key={toast.text + String(toast.x)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed z-[90] max-w-[220px] rounded-2xl bg-white px-3 py-2 text-center text-sm text-[#8a3d66] shadow-lg"
        style={{
          left: Math.max(10, Math.min(window.innerWidth - 230, toast.x - 110)),
          top: Math.max(10, toast.y - 52),
        }}
      >
        {toast.text}
      </motion.div>
    ) : null

  return (
    <>
      {/* Placeholder keeps layout while the real button is portaled */}
      {escaping ? <span className="invisible inline-block px-8 py-4" aria-hidden>НЕТ</span> : null}
      {escaping && ready ? createPortal(button, document.body) : button}
      {ready ? createPortal(<AnimatePresence>{toastNode}</AnimatePresence>, document.body) : null}
    </>
  )
}
