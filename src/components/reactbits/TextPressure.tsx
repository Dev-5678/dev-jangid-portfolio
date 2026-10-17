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
  minFontSize = 28
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])
  const prevSettingsRef = useRef<string[]>([])

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

  const [fontSize, setFontSize] = useState<number>(minFontSize)
  const [scaleY, setScaleY] = useState<number>(1)
  const [lineHeight, setLineHeight] = useState<number>(1)

  const chars = useMemo(() => text.split(''), [text])
  const letterCount = useMemo(() => chars.filter((c) => c !== ' ').length, [chars])

  // Mouse & Touch tracking with passive event triggers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorTarget.current.x = e.clientX
      cursorTarget.current.y = e.clientY
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        cursorTarget.current.x = e.touches[0].clientX
        cursorTarget.current.y = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        cursorTarget.current.x = e.touches[0].clientX
        cursorTarget.current.y = e.touches[0].clientY
      }
    }

    const resetToOffscreen = () => {
      cursorTarget.current = { x: -3000, y: -3000 }
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
    }
  }, [])

  // Viewport intersection observer: pause loop when off-screen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

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

  // High-performance animation loop: The signature kinetic variable font pressure morphing & harmonic wave
  useEffect(() => {
    let rafId: number
    let lastTime = 0

    const animate = (timestamp: number) => {
      rafId = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      // Throttle sub-millisecond computations (smooth 60-120fps)
      if (timestamp - lastTime < 14) return
      lastTime = timestamp

      // Smooth cursor interpolation
      mousePos.current.x += (cursorTarget.current.x - mousePos.current.x) * 0.18
      mousePos.current.y += (cursorTarget.current.y - mousePos.current.y) * 0.18

      const containerW = containerRectRef.current.width || 800
      const isMobile = containerW < 768
      const radius = isMobile ? Math.max(0.6 * containerW, 200) : Math.max(containerW * 0.42, 320)
      const time = timestamp * 0.0022

      const centers = charCentersRef.current
      const spans = spansRef.current

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

        // Harmonic organic breathing wave
        const waveWght = Math.sin(time + idx * 0.55) * 65
        const waveWdth = Math.cos(time * 0.9 + idx * 0.55) * 14

        // Bold baseline: 750 weight, flexing up to 1000 Black directly under cursor
        const rawWght = weight
          ? 750 + cursorInfluence * 240 + (1 - cursorInfluence) * waveWght
          : 800

        // Expansive baseline: 112 width, expanding up to 148 on hover
        const rawWdth = width
          ? 112 + cursorInfluence * 34 + (1 - cursorInfluence) * waveWdth
          : 110

        // Kinetic italic slant angle
        const rawItal = italic ? cursorInfluence * 0.75 : 0

        // Step-quantization prevents micro-thrashing and maximizes glyph cache hits
        const clampedWght = Math.min(1000, Math.max(620, Math.round(rawWght / 6) * 6))
        const clampedWdth = Math.min(151, Math.max(92, Math.round(rawWdth / 2) * 2))
        const clampedItal = (Math.round(rawItal * 20) / 20).toFixed(2)

        const fontVar = `'wght' ${clampedWght}, 'wdth' ${clampedWdth}, 'ital' ${clampedItal}`

        if (prevSettingsRef.current[idx] !== fontVar) {
          prevSettingsRef.current[idx] = fontVar
          el.style.fontVariationSettings = fontVar
        }
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [width, weight, italic])

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
          letter-spacing: 0.04em;
        }

        .text-pressure-title span {
          display: inline-block;
          will-change: font-variation-settings;
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
