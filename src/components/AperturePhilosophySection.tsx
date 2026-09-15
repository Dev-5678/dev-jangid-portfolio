import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Radio, Sparkles, ChevronDown, Compass } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface AperturePhilosophySectionProps {
  onOpenResume?: () => void
}

export const AperturePhilosophySection: React.FC<AperturePhilosophySectionProps> = ({ onOpenResume }) => {
  const containerRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const apertureRingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      if (frameRef.current) gsap.set(frameRef.current, { clipPath: 'circle(150% at 50% 50%)' })
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, scale: 1 })
      if (hintRef.current) gsap.set(hintRef.current, { display: 'none' })
      if (apertureRingRef.current) gsap.set(apertureRingRef.current, { display: 'none' })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1
        }
      })

      // 1. Expand the aperture lens from circle(130px) to circle(140%)
      tl.fromTo(
        frameRef.current,
        {
          clipPath: 'circle(125px at 50% 50%)',
          WebkitClipPath: 'circle(125px at 50% 50%)'
        },
        {
          clipPath: 'circle(140% at 50% 50%)',
          WebkitClipPath: 'circle(140% at 50% 50%)',
          ease: 'power2.inOut',
          duration: 1
        },
        0
      )

      // 2. Scale up the pulsing outer ring before fading out
      tl.fromTo(
        apertureRingRef.current,
        { scale: 1, opacity: 1 },
        { scale: 3.2, opacity: 0, duration: 0.5, ease: 'power1.out' },
        0
      )

      // 3. Fade out the "Scroll to expand" prompt
      tl.to(
        hintRef.current,
        { opacity: 0, y: -20, duration: 0.35, ease: 'power1.in' },
        0.05
      )

      // 4. Fade in and reveal the manifesto content
      tl.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        0.25
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="philosophy"
      aria-label="Engineering Philosophy and Architecture"
      className="relative w-full h-screen overflow-hidden bg-[#FAF8F5] dark:bg-[#0A0D12] select-none"
    >
      {/* Scroll-Expanding Aperture Stage */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Pulsing Guide Ring Visible Before Expansion */}
        <div
          ref={apertureRingRef}
          className="absolute w-[260px] h-[260px] rounded-full border-2 border-dashed border-[#FF5500] dark:border-[#CCFF00] pointer-events-none z-20 flex items-center justify-center animate-spin"
          style={{ animationDuration: '30s' }}
        >
          <div className="w-[280px] h-[280px] rounded-full border border-[#FF5500]/30 dark:border-[#CCFF00]/30 absolute animate-ping" />
        </div>

        {/* Scroll Prompt & Title Hint (Visible Initially) */}
        <div
          ref={hintRef}
          className="absolute z-30 pointer-events-none flex flex-col items-center justify-center text-center px-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-[#131720]/90 border-2 border-[#111317] dark:border-[#CCFF00] shadow-[3px_3px_0px_#111317] dark:shadow-[3px_3px_0px_#CCFF00] mb-3 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#FF5500] dark:text-[#CCFF00] animate-spin" style={{ animationDuration: '10s' }} />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#111317] dark:text-[#CCFF00]">
              CORE MANIFESTO
            </span>
          </div>

          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#111317] dark:text-[#F4F7FB] flex items-center gap-1.5">
            <span>Scroll to expand portal</span>
            <ChevronDown className="w-4 h-4 text-[#FF5500] dark:text-[#CCFF00] animate-bounce" />
          </p>
        </div>

        {/* The Masked Frame That Expands Full Screen */}
        <div
          ref={frameRef}
          className="absolute inset-0 w-full h-full will-change-[clip-path] flex items-center justify-center overflow-hidden bg-[#0D1117] text-[#F4F7FB]"
          style={{
            clipPath: 'circle(125px at 50% 50%)',
            WebkitClipPath: 'circle(125px at 50% 50%)'
          }}
        >
          {/* Atmospheric Telemetry Grid Background */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(204, 255, 0, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(204, 255, 0, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Ambient Radial Vignette & Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.15) 0%, rgba(13, 17, 23, 0.95) 75%)'
            }}
          />

          {/* HUD Mission Watermark Coordinates */}
          <div className="absolute top-6 left-6 right-6 hidden md:flex justify-between items-center font-mono text-[10px] text-gray-400 tracking-widest uppercase pointer-events-none z-10 border-b border-white/10 pb-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span>SYS_TELEMETRY // LAT: 28.6139°N LON: 77.2090°E</span>
            </span>
            <span className="text-[#CCFF00]">DEV JANGID // CS_ENGINEERING</span>
            <span>AIRPORTS AUTH OF INDIA &amp; INDIA SPACE LAB</span>
          </div>

          {/* Cinematic Content Revealed Inside the Expanded Lens */}
          <div
            ref={contentRef}
            className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center justify-center opacity-0"
          >
            {/* Glowing Pill Category */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#CCFF00]/40 backdrop-blur-xl mb-6 shadow-[0_0_25px_rgba(204,255,0,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00] animate-pulse" />
              <span className="font-mono text-xs font-black tracking-[0.25em] uppercase text-[#CCFF00]">
                Engineering Philosophy
              </span>
            </div>

            {/* Bold Typographic Manifesto (The Design Flex Hook) */}
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight max-w-3xl drop-shadow-2xl mb-8 uppercase font-sans">
              "Great software is born where mathematical precision meets system-level resilience."
            </h2>

            <p className="text-xs sm:text-base md:text-lg text-gray-300 font-sans leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
              From enterprise network security architectures at the Airports Authority of India to orbital telemetry decoders at India Space Lab, I construct systems that stay deterministic under stress.
            </p>

            {/* 3 Mission-Critical Architecture Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl mb-8 text-left font-mono">
              <div className="p-3.5 bg-white/5 border border-white/15 backdrop-blur-md rounded-lg flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">AAI Compliance</div>
                  <div className="text-xs font-black text-white uppercase">Zero-Trust Segregation</div>
                </div>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/15 backdrop-blur-md rounded-lg flex items-start gap-3">
                <Radio className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">ISL CanSat Telemetry</div>
                  <div className="text-xs font-black text-white uppercase">433 MHz RF Decoders</div>
                </div>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/15 backdrop-blur-md rounded-lg flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Multimodal AI</div>
                  <div className="text-xs font-black text-white uppercase">Grounded RAG Pipeline</div>
                </div>
              </div>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#projects"
                className="px-6 py-2.5 bg-[#CCFF00] text-[#111317] font-mono text-xs font-black uppercase tracking-wider rounded hover:bg-[#b8e600] transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)] cursor-pointer"
              >
                Inspect Engineering Projects →
              </a>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors backdrop-blur-md cursor-pointer"
                >
                  Verified Credentials
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AperturePhilosophySection
