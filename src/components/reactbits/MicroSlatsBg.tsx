import React, { useEffect, useRef } from 'react'

interface MicroSlatsBgProps {
  className?: string
}

export const MicroSlatsBg: React.FC<MicroSlatsBgProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    let mouseX = -9999
    let mouseY = -9999
    let targetMouseX = -9999
    let targetMouseY = -9999

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.resetTransform?.()
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    const handleMouseLeave = () => {
      targetMouseX = -9999
      targetMouseY = -9999
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    const slatW = 7
    const slatBaseH = 22
    const gapX = 6
    const gapY = 7
    const colStep = slatW + gapX
    const rowStep = slatBaseH + gapY

    let time = 0

    const render = () => {
      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.1
      mouseY += (targetMouseY - mouseY) * 0.1

      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains('dark')

      if (!isReduced) {
        time += 0.02
      }

      const cols = Math.ceil(width / colStep) + 2
      const rows = Math.ceil(height / rowStep) + 2

      for (let r = -1; r < rows; r++) {
        const y = r * rowStep
        for (let c = -1; c < cols; c++) {
          const x = c * colStep

          // Rolling sea wave math
          // Traveling diagonal wave with harmonic secondary wave
          const wave1 = Math.sin(c * 0.14 + r * 0.1 - time * 1.6)
          const wave2 = Math.cos(c * 0.08 - r * 0.15 + time * 0.9)
          let elevation = (wave1 * 0.65 + wave2 * 0.35 + 1) * 0.5 // 0.0 to 1.0

          // Interactive mouse wave / ripple
          const dx = x - mouseX
          const dy = y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const mouseRadius = 240

          if (dist < mouseRadius) {
            const factor = Math.cos((dist / mouseRadius) * (Math.PI / 2))
            elevation = Math.min(1.0, elevation + factor * 0.8)
          }

          // Modulation of height based on elevation
          const h = slatBaseH * (0.65 + 0.65 * elevation)
          const drawY = y - (h - slatBaseH) / 2
          const radius = slatW / 2

          ctx.beginPath()
          // Use roundRect if available, or arc fallback
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(x, drawY, slatW, h, radius)
          } else {
            ctx.rect(x, drawY, slatW, h)
          }

          // Theme-aware palette with glinting crests
          if (isDark) {
            if (elevation > 0.78) {
              // Glinting crests (Electric Violet / Lilac highlight)
              const glintNorm = (elevation - 0.78) / 0.22
              ctx.fillStyle = `rgba(224, 185, 255, ${0.45 + glintNorm * 0.45})`
            } else if (elevation > 0.45) {
              // Mid-wave violet body
              const midNorm = (elevation - 0.45) / 0.33
              ctx.fillStyle = `rgba(139, 92, 246, ${0.18 + midNorm * 0.25})`
            } else {
              // Deep base slat
              ctx.fillStyle = `rgba(40, 34, 62, ${0.25 + elevation * 0.15})`
            }
          } else {
            // Light Mode: Subtle, crisp architectural slats
            if (elevation > 0.75) {
              // Light mode glint
              ctx.fillStyle = `rgba(147, 112, 219, ${0.35 + elevation * 0.25})`
            } else if (elevation > 0.4) {
              ctx.fillStyle = `rgba(180, 185, 205, ${0.25 + elevation * 0.2})`
            } else {
              ctx.fillStyle = `rgba(215, 220, 230, ${0.2 + elevation * 0.15})`
            }
          }

          ctx.fill()
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 w-full h-full ${className}`}
    />
  )
}
