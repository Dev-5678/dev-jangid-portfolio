import React, { useRef, useEffect, useState } from 'react'
import { personalInfo } from '../../data/portfolio'
import { MapPin } from 'lucide-react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  orbitRadius: number
  angle: number
  speed: number
}

interface CrystalizedBallProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

export const CrystalizedBall: React.FC<CrystalizedBallProps> = ({
  className = '',
  primaryColor = '#E056FD', // Radiant Electric Magenta/Violet as in React Bits reference
  secondaryColor = '#CCFF00' // Electric Lime
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0, isHovered: false })
  const [size, setSize] = useState(380)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth
        // Keep it responsive between 300px and 420px
        setSize(Math.min(420, Math.max(300, w)))
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size
    const center = size / 2
    const ballRadius = center - 24

    // Initialize glowing stardust inside the sphere
    const particleCount = 140
    const particles: Particle[] = []
    const palette = [primaryColor, secondaryColor, '#FFFFFF', '#FF5500']

    for (let i = 0; i < particleCount; i++) {
      const r = Math.random() * (ballRadius - 10)
      const angle = Math.random() * Math.PI * 2
      particles.push({
        x: center + Math.cos(angle) * r,
        y: center + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
        radius: Math.random() * 1.8 + 0.6,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.7 + 0.3,
        orbitRadius: r,
        angle,
        speed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
      })
    }

    let animId: number
    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, size, size)
      time += 0.05

      // 1. Draw Crackling Electric Rim (Outer Arc Discharges)
      const segments = 48
      ctx.save()
      ctx.shadowColor = primaryColor
      ctx.shadowBlur = 14
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 2.5
      ctx.beginPath()

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2
        // Electric jitter noise
        const jitter = (Math.sin(time * 8 + i * 5) * 2.2 + Math.cos(time * 5 + i * 3) * 1.5)
        const currentR = ballRadius + jitter
        const px = center + Math.cos(theta) * currentR
        const py = center + Math.sin(theta) * currentR

        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()

      // Inner electric secondary glow ring
      ctx.strokeStyle = secondaryColor
      ctx.lineWidth = 1.2
      ctx.shadowColor = secondaryColor
      ctx.shadowBlur = 8
      ctx.beginPath()
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2
        const jitter = (Math.cos(time * 6 + i * 4) * 1.8)
        const currentR = ballRadius - 4 + jitter
        const px = center + Math.cos(theta) * currentR
        const py = center + Math.sin(theta) * currentR

        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()

      // 2. Swirling Stardust Particles Inside Ball
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Orbit update
        p.angle += p.speed * (mousePos.current.isHovered ? 2.5 : 1)

        // Mouse attraction when hovered
        if (mousePos.current.isHovered) {
          const dx = mousePos.current.x - p.x
          const dy = mousePos.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 0 && dist < 140) {
            p.x += (dx / dist) * 1.2
            p.y += (dy / dist) * 1.2
          }
        }

        // Standard orbital position
        const targetX = center + Math.cos(p.angle) * p.orbitRadius
        const targetY = center + Math.sin(p.angle) * p.orbitRadius
        p.x += (targetX - p.x) * 0.05
        p.y += (targetY - p.y) * 0.05

        // Keep inside ball boundary
        const distFromCenter = Math.sqrt((p.x - center) ** 2 + (p.y - center) ** 2)
        if (distFromCenter > ballRadius - 6) {
          const angle = Math.atan2(p.y - center, p.x - center)
          p.x = center + Math.cos(angle) * (ballRadius - 8)
          p.y = center + Math.sin(angle) * (ballRadius - 8)
        }

        ctx.save()
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * 2 + i))
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animId)
  }, [size, primaryColor, secondaryColor])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true
    }
  }

  const handleMouseLeave = () => {
    mousePos.current.isHovered = false
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* HTML5 Canvas rendering electric crackling rim & swirling stardust */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Spherical Glass Backdrop with Neo-Brutalist Depth & Radial Glow */}
      <div
        className="absolute rounded-full border-2 border-[#CCFF00]/40 shadow-[0_0_50px_rgba(204,255,0,0.18)] backdrop-blur-xl transition-all duration-300"
        style={{
          width: size - 44,
          height: size - 44,
          background: 'radial-gradient(circle at 35% 30%, rgba(204, 255, 0, 0.12) 0%, rgba(10, 13, 18, 0.94) 75%)'
        }}
      />

      {/* Central Identity Information (Dev Jangid Details Inside the Ball) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center p-4 max-w-[270px]">
        {/* Monogram Badge */}
        <div className="w-14 h-14 rounded-full bg-[#CCFF00] text-[#111317] font-black text-2xl flex items-center justify-center border-2 border-[#111317] shadow-[2px_2px_0px_#111317] mb-2 animate-pulse">
          {personalInfo.monogram}
        </div>

        {/* Name */}
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F4F7FB] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {personalInfo.name}
        </h2>

        {/* Title */}
        <span className="font-mono text-[11px] sm:text-xs font-bold text-[#CCFF00] uppercase tracking-wider mt-1 px-2 py-0.5 bg-[#111317]/80 border border-[#CCFF00]/60 rounded-sm">
          {personalInfo.title}
        </span>

        {/* Key Additional Details inside the ball */}
        <div className="mt-3 flex flex-col gap-1 font-mono text-[10px] text-gray-200">
          <div className="flex items-center justify-center gap-1.5 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span>Airports Authority of India (IT)</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
            <span>India Space Lab • CanSat</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-gray-400">
            <MapPin className="w-3 h-3 text-[#FF5500]" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#141820] text-[#CCFF00] font-mono text-[9px] font-bold border border-[#CCFF00]/50 rounded-full shadow-[0_0_10px_rgba(204,255,0,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-ping" />
          <span>SYS://ACTIVE • 2026</span>
        </div>
      </div>
    </div>
  )
}
