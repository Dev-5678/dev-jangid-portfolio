import React from 'react'

interface GlobalLiveBackgroundProps {
  theme?: 'dark' | 'light'
}

// 14 lightweight, hardware-accelerated cosmic micro-particles
const PARTICLES = [
  { size: 2.2, top: '8%', left: '10%', duration: 9.2, delay: 0 },
  { size: 1.8, top: '18%', left: '86%', duration: 11.4, delay: 0.8 },
  { size: 2.6, top: '28%', left: '22%', duration: 8.5, delay: 1.5 },
  { size: 1.5, top: '40%', left: '74%', duration: 12.1, delay: 2.2 },
  { size: 2.4, top: '50%', left: '14%', duration: 10.3, delay: 3.1 },
  { size: 2.0, top: '62%', left: '88%', duration: 9.8, delay: 1.2 },
  { size: 2.8, top: '72%', left: '30%', duration: 13.0, delay: 4.0 },
  { size: 1.6, top: '82%', left: '66%', duration: 8.9, delay: 2.7 },
  { size: 2.2, top: '92%', left: '18%', duration: 11.2, delay: 3.5 },
  { size: 1.9, top: '24%', left: '52%', duration: 10.6, delay: 0.4 },
  { size: 2.5, top: '46%', left: '44%', duration: 9.5, delay: 4.8 },
  { size: 1.7, top: '68%', left: '92%', duration: 12.4, delay: 1.9 },
  { size: 2.1, top: '86%', left: '56%', duration: 10.8, delay: 2.5 },
  { size: 1.8, top: '34%', left: '94%', duration: 11.7, delay: 1.1 }
]

export const GlobalLiveBackground: React.FC<GlobalLiveBackgroundProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light'

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none transform-gpu"
      style={{
        contain: 'strict',
        transform: 'translateZ(0)'
      }}
      aria-hidden="true"
    >
      {/* 1. Fast GPU Shader: Natural Radial Aurora Glows (Zero expensive filter:blur!) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: isLight ? 0.85 : 0.65,
          background: isLight
            ? `radial-gradient(circle at 10% 12%, rgba(160, 42, 34, 0.08) 0%, transparent 40%),
               radial-gradient(circle at 88% 28%, rgba(217, 69, 18, 0.06) 0%, transparent 45%),
               radial-gradient(circle at 18% 68%, rgba(160, 42, 34, 0.07) 0%, transparent 50%),
               radial-gradient(circle at 85% 85%, rgba(14, 165, 233, 0.06) 0%, transparent 45%)`
            : `radial-gradient(circle at 10% 12%, rgba(252, 107, 47, 0.10) 0%, transparent 45%),
               radial-gradient(circle at 88% 28%, rgba(34, 211, 238, 0.08) 0%, transparent 45%),
               radial-gradient(circle at 18% 68%, rgba(160, 42, 34, 0.10) 0%, transparent 50%),
               radial-gradient(circle at 85% 85%, rgba(16, 185, 129, 0.06) 0%, transparent 45%)`
        }}
      />

      {/* 2. Floating Ambient Dust Micro-Particles (lightweight GPU animated) */}
      {PARTICLES.map((p, idx) => {
        const particleColor = isLight
          ? idx % 2 === 0
            ? 'rgba(160, 42, 34, 0.6)'
            : 'rgba(217, 69, 18, 0.5)'
          : idx % 3 === 0
          ? 'rgba(252, 107, 47, 0.65)'
          : idx % 3 === 1
          ? 'rgba(255, 255, 255, 0.4)'
          : 'rgba(34, 211, 238, 0.55)'

        return (
          <div
            key={idx}
            className="dust absolute rounded-full pointer-events-none"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: particleColor,
              top: p.top,
              left: p.left,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform'
            }}
          />
        )
      })}
    </div>
  )
}

export default GlobalLiveBackground
