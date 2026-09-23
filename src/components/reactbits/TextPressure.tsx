import React, { useEffect, useRef, useState, useCallback, useMemo, type CSSProperties } from 'react'

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
  fontFamily = 'Roboto Flex, sans-serif',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex: _flex = true,
  stroke = false,
  scale = false,
  textColor = 'rgba(255, 255, 255, 0.88)',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 16
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])
  const prevSettingsRef = useRef<string[]>([])
  const cachedCentersRef = useRef<{ x: number; y: number }[]>([])

  // The exact inertia cursor tracking from the reel:
  const mousePos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const isVisibleRef = useRef(true)

  const [fontSize, setFontSize] = useState<number>(minFontSize)
  const [scaleY, setScaleY] = useState<number>(1)
  const [lineHeight, setLineHeight] = useState<number>(1)

  // Split into individual words to ensure natural, reduced gap between words!
  const words = useMemo(() => text.trim().split(/\s+/), [text])
  const totalLetters = useMemo(() => text.replace(/\s+/g, '').length, [text])

  // Center target cursor directly in the middle of container (exact reel resting state!)
  const centerTarget = useCallback(() => {
    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect()
      targetPos.current.x = left + w / 2
      targetPos.current.y = top + h / 2
    }
  }, [])

  // Mouse & touch listeners matching the reel:
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX
      targetPos.current.y = e.clientY
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetPos.current.x = e.touches[0].clientX
        targetPos.current.y = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetPos.current.x = e.touches[0].clientX
        targetPos.current.y = e.touches[0].clientY
      }
    }

    // On initial load, center cursor immediately
    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect()
      mousePos.current.x = left + w / 2
      mousePos.current.y = top + h / 2
      targetPos.current.x = mousePos.current.x
      targetPos.current.y = mousePos.current.y
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', centerTarget, { passive: true })
    window.addEventListener('touchcancel', centerTarget, { passive: true })
    document.addEventListener('mouseleave', centerTarget)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', centerTarget)
      window.removeEventListener('touchcancel', centerTarget)
      document.removeEventListener('mouseleave', centerTarget)
    }
  }, [centerTarget])

  // Viewport intersection observer to pause loop when offscreen
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

  const maxDistRef = useRef<number>(350)
  const isSettledRef = useRef<boolean>(false)

  // Font size calculation adapted to reduce over-stretch and maintain crisp proportions at 100% zoom
  const updateGeometry = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect()
    let nextFontSize =
      containerW < 640
        ? (containerW * 0.76) / (0.74 * totalLetters)
        : (containerW * 0.74) / (totalLetters / 1.55)
    nextFontSize = Math.min(nextFontSize, containerW < 640 ? 44 : 76)
    nextFontSize = Math.max(nextFontSize, minFontSize)
    setFontSize(nextFontSize)
    setScaleY(1)
    setLineHeight(1)

    const isMobile = containerW < 768
    maxDistRef.current = isMobile
      ? Math.max(0.85 * containerW, 0.45 * window.innerHeight)
      : Math.max(containerW / 2, 350)

    centerTarget()
    isSettledRef.current = false

    requestAnimationFrame(() => {
      if (!titleRef.current) return
      const titleRect = titleRef.current.getBoundingClientRect()
      if (scale && titleRect.height > 0) {
        const ratio = containerH / titleRect.height
        setScaleY(ratio)
        setLineHeight(ratio)
      }

      // Pre-cache character center coordinates so the 60fps loop has 0 layout thrashing!
      cachedCentersRef.current = spansRef.current.map((el) => {
        if (!el) return { x: 0, y: 0 }
        const u = el.getBoundingClientRect()
        return {
          x: u.left + u.width / 2,
          y: u.top + u.height / 2
        }
      })
    })
  }, [totalLetters, minFontSize, scale, centerTarget])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateGeometry, 80)
    }

    updateGeometry()
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [updateGeometry])

  // Animation loop with unified WORD-LEVEL glow for DEV and JANGID
  useEffect(() => {
    let rafId: number

    const tick = () => {
      const diffX = targetPos.current.x - mousePos.current.x
      const diffY = targetPos.current.y - mousePos.current.y
      const isMoving = Math.abs(diffX) > 0.08 || Math.abs(diffY) > 0.08

      if (!isMoving && isSettledRef.current) {
        rafId = requestAnimationFrame(tick)
        return
      }

      // Smooth inertia interpolation (/ 15 as in the reel)
      mousePos.current.x += diffX / 15
      mousePos.current.y += diffY / 15

      if (!isMoving) {
        isSettledRef.current = true
      } else {
        isSettledRef.current = false
      }

      if (containerRef.current && isVisibleRef.current) {
        const maxDist = maxDistRef.current
        const spans = spansRef.current
        const centers = cachedCentersRef.current

        // Calculate unified word centers for "DEV" (indices 0..2) and "JANGID" (indices 3..8)
        const c0 = centers[0]
        const c2 = centers[2]
        const c3 = centers[3]
        const c8 = centers[8]

        const devCenterX = c0 && c2 ? (c0.x + c2.x) / 2 : 0
        const devCenterY = c0 && c2 ? (c0.y + c2.y) / 2 : 0

        const jangidCenterX = c3 && c8 ? (c3.x + c8.x) / 2 : 0
        const jangidCenterY = c3 && c8 ? (c3.y + c8.y) / 2 : 0

        const dDev = Math.hypot(devCenterX - mousePos.current.x, devCenterY - mousePos.current.y)
        const dJangid = Math.hypot(jangidCenterX - mousePos.current.x, jangidCenterY - mousePos.current.y)

        // Word-level proximities (entire DEV glows at once, entire JANGID glows at once!)
        const wordRadius = maxDist * 0.45
        const proxDev = Math.max(0, 1 - dDev / wordRadius)
        const proxJangid = Math.max(0, 1 - dJangid / wordRadius)

        for (let idx = 0; idx < spans.length; idx++) {
          const span = spans[idx]
          if (!span) continue

          // Indices 0, 1, 2 belong to "DEV"; indices 3..8 belong to "JANGID"
          const isDev = idx < 3
          const wordProx = isDev ? proxDev : proxJangid

          // Reduced stretch: max width clamped to 108, resting at 84 (clean, tight, muscular!)
          const wdth = width ? Math.floor(84 + (108 - 84) * wordProx) : 95
          const wght = weight ? Math.floor(550 + (850 - 550) * wordProx) : 700
          const ital = italic ? (0.6 * wordProx).toFixed(2) : '0'
          const liftY = -9 * (wordProx * wordProx)
          const scaleWord = 1 + 0.04 * wordProx

          const fontVar = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`

          if (prevSettingsRef.current[idx] !== fontVar) {
            prevSettingsRef.current[idx] = fontVar
            span.style.fontVariationSettings = fontVar
          }

          if (wordProx > 0.06) {
            span.style.transform = `translate3d(0, ${liftY.toFixed(1)}px, 0) scale(${scaleWord.toFixed(2)})`
            span.style.textShadow = `0 0 ${Math.round(18 * wordProx)}px rgba(252, 107, 47, ${(wordProx * 0.95).toFixed(2)}), 0 0 ${Math.round(36 * wordProx)}px rgba(252, 107, 47, ${(wordProx * 0.7).toFixed(2)})`
          } else {
            span.style.transform = 'translate3d(0, 0, 0) scale(1)'
            span.style.textShadow = 'none'
          }

          if (alpha && span.style.opacity !== '1') {
            span.style.opacity = '1'
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [width, weight, italic, alpha])

  const styleTag = useMemo(
    () => (
      <style>{`
        @import url('${fontUrl}');

        .tp-word-group {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.01em, 0.03em, 0.06em);
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .tp-word-group:hover {
          transform: translateY(-8px) scale(1.04);
        }

        .tp-word-group:hover span {
          font-variation-settings: 'wght' 850, 'wdth' 108, 'ital' 0 !important;
          text-shadow: 0 0 20px rgba(252, 107, 47, 1), 0 0 35px rgba(252, 107, 47, 0.75), 0 0 50px rgba(252, 107, 47, 0.4) !important;
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
        }

        .text-pressure-title span {
          display: inline-block;
          will-change: font-variation-settings, transform, text-shadow;
          user-select: none;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.25s ease-out, font-variation-settings 0.25s ease-out;
        }
      `}</style>
    ),
    [fontUrl, textColor, strokeColor]
  )

  let letterIndex = 0

  const titleStyle: CSSProperties = {
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
    fontWeight: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(0.28em, 1.2vw, 0.45em)' // Clean, natural, compact word spacing between DEV and JANGID!
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }}
    >
      {styleTag}
      <h1
        ref={titleRef}
        aria-label={text}
        className={`text-pressure-title ${stroke ? 'tp-stroke' : ''} ${className}`}
        style={titleStyle}
      >
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="tp-word-group">
            {word.split('').map((char) => {
              const charIdx = letterIndex++
              return (
                <span
                  key={charIdx}
                  ref={(el) => {
                    spansRef.current[charIdx] = el
                  }}
                  data-char={char}
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    color: stroke ? undefined : textColor
                  }}
                >
                  {char}
                </span>
              )
            })}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default TextPressure
