import React, { useEffect, useLayoutEffect, useRef, useState, useMemo, type CSSProperties } from 'react'

type IdleMode = 'none' | 'wave' | 'pulse'

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
  radius?: number
  smoothing?: number
  idle?: IdleMode
  idleSpeed?: number
  clickRipple?: boolean
  textColor?: string
  pressureColor?: string
  strokeColor?: string
  strokeWidth?: number
  className?: string
  minFontSize?: number
}

interface Point {
  x: number
  y: number
}

interface Ripple extends Point {
  start: number
}

interface PressureOptions {
  width: boolean
  weight: boolean
  italic: boolean
  alpha: boolean
  radius: number
  smoothing: number
  idle: IdleMode
  idleSpeed: number
  clickRipple: boolean
  textColor: string
  pressureColor: string
}

interface AppliedStyle {
  span: HTMLSpanElement
  settings: string
  alphaVal: string
  color: string
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const RIPPLE_LIFE = 1.3
const MAX_RIPPLES = 6
const WAVE_PERIOD = 3.2
const PULSE_PERIOD = 2.8
const PULSE_DEPTH = 0.42

const dist = (a: Point, b: Point) => {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const getIdlePressure = (mode: IdleMode, position: number, clock: number, spread: number) => {
  if (mode === 'wave') {
    const crest = 0.5 + 0.5 * Math.cos(Math.PI * 2 * (position / spread - clock / WAVE_PERIOD))
    return crest * crest
  }
  if (mode === 'pulse') {
    const lag = Math.abs(position - 0.5) * 0.4
    const breath = 0.5 - 0.5 * Math.cos(Math.PI * 2 * (clock / PULSE_PERIOD - lag))
    return PULSE_DEPTH * breath * breath * (3 - 2 * breath)
  }
  return 0
}

const getRipplePressure = (ripples: Ripple[], point: Point, now: number, span: number) => {
  const band = Math.max(span * 0.14, 32)
  let total = 0
  for (const ripple of ripples) {
    const age = (now - ripple.start) / 1000
    if (age <= 0 || age >= RIPPLE_LIFE) continue
    const offset = (dist(ripple, point) - age * span * 1.25) / band
    if (offset <= -1 || offset >= 1) continue
    const fade = 1 - age / RIPPLE_LIFE
    const swell = (1 - offset * offset) ** 2 * fade * fade * Math.min(1, age / 0.06)
    total = 1 - (1 - total) * (1 - swell)
  }
  return total
}

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
  scale = true,

  radius = 0.5,
  smoothing = 0.4,

  idle = 'wave',
  idleSpeed = 1,
  clickRipple = true,

  textColor = 'currentColor',
  pressureColor = '',
  strokeColor = '#A02A22',
  strokeWidth = 3,
  className = '',

  minFontSize = 28
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])
  const wakeRef = useRef<(() => void) | null>(null)
  const visibleRef = useRef(true)
  const ripplesRef = useRef<Ripple[]>([])

  // Geometry cache: eliminates getBoundingClientRect layout thrashing inside rAF
  const cachedCentersRef = useRef<(Point | null)[]>([])
  const cachedTitleRectRef = useRef<{ left: number; top: number; width: number; height: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })

  const optionsRef = useRef<PressureOptions>({
    width,
    weight,
    italic,
    alpha,
    radius,
    smoothing,
    idle,
    idleSpeed,
    clickRipple,
    textColor,
    pressureColor
  })

  const mouseRef = useRef<Point>({ x: -3000, y: -3000 })
  const cursorRef = useRef<Point & { seen: boolean }>({ x: -3000, y: -3000, seen: false })

  const [fontSize, setFontSize] = useState(minFontSize)
  const [scaleY, setScaleY] = useState(1)

  const chars = useMemo(() => Array.from(text), [text])

  useEffect(() => {
    optionsRef.current = {
      width,
      weight,
      italic,
      alpha,
      radius,
      smoothing,
      idle,
      idleSpeed,
      clickRipple,
      textColor,
      pressureColor
    }
    wakeRef.current?.()
  }, [width, weight, italic, alpha, radius, smoothing, idle, idleSpeed, clickRipple, textColor, pressureColor])

  // Mouse, touch and ripple listeners
  useEffect(() => {
    const container = containerRef.current
    const cursor = cursorRef.current
    const wake = () => wakeRef.current?.()
    const track = (x: number, y: number) => {
      cursor.x = x
      cursor.y = y
      cursor.seen = true
      wake()
    }
    const handleMouseMove = (e: MouseEvent) => track(e.clientX, e.clientY)
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) track(t.clientX, t.clientY)
    }
    const handleLeave = () => {
      cursor.seen = false
      wake()
    }
    const handlePress = (e: PointerEvent) => {
      if (!optionsRef.current.clickRipple) return
      const ripples = ripplesRef.current
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() })
      if (ripples.length > MAX_RIPPLES) ripples.shift()
      wake()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouch, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    window.addEventListener('touchend', handleLeave)
    window.addEventListener('touchcancel', handleLeave)
    window.addEventListener('scroll', wake, { passive: true, capture: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    document.fonts?.addEventListener?.('loadingdone', wake)
    container?.addEventListener('pointerdown', handlePress)

    if (container) {
      const { left, top, width: w, height: h } = container.getBoundingClientRect()
      mouseRef.current.x = left + w / 2
      mouseRef.current.y = top + h / 2
      cursor.x = mouseRef.current.x
      cursor.y = mouseRef.current.y
    }

    let observer: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined' && container) {
      observer = new IntersectionObserver(([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) wake()
      })
      observer.observe(container)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchend', handleLeave)
      window.removeEventListener('touchcancel', handleLeave)
      window.removeEventListener('scroll', wake, { capture: true })
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      document.fonts?.removeEventListener?.('loadingdone', wake)
      container?.removeEventListener('pointerdown', handlePress)
      observer?.disconnect()
    }
  }, [])

  // Proportional font sizing and scaleY computation
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateGeometry = () => {
      const { width: containerW, height: containerH } = container.getBoundingClientRect()
      const effectiveLen = Math.max(chars.length, 6)
      const nextFontSize = Math.max(containerW < 640 ? containerW / (effectiveLen * 0.58) : containerW / (effectiveLen * 0.54), minFontSize)
      setFontSize(nextFontSize)
      setScaleY(scale && containerH > 0 ? containerH / nextFontSize : 1)

      // Cache span centers in the next microtask after styles apply
      requestAnimationFrame(() => {
        if (!titleRef.current) return
        const tRect = titleRef.current.getBoundingClientRect()
        cachedTitleRectRef.current = {
          left: tRect.left,
          top: tRect.top,
          width: tRect.width,
          height: tRect.height
        }
        cachedCentersRef.current = spansRef.current.map((span) => {
          if (!span) return null
          const rect = span.getBoundingClientRect()
          return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
        })
      })
    }

    updateGeometry()

    let timeoutId: ReturnType<typeof setTimeout>
    const debounced = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateGeometry, 50)
    }

    window.addEventListener('resize', debounced)
    return () => window.removeEventListener('resize', debounced)
  }, [chars.length, minFontSize, scale])

  // Reel-Authentic Animation Loop with Living Wave, Kinetic Pressure & Click Shockwave
  useEffect(() => {
    const title = titleRef.current
    const container = containerRef.current
    if (!title || !container) return

    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const applied: AppliedStyle[] = []
    let rafId = 0
    let last = 0
    let idleFrames = 0
    let clock = 0
    let engage = optionsRef.current.idle === 'wave' || optionsRef.current.idle === 'pulse' ? 0 : 1

    const tick = (now: number) => {
      rafId = 0
      const elapsed = last ? Math.min(now - last, 64) : 1000 / 60
      last = now

      const options = optionsRef.current
      const idleMode: IdleMode =
        (options.idle === 'wave' || options.idle === 'pulse') && !motionQuery?.matches ? options.idle : 'none'
      const mouse = mouseRef.current
      const cursor = cursorRef.current
      const lag = 1000 * options.smoothing * options.smoothing
      const follow = lag > 1 ? 1 - Math.exp(-elapsed / lag) : 1
      mouse.x += (cursor.x - mouse.x) * follow
      mouse.y += (cursor.y - mouse.y) * follow

      let present = 1
      if (idleMode !== 'none') {
        const box = container.getBoundingClientRect()
        const inside = cursor.x >= box.left && cursor.x <= box.right && cursor.y >= box.top && cursor.y <= box.bottom
        present = cursor.seen && inside ? 1 : 0
      }
      engage += (present - engage) * (1 - Math.exp(-elapsed / 320))
      if (Math.abs(present - engage) < 0.002) engage = present
      const idling = idleMode !== 'none' && engage < 1

      if (idling) clock += (elapsed / 1000) * options.idleSpeed

      const ripples = ripplesRef.current
      while (ripples.length && now - ripples[0].start > RIPPLE_LIFE * 1000) ripples.shift()

      const titleRect = cachedTitleRectRef.current.width > 0 ? cachedTitleRectRef.current : title.getBoundingClientRect()
      const maxDist = Math.max(titleRect.width * options.radius, 1)
      const spread = Math.max(options.radius * 2, 0.2)
      const spans = spansRef.current
      const centers = cachedCentersRef.current.length === spans.length
        ? cachedCentersRef.current
        : spans.map(span => {
            if (!span) return null
            const rect = span.getBoundingClientRect()
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
          })

      let changed = false
      spans.forEach((span, i) => {
        const center = centers[i]
        if (!span || !center) return

        let pressure = clamp01(1 - dist(mouse, center) / maxDist)
        if (idling) {
          const position = (center.x - titleRect.left) / Math.max(titleRect.width, 1)
          const resting = getIdlePressure(idleMode, position, clock, spread)
          pressure = resting + (pressure - resting) * engage
        }
        if (ripples.length) {
          const swell = getRipplePressure(ripples, center, now, titleRect.width)
          pressure = 1 - (1 - pressure) * (1 - swell)
        }

        const wdth = options.width ? Math.floor(50 + 150 * pressure) : 100
        const wght = options.weight ? Math.floor(200 + 750 * pressure) : 600
        const italVal = options.italic ? pressure.toFixed(2) : '0'
        const alphaVal = options.alpha ? pressure.toFixed(2) : ''
        const tint = Math.round((1 - (1 - pressure) * (1 - pressure)) * 100)
        const color = options.pressureColor
          ? `color-mix(in oklab, ${options.pressureColor} ${tint}%, ${options.textColor})`
          : ''
        const settings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`
        const previous = applied[i]

        if (
          !previous ||
          previous.span !== span ||
          previous.settings !== settings ||
          previous.alphaVal !== alphaVal ||
          previous.color !== color
        ) {
          span.style.fontVariationSettings = settings
          if (alphaVal) span.style.opacity = alphaVal
          if (color) span.style.color = color
          applied[i] = { span, settings, alphaVal, color }
          changed = true
        }
      })

      const moving = Math.abs(cursor.x - mouse.x) > 0.1 || Math.abs(cursor.y - mouse.y) > 0.1
      const animating = moving || idling || engage !== present || ripples.length > 0
      idleFrames = animating ? 0 : idleFrames + 1

      if (animating || (changed && idleFrames < 60)) rafId = requestAnimationFrame(tick)
      else last = 0
    }

    const wake = () => {
      if (!rafId && visibleRef.current) rafId = requestAnimationFrame(tick)
    }

    wakeRef.current = wake
    wake()

    return () => {
      cancelAnimationFrame(rafId)
      wakeRef.current = null
    }
  }, [])

  useEffect(() => {
    wakeRef.current?.()
  }, [fontSize, scaleY, text, flex, fontFamily])

  const titleStyle: CSSProperties = {
    fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: 1,
    transform: `scale(1, ${scaleY})`,
    transformOrigin: 'center top',
    fontWeight: 300,
    color: textColor,
    '--text-pressure-stroke-width': `${strokeWidth}px`,
    '--text-pressure-stroke-color': strokeColor
  } as CSSProperties

  return (
    <div ref={containerRef} className="relative w-full h-full bg-transparent overflow-hidden">
      <style>{`
        @import url('${fontUrl}');

        .text-pressure-title.is-stroke span {
          position: relative;
        }

        .text-pressure-title.is-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: var(--text-pressure-stroke-width);
          -webkit-text-stroke-color: var(--text-pressure-stroke-color);
        }
      `}</style>
      <h1
        ref={titleRef}
        aria-label={text}
        className={`text-pressure-title m-0 w-full uppercase tracking-tighter select-none cursor-pointer ${
          flex ? 'flex justify-between items-center' : ''
        } ${stroke ? 'is-stroke' : ''} ${className}`}
        style={titleStyle}
      >
        {chars.map((char: string, i: number) => {
          if (char === ' ') {
            return (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '0.35em',
                  minWidth: '0.25em',
                  flexShrink: 0
                }}
              >
                &nbsp;
              </span>
            )
          }

          return (
            <span
              key={i}
              ref={(el) => {
                spansRef.current[i] = el
              }}
              data-char={char}
              aria-hidden="true"
              className="inline-block"
              style={{
                display: 'inline-block',
                color: textColor
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
