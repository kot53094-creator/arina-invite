import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

/** Cheerful upbeat loop — starts automatically (unlocks on first tap if browser blocks autoplay) */
export function MusicToggle() {
  const [on, setOn] = useState(true)
  const [blocked, setBlocked] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<AudioNode[]>([])
  const timersRef = useRef<number[]>([])
  const wantedOn = useRef(true)

  const stop = useCallback(() => {
    timersRef.current.forEach((id) => window.clearInterval(id))
    timersRef.current = []
    nodesRef.current.forEach((n) => {
      try {
        if ('stop' in n && typeof (n as OscillatorNode).stop === 'function') {
          ;(n as OscillatorNode).stop()
        }
      } catch {
        /* already stopped */
      }
    })
    nodesRef.current = []
    void ctxRef.current?.close()
    ctxRef.current = null
  }, [])

  const start = useCallback(async () => {
    stop()
    const ctx = new AudioContext()
    ctxRef.current = ctx

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch {
        /* browser may still block */
      }
    }

    const master = ctx.createGain()
    master.gain.value = 0.08
    master.connect(ctx.destination)

    const playKick = (time: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(150, time)
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.12)
      gain.gain.setValueAtTime(0.55, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14)
      osc.connect(gain)
      gain.connect(master)
      osc.start(time)
      osc.stop(time + 0.15)
    }

    const melody = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 392.0]
    const bass = [130.81, 146.83, 164.81, 196.0]

    let step = 0
    const bpm = 132
    const stepDur = 60 / bpm / 2

    const tick = () => {
      if (!ctxRef.current) return
      const now = ctxRef.current.currentTime + 0.02

      if (step % 2 === 0) playKick(now)

      {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()
        osc.type = 'square'
        osc.frequency.value = melody[step % melody.length]
        filter.type = 'lowpass'
        filter.frequency.value = 2400
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stepDur * 0.9)
        osc.connect(filter)
        filter.connect(gain)
        gain.connect(master)
        osc.start(now)
        osc.stop(now + stepDur)
      }

      if (step % 4 === 0) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.value = bass[(step / 4) % bass.length]
        gain.gain.setValueAtTime(0.22, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stepDur * 3.2)
        osc.connect(gain)
        gain.connect(master)
        osc.start(now)
        osc.stop(now + stepDur * 3.5)
      }

      if (step % 3 === 0) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = 1046.5 + (step % 2) * 131
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
        osc.connect(gain)
        gain.connect(master)
        osc.start(now)
        osc.stop(now + 0.13)
      }

      step += 1
    }

    tick()
    const id = window.setInterval(tick, stepDur * 1000)
    timersRef.current.push(id)
    nodesRef.current.push(master)

    const playing = ctx.state === 'running'
    setOn(playing)
    setBlocked(!playing)
    return playing
  }, [stop])

  useEffect(() => {
    wantedOn.current = true
    void start()

    const unlock = () => {
      if (!wantedOn.current) return
      const ctx = ctxRef.current
      if (ctx && ctx.state === 'suspended') {
        void ctx.resume().then(() => {
          setOn(true)
          setBlocked(false)
        })
      } else if (!ctxRef.current) {
        void start()
      }
    }

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'touchstart', 'keydown', 'click']
    events.forEach((ev) => window.addEventListener(ev, unlock, { passive: true }))

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, unlock))
      stop()
    }
  }, [start, stop])

  const toggle = async () => {
    if (on || (ctxRef.current && ctxRef.current.state === 'running')) {
      wantedOn.current = false
      stop()
      setOn(false)
      setBlocked(false)
      return
    }
    wantedOn.current = true
    await start()
  }

  return (
    <motion.button
      type="button"
      onClick={() => void toggle()}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-[0_8px_30px_rgba(28,24,72,0.35)] backdrop-blur-md"
      aria-label={on ? 'Выключить музыку' : 'Включить музыку'}
      title={blocked ? 'Нажми куда угодно — музыка включится' : undefined}
    >
      {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </motion.button>
  )
}
