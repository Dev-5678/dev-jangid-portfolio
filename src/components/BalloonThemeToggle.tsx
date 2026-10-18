import React, { useState } from 'react'

interface BalloonThemeToggleProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  className?: string
}

export const BalloonThemeToggle: React.FC<BalloonThemeToggleProps> = ({
  theme,
  onToggleTheme,
  className = ''
}) => {
  const [isPulling, setIsPulling] = useState(false)
  const isDark = theme === 'dark'

  const handlePull = () => {
    onToggleTheme()
    setIsPulling(true)

    // Snappy elastic spring recoil
    setTimeout(() => {
      setIsPulling(false)
    }, 280)
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ touchAction: 'manipulation' }}
    >
      {/* 1. Interactive 3D Realistic Glowing Balloon Button */}
      <button
        onClick={handlePull}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handlePull()
          }
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-pressed={isDark}
        title={`Pull string to switch to ${isDark ? 'light' : 'dark'} mode`}
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-full flex flex-col items-center touch-manipulation"
      >
        {/* Floating Helium Balloon Assembly */}
        <div
          className="relative flex flex-col items-center transform-gpu"
          style={{
            transform: isPulling
              ? 'translateY(8px) scale(0.92, 1.10)'
              : 'translateY(0px) scale(1, 1)',
            transition: isPulling
              ? 'transform 0.12s cubic-bezier(0.2, 0, 0.4, 1)'
              : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            animation: isPulling ? 'none' : 'balloonBuoyancy 4s ease-in-out infinite'
          }}
        >
          {/* A. 3D Volumetric Glowing Latex Balloon Body */}
          <div
            className={`relative w-7 h-9 sm:w-8 sm:h-10 rounded-[50%_50%_50%_50%_/_38%_38%_62%_62%] flex items-center justify-center p-1 transition-all duration-300 transform-gpu group-hover:scale-105 active:scale-95 ${
              isDark
                ? 'border border-amber-300/40'
                : 'border border-amber-400/50'
            }`}
            style={{
              background: isDark
                ? 'radial-gradient(circle at 32% 26%, #ff8d4d 0%, #fc6b2f 32%, #b92010 68%, #4a0703 100%)'
                : 'radial-gradient(circle at 32% 26%, #ffffff 0%, #fef08a 32%, #f59e0b 68%, #92400e 100%)',
              boxShadow: isDark
                ? '0 0 16px rgba(252, 107, 47, 0.75), 0 0 32px rgba(252, 107, 47, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.7), inset 0 -4px 6px rgba(0, 0, 0, 0.65)'
                : '0 0 16px rgba(245, 158, 11, 0.7), 0 0 28px rgba(251, 191, 36, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -3px 5px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Primary Specular Softbox Highlight (Simulates glossy curved latex reflection) */}
            <div
              className="absolute top-1 left-1.5 w-2.5 h-3.5 rounded-[50%] bg-gradient-to-br from-white/95 via-white/45 to-transparent rotate-[-28deg] pointer-events-none"
              style={{ filter: 'blur(0.3px)' }}
              aria-hidden="true"
            />

            {/* Pin-point Specular Glint */}
            <div
              className="absolute top-1.5 left-2.5 w-1 h-1 rounded-full bg-white pointer-events-none shadow-[0_0_2px_#ffffff]"
              aria-hidden="true"
            />

            {/* Secondary Rim Reflection (Adds spherical 3D volume) */}
            <div
              className="absolute bottom-1.5 right-1.5 w-1.5 h-2 rounded-full bg-white/25 pointer-events-none"
              style={{ filter: 'blur(0.5px)' }}
              aria-hidden="true"
            />
          </div>

          {/* B. Realistic Latex Knot at the Bottom of Balloon */}
          <div className="relative -mt-0.5 flex flex-col items-center z-10" aria-hidden="true">
            {/* Rolled Knot Ring */}
            <div
              className={`w-2.5 h-1 rounded-full ${
                isDark ? 'bg-[#b92010] shadow-[0_0_4px_#fc6b2f]' : 'bg-[#b45309]'
              }`}
            />
            {/* Flared Nozzle Lip */}
            <div
              className={`w-3 h-1.5 rounded-b-sm ${
                isDark ? 'bg-[#7a0d04]' : 'bg-[#92400e]'
              }`}
              style={{
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
              }}
            />
          </div>

          {/* C. Hanging Balloon Rope (High-contrast, clearly visible in BOTH Dark and Light modes!) */}
          <div
            className="relative flex flex-col items-center overflow-visible transition-all duration-200"
            style={{
              animation: isPulling ? 'none' : 'ropeSway 4s ease-in-out infinite',
              transformOrigin: 'top center'
            }}
            aria-hidden="true"
          >
            {/* Rope Cord Line */}
            <div
              className={`w-[2px] transition-all duration-200 ${
                isDark
                  ? 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_4px_#fc6b2f,0_0_2px_#fbbf24]'
                  : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-slate-950 shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
              }`}
              style={{
                height: isPulling ? '26px' : '18px'
              }}
            />

            {/* D. Precision Metallic Pull-Bead at Bottom of Cord */}
            <div
              className={`w-2.5 h-2.5 rounded-full -mt-0.5 transition-transform duration-200 group-hover:scale-125 ${
                isDark
                  ? 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_8px_#fc6b2f] border border-amber-200/50'
                  : 'bg-gradient-to-br from-slate-600 via-slate-800 to-zinc-950 shadow-[0_1px_3px_rgba(0,0,0,0.5)] border border-slate-700/50'
              }`}
            />
          </div>
        </div>

        {/* E. Floating Minimalist Micro-Tooltip on Hover */}
        <span
          className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-md ${
            isDark
              ? 'bg-[#18181e] text-amber-300 border border-amber-400/30'
              : 'bg-white text-zinc-800 border border-zinc-200'
          }`}
          aria-hidden="true"
        >
          {isDark ? 'Light' : 'Dark'}
        </span>
      </button>

      {/* Embedded 120 FPS Hardware-Accelerated CSS Keyframes */}
      <style>{`
        @keyframes balloonBuoyancy {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          35% {
            transform: translateY(-3.5px) rotate(1.2deg);
          }
          70% {
            transform: translateY(-1px) rotate(-1deg);
          }
        }

        @keyframes ropeSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          35% {
            transform: rotate(1.5deg);
          }
          70% {
            transform: rotate(-1.5deg);
          }
        }
      `}</style>
    </div>
  )
}

export default BalloonThemeToggle
