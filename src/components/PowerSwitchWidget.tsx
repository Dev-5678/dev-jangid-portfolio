import React, { useState } from 'react'

export interface PowerSwitchWidgetProps {
  theme: 'light' | 'dark'
  isTLDR: boolean
  onToggleTLDR: () => void
  className?: string
}

export const PowerSwitchWidget: React.FC<PowerSwitchWidgetProps> = ({
  theme,
  isTLDR,
  onToggleTLDR,
  className = ''
}) => {
  const [isNear, setIsNear] = useState(false)
  const isDark = theme === 'dark'

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleTLDR()
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsNear(true)}
      onMouseLeave={() => setIsNear(false)}
    >
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            onToggleTLDR()
          }
        }}
        aria-label={`Toggle Recruiter TL;DR Mode: Currently ${isTLDR ? 'ON' : 'OFF'}`}
        aria-pressed={isTLDR}
        title={`Toggle Recruiter TL;DR Mode: Currently ${isTLDR ? 'ON' : 'OFF'}`}
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
      >
        {/* Cyberpunk High-Voltage Toggle Track */}
        <div
          className={`relative w-11 h-6 rounded-full p-0.5 transition-all duration-300 flex items-center border ${
            isTLDR
              ? isDark
                ? 'bg-amber-950/60 border-amber-400/80'
                : 'bg-amber-100 border-amber-500'
              : isDark
              ? 'bg-[#0e0f14] border-white/15'
              : 'bg-zinc-200 border-zinc-300'
          }`}
          style={{
            boxShadow: isTLDR
              ? isDark
                ? 'inset 0 1px 4px rgba(0,0,0,0.8), 0 0 16px rgba(245, 158, 11, 0.75), 0 0 30px rgba(252, 107, 47, 0.4)'
                : 'inset 0 1px 3px rgba(0,0,0,0.2), 0 0 12px rgba(245, 158, 11, 0.6)'
              : isNear
              ? isDark
                ? 'inset 0 1px 4px rgba(0,0,0,0.8), 0 0 8px rgba(255,255,255,0.15)'
                : 'inset 0 1px 3px rgba(0,0,0,0.1)'
              : 'inset 0 1px 4px rgba(0,0,0,0.8)'
          }}
        >
          {/* Subtle background state label inside track */}
          <span
            className={`absolute text-[7.5px] font-mono font-bold tracking-tight transition-opacity duration-300 ${
              isTLDR
                ? 'left-1.5 text-amber-300 opacity-90'
                : 'right-1.5 text-zinc-500 opacity-60'
            }`}
          >
            {isTLDR ? 'ON' : 'OFF'}
          </span>

          {/* High-Voltage Slider Knob / Power Breaker */}
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 transform-gpu shadow-md ${
              isTLDR
                ? 'translate-x-5 bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-100 text-zinc-950'
                : 'translate-x-0 bg-gradient-to-b from-zinc-500 via-zinc-600 to-zinc-700 text-zinc-400 border border-white/20'
            }`}
            style={{
              boxShadow: isTLDR
                ? '0 0 10px #f59e0b, 0 0 16px rgba(245, 158, 11, 0.9)'
                : '0 2px 4px rgba(0,0,0,0.4)'
            }}
          >
            {/* Lightning bolt icon inside knob */}
            <span
              className={`text-[9px] font-bold leading-none transform transition-transform duration-300 ${
                isTLDR ? 'scale-110 text-amber-950' : 'scale-90 text-zinc-300'
              }`}
            >
              ⚡
            </span>
          </div>
        </div>

        {/* Minimalist Tooltip on Hover */}
        <span
          className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider pointer-events-none transition-opacity duration-200 z-50 shadow-md ${
            isNear ? 'opacity-100' : 'opacity-0'
          } ${
            isDark
              ? 'bg-[#22170d] text-amber-300 border border-amber-400/50'
              : 'bg-white text-zinc-800 border border-zinc-200'
          }`}
          aria-hidden="true"
        >
          {isTLDR ? 'TL;DR: ON' : 'TL;DR: OFF'}
        </span>
      </button>
    </div>
  )
}

export default PowerSwitchWidget
