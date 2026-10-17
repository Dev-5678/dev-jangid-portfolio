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

const BASE_WGHT = 750
const BASE_WDTH = 105

export const TextPressure: React.FC<TextPressureProps> = ({
  text = 'DEV JANGID',
  fontFamily = 'Roboto Flex, Space Grotesk, sans-serif',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha: _alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#ffffff',
  strokeColor = '#A02A22',
  className = '',
  minFontSize = 24
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])
  const prevSettingsRef = useRef<string[]>([])

  // In-memory cache for character centers (Zero getBoundingClientRect in rAF!)
  const charCentersRef = useRef<{ x: number; y: number }[]>([])
  const containerRectRef = useRef<{ left: number; top: number; width: number; height: number }>({ left: 0, top: 0, width: 0, height: 0 })

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

  // Start the interaction animation loop on demand
  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    let idleFrames = 0

    const animate = () => {
      // If hero scrolled out of view, sleep
      if (!isVisibleRef.current) {
        isAnimatingRef.current = false
        rafIdRef.current = null
        return
      }

      // Smooth cursor position interpolation
      const dxTarget = cursorTarget.current.x - mousePos.current.x
      const dyTarget = cursorTarget.current.y - mousePos.current.y
      mousePos.current.x += dxTarget * 0.2
      mousePos.current.y += dyTarget * 0.2

      const containerW = containerRectRef.current.width || 800
      const isMobile = containerW < 768
      const radius = isMobile ? Math.max(0.55 * containerW, 200) : Math.max(containerW * 0.38, 280)

      const centers = charCentersRef.current
      const spans = spansRef.current
      let anyActive = false

      for (let idx = 0; idx < spans.length; idx++) {
        const el = spans[idx]
        if (!el) continue

        const center = centers[idx]
        const charX = center ? center.x : 0
        const charY = center ? center.y : 0

        const dx = charX - mousePos.current.x
        const dy = charY - mousePos.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const cursorInfluence = Math.max(0, 1 - dist / radius)

        if (cursorInfluence > 0.01) {
          anyActive = true
        }

        // Target weight and width calculated purely from cursor proximity
        const targetWght = weight ? Math.round(BASE_WGHT + cursorInfluence * 220) : BASE_WGHT
        const targetWdth = width ? Math.round(BASE_WDTH + cursorInfluence * 26) : BASE_WDTH
        const targetItal = italic ? (cursorInfluence * 0.5).toFixed(2) : '0'

        const fontVar = `'wght' ${targetWght}, 'wdth' ${targetWdth}, 'ital' ${targetItal}`

        if (prevSettingsRef.current[idx] !== fontVar) {
          prevSettingsRef.current[idx] = fontVar
          el.style.fontVariationSettings = fontVar
        }
      }

      // If cursor is stationary or far away, sleep the loop after settling
      const cursorDistRemaining = Math.abs(dxTarget) + Math.abs(dyTarget)
      if (!anyActive && cursorDistRemaining < 1) {
        idleFrames++
        if (idleFrames > 12) {
          // Reset all characters to clean resting baseline
          const baseVar = `'wght' ${BASE_WGHT}, 'wdth' ${BASE_WDTH}, 'ital' 0`
          for (let idx = 0; idx < spans.length; idx++) {
            const el = spans[idx]
            if (el && prevSettingsRef.current[idx] !== baseVar) {
              prevSettingsRef.current[idx] = baseVar
              el.style.fontVariationSettings = baseVar
            }
          }
          isAnimatingRef.current = false
          rafIdRef.current = null
          return
        }
      } else {
        idleFrames = 0
      }

      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)
  }, [width, weight, italic])

  // Mouse & touch tracking with passive event triggers
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

  // Viewport visibility observer: pause animation when hero is off-screen
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

  // Proportional font sizing: measures and caches geometry ONCE on resize/mount
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

    // Pre-measure character positions in next frame
    requestAnimationFrame(() => {
      if (!titleRef.current) return
      const titleRect = titleRef.current.getBoundingClientRect()
      if (scale && titleRect.height > 0) {
        const ratio = rect.height / titleRect.height
        setScaleY(ratio)
        setLineHeight(ratio)
      }

      // Cache all letter center coordinates in memory
      charCentersRef.current = spansRef.current.map((el) => {
        if (!el) return { x: 0, y: 0 }
        const u = el.getBoundingClientRect()
        return {
          x: u.left + u.width / 2,
          y: u.top + u.height / 2
        }
      })

      // Set initial clean resting baseline
      const baseVar = `'wght' ${BASE_WGHT}, 'wdth' ${BASE_WDTH}, 'ital' 0`
      spansRef.current.forEach((el, idx) => {
        if (el) {
          el.style.fontVariationSettings = baseVar
          prevSettingsRef.current[idx] = baseVar
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
          font-weight: 750;
          letter-spacing: 0.04em;
        }

        .text-pressure-title span {
          display: inline-block;
          font-weight: 750;
          will-change: font-variation-settings;
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
          fontWeight: 750,
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
