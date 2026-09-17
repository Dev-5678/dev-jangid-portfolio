import React from 'react'

interface GlobalLiveBackgroundProps {
  theme?: 'dark' | 'light'
}

// 36 ambient cosmic particles distributed throughout the viewport
const PARTICLES = [
  { size: 2.2, top: '6%', left: '7%', duration: 9.2, delay: 0 },
  { size: 1.8, top: '14%', left: '88%', duration: 11.4, delay: 0.8 },
  { size: 3.0, top: '22%', left: '19%', duration: 8.5, delay: 1.5 },
  { size: 1.5, top: '31%', left: '76%', duration: 12.1, delay: 2.2 },
  { size: 2.6, top: '39%', left: '12%', duration: 10.3, delay: 3.1 },
  { size: 2.0, top: '48%', left: '92%', duration: 9.8, delay: 1.2 },
  { size: 3.2, top: '56%', left: '28%', duration: 13.0, delay: 4.0 },
  { size: 1.6, top: '64%', left: '68%', duration: 8.9, delay: 2.7 },
  { size: 2.4, top: '73%', left: '8%', duration: 11.2, delay: 3.5 },
  { size: 1.9, top: '81%', left: '84%', duration: 10.6, delay: 0.4 },
  { size: 2.8, top: '89%', left: '38%', duration: 9.5, delay: 4.8 },
  { size: 1.4, top: '96%', left: '62%', duration: 12.4, delay: 1.9 },
  { size: 2.1, top: '10%', left: '42%', duration: 10.8, delay: 2.5 },
  { size: 1.7, top: '26%', left: '55%', duration: 9.9, delay: 3.8 },
  { size: 2.5, top: '44%', left: '46%', duration: 11.7, delay: 1.1 },
  { size: 1.8, top: '60%', left: '85%', duration: 10.2, delay: 4.2 },
  { size: 2.9, top: '77%', left: '52%', duration: 8.8, delay: 2.9 },
  { size: 1.6, top: '93%', left: '18%', duration: 12.8, delay: 5.1 },
  { size: 2.3, top: '18%', left: '31%', duration: 11.0, delay: 0.3 },
  { size: 1.5, top: '35%', left: '95%', duration: 9.4, delay: 3.3 },
  { size: 2.7, top: '52%', left: '4%', duration: 12.2, delay: 1.7 },
  { size: 1.9, top: '69%', left: '41%', duration: 10.5, delay: 4.5 },
  { size: 3.1, top: '85%', left: '73%', duration: 8.6, delay: 2.1 },
  { size: 1.4, top: '3%', left: '70%', duration: 11.5, delay: 3.7 },
  { size: 2.2, top: '29%', left: '3%', duration: 10.1, delay: 1.4 },
  { size: 1.8, top: '47%', left: '65%', duration: 12.6, delay: 4.9 },
  { size: 2.6, top: '65%', left: '22%', duration: 9.1, delay: 2.4 },
  { size: 1.7, top: '83%', left: '96%', duration: 11.9, delay: 0.9 },
  { size: 2.4, top: '15%', left: '80%', duration: 10.4, delay: 3.6 },
  { size: 1.5, top: '50%', left: '34%', duration: 13.2, delay: 1.8 },
  { size: 2.8, top: '71%', left: '89%', duration: 8.7, delay: 4.1 },
  { size: 2.0, top: '91%', left: '50%', duration: 11.1, delay: 2.6 }
]

export const GlobalLiveBackground: React.FC<GlobalLiveBackgroundProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light'

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[3] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Large Ambient Aurora Glowing Clouds (drifting behind content) */}
      <div
        className={`absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[120px] transition-all duration-700 ${
          isLight
            ? 'bg-gradient-to-br from-[#a02a22]/15 via-[#fc6b2f]/10 to-transparent opacity-85'
            : 'bg-gradient-to-br from-ember/15 via-[#fc6b2f]/8 to-transparent opacity-65'
        }`}
      />
      <div
        className={`absolute top-[35%] -right-40 w-[600px] h-[600px] rounded-full blur-[130px] transition-all duration-700 ${
          isLight
            ? 'bg-gradient-to-bl from-cyan-600/12 via-ember/10 to-transparent opacity-80'
            : 'bg-gradient-to-bl from-cyan-500/10 via-ember/8 to-transparent opacity-50'
        }`}
      />
      <div
        className={`absolute top-[70%] -left-32 w-[700px] h-[700px] rounded-full blur-[140px] transition-all duration-700 ${
          isLight
            ? 'bg-gradient-to-tr from-[#a02a22]/12 via-amber-500/10 to-transparent opacity-75'
            : 'bg-gradient-to-tr from-ember/12 via-orange-600/6 to-transparent opacity-55'
        }`}
      />
      <div
        className={`absolute bottom-[-100px] right-[10%] w-[550px] h-[550px] rounded-full blur-[110px] transition-all duration-700 ${
          isLight
            ? 'bg-gradient-to-t from-emerald-600/10 via-cyan-600/8 to-transparent opacity-75'
            : 'bg-gradient-to-t from-emerald-500/8 via-cyan-500/5 to-transparent opacity-40'
        }`}
      />

      {/* 2. Floating Ambient Dust Micro-Particles (running continuously everywhere) */}
      {PARTICLES.map((p, idx) => {
        // High contrast colors for light mode vs dark mode
        const particleColor = isLight
          ? idx % 3 === 0
            ? 'rgba(160, 42, 34, 0.65)' // Ember
            : idx % 3 === 1
            ? 'rgba(217, 69, 18, 0.6)'  // Warm terracotta
            : 'rgba(92, 92, 102, 0.45)' // Slate smoke
          : idx % 3 === 0
          ? 'rgba(252, 107, 47, 0.6)'  // Vibrant glowing orange
          : idx % 3 === 1
          ? 'rgba(255, 255, 255, 0.35)'// Cosmic starlight
          : 'rgba(34, 211, 238, 0.5)'  // Cyan telemetry spark

        const glowShadow = isLight
          ? '0 0 6px rgba(160, 42, 34, 0.4)'
          : idx % 3 === 0
          ? '0 0 8px rgba(252, 107, 47, 0.8)'
          : '0 0 6px rgba(255, 255, 255, 0.5)'

        return (
          <div
            key={idx}
            className="dust absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: particleColor,
              boxShadow: glowShadow,
              top: p.top,
              left: p.left,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        )
      })}
    </div>
  )
}
