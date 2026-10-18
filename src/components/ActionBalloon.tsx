import React, { useState } from 'react'

export interface ActionBalloonProps {
  theme: 'light' | 'dark'
  label: string
  ariaLabel: string
  glowColor?: 'cyan' | 'amber' | 'green' | 'ember' | 'white'
  isActive?: boolean
  animationDelay?: number
  onAction: () => void
  className?: string
}

export const ActionBalloon: React.FC<ActionBalloonProps> = ({
  theme,
  label,
  ariaLabel,
  glowColor = 'cyan',
  isActive = false,
  animationDelay = 0,
  onAction,
  className = ''
}) => {
  const [isPulling, setIsPulling] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [isNear, setIsNear] = useState(false)

  const isDark = theme === 'dark'

  const handleAction = () => {
    setIsPulling(true)
    setIsSpinning(true)
    onAction()

    // Elastic snap recoil
    setTimeout(() => {
      setIsPulling(false)
    }, 280)

    setTimeout(() => {
      setIsSpinning(false)
    }, 600)
  }

  // Signature dynamic glow calculation per action personality
  const getBoxShadow = () => {
    if (isDark) {
      if (glowColor === 'cyan') {
        return isNear
          ? '0 0 20px rgba(255, 255, 255, 0.95), 0 0 35px rgba(56, 189, 248, 0.85), 0 0 50px rgba(56, 189, 248, 0.45)'
          : '0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(56, 189, 248, 0.35)'
      }
      if (glowColor === 'amber') {
        if (isActive) {
          return '0 0 25px rgba(245, 158, 11, 0.95), 0 0 45px rgba(252, 107, 47, 0.85), 0 0 60px rgba(245, 158, 11, 0.5)'
        }
        return isNear
          ? '0 0 20px rgba(255, 255, 255, 0.9), 0 0 32px rgba(245, 158, 11, 0.7), 0 0 45px rgba(245, 158, 11, 0.35)'
          : '0 0 10px rgba(255, 255, 255, 0.5), 0 0 16px rgba(245, 158, 11, 0.25)'
      }
      if (glowColor === 'green') {
        return isNear
          ? '0 0 20px rgba(255, 255, 255, 0.95), 0 0 35px rgba(34, 197, 94, 0.85), 0 0 50px rgba(34, 197, 94, 0.45)'
          : '0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(34, 197, 94, 0.35)'
      }
      // default / ember
      return isNear
        ? '0 0 20px rgba(255, 255, 255, 0.95), 0 0 35px rgba(252, 107, 47, 0.85), 0 0 50px rgba(252, 107, 47, 0.45)'
        : '0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(252, 107, 47, 0.35)'
    } else {
      // Light mode glow
      if (glowColor === 'cyan') {
        return isNear
          ? '0 0 18px rgba(14, 165, 233, 0.85), 0 0 32px rgba(2, 132, 199, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
          : '0 0 10px rgba(0, 0, 0, 0.35), 0 0 18px rgba(14, 165, 233, 0.25)'
      }
      if (glowColor === 'amber') {
        if (isActive) {
          return '0 0 22px rgba(217, 119, 6, 0.95), 0 0 36px rgba(245, 158, 11, 0.7), inset 0 2px 4px rgba(255,255,255,0.2)'
        }
        return isNear
          ? '0 0 18px rgba(245, 158, 11, 0.85), 0 0 32px rgba(217, 119, 6, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
          : '0 0 10px rgba(0, 0, 0, 0.35), 0 0 18px rgba(245, 158, 11, 0.25)'
      }
      if (glowColor === 'green') {
        return isNear
          ? '0 0 18px rgba(34, 197, 94, 0.85), 0 0 32px rgba(22, 163, 74, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
          : '0 0 10px rgba(0, 0, 0, 0.35), 0 0 18px rgba(34, 197, 94, 0.25)'
      }
      return isNear
        ? '0 0 18px rgba(245, 158, 11, 0.85), 0 0 32px rgba(217, 119, 6, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
        : '0 0 10px rgba(0, 0, 0, 0.35), 0 0 18px rgba(245, 158, 11, 0.25)'
    }
  }

  // String color & shadow matching the balloon identity
  const getStringStyles = () => {
    if (isDark) {
      if (glowColor === 'cyan') {
        return 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8),0_0_2px_#38bdf8]'
      }
      if (glowColor === 'amber') {
        return isActive
          ? 'bg-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.95),0_0_3px_#fc6b2f]'
          : 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.7),0_0_2px_#f59e0b]'
      }
      if (glowColor === 'green') {
        return 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8),0_0_2px_#22c55e]'
      }
      return 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8),0_0_2px_#fc6b2f]'
    }
    return 'bg-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
  }

  // Tooltip badge style
  const getTooltipStyles = () => {
    if (isDark) {
      if (glowColor === 'cyan') {
        return 'bg-[#121620] text-sky-300 border border-sky-400/30'
      }
      if (glowColor === 'amber') {
        return isActive
          ? 'bg-[#22170d] text-amber-300 border border-amber-400/50'
          : 'bg-[#18181e] text-amber-200/80 border border-amber-400/20'
      }
      if (glowColor === 'green') {
        return 'bg-[#0f1f16] text-emerald-300 border border-emerald-400/30'
      }
      return 'bg-[#18181e] text-amber-300 border border-amber-400/30'
    }
    return 'bg-white text-zinc-800 border border-zinc-200'
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
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleAction()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            handleAction()
          }
        }}
        aria-label={ariaLabel}
        title={ariaLabel}
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-full flex flex-col items-center touch-manipulation"
      >
        {/* Floating Helium Balloon Assembly */}
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
            animation: isPulling || isSpinning ? 'none' : 'actionBalloonBuoyancy 4s ease-in-out infinite',
            animationDelay: `${animationDelay}s`
          }}
        >
          {/* 1. Balloon Bulb */}
          <div
            className={`relative w-6 h-8 sm:w-7 sm:h-9 rounded-[50%_50%_50%_50%_/_38%_38%_62%_62%] transition-all duration-300 transform-gpu ${
              isDark
                ? isActive && glowColor === 'amber'
                  ? 'bg-[#fffbeb] border border-amber-300/90'
                  : 'bg-white border border-white/80'
                : 'bg-[#0a0a0d] border border-black/90'
            }`}
            style={{
              boxShadow: getBoxShadow()
            }}
          >
            {/* Natural glossy highlight glint */}
            <div
              className={`absolute top-1.5 left-1.5 w-1.5 h-2.5 rounded-[50%] rotate-[-28deg] pointer-events-none transition-opacity duration-300 ${
                isDark ? 'bg-white/80' : 'bg-white/20'
              }`}
              aria-hidden="true"
            />
          </div>

          {/* 2. Balloon Knot */}
          <div
            className={`w-2 h-1.5 -mt-0.5 transition-colors duration-300 ${
              isDark
                ? isActive && glowColor === 'amber'
                  ? 'bg-amber-300'
                  : 'bg-white'
                : 'bg-[#0a0a0d]'
            }`}
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)'
            }}
            aria-hidden="true"
          />

          {/* 3. Straight Vertical String */}
          <div
            className={`w-[1.5px] transition-all duration-200 ${getStringStyles()}`}
            style={{
              height: isPulling ? '26px' : '20px'
            }}
            aria-hidden="true"
          />
        </div>

        {/* Minimalist Tooltip on Hover */}
        <span
          className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider pointer-events-none transition-opacity duration-200 z-50 shadow-md ${
            isNear ? 'opacity-100' : 'opacity-0'
          } ${getTooltipStyles()}`}
          aria-hidden="true"
        >
          {label}
        </span>
      </button>

      {/* Physics Keyframes */}
      <style>{`
        @keyframes actionBalloonBuoyancy {
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
      `}</style>
    </div>
  )
}

export default ActionBalloon
