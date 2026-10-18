import React, { useState } from 'react'

export interface CrtTerminalWidgetProps {
  theme: 'light' | 'dark'
  onOpenConsole: () => void
  className?: string
}

export const CrtTerminalWidget: React.FC<CrtTerminalWidgetProps> = ({
  theme,
  onOpenConsole,
  className = ''
}) => {
  const [isNear, setIsNear] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const isDark = theme === 'dark'

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 240)
    onOpenConsole()
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
            onOpenConsole()
          }
        }}
        aria-label="Open Interactive Hacker CLI Console (~)"
        title="Open Interactive Hacker CLI Console (~)"
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
      >
        {/* Retro CRT Monitor Chassis */}
        <div
          className={`relative px-1.5 py-1 rounded-[5px] border transition-all duration-200 transform-gpu flex flex-col items-center ${
            isDark
              ? 'bg-[#181a20] border-white/15'
              : 'bg-zinc-200 border-zinc-400'
          }`}
          style={{
            transform: isPressed
              ? 'scale(0.94)'
              : isNear
              ? 'translateY(-1px)'
              : 'translateY(0px)',
            boxShadow: isDark
              ? isNear
                ? '0 0 16px rgba(34, 197, 94, 0.75), 0 3px 8px rgba(0,0,0,0.6)'
                : '0 2px 6px rgba(0,0,0,0.5)'
              : isNear
              ? '0 0 12px rgba(22, 163, 74, 0.5), 0 2px 4px rgba(0,0,0,0.1)'
              : '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {/* Curved CRT Display Screen */}
          <div
            className="relative w-7 h-5 rounded-[3px] bg-[#020b05] border border-emerald-950 flex items-center justify-center px-1 overflow-hidden"
            style={{
              boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.9)'
            }}
          >
            {/* Subtle Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(34, 197, 94, 0.25) 1px, rgba(34, 197, 94, 0.25) 2px)'
              }}
            />

            {/* Prompt & Blinking Phosphor Cursor */}
            <div className="relative z-10 flex items-center gap-0.5 font-mono text-[9px] font-bold text-emerald-400 leading-none">
              <span className="text-[8px] opacity-80">&gt;</span>
              <span className="text-emerald-300">_</span>
              <span className="inline-block w-1.5 h-2 bg-emerald-400 animate-pulse ml-0.5" />
            </div>
          </div>

          {/* Monitor Power LED */}
          <div className="w-full flex items-center justify-between px-0.5 mt-0.5">
            <span className="w-1 h-0.5 rounded-full bg-zinc-600" />
            <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
          </div>
        </div>

        {/* Minimalist Tooltip on Hover */}
        <span
          className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider pointer-events-none transition-opacity duration-200 z-50 shadow-md ${
            isNear ? 'opacity-100' : 'opacity-0'
          } ${
            isDark
              ? 'bg-[#0f1f16] text-emerald-300 border border-emerald-400/30'
              : 'bg-white text-zinc-800 border border-zinc-200'
          }`}
          aria-hidden="true"
        >
          CONSOLE
        </span>
      </button>
    </div>
  )
}

export default CrtTerminalWidget
