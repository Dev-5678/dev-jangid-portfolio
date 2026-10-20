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
  const [isSpinning, setIsSpinning] = useState(false)
  const [isNear, setIsNear] = useState(false)

  const isDark = theme === 'dark'

  const handleToggle = () => {
    setIsPulling(true)
    setIsSpinning(true)
    onToggleTheme()

    // Elastic snap recoil
    setTimeout(() => {
      setIsPulling(false)
    }, 280)

    setTimeout(() => {
      setIsSpinning(false)
    }, 600)
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ touchAction: 'manipulation' }}
      onMouseEnter={() => setIsNear(true)}
      onMouseLeave={() => setIsNear(false)}
      onMouseMove={() => {
        if (!isNear) setIsNear(true)
      }}
    >
      {/* Interactive Balloon Button */}
      <button
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleToggle()
          }
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-pressed={isDark}
        title={`Toggle to ${isDark ? 'light' : 'dark'} mode`}
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-full flex flex-col items-center touch-manipulation"
      >
        {/* Floating Helium Balloon Assembly matching user's reference image */}
        <div
          className="relative flex flex-col items-center transform-gpu"
          style={{
            transform: isSpinning
              ? 'rotateY(360deg) scale(1.12)'
              : isPulling
              ? 'translateY(8px) scale(0.92, 1.10)'
              : 'translateY(0px) scale(1, 1)',
            transition: isSpinning
              ? 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)'
              : isPulling
              ? 'transform 0.12s cubic-bezier(0.2, 0, 0.4, 1)'
              : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            animation: isPulling || isSpinning ? 'none' : 'balloonBuoyancy 4s ease-in-out infinite'
          }}
        >
          {/* 1. Balloon Bulb (White in Dark Mode, Black in Light Mode) */}
          <div
            className={`relative w-6 h-8 sm:w-7 sm:h-9 rounded-[50%_50%_50%_50%_/_38%_38%_62%_62%] transition-all duration-300 transform-gpu ${
              isDark
                ? 'bg-white border border-white/80'
                : 'bg-[#0a0a0d] border border-black/90'
            }`}
            style={{
              // Glowing effect whenever cursor is near or hovering
              boxShadow: isDark
                ? isNear
                  ? '0 0 20px rgba(255, 255, 255, 0.95), 0 0 35px rgba(252, 107, 47, 0.85), 0 0 50px rgba(252, 107, 47, 0.45)'
                  : '0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(252, 107, 47, 0.35)'
                : isNear
                ? '0 0 18px rgba(245, 158, 11, 0.85), 0 0 32px rgba(217, 119, 6, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
                : '0 0 10px rgba(0, 0, 0, 0.35), 0 0 18px rgba(245, 158, 11, 0.25)'
            }}
          >
            {/* Subtle natural highlight glint */}
            <div
              className={`absolute top-1.5 left-1.5 w-1.5 h-2.5 rounded-[50%] rotate-[-28deg] pointer-events-none transition-opacity duration-300 ${
                isDark ? 'bg-white/80' : 'bg-white/20'
              }`}
              aria-hidden="true"
            />
          </div>

          {/* 2. Balloon Knot (Small triangle directly below bulb matching picture) */}
          <div
            className={`w-2 h-1.5 -mt-0.5 transition-colors duration-300 ${
              isDark ? 'bg-white' : 'bg-[#0a0a0d]'
            }`}
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)'
            }}
            aria-hidden="true"
          />

          {/* 3. Dynamic Organic Thread with Interactive Hover Physics & Glow */}
          <div
            className="relative flex flex-col items-center origin-top pointer-events-auto"
            style={{
              animation: isNear && !isPulling ? 'threadSway 1.2s ease-in-out infinite' : 'none',
              transformOrigin: 'top center'
            }}
          >
            <svg
              width="16"
              height={isPulling ? 28 : isNear ? 24 : 20}
              viewBox={isPulling ? "0 0 16 28" : isNear ? "0 0 16 24" : "0 0 16 20"}
              className={`transition-all duration-300 overflow-visible ${
                isDark
                  ? isNear
                    ? 'text-white drop-shadow-[0_0_8px_rgba(252,107,47,0.95)] drop-shadow-[0_0_14px_rgba(255,255,255,0.8)]'
                    : 'text-white/80 drop-shadow-[0_0_3px_rgba(255,255,255,0.6)]'
                  : isNear
                  ? 'text-amber-600 drop-shadow-[0_0_6px_rgba(245,158,11,0.9)]'
                  : 'text-zinc-900'
              }`}
            >
              <path
                d={
                  isPulling
                    ? "M 8 0 L 8 28"
                    : isNear
                    ? "M 8 0 Q 12 7, 8 14 T 8 24"
                    : "M 8 0 L 8 20"
                }
                fill="none"
                stroke="currentColor"
                strokeWidth={isNear ? "1.8" : "1.4"}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {/* Tactile bead / knot at bottom of thread */}
              <circle
                cx="8"
                cy={isPulling ? 27 : isNear ? 23 : 19}
                r={isNear ? 2.2 : 1.4}
                className={`fill-current transition-all duration-300 ${isNear ? 'animate-pulse' : ''}`}
              />
            </svg>
          </div>
        </div>

        {/* Minimalist Tooltip on Hover */}
        <span
          className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase pointer-events-none transition-opacity duration-200 z-50 shadow-md ${
            isNear ? 'opacity-100' : 'opacity-0'
          } ${
            isDark
              ? 'bg-[#18181e] text-amber-300 border border-amber-400/30'
              : 'bg-white text-zinc-800 border border-zinc-200'
          }`}
          aria-hidden="true"
        >
          {isDark ? 'Light' : 'Dark'}
        </span>
      </button>

      {/* Physics-driven CSS Keyframes */}
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
        @keyframes threadSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(8deg);
          }
          75% {
            transform: rotate(-7deg);
          }
        }
      `}</style>
    </div>
  )
}

export default BalloonThemeToggle
