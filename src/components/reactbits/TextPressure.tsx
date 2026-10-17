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

// The exact distance mapping function from the Instagram reel (d6)
const distMap = (dist: number, maxDist: number, minVal: number, maxVal: number) =>
  Math.max(minVal, maxVal - Math.abs((maxVal * dist) / maxDist) + minVal)

export const TextPressure: React.FC<TextPressureProps> = ({
  text = 'DEV JANGID',
  fontFamily = 'Roboto Flex, sans-serif',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
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
  // mousePos is smoothed (lerps by / 15), targetPos is where the cursor currently is or rests at center
  const mousePos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const isVisibleRef = useRef(true)

  const [fontSize, setFontSize] = useState<number>(minFontSize)
  const [scaleY, setScaleY] = useState<number>(1)
  const [lineHeight, setLineHeight] = useState<number>(1)

  const chars = useMemo(() => text.split(''), [text])

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

  // Font size calculation from the reel:
  const updateGeometry = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect()
    let nextFontSize =
      containerW < 640
        ? containerW / (0.72 * chars.length)
        : containerW / (chars.length / 2)
    nextFontSize = Math.max(nextFontSize, minFontSize)
    setFontSize(nextFontSize)
    setScaleY(1)
    setLineHeight(1)

    centerTarget()

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
  }, [chars.length, minFontSize, scale, centerTarget])

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

  // The exact animation loop from the Instagram reel:
  useEffect(() => {
    let rafId: number

    const tick = () => {
      // Smooth inertia interpolation (/ 15 as in the reel)
      mousePos.current.x += (targetPos.current.x - mousePos.current.x) / 15
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) / 15

      if (containerRef.current && isVisibleRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const isMobile = window.innerWidth < 768
        const maxDist = isMobile
          ? Math.max(0.85 * rect.width, 0.45 * window.innerHeight)
          : Math.max(rect.width / 2, 350)

        const spans = spansRef.current
        const centers = cachedCentersRef.current

        for (let idx = 0; idx < spans.length; idx++) {
          const span = spans[idx]
          if (!span) continue

          const center = centers[idx]
          const cx = center ? center.x : 0
          const cy = center ? center.y : 0

          const dx = cx - mousePos.current.x
          const dy = cy - mousePos.current.y
          const d = Math.sqrt(dx * dx + dy * dy)

          // The exact reel formula:
          const wdth = width ? Math.floor(distMap(d, maxDist, isMobile ? 25 : 5, isMobile ? 165 : 200)) : 100
          const wght = weight ? Math.floor(distMap(d, maxDist, 100, 900)) : 400
          const ital = italic ? distMap(d, maxDist, 0, 1).toFixed(2) : '0'
          const alphaVal = alpha ? distMap(d, maxDist, 0, 1).toFixed(2) : '1'

          const fontVar = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`

          if (prevSettingsRef.current[idx] !== fontVar) {
            prevSettingsRef.current[idx] = fontVar
            span.style.fontVariationSettings = fontVar
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal
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

        .tp-flex {
          display: flex;
          justify-content: space-between;
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
          will-change: font-variation-settings;
          user-select: none;
        }
      `}</style>
    ),
    [fontUrl, textColor, strokeColor]
  )

  const classNames = [className, flex ? 'tp-flex' : '', stroke ? 'tp-stroke' : ''].filter(Boolean).join(' ')

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
    width: '100%'
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
        className={`text-pressure-title ${classNames}`}
        style={titleStyle}
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
      </h1>
    </div>
  )
}

export default TextPressure
