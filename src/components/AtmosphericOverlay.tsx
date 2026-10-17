import React, { useMemo } from 'react'

interface AtmosphericOverlayProps {
  theme?: 'light' | 'dark'
}

interface Particle {
  id: number
  top: string
  left: string
  size: number
  color: string
  duration: number
  delay: number
}

export const AtmosphericOverlay: React.FC<AtmosphericOverlayProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark'

  // Pre-generate deterministic particles for visual depth
  const particles: Particle[] = useMemo(() => {
    const colors = [
      'rgba(255, 107, 43, 0.6)',  // Ember
      'rgba(0, 229, 255, 0.45)',  // Cyan
      'rgba(204, 255, 0, 0.45)',  // Electric Lime
      'rgba(255, 255, 255, 0.35)' // Crisp White
    ]

    const items: Particle[] = [
      { id: 1, top: '12%', left: '8%', size: 2.2, color: colors[0], duration: 6.8, delay: 0 },
      { id: 2, top: '22%', left: '84%', size: 1.6, color: colors[3], duration: 8.2, delay: 0.8 },
      { id: 3, top: '38%', left: '16%', size: 2.8, color: colors[1], duration: 7.1, delay: 1.4 },
      { id: 4, top: '54%', left: '92%', size: 1.4, color: colors[0], duration: 9.3, delay: 2.1 },
      { id: 5, top: '68%', left: '26%', size: 2.4, color: colors[2], duration: 7.5, delay: 2.8 },
      { id: 6, top: '16%', left: '62%', size: 1.8, color: colors[3], duration: 6.2, delay: 3.5 },
      { id: 7, top: '82%', left: '46%', size: 2.5, color: colors[0], duration: 8.7, delay: 4.2 },
      { id: 8, top: '31%', left: '39%', size: 1.5, color: colors[1], duration: 6.9, delay: 4.9 },
      { id: 9, top: '64%', left: '76%', size: 2.2, color: colors[3], duration: 9.0, delay: 5.6 },
      { id: 10, top: '48%', left: '6%', size: 1.7, color: colors[2], duration: 5.8, delay: 6.3 },
      { id: 11, top: '86%', left: '14%', size: 2.0, color: colors[0], duration: 7.8, delay: 7.0 },
      { id: 12, top: '42%', left: '72%', size: 1.8, color: colors[1], duration: 6.4, delay: 7.7 },
      { id: 13, top: '76%', left: '56%', size: 2.3, color: colors[3], duration: 8.1, delay: 8.4 },
      { id: 14, top: '90%', left: '82%', size: 2.6, color: colors[2], duration: 7.9, delay: 9.1 }
    ]
    return items
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Subtle SVG Fractal Noise Texture */}
      <div
        className="absolute inset-0 noise-overlay"
        style={{
          opacity: isDark ? 0.03 : 0.015
        }}
      />

      {/* 2. Atmospheric Radial Lighting Pool (Visible in Dark Mode) */}
      {isDark && (
        <div
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 107, 43, 0.08) 0%, rgba(0, 229, 255, 0.04) 40%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
      )}

      {/* 3. Floating Micro-Dust Particles */}
      {isDark && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="dust-particle absolute rounded-full"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AtmosphericOverlay
