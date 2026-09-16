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

const distCalc = (dist: number, radius: number, minVal: number, maxVal: number) =>
  Math.max(minVal, maxVal - Math.abs((maxVal * dist) / radius) + minVal)

export const TextPressure: React.FC<TextPressureProps> = ({
  text = 'DEV JANGID',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = 'rgba(255, 255, 255, 0.88)',
  strokeColor = '#A02A22',
  className = '',
  minFontSize = 16
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorTarget = useRef({ x: 0, y: 0 })

  const [fontSize, setFontSize] = useState<number>(minFontSize)
  const [scaleY, setScaleY] = useState<number>(1)
  const [lineHeight, setLineHeight] = useState<number>(1)

  const words = useMemo(() => text.split(' '), [text])
  const totalLetters = useMemo(() => words.reduce((acc, w) => acc + w.length, 0), [words])

  // Mouse & touch tracking with smooth lag interpolation
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

    const resetToCenter = () => {
      if (containerRef.current) {
        const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect()
        cursorTarget.current.x = left + w / 2
        cursorTarget.current.y = top + h / 2
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', resetToCenter, { passive: true })
    window.addEventListener('touchcancel', resetToCenter, { passive: true })
    document.addEventListener('mouseleave', resetToCenter)

    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect()
      mousePos.current.x = left + w / 2
      mousePos.current.y = top + h / 2
      cursorTarget.current.x = mousePos.current.x
      cursorTarget.current.y = mousePos.current.y
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', resetToCenter)
      window.removeEventListener('touchcancel', resetToCenter)
      document.removeEventListener('mouseleave', resetToCenter)
    }
  }, [])

  // Font size calculation (exact from reel)
  const handleResize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect()
    let calcFontSize =
      containerW < 640
        ? containerW / (0.72 * totalLetters)
        : containerW / (totalLetters / 2)
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
  }, [totalLetters, minFontSize, scale])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        handleResize()
      }, 100)
    }

    handleResize()
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [handleResize])

  // Continuous animation RAF loop (exact from reel)
  useEffect(() => {
    let rafId: number
    const animate = () => {
      mousePos.current.x += (cursorTarget.current.x - mousePos.current.x) / 15
      mousePos.current.y += (cursorTarget.current.y - mousePos.current.y) / 15

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect()
        const isMobile = window.innerWidth < 768
        const radius = isMobile
          ? Math.max(0.85 * titleRect.width, 0.45 * window.innerHeight)
          : Math.max(titleRect.width / 2, 350)

        spansRef.current.forEach((el) => {
          if (!el) return
          const u = el.getBoundingClientRect()
          const charCenter = {
            x: (u.left ?? (u as unknown as { x?: number }).x ?? 0) + u.width / 2,
            y: (u.top ?? (u as unknown as { y?: number }).y ?? 0) + u.height / 2
          }
          const dist = Math.sqrt(
            (charCenter.x - mousePos.current.x) ** 2 +
            (charCenter.y - mousePos.current.y) ** 2
          )

          const p = width
            ? Math.floor(distCalc(dist, radius, isMobile ? 25 : 5, isMobile ? 165 : 200))
            : 100
          const f = weight
            ? Math.floor(distCalc(dist, radius, 100, 900))
            : 400
          const m = italic
            ? distCalc(dist, radius, 0, 1).toFixed(2)
            : '0'
          const g = alpha
            ? distCalc(dist, radius, 0, 1).toFixed(2)
            : '1'

          const fontVar = `'wght' ${f}, 'wdth' ${p}, 'ital' ${m}`
          if (el.style.fontVariationSettings !== fontVar) {
            el.style.fontVariationSettings = fontVar
          }
          if (alpha && el.style.opacity !== g) {
            el.style.opacity = g
          }
        })
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()
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
      `}</style>
    ),
    [fontUrl, textColor, strokeColor]
  )

  const classNames = [className, flex ? 'tp-flex' : '', stroke ? 'tp-stroke' : ''].filter(Boolean).join(' ')

  let globalCharIndex = 0

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
          fontWeight: 100,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35em'
        }}
      >
        {words.map((word, wIdx) => (
          <span
            key={wIdx}
            style={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: word.length
            }}
          >
            {word.split('').map((char) => {
              const charIdx = globalCharIndex++
              return (
                <span
                  key={charIdx}
                  ref={(el) => {
                    spansRef.current[charIdx] = el
                  }}
                  data-char={char}
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
