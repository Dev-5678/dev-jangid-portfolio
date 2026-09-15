import React, { useEffect, useState, useRef } from 'react'

export const TargetCursor: React.FC = () => {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 })

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX
      pos.current.targetY = e.clientY

      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer')
      )
      setIsHovered(isInteractive)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    let rafId: number
    const animate = () => {
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.22
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.22

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 -ml-4 -mt-4 transition-transform duration-75 will-change-transform"
    >
      <div
        className={`relative flex items-center justify-center transition-all duration-200 ${
          isHovered
            ? 'w-10 h-10 scale-125 text-[#CCFF00]'
            : isClicked
            ? 'w-7 h-7 scale-90 text-[#FF5500]'
            : 'w-8 h-8 scale-100 text-[#00E5FF] dark:text-[#CCFF00]'
        }`}
      >
        {/* Top-left corner bracket */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
        {/* Top-right corner bracket */}
        <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
        {/* Bottom-left corner bracket */}
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
        {/* Bottom-right corner bracket */}
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />

        {/* Center dot */}
        <span
          className={`rounded-full transition-all ${
            isHovered
              ? 'w-2 h-2 bg-[#CCFF00] animate-ping'
              : 'w-1.5 h-1.5 bg-current'
          }`}
        />
      </div>
    </div>
  )
}

export default TargetCursor
