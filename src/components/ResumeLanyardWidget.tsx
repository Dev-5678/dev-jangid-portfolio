import React, { useState } from 'react'

export interface ResumeLanyardWidgetProps {
  theme: 'light' | 'dark'
  onOpenResume: () => void
  className?: string
}

export const ResumeLanyardWidget: React.FC<ResumeLanyardWidgetProps> = ({
  theme,
  onOpenResume,
  className = ''
}) => {
  const [isNear, setIsNear] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const isDark = theme === 'dark'

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 300)
    onOpenResume()
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsNear(true)}
      onMouseLeave={() => setIsNear(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            onOpenResume()
          }
        }}
        aria-label="Open Resume Badge"
        title="Open Resume Badge"
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ember flex flex-col items-center"
      >
        {/* Lanyard Cord & Clip */}
        <div className="flex flex-col items-center">
          {/* Lanyard String */}
          <div
            className={`w-[1.5px] h-2 transition-colors duration-200 ${
              isDark
                ? isNear
                  ? 'bg-amber-400 shadow-[0_0_4px_#f59e0b]'
                  : 'bg-zinc-500'
                : 'bg-zinc-700'
            }`}
          />
          {/* Metal Clip */}
          <div
            className={`w-2.5 h-1.5 rounded-t-sm transition-colors duration-200 ${
              isDark ? 'bg-zinc-400 border-t border-white/40' : 'bg-zinc-600'
            }`}
          />
        </div>

        {/* 3D ID Card / Credential Dossier */}
        <div
          className={`relative w-8 h-10 rounded-[4px] border p-1 flex flex-col justify-between transition-all duration-300 transform-gpu ${
            isDark
              ? 'bg-gradient-to-b from-[#1c1d27] to-[#12131a] border-white/20'
              : 'bg-gradient-to-b from-[#ffffff] to-[#f1f5f9] border-black/20 shadow-sm'
          }`}
          style={{
            transform: isPressed
              ? 'scale(0.92) rotateY(180deg)'
              : isNear
              ? 'translateY(-2px) rotate(-2deg)'
              : 'translateY(0px) rotate(0deg)',
            boxShadow: isDark
              ? isNear
                ? '0 0 18px rgba(252, 107, 47, 0.75), 0 4px 12px rgba(0,0,0,0.6)'
                : '0 2px 8px rgba(0, 0, 0, 0.4)'
              : isNear
              ? '0 0 14px rgba(217, 119, 6, 0.6), 0 4px 8px rgba(0,0,0,0.1)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
            animation: isPressed ? 'none' : 'badgeSway 3.6s ease-in-out infinite'
          }}
        >
          {/* Card Top: Slot hole + Chip */}
          <div className="flex items-center justify-between">
            <div className="w-2 h-0.5 rounded-full bg-black/60 mx-auto" />
          </div>

          {/* Card Middle: Profile silhouette + Micro text lines */}
          <div className="flex items-center gap-1 my-auto">
            {/* Holographic Chip */}
            <div className="w-2.5 h-2.5 rounded-[2px] bg-gradient-to-tr from-amber-500/80 to-amber-300/90 shadow-[0_0_4px_rgba(245,158,11,0.5)] flex items-center justify-center">
              <span className="w-1.5 h-0.5 bg-black/40 rounded-full" />
            </div>
            {/* Skeleton lines */}
            <div className="flex flex-col gap-0.5 flex-1">
              <div className={`h-0.5 rounded-full w-full ${isDark ? 'bg-white/40' : 'bg-black/30'}`} />
              <div className={`h-0.5 rounded-full w-3/4 ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
            </div>
          </div>

          {/* Card Bottom: Red PDF Badge */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[6.5px] font-mono font-extrabold uppercase px-1 py-0.2 rounded-sm bg-ember text-white tracking-wider shadow-[0_0_6px_rgba(160,42,34,0.7)]">
              PDF
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" title="Verified" />
          </div>
        </div>

        {/* Minimalist Tooltip on Hover */}
        <span
          className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider pointer-events-none transition-opacity duration-200 z-50 shadow-md ${
            isNear ? 'opacity-100' : 'opacity-0'
          } ${
            isDark
              ? 'bg-[#18181e] text-amber-300 border border-amber-400/30'
              : 'bg-white text-zinc-800 border border-zinc-200'
          }`}
          aria-hidden="true"
        >
          RESUME
        </span>
      </button>

      {/* Gentle Badge Sway Keyframe */}
      <style>{`
        @keyframes badgeSway {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          35% {
            transform: translateY(-1.5px) rotate(2deg);
          }
          70% {
            transform: translateY(-0.5px) rotate(-1.5deg);
          }
        }
      `}</style>
    </div>
  )
}

export default ResumeLanyardWidget
