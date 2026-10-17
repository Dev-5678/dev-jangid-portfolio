import React, { useEffect, useState, useRef, useCallback } from 'react'

interface ClickSpark {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  color: string
  size: number
  icon: string
}

const CUTE_ICONS = ['✦', '✧', '★', '•', '✨', '⭒']
const CUTE_COLORS = ['#fc6b2f', '#a02a22', '#22d3ee', '#34d399', '#fbbf24', '#f43f5e']

export const CustomCursor: React.FC = () => {
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)
  const [sparks, setSparks] = useState<ClickSpark[]>([])
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  // Target mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 })
  // Lerped follower coordinates
  const followerPos = useRef({ x: -100, y: -100 })
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const animFrameId = useRef<number | null>(null)
  const sparkIdCounter = useRef(0)

  // Trigger cute sparkling star burst & expanding ripple
  const triggerSparks = useCallback((clientX: number, clientY: number) => {
    const rippleId = Date.now() + Math.random()
    setRipples((prev) => [...prev.slice(-4), { id: rippleId, x: clientX, y: clientY }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId))
    }, 650)

    const newSparks: ClickSpark[] = []
    const count = 7
    for (let i = 0; i < count; i++) {
      const angle = (i * (360 / count) + Math.random() * 20) * (Math.PI / 180)
      newSparks.push({
        id: ++sparkIdCounter.current,
        x: clientX,
        y: clientY,
        angle,
        distance: 28 + Math.random() * 26,
        color: CUTE_COLORS[Math.floor(Math.random() * CUTE_COLORS.length)],
        size: 11 + Math.random() * 6,
        icon: CUTE_ICONS[Math.floor(Math.random() * CUTE_ICONS.length)]
      })
    }

    setSparks((prev) => [...prev.slice(-15), ...newSparks])
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.includes(s)))
    }, 550)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fineQuery = window.matchMedia('(pointer: fine)')
    setHasFinePointer(fineQuery.matches)

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches)
    }
    fineQuery.addEventListener('change', handlePointerChange)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (spotlightRef.current) {
        const isDark = document.documentElement.classList.contains('dark')
        const glowColor = isDark
          ? 'rgba(252, 107, 47, 0.12)'
          : 'rgba(160, 42, 34, 0.15)'
        spotlightRef.current.style.background = `radial-gradient(550px circle at ${e.clientX}px ${e.clientY}px, ${glowColor}, transparent 70%)`
      }

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

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      triggerSparks(e.clientX, e.clientY)
    }

    // Touch support: Tap creates sparkles on mobile phones & tablets too!
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0]
        triggerSparks(touch.clientX, touch.clientY)
      }
    }

    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth linear interpolation animation loop for follower ring
    const renderLoop = () => {
      const lerpFactor = 0.2
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerpFactor
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerpFactor

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`
      }

      animFrameId.current = requestAnimationFrame(renderLoop)
    }

    animFrameId.current = requestAnimationFrame(renderLoop)

    return () => {
      fineQuery.removeEventListener('change', handlePointerChange)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [visible, triggerSparks])

  return (
    <>
      {/* 1. Full-viewport ambient dynamic torchlight following cursor (fine pointers) */}
      {hasFinePointer && (
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
          aria-hidden="true"
        />
      )}

      {/* 2. Cute Sparkling Star Particles Burst (works on desktop mouse & mobile touch) */}
      {sparks.map((spark) => {
        const targetX = Math.cos(spark.angle) * spark.distance
        const targetY = Math.sin(spark.angle) * spark.distance
        return (
          <div
            key={spark.id}
            className="pointer-events-none fixed z-50 select-none font-bold animate-cute-spark"
            style={{
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              color: spark.color,
              fontSize: `${spark.size}px`,
              textShadow: `0 0 10px ${spark.color}`,
              '--target-x': `${targetX}px`,
              '--target-y': `${targetY}px`
            } as React.CSSProperties}
          >
            {spark.icon}
          </div>
        )
      })}

      {/* 3. Cute Expanding Ripple Ring on Click/Tap */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ember/70 animate-cute-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            boxShadow: '0 0 20px rgba(252, 107, 47, 0.6)'
          }}
        />
      ))}

      {/* 4. Floating Center Dot (fine pointer only) */}
      {hasFinePointer && (
        <div
          ref={dotRef}
          className={`pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <div
            className={`rounded-full transition-all duration-150 transform-gpu ${
              isClicking
                ? 'w-2 h-2 bg-[#fc6b2f] shadow-[0_0_18px_#fc6b2f] scale-125'
                : isHovering
                ? 'w-3.5 h-3.5 bg-white shadow-[0_0_20px_rgba(255,255,255,1)] scale-110'
                : 'w-2.5 h-2.5 bg-ember shadow-[0_0_14px_#a02a22,0_0_6px_#fc6b2f]'
            }`}
          />
        </div>
      )}

      {/* 5. Fluid Trailing Follower Ring with Glowing Aura (fine pointer only) */}
      {hasFinePointer && (
        <div
          ref={ringRef}
          className={`pointer-events-none fixed top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <div
            className={`flex items-center justify-center rounded-full transition-all duration-200 ease-out transform-gpu ${
              isClicking
                ? 'w-7 h-7 border-2 border-[#fc6b2f] bg-[#fc6b2f]/30 shadow-[0_0_25px_rgba(252,107,47,0.8)] scale-90'
                : isHovering
                ? 'w-14 h-14 border-2 border-ember bg-ember/20 shadow-[0_0_35px_rgba(160,42,34,0.7),inset_0_0_15px_rgba(252,107,47,0.3)] backdrop-blur-[2px] scale-110'
                : 'w-10 h-10 border border-ember/70 bg-ember/5 shadow-[0_0_18px_rgba(160,42,34,0.45)]'
            }`}
          >
            {hoverLabel && (
              <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold px-2 py-0.5 rounded-full bg-black/90 border border-white/30 whitespace-nowrap shadow-[0_0_15px_rgba(160,42,34,0.5)]">
                {hoverLabel}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CustomCursor
