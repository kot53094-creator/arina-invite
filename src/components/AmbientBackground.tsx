import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  hue: string
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let t = 0
    const particles: Particle[] = []

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.25 - 0.05,
      a: Math.random() * 0.45 + 0.15,
      hue: Math.random() > 0.5 ? '232,176,255' : '255,196,170',
    })

    resize()
    for (let i = 0; i < 48; i++) particles.push(spawn())

    const draw = () => {
      t += 0.0025
      const g = ctx.createLinearGradient(0, 0, w, h)
      const shift = Math.sin(t) * 0.5 + 0.5
      g.addColorStop(0, `rgb(${28 + shift * 20}, ${24 + shift * 10}, ${72 + shift * 30})`)
      g.addColorStop(0.35, `rgb(${74 + shift * 30}, ${63 + shift * 20}, ${140 - shift * 20})`)
      g.addColorStop(0.65, `rgb(${180 - shift * 20}, ${120 + shift * 30}, ${170 + shift * 20})`)
      g.addColorStop(1, `rgb(${245 - shift * 20}, ${196 + shift * 10}, ${160 + shift * 20})`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // soft aurora blobs
      const blob = (x: number, y: number, r: number, color: string) => {
        const rad = ctx.createRadialGradient(x, y, 0, x, y, r)
        rad.addColorStop(0, color)
        rad.addColorStop(1, 'transparent')
        ctx.fillStyle = rad
        ctx.fillRect(x - r, y - r, r * 2, r * 2)
      }
      blob(w * (0.2 + Math.sin(t) * 0.05), h * 0.25, w * 0.45, 'rgba(126,232,224,0.12)')
      blob(w * (0.75 + Math.cos(t * 0.8) * 0.04), h * 0.55, w * 0.4, 'rgba(255,232,163,0.1)')
      blob(w * 0.5, h * (0.8 + Math.sin(t * 0.6) * 0.03), w * 0.5, 'rgba(232,160,191,0.14)')

      for (const p of particles) {
        p.x += p.vx + Math.sin(t * 2 + p.y) * 0.05
        p.y += p.vy
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.hue},${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
