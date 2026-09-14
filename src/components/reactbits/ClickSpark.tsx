import React, { useRef, useEffect } from 'react'

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  decay: number
}

interface ClickSparkProps {
  sparkColor?: string[]
  sparkCount?: number
  sparkSize?: number
  duration?: number
  extraScale?: number
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = ['#CCFF00', '#00E5FF', '#FF5500', '#FFFFFF'],
  sparkCount = 12,
  sparkSize = 3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const animFrameRef = useRef<number | null>(null)

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

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5
        const speed = Math.random() * 3 + 2
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * sparkSize + 2,
          color: sparkColor[Math.floor(Math.random() * sparkColor.length)],
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02
        })
      }

      if (!animFrameRef.current) {
        loop()
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const sparks = sparksRef.current

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.08 // subtle gravity
        s.alpha -= s.decay

        if (s.alpha <= 0) {
          sparks.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, s.alpha)
        ctx.fillStyle = s.color
        ctx.shadowColor = s.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      if (sparks.length > 0) {
        animFrameRef.current = requestAnimationFrame(loop)
      } else {
        animFrameRef.current = null
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handleClick)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [sparkColor, sparkCount, sparkSize])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    />
  )
}
