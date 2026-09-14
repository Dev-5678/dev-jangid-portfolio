import React, { useRef, useEffect, useState } from 'react'
import { personalInfo } from '../../data/portfolio'
import { MapPin } from 'lucide-react'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  alpha: number
  orbitRadius: number
  angle: number
  speed: number
  twinkleSpeed: number
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
  const [size, setSize] = useState(400)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth
        setSize(Math.min(420, Math.max(320, w)))
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const center = size / 2
    const ballRadius = center - 22

    // Initialize 280 dense glowing stardust particles inside the sphere
    const particleCount = 280
    const particles: Particle[] = []
    const palette = [primaryColor, secondaryColor, '#FFFFFF', '#38BDF8', '#F472B6']

    for (let i = 0; i < particleCount; i++) {
      // Gaussian distribution towards outer shell or core
      const r = Math.pow(Math.random(), 0.7) * (ballRadius - 8)
      const angle = Math.random() * Math.PI * 2
      particles.push({
        x: center + Math.cos(angle) * r,
        y: center + Math.sin(angle) * r,
        radius: Math.random() * 1.6 + 0.5,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.75 + 0.25,
        orbitRadius: r,
        angle,
        speed: (Math.random() * 0.015 + 0.003) * (Math.random() > 0.4 ? 1 : -1),
        twinkleSpeed: Math.random() * 3 + 1
      })
    }

    let animId: number
    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, size, size)
      time += 0.035

      const isDark = document.documentElement.classList.contains('dark')

      // 1. Electric Lightning Rim (High-density 240 segments + lightning sparks)
      const segments = 240
      ctx.save()

      // Outer Bloom Halo
      ctx.shadowColor = primaryColor
      ctx.shadowBlur = isDark ? 22 : 12
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 2.8
      ctx.beginPath()

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2
        // Layered multi-frequency electric noise
        const n1 = Math.sin(time * 7 + i * 0.4) * 2.2
        const n2 = Math.cos(time * 11 + i * 0.8) * 1.6
        const n3 = Math.sin(time * 23 + i * 2.2) * 1.0
        const jitter = n1 + n2 + n3
        const r = ballRadius + jitter
        const px = center + Math.cos(theta) * r
        const py = center + Math.sin(theta) * r

        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()

      // Inner Hot Lightning Core (White/Lime crackle)
      ctx.shadowColor = '#FFFFFF'
      ctx.shadowBlur = 8
      ctx.strokeStyle = isDark ? '#FFFFFF' : '#8B5CF6'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2
        const jitter = Math.sin(time * 14 + i * 0.9) * 1.2 + Math.cos(time * 9 + i * 1.5) * 1.0
        const r = ballRadius - 2 + jitter
        const px = center + Math.cos(theta) * r
        const py = center + Math.sin(theta) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()

      // Secondary Accent Lightning Arcs (electric lime sparks)
      ctx.shadowColor = secondaryColor
      ctx.shadowBlur = 10
      ctx.strokeStyle = secondaryColor
      ctx.lineWidth = 1.5
      ctx.beginPath()
      const arcSegments = 60
      for (let j = 0; j < 3; j++) {
        const startOffset = (time * 1.5 + j * (Math.PI * 2 / 3)) % (Math.PI * 2)
        for (let i = 0; i < arcSegments; i++) {
          const theta = startOffset + (i / segments) * Math.PI * 2
          const jitter = Math.sin(time * 18 + i * 1.2) * 2.8
          const r = ballRadius + jitter
          const px = center + Math.cos(theta) * r
          const py = center + Math.sin(theta) * r
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
      }
      ctx.stroke()
      ctx.restore()

      // 2. Swirling Stardust Cosmic Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Orbit update
        p.angle += p.speed * (mousePos.current.isHovered ? 2.2 : 1)

        // Mouse attraction when hovered
        if (mousePos.current.isHovered) {
          const dx = mousePos.current.x - p.x
          const dy = mousePos.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 0 && dist < 150) {
            const pull = (1 - dist / 150) * 1.5
            p.x += (dx / dist) * pull
            p.y += (dy / dist) * pull
          }
        }

        // Standard orbital recovery
        const targetX = center + Math.cos(p.angle) * p.orbitRadius
        const targetY = center + Math.sin(p.angle) * p.orbitRadius
        p.x += (targetX - p.x) * 0.04
        p.y += (targetY - p.y) * 0.04

        // Bound to inside sphere
        const distFromCenter = Math.sqrt((p.x - center) ** 2 + (p.y - center) ** 2)
        if (distFromCenter > ballRadius - 6) {
          const angle = Math.atan2(p.y - center, p.x - center)
          p.x = center + Math.cos(angle) * (ballRadius - 8)
          p.y = center + Math.sin(angle) * (ballRadius - 8)
        }

        const twinkle = 0.5 + 0.5 * Math.sin(time * p.twinkleSpeed + i)
        ctx.save()
        ctx.globalAlpha = p.alpha * twinkle
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
      {/* HTML5 Canvas with smooth electric lightning & stardust */}
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Spherical Crystal Orb Backdrop (Theme adaptive) */}
      <div
        className="absolute rounded-full border-2 border-[#E056FD]/60 shadow-[0_0_60px_rgba(224,86,253,0.3)] backdrop-blur-xl transition-all duration-300 dark:bg-[radial-gradient(circle_at_35%_30%,rgba(224,86,253,0.18)_0%,rgba(10,13,18,0.96)_75%)] bg-[radial-gradient(circle_at_35%_30%,rgba(240,240,255,0.98)_0%,rgba(245,243,238,0.92)_75%)] dark:border-[#E056FD]/50 border-[#8B5CF6]/50"
        style={{
          width: size - 44,
          height: size - 44
        }}
      />

      {/* Central Identity Information (Dev Jangid Details Inside the Ball) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center p-4 max-w-[280px]">
        {/* Monogram Badge */}
        <div className="w-14 h-14 rounded-full bg-[#CCFF00] text-[#111317] font-black text-2xl flex items-center justify-center border-3 border-[#111317] shadow-[3px_3px_0px_#111317] mb-2 animate-pulse">
          {personalInfo.monogram}
        </div>

        {/* Name */}
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB] leading-tight drop-shadow-sm">
          {personalInfo.name}
        </h2>

        {/* Title */}
        <span className="font-mono text-[11px] sm:text-xs font-black text-[#111317] dark:text-[#CCFF00] uppercase tracking-wider mt-1 px-2.5 py-0.5 bg-[#CCFF00] dark:bg-[#111317]/90 border-2 border-[#111317] dark:border-[#CCFF00]/80 rounded-sm shadow-[2px_2px_0px_#111317]">
          {personalInfo.title}
        </span>

        {/* Key Additional Details inside the ball */}
        <div className="mt-3 flex flex-col gap-1 font-mono text-[10px] text-[#111317] dark:text-gray-200 font-bold">
          <div className="flex items-center justify-center gap-1.5 text-[#1F2937] dark:text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] border border-[#111317]" />
            <span>Airports Authority of India (IT)</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[#1F2937] dark:text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] border border-[#111317]" />
            <span>India Space Lab • CanSat</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-400">
            <MapPin className="w-3 h-3 text-[#FF5500]" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#141820] text-[#111317] dark:text-[#CCFF00] font-mono text-[10px] font-black border-2 border-[#111317] dark:border-[#CCFF00]/70 rounded-full shadow-[2px_2px_0px_#111317] dark:shadow-[0_0_12px_rgba(204,255,0,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] border border-[#111317] animate-ping" />
          <span>SYS://ACTIVE • 2026</span>
        </div>
      </div>
    </div>
  )
}

export default CrystalizedBall
