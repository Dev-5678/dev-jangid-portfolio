import React, { useEffect, useState, useRef } from 'react'

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)

  // Target mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 })
  // Lerped follower coordinates
  const followerPos = useRef({ x: -100, y: -100 })
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const animFrameId = useRef<number | null>(null)

  useEffect(() => {
    // Only enable custom cursor on fine pointers (desktops/laptops with mouse/trackpad)
    if (typeof window === 'undefined') return
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    setEnabled(true)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      // Direct update for center dot and ambient torch spotlight
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(160, 42, 34, 0.07), transparent 75%)`
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor-hover]')
        if (interactive) {
          setIsHovering(true)
          const customLabel = interactive.getAttribute('data-cursor-label')
          setHoverLabel(customLabel || null)
        } else {
          setIsHovering(false)
          setHoverLabel(null)
        }
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth linear interpolation animation loop for follower ring
    const renderLoop = () => {
      const lerpFactor = 0.18
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerpFactor
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerpFactor

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`
      }

      animFrameId.current = requestAnimationFrame(renderLoop)
    }

    animFrameId.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [visible])

  if (!enabled) return null

  return (
    <>
      {/* Full-viewport ambient dynamic torchlight following cursor */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Floating Center Dot (instant follow) */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? 'w-2 h-2 bg-ember shadow-[0_0_12px_#A02A22] scale-75'
              : isHovering
              ? 'w-3 h-3 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] scale-110'
              : 'w-2.5 h-2.5 bg-ember shadow-[0_0_10px_#A02A22]'
          }`}
        />
      </div>

      {/* Fluid Trailing Follower Ring (lerp follow with hover expansion) */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
            isClicking
              ? 'w-8 h-8 border-2 border-ember bg-ember/30 scale-90'
              : isHovering
              ? 'w-14 h-14 border border-ember bg-ember/15 shadow-[0_0_25px_rgba(160,42,34,0.4)] backdrop-blur-[2px]'
              : 'w-10 h-10 border border-white/30 bg-transparent'
          }`}
        >
          {hoverLabel && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold px-1.5 py-0.5 rounded bg-black/80 border border-white/20 whitespace-nowrap shadow-md">
              {hoverLabel}
            </span>
          )}
        </div>
      </div>
    </>
  )
}
