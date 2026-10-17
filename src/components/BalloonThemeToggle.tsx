import React, { useState } from 'react'
import { Sun, Moon, Sparkles } from 'lucide-react'

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
  const [showSparkles, setShowSparkles] = useState(false)

  const isDark = theme === 'dark'

  const handlePull = () => {
    onToggleTheme()
    setIsPulling(true)
    setShowSparkles(true)

    // Release elastic spring
    setTimeout(() => {
      setIsPulling(false)
    }, 380)

    setTimeout(() => {
      setShowSparkles(false)
    }, 700)
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ touchAction: 'manipulation' }}
    >
      {/* 1. Ceiling Anchor Bracket */}
      <div
        className={`w-2.5 h-1 rounded-full transition-colors duration-300 ${
          isDark
            ? 'bg-zinc-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]'
            : 'bg-zinc-700 shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
        }`}
        aria-hidden="true"
      />

      {/* 2. Hanging Balloon Rope (HIGH VISIBILITY in both Dark & Light mode) */}
      <div
        className="relative flex justify-center items-center overflow-visible transition-all duration-300 ease-out"
        style={{
          width: '2px',
          height: isPulling ? '38px' : '26px',
          transformOrigin: 'top center'
        }}
        aria-hidden="true"
      >
        {/* The Rope Core Line */}
        <div
          className={`w-[2px] h-full rounded-full transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-white via-zinc-200 to-amber-300 shadow-[0_0_8px_rgba(252,107,47,0.7),0_0_2px_#ffffff]'
              : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-amber-700 shadow-[0_1px_3px_rgba(0,0,0,0.5),0_0_2px_#000000]'
          }`}
          style={{
            animation: isPulling ? 'none' : 'ropeSway 3.6s ease-in-out infinite'
          }}
        />

        {/* Rope Texture Twist Knots (Gives realistic twine texture) */}
        <div
          className={`absolute top-2 w-1 h-1 rounded-full ${
            isDark ? 'bg-white/90 shadow-sm' : 'bg-black/80'
          }`}
        />
        <div
          className={`absolute top-4 w-1 h-1 rounded-full ${
            isDark ? 'bg-amber-300/90 shadow-sm' : 'bg-zinc-800'
          }`}
        />
      </div>

      {/* 3. The 3D Floating Balloon Button */}
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
        title={`Pull balloon to switch to ${isDark ? 'light' : 'dark'} mode`}
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-full"
        style={{
          transform: isPulling
            ? 'translateY(12px) scale(0.92, 1.12)'
            : 'translateY(0px) scale(1, 1)',
          transition: isPulling
            ? 'transform 0.12s cubic-bezier(0.2, 0, 0.4, 1)'
            : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: isPulling ? 'none' : 'balloonFloat 4.2s ease-in-out infinite'
        }}
      >
        {/* Balloon Knot/Nozzle at the top where rope attaches */}
        <div
          className={`mx-auto -mb-0.5 w-2 h-1.5 rounded-t-sm transition-colors duration-300 ${
            isDark
              ? 'bg-amber-600 shadow-[0_0_6px_rgba(252,107,47,0.8)]'
              : 'bg-amber-700 shadow-sm'
          }`}
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)'
          }}
          aria-hidden="true"
        />

        {/* Balloon Body: Volumetric Glossy Sphere */}
        <div
          className={`relative w-8 h-9 sm:w-9 sm:h-10 rounded-[50%_50%_50%_50%_/_42%_42%_58%_58%] flex items-center justify-center p-1.5 shadow-lg transition-all duration-300 transform-gpu group-hover:scale-105 active:scale-95 ${
            isDark
              ? 'bg-gradient-to-br from-[#2a1b3d] via-[#1a1226] to-[#0c0814] border border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(252,107,47,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]'
              : 'bg-gradient-to-br from-[#fff7ed] via-[#fed7aa] to-[#f97316] border border-amber-500/50 shadow-[0_4px_16px_rgba(249,115,22,0.35),inset_0_2px_4px_rgba(255,255,255,0.8)]'
          }`}
        >
          {/* Glossy Balloon Highlight Sheen (Gives realistic rubber reflection) */}
          <div
            className="absolute top-1.5 left-2 w-2.5 h-1.5 rounded-full bg-white/70 blur-[0.4px] rotate-[-25deg] pointer-events-none"
            aria-hidden="true"
          />

          {/* Balloon Icon (Moon for Dark, Sun for Light) */}
          <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-900 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
            )}
          </div>

          {/* Subtle Glow Ring */}
          <div
            className={`absolute inset-0 rounded-[50%_50%_50%_50%_/_42%_42%_58%_58%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isDark
                ? 'shadow-[0_0_20px_rgba(252,107,47,0.6)]'
                : 'shadow-[0_0_20px_rgba(249,115,22,0.6)]'
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Sparkle Particle Burst on Theme Pull */}
        {showSparkles && (
          <div className="absolute -inset-2 pointer-events-none flex items-center justify-center animate-ping">
            <Sparkles
              className={`w-6 h-6 ${
                isDark ? 'text-amber-300' : 'text-amber-500'
              }`}
            />
          </div>
        )}
      </button>

      {/* Embedded CSS Keyframes for natural balloon float and rope sway */}
      <style>{`
        @keyframes balloonFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          30% {
            transform: translateY(-4px) rotate(1.5deg);
          }
          70% {
            transform: translateY(2px) rotate(-1.5deg);
          }
        }

        @keyframes ropeSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          35% {
            transform: rotate(2deg);
          }
          75% {
            transform: rotate(-2deg);
          }
        }
      `}</style>
    </div>
  )
}

export default BalloonThemeToggle
