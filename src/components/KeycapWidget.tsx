import React, { useState } from 'react'

export interface KeycapWidgetProps {
  theme: 'light' | 'dark'
  onOpenCommandPalette: () => void
  className?: string
}

export const KeycapWidget: React.FC<KeycapWidgetProps> = ({
  theme,
  onOpenCommandPalette,
  className = ''
}) => {
  const [isNear, setIsNear] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const isDark = theme === 'dark'

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 240)
    onOpenCommandPalette()
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
            onOpenCommandPalette()
          }
        }}
        aria-label="Trigger Command Palette (⌘K)"
        title="Trigger Command Palette (⌘K)"
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
      >
        {/* 3D Mechanical Keyboard Keycap (Cherry MX profile) */}
        <div
          className={`relative px-2.5 py-1.5 rounded-[5px] transition-all duration-150 transform-gpu flex items-center justify-center border font-mono font-bold text-[10px] tracking-wider ${
            isDark
              ? 'bg-gradient-to-b from-[#252836] via-[#1c1e28] to-[#12131b] border-cyan-400/30 text-cyan-300'
              : 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border-cyan-600/30 text-cyan-700'
          }`}
          style={{
            transform: isPressed
              ? 'translateY(3px) scale(0.96)'
              : isNear
              ? 'translateY(-1px)'
              : 'translateY(0px)',
            boxShadow: isDark
              ? isPressed
                ? '0 1px 0 #0d0e14, 0 0 10px rgba(56, 189, 248, 0.4)'
                : isNear
                ? '0 4px 0 #0d0e14, 0 6px 14px rgba(0,0,0,0.6), 0 0 18px rgba(56, 189, 248, 0.75)'
                : '0 3px 0 #0d0e14, 0 4px 8px rgba(0,0,0,0.4)'
              : isPressed
              ? '0 1px 0 #cbd5e1'
              : isNear
              ? '0 4px 0 #cbd5e1, 0 6px 12px rgba(0,0,0,0.1), 0 0 14px rgba(14, 165, 233, 0.5)'
              : '0 3px 0 #cbd5e1, 0 4px 6px rgba(0,0,0,0.05)'
          }}
        >
          {/* Keycap top concave dish reflection */}
          <div
            className={`absolute inset-x-1 top-0.5 h-1 rounded-t-sm pointer-events-none ${
              isDark ? 'bg-white/10' : 'bg-white/60'
            }`}
          />

          {/* Key Legend */}
          <span className="relative z-10 flex items-center gap-1">
            <span className="text-[11px] leading-none">⌘</span>
            <span className="text-[10px] leading-none">K</span>
          </span>
        </div>

        {/* Minimalist Tooltip on Hover */}
        <span
          className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider pointer-events-none transition-opacity duration-200 z-50 shadow-md ${
            isNear ? 'opacity-100' : 'opacity-0'
          } ${
            isDark
              ? 'bg-[#121620] text-sky-300 border border-sky-400/30'
              : 'bg-white text-zinc-800 border border-zinc-200'
          }`}
          aria-hidden="true"
        >
          PALETTE
        </span>
      </button>
    </div>
  )
}

export default KeycapWidget
