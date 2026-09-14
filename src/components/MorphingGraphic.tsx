import React, { useEffect, useRef, useState } from 'react'
import { interpolate } from 'flubber'
import gsap from 'gsap'

// Distinct SVG paths representing Dev Jangid's core engineering domains
const PATHS = [
  // 1. Hexagonal Microprocessor / Embedded Core (Computer Science Engineering)
  "M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z",
  // 2. Terminal System Window (Full Stack & Systems Development)
  "M 15 15 L 85 15 L 85 85 L 15 85 Z",
  // 3. AI Gemini Diamond (Generative AI & Multimodal RAG)
  "M 50 8 L 92 50 L 50 92 L 8 50 Z",
  // 4. Satellite / CanSat Payload Cross (India Space Lab Aerospace)
  "M 35 15 L 65 15 L 65 35 L 85 35 L 85 65 L 65 65 L 65 85 L 35 85 L 35 65 L 15 65 L 15 35 L 35 35 Z"
]

const LABELS = [
  "SYSTEM://CS_ENGINEERING",
  "CORE://TERMINAL_SYSTEMS",
  "INTELLIGENCE://GEN_AI_RAG",
  "TELEMETRY://SPACE_PAYLOAD"
]

export const MorphingGraphic: React.FC<{ className?: string }> = ({ className = "" }) => {
  const pathRef = useRef<SVGPathElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isReducedMotion = useRef(false)

  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion.current) return

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % PATHS.length
      const pathEl = pathRef.current
      if (!pathEl) return

      try {
        const interpolator = interpolate(PATHS[currentIndex], PATHS[nextIndex], { maxSegmentLength: 2 })
        const state = { progress: 0 }

        gsap.to(state, {
          progress: 1,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (pathEl) {
              pathEl.setAttribute('d', interpolator(state.progress))
            }
          },
          onComplete: () => {
            setCurrentIndex(nextIndex)
          }
        })
      } catch {
        // Fallback if path interpolation encounters segment error
        if (pathEl) {
          pathEl.setAttribute('d', PATHS[nextIndex])
        }
        setCurrentIndex(nextIndex)
      }
    }, 3800)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-44 h-44 sm:w-56 sm:h-56 brutal-card flex items-center justify-center p-4 bg-white dark:bg-[#131720]">
        {/* Technical Corner Notches */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#CCFF00] brutal-border" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#CCFF00] brutal-border" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#CCFF00] brutal-border" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#CCFF00] brutal-border" />

        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CCFF00" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>

          {/* Background grid */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-gray-300 dark:text-gray-700" />
          
          {/* Morphing Path */}
          <path
            ref={pathRef}
            d={PATHS[currentIndex]}
            fill="rgba(204, 255, 0, 0.15)"
            stroke="#111317"
            strokeWidth="3.5"
            className="dark:stroke-[#CCFF00] transition-colors"
          />

          {/* Central Monogram */}
          <text
            x="50"
            y="56"
            fontFamily="'Space Grotesk', monospace"
            fontSize="18"
            fontWeight="900"
            fill="currentColor"
            textAnchor="middle"
            className="text-[#111317] dark:text-[#F4F7FB] select-none"
          >
            DJ
          </text>
        </svg>
      </div>

      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#111317] dark:bg-[#1E293B] text-[#CCFF00] text-xs font-mono font-bold brutal-border">
        <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
        {LABELS[currentIndex]}
      </div>
    </div>
  )
}
