import React, { useEffect, useRef, useState, useId, useCallback } from 'react'
import { personalInfo } from '../data/portfolio'
import gsap from 'gsap'
import { ArrowRight, ShieldCheck, Cpu } from 'lucide-react'

interface PortalEntryProps {
  isOpen: boolean
  onEnter: () => void
}

const ORBIT_PILLS = [
  { label: "DSA & Algorithmic Logic", color: "#CCFF00" },
  { label: "Airports Authority of India (IT)", color: "#00E5FF" },
  { label: "Generative AI & Multimodal RAG", color: "#FF5500" },
  { label: "India Space Lab (CanSat / Telemetry)", color: "#CCFF00" },
  { label: "Gemini APIs & Vertex AI", color: "#00E5FF" },
  { label: "Full-Stack & Streamlit", color: "#FF5500" }
]

export const PortalEntry: React.FC<PortalEntryProps> = ({ isOpen, onEnter }) => {
  const portalRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const orbitsRef = useRef<HTMLDivElement>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const headingId = useId()

  const handleEnter = useCallback(() => {
    if (hasInteracted) return
    setHasInteracted(true)

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced || !portalRef.current) {
      onEnter()
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onEnter()
        }
      })

      tl.to(coreRef.current, {
        scale: 1.15,
        rotate: 3,
        duration: 0.35,
        ease: "power2.out"
      })
      .to(portalRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.inOut"
      })
    })

    return () => ctx.revert()
  }, [hasInteracted, onEnter])

  // Keyboard accessibility: Enter or Space triggers entry, Esc skips
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnter()
      } else if (e.key === 'Escape') {
        onEnter()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleEnter, onEnter])

  if (!isOpen) return null

  return (
    <div
      ref={portalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0D12]/95 backdrop-blur-md overflow-hidden select-none"
    >
      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      {/* Orbit Pill Rings (Background) */}
      <div
        ref={orbitsRef}
        className="absolute w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] md:w-[720px] md:h-[720px] rounded-full border border-dashed border-[#CCFF00]/25 animate-[spin_60s_linear_infinite] pointer-events-none flex items-center justify-center"
      >
        {ORBIT_PILLS.map((pill, idx) => {
          const angle = (idx / ORBIT_PILLS.length) * 360
          return (
            <div
              key={idx}
              className="absolute text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#CCFF00] whitespace-nowrap bg-[#141820] text-[#F4F7FB]"
              style={{
                transform: `rotate(${angle}deg) translate(clamp(160px, 35vw, 340px)) rotate(-${angle}deg)`
              }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: pill.color }} />
              {pill.label}
            </div>
          )
        })}
      </div>

      {/* Main Neo-Brutalist Interactive Core */}
      <div
        ref={coreRef}
        className="relative z-10 w-full max-w-lg brutal-card bg-[#FAF8F5] dark:bg-[#131720] p-6 sm:p-8 text-center text-[#111317] dark:text-[#F4F7FB] border-4 border-[#111317] dark:border-[#CCFF00] shadow-[8px_8px_0px_#111317] dark:shadow-[8px_8px_0px_#CCFF00]"
      >
        {/* Top Status Bar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-[#111317] dark:border-[#334155] font-mono text-xs text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] border border-[#111317] animate-ping" />
            <span className="font-bold tracking-wider text-[#111317] dark:text-[#CCFF00]">DEV_SYS://PORTAL_V1</span>
          </div>
          <span className="px-2 py-0.5 bg-[#111317] text-[#CCFF00] font-bold text-[10px]">
            {personalInfo.location}
          </span>
        </div>

        {/* Central Identity Graphic */}
        <div className="mx-auto my-4 w-24 h-24 sm:w-28 sm:h-28 brutal-card bg-[#CCFF00] text-[#111317] flex flex-col items-center justify-center border-4 border-[#111317] shadow-[4px_4px_0px_#111317]">
          <span className="text-4xl sm:text-5xl font-black font-sans tracking-tighter">
            {personalInfo.monogram}
          </span>
          <span className="text-[10px] font-mono font-bold tracking-widest mt-0.5">
            ENGINEERING
          </span>
        </div>

        {/* Headings */}
        <h1 id={headingId} className="text-2xl sm:text-3xl font-black tracking-tight text-[#111317] dark:text-[#F4F7FB] uppercase mt-2">
          {personalInfo.name}
        </h1>
        <p className="inline-block mt-1 font-mono text-xs sm:text-sm font-bold text-[#FF5500] dark:text-[#CCFF00] uppercase tracking-wider">
          {personalInfo.title}
        </p>

        <p className="mt-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
          Welcome to the interactive engineering logbook. Featuring experience at <strong className="text-[#111317] dark:text-[#F4F7FB]">Airports Authority of India</strong>, <strong className="text-[#111317] dark:text-[#F4F7FB]">India Space Lab</strong>, and <strong className="text-[#111317] dark:text-[#F4F7FB]">Generative AI RAG</strong> systems.
        </p>

        {/* Primary Tactile Enter CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleEnter}
            className="brutal-btn w-full sm:w-auto px-6 py-3.5 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111317] font-black font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-3 border-[#111317] shadow-[4px_4px_0px_#111317] focus:outline-none focus:ring-4 focus:ring-[#CCFF00]"
          >
            <span>Initialize &amp; Explore</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={onEnter}
            className="brutal-btn w-full sm:w-auto px-4 py-3 bg-white dark:bg-[#1A202C] text-[#111317] dark:text-[#F4F7FB] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border-2 border-[#111317] dark:border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
          >
            <span>Direct Access</span>
          </button>
        </div>

        {/* Micro Telemetry Bar */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
            REACT • TS • GSAP
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
            NEO-BRUTALISM V2
          </span>
        </div>
      </div>
    </div>
  )
}
