import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  rot: number
  rotSpeed: number
  color: string
}

export function CelebrationFx({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const raf = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.03
        p.life -= 0.005
        p.rot += p.rotSpeed
      })
      particles.current = particles.current.filter((p) => p.life > 0)
      for (const p of particles.current) {
        ctx.save()
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.55)
        ctx.restore()
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    const w = window.innerWidth
    const colors = ['#ff6fa5', '#b48dff', '#ffb3d1', '#7ee8e0', '#ffe8a3', '#ffffff']

    for (let i = 0; i < 120; i++) {
      particles.current.push({
        x: w / 2 + (Math.random() * 400 - 200),
        y: -20 - Math.random() * 180,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 + 2,
        life: 1,
        size: Math.random() * 8 + 5,
        rot: Math.random() * 360,
        rotSpeed: Math.random() * 8 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[80] h-full w-full"
      aria-hidden
    />
  )
}
