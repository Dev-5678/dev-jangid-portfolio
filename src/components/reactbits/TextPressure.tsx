import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'

export interface TextPressureProps {
  text?: string
  fontFamily?: string
  fontUrl?: string
  width?: boolean
  weight?: boolean
  italic?: boolean
  alpha?: boolean
  flex?: boolean
  stroke?: boolean
  scale?: boolean
  textColor?: string
  strokeColor?: string
  className?: string
  minFontSize?: number
}

interface LetterState {
  x: number
  y: number
  scale: number
  tilt: number
  brightness: number
}

export const TextPressure: React.FC<TextPressureProps> = ({
  text = 'DEV JANGID',
  fontFamily = "'Space Grotesk', 'Roboto Flex', sans-serif",
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width: _width = true,
  weight: _weight = true,
  italic: _italic = true,
  alpha: _alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#ffffff',
  strokeColor = '#A02A22',
  className = '',
  minFontSize = 28
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])

  // Hardware-accelerated letter physics state
  const letterStatesRef = useRef<LetterState[]>([])
  const charCentersRef = useRef<{ x: number; y: number }[]>([])
  const containerRectRef = useRef<{ left: number; top: number; width: number; height: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })

  const mousePos = useRef({ x: -3000, y: -3000 })
  const cursorTarget = useRef({ x: -3000, y: -3000 })
  const isVisibleRef = useRef(true)
  const isAnimatingRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  const [fontSize, setFontSize] = useState<number>(minFontSize)
  const [scaleY, setScaleY] = useState<number>(1)
  const [lineHeight, setLineHeight] = useState<number>(1)

  const chars = useMemo(() => text.split(''), [text])
  const letterCount = useMemo(() => chars.filter((c) => c !== ' ').length, [chars])

  // Initialize letter states
  useEffect(() => {
    letterStatesRef.current = chars
      .filter((c) => c !== ' ')
      .map(() => ({ x: 0, y: 0, scale: 1, tilt: 0, brightness: 1 }))
  }, [chars])

  // Start the pure GPU compositor animation loop on demand
  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    let idleCount = 0

    const animate = () => {
      if (!isVisibleRef.current) {
        isAnimatingRef.current = false
        rafIdRef.current = null
        return
      }

      // Smooth cursor position interpolation
      const dxTarget = cursorTarget.current.x - mousePos.current.x
      const dyTarget = cursorTarget.current.y - mousePos.current.y
      mousePos.current.x += dxTarget * 0.28
      mousePos.current.y += dyTarget * 0.28

      const containerW = containerRectRef.current.width || 800
      const isMobile = containerW < 768
      const radius = isMobile ? Math.max(containerW * 0.5, 180) : Math.max(containerW * 0.35, 260)

      const centers = charCentersRef.current
      const spans = spansRef.current
      const states = letterStatesRef.current

      let anyMoving = false

      for (let idx = 0; idx < spans.length; idx++) {
        const el = spans[idx]
        if (!el) continue

        const center = centers[idx]
        const charX = center ? center.x : 0
        const charY = center ? center.y : 0

        const dx = charX - mousePos.current.x
        const dy = charY - mousePos.current.y
        const dist = Math.hypot(dx, dy)

        let targetY = 0
        let targetX = 0
        let targetScale = 1
        let targetTilt = 0
        let targetBrightness = 1

        if (dist < radius) {
          const influence = 1 - dist / radius
          const power = influence * influence

          // Magnetic 3D lift: characters elevate gracefully toward cursor
          targetY = -power * 14
          // Magnetic expand: characters subtly grow in prominence
          targetScale = 1 + power * 0.12
          // Subtle lateral parting: fluid wave effect
          targetX = (dx / (dist + 0.1)) * power * -4
          // Subtle kinetic tilt: characters gently angle toward pointer
          targetTilt = -(dx / radius) * power * 7
          // Radiant luminous brightness flare
          targetBrightness = 1 + power * 0.35
        }

        const state = states[idx] || { x: 0, y: 0, scale: 1, tilt: 0, brightness: 1 }

        // Spring ease interpolation
        state.x += (targetX - state.x) * 0.25
        state.y += (targetY - state.y) * 0.25
        state.scale += (targetScale - state.scale) * 0.25
        state.tilt += (targetTilt - state.tilt) * 0.25
        state.brightness += (targetBrightness - state.brightness) * 0.25

        states[idx] = state

        // Check if still moving
        if (
          Math.abs(state.y - targetY) > 0.05 ||
          Math.abs(state.x - targetX) > 0.05 ||
          Math.abs(state.scale - targetScale) > 0.002
        ) {
          anyMoving = true
        }

        // Apply pure GPU transform & filter (Zero layout reflow, Zero font re-shaping!)
        el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) scale(${state.scale.toFixed(3)}) rotate(${state.tilt.toFixed(2)}deg)`
        if (targetBrightness > 1 || state.brightness > 1.01) {
          el.style.filter = `brightness(${state.brightness.toFixed(2)})`
        } else {
          el.style.filter = 'none'
        }
      }

      const cursorDistRemaining = Math.abs(dxTarget) + Math.abs(dyTarget)

      // When fully settled, sleep the rAF loop (0% CPU / 0% GPU)
      if (!anyMoving && cursorDistRemaining < 1) {
        idleCount++
        if (idleCount > 10) {
          // Snap clean resting state
          for (let idx = 0; idx < spans.length; idx++) {
            const el = spans[idx]
            if (el) {
              el.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)'
              el.style.filter = 'none'
            }
          }
          isAnimatingRef.current = false
          rafIdRef.current = null
          return
        }
      } else {
        idleCount = 0
      }

      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)
  }, [])

  // Mouse & Touch tracking with passive event triggers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorTarget.current.x = e.clientX
      cursorTarget.current.y = e.clientY
      startAnimation()
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        cursorTarget.current.x = e.touches[0].clientX
        cursorTarget.current.y = e.touches[0].clientY
        startAnimation()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        cursorTarget.current.x = e.touches[0].clientX
        cursorTarget.current.y = e.touches[0].clientY
        startAnimation()
      }
    }

    const resetToOffscreen = () => {
      cursorTarget.current = { x: -3000, y: -3000 }
      startAnimation()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', resetToOffscreen, { passive: true })
    window.addEventListener('touchcancel', resetToOffscreen, { passive: true })
    document.addEventListener('mouseleave', resetToOffscreen)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', resetToOffscreen)
      window.removeEventListener('touchcancel', resetToOffscreen)
      document.removeEventListener('mouseleave', resetToOffscreen)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [startAnimation])

  // Viewport intersection observer: sleep when scrolled away
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        } else if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
          isAnimatingRef.current = false
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startAnimation])

  // Measure and cache character centers in memory once on resize/mount
  const updateGeometry = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    containerRectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    }

    const effectiveChars = Math.max(letterCount + 1, 8)
    let calcFontSize =
      rect.width < 640
        ? (rect.width * 0.94) / (effectiveChars * 0.6)
        : (rect.width * 0.90) / (effectiveChars * 0.58)

    calcFontSize = Math.min(calcFontSize, rect.height * 0.92)
    calcFontSize = Math.max(calcFontSize, minFontSize)

    setFontSize(calcFontSize)
    setScaleY(1)
    setLineHeight(1)

    requestAnimationFrame(() => {
      if (!titleRef.current) return
      const titleRect = titleRef.current.getBoundingClientRect()
      if (scale && titleRect.height > 0) {
        const ratio = rect.height / titleRect.height
        setScaleY(ratio)
        setLineHeight(ratio)
      }

      charCentersRef.current = spansRef.current.map((el) => {
        if (!el) return { x: 0, y: 0 }
        const u = el.getBoundingClientRect()
        return {
          x: u.left + u.width / 2,
          y: u.top + u.height / 2
        }
      })
    })
  }, [letterCount, minFontSize, scale])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateGeometry, 60)
    }

    updateGeometry()
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [updateGeometry])

  const styleTag = useMemo(
    () => (
      <style>{`
        @import url('${fontUrl}');

        .tp-flex {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tp-stroke span {
          position: relative;
          color: ${textColor};
        }
        .tp-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
          font-weight: 850;
          letter-spacing: 0.04em;
          font-variation-settings: 'wght' 850, 'wdth' 105;
        }

        .text-pressure-title span {
          display: inline-block;
          font-weight: 850;
          transform-origin: center bottom;
          will-change: transform, filter;
          user-select: none;
        }
      `}</style>
    ),
    [fontUrl, textColor, strokeColor]
  )

  const classNames = [className, flex ? 'tp-flex' : '', stroke ? 'tp-stroke' : ''].filter(Boolean).join(' ')

  let letterIndex = 0

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }}>
      {styleTag}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${classNames}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: `${fontSize}px`,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 850,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.04em'
        }}
      >
        {chars.map((char, idx) => {
          if (char === ' ') {
            return (
              <span
                key={idx}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '0.45em',
                  minWidth: '0.3em',
                  flexShrink: 0
                }}
              >
                &nbsp;
              </span>
            )
          }

          const charIdx = letterIndex++
          return (
            <span
              key={idx}
              ref={(el) => {
                spansRef.current[charIdx] = el
              }}
              data-char={char}
              style={{
                display: 'inline-block',
                flexShrink: 0,
                textAlign: 'center',
                minWidth: '0.28em',
                color: stroke ? undefined : textColor
              }}
            >
              {char}
            </span>
          )
        })}
      </h1>
    </div>
  )
}

export default TextPressure
