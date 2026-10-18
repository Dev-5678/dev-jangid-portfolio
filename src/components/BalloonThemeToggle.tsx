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

    // Release elastic spring recoil
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
        className={`w-3 h-1 rounded-full transition-colors duration-300 ${
          isDark
            ? 'bg-zinc-300 shadow-[0_0_8px_rgba(252,107,47,0.6)]'
            : 'bg-zinc-800 shadow-[0_1px_3px_rgba(0,0,0,0.4)]'
        }`}
        aria-hidden="true"
      />

      {/* 2. Hanging Balloon Cord (High-contrast rope cord visible in both modes) */}
      <div
        className="relative flex justify-center items-center overflow-visible transition-all duration-300 ease-out"
        style={{
          width: '2px',
          height: isPulling ? '36px' : '24px',
          transformOrigin: 'top center'
        }}
        aria-hidden="true"
      >
        {/* The Rope Core Line with Glow */}
        <div
          className={`w-[2px] h-full rounded-full transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-white via-amber-200 to-amber-400 shadow-[0_0_8px_rgba(252,107,47,0.8),0_0_2px_#ffffff]'
              : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-amber-800 shadow-[0_1px_3px_rgba(0,0,0,0.5),0_0_2px_#000000]'
          }`}
          style={{
            animation: isPulling ? 'none' : 'ropeSway 3.8s ease-in-out infinite'
          }}
        />

        {/* Rope Texture Twist Knots */}
        <div
          className={`absolute top-1.5 w-1 h-1 rounded-full ${
            isDark ? 'bg-white shadow-[0_0_4px_#fc6b2f]' : 'bg-black'
          }`}
        />
        <div
          className={`absolute top-3.5 w-1 h-1 rounded-full ${
            isDark ? 'bg-amber-300 shadow-[0_0_4px_#fc6b2f]' : 'bg-zinc-800'
          }`}
        />
      </div>

      {/* 3. The 3D Realistic Glowing Balloon Button */}
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
            ? 'translateY(12px) scale(0.9, 1.14)'
            : 'translateY(0px) scale(1, 1)',
          transition: isPulling
            ? 'transform 0.12s cubic-bezier(0.2, 0, 0.4, 1)'
            : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: isPulling ? 'none' : 'balloonFloat 4s ease-in-out infinite'
        }}
      >
        {/* Balloon Latex Neck & Tied Knot at the Top */}
        <div className="relative mx-auto -mb-1 flex flex-col items-center z-20" aria-hidden="true">
          {/* Tied string wrap ring */}
          <div
            className={`w-2.5 h-1 rounded-full ${
              isDark ? 'bg-amber-400 shadow-[0_0_6px_#fc6b2f]' : 'bg-zinc-800'
            }`}
          />
          {/* Flared latex nozzle knot */}
          <div
            className={`w-3 h-1.5 rounded-t-sm transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-red-600 shadow-[0_0_8px_rgba(252,107,47,0.9)]'
                : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 shadow-sm'
            }`}
            style={{
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
            }}
          />
        </div>

        {/* Hyper-Realistic Volumetric 3D Glowing Balloon Body */}
        <div
          className={`relative w-8 h-10 sm:w-9 sm:h-11 rounded-[50%_50%_50%_50%_/_38%_38%_62%_62%] flex items-center justify-center p-1.5 transition-all duration-300 transform-gpu group-hover:scale-108 active:scale-95 ${
            isDark
              ? 'bg-[radial-gradient(circle_at_32%_26%,#ff9966_0%,#fc6b2f_34%,#c02619_70%,#660b06_100%)] border border-amber-300/40'
              : 'bg-[radial-gradient(circle_at_32%_26%,#ffffff_0%,#fde047_32%,#f59e0b_66%,#b45309_100%)] border border-amber-400/50'
          }`}
          style={{
            filter: isDark
              ? 'drop-shadow(0 0 8px rgba(252,107,47,0.9)) drop-shadow(0 0 20px rgba(252,107,47,0.55))'
              : 'drop-shadow(0 0 8px rgba(245,158,11,0.85)) drop-shadow(0 0 18px rgba(251,191,36,0.45))',
            boxShadow: isDark
              ? 'inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -4px 6px rgba(0,0,0,0.6)'
              : 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -4px 6px rgba(0,0,0,0.25)'
          }}
        >
          {/* Specular Highlight Arc (Gives the glossy wet latex sheen) */}
          <div
            className="absolute top-1.5 left-2 w-3 h-3.5 rounded-[50%] bg-gradient-to-br from-white/95 via-white/50 to-transparent blur-[0.3px] rotate-[-26deg] pointer-events-none"
            aria-hidden="true"
          />

          {/* Secondary Soft Rim Reflection (Adds 3D spherical depth) */}
          <div
            className="absolute bottom-2 right-1.5 w-1.5 h-2 rounded-full bg-white/30 blur-[0.6px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Centered Sun / Moon Theme Icon */}
          <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-200 drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-950 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            )}
          </div>

          {/* Pulsating Glowing Aura Ring */}
          <div
            className={`absolute -inset-1 rounded-[50%_50%_50%_50%_/_38%_38%_62%_62%] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300 ${
              isDark
                ? 'shadow-[0_0_25px_rgba(252,107,47,0.8)]'
                : 'shadow-[0_0_22px_rgba(249,115,22,0.8)]'
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Sparkle Particle Burst on Theme Pull */}
        {showSparkles && (
          <div className="absolute -inset-3 pointer-events-none flex items-center justify-center animate-ping">
            <Sparkles
              className={`w-7 h-7 ${
                isDark ? 'text-amber-300 drop-shadow-[0_0_8px_#fc6b2f]' : 'text-amber-500 drop-shadow-[0_0_8px_#f59e0b]'
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
            transform: translateY(-4px) rotate(1.8deg);
          }
          70% {
            transform: translateY(2px) rotate(-1.8deg);
          }
        }

        @keyframes ropeSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          35% {
            transform: rotate(2.2deg);
          }
          75% {
            transform: rotate(-2.2deg);
          }
        }
      `}</style>
    </div>
  )
}

export default BalloonThemeToggle
