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
  minFontSize = 24
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])
  const mousePos = useRef({ x: -1000, y: -1000 })
  const cursorTarget = useRef({ x: -1000, y: -1000 })
  const hasInteracted = useRef(false)

  const [fontSize, setFontSize] = useState<number>(minFontSize)
  const [scaleY, setScaleY] = useState<number>(1)
  const [lineHeight, setLineHeight] = useState<number>(1)

  const chars = useMemo(() => text.split(''), [text])
  const letterCount = useMemo(() => chars.filter((c) => c !== ' ').length, [chars])

  // Mouse & touch tracking with smooth lag interpolation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorTarget.current.x = e.clientX
      cursorTarget.current.y = e.clientY
      hasInteracted.current = true
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        cursorTarget.current.x = e.touches[0].clientX
        cursorTarget.current.y = e.touches[0].clientY
        hasInteracted.current = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        cursorTarget.current.x = e.touches[0].clientX
        cursorTarget.current.y = e.touches[0].clientY
        hasInteracted.current = true
      }
    }

    const handleTouchEnd = () => {
      // Gracefully let cursor fade out on touch release
      setTimeout(() => {
        cursorTarget.current = { x: -1000, y: -1000 }
      }, 800)
    }

    const resetToCenter = () => {
      cursorTarget.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })
    document.addEventListener('mouseleave', resetToCenter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      document.removeEventListener('mouseleave', resetToCenter)
    }
  }, [])

  // Proportional font sizing: text dynamically occupies container across all viewports
  const handleResize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect()

    const effectiveChars = Math.max(letterCount + 1, 8)
    let calcFontSize =
      containerW < 640
        ? (containerW * 0.95) / (effectiveChars * 0.58)
        : (containerW * 0.92) / (effectiveChars * 0.56)

    // Never exceed container height
    calcFontSize = Math.min(calcFontSize, containerH * 0.94)
    calcFontSize = Math.max(calcFontSize, minFontSize)

    setFontSize(calcFontSize)
    setScaleY(1)
    setLineHeight(1)

    requestAnimationFrame(() => {
      if (!titleRef.current) return
      const titleRect = titleRef.current.getBoundingClientRect()
      if (scale && titleRect.height > 0) {
        const ratio = containerH / titleRect.height
        setScaleY(ratio)
        setLineHeight(ratio)
      }
    })
  }, [letterCount, minFontSize, scale])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        handleResize()
      }, 80)
    }

    handleResize()
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [handleResize])

  // Continuous animation loop: High-contrast bold typography with ambient harmonic wave & kinetic pressure
  useEffect(() => {
    let rafId: number
    const animate = (timestamp: number) => {
      // Smooth interpolation toward target cursor
      mousePos.current.x += (cursorTarget.current.x - mousePos.current.x) * 0.12
      mousePos.current.y += (cursorTarget.current.y - mousePos.current.y) * 0.12

      if (titleRef.current) {
        const isMobile = window.innerWidth < 768
        const titleRect = titleRef.current.getBoundingClientRect()
        const radius = isMobile
          ? Math.max(0.7 * titleRect.width, 220)
          : Math.max(titleRect.width * 0.45, 340)

        const time = timestamp * 0.0022

        spansRef.current.forEach((el, idx) => {
          if (!el) return
          const u = el.getBoundingClientRect()
          const charCenter = {
            x: u.left + u.width / 2,
            y: u.top + u.height / 2
          }

          const dist = Math.hypot(charCenter.x - mousePos.current.x, charCenter.y - mousePos.current.y)
          const cursorInfluence = Math.max(0, 1 - dist / radius)

          // Living harmonic wave when idle or on touch devices
          const waveWght = Math.sin(time + idx * 0.55) * 65
          const waveWdth = Math.cos(time * 0.9 + idx * 0.55) * 14

          // High baseline weight: 740 base, flexing up to 1000 (Black) on hover, never below 650
          const f = weight
            ? Math.round(750 + cursorInfluence * 240 + (1 - cursorInfluence) * waveWght)
            : 800

          // Generous expansive width: 112 base, stretching up to 148 on hover, never below 96
          const p = width
            ? Math.round(112 + cursorInfluence * 34 + (1 - cursorInfluence) * waveWdth)
            : 110

          const m = italic ? (cursorInfluence * 0.75).toFixed(2) : '0'

          const fontVar = `'wght' ${Math.min(1000, Math.max(620, f))}, 'wdth' ${Math.min(151, Math.max(92, p))}, 'ital' ${m}`
          if (el.style.fontVariationSettings !== fontVar) {
            el.style.fontVariationSettings = fontVar
          }
        })
      }

      rafId = requestAnimationFrame(animate)
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
          font-weight: 850;
        }

        .text-pressure-title span {
          display: inline-block;
          font-weight: 850;
          will-change: font-variation-settings, transform;
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
