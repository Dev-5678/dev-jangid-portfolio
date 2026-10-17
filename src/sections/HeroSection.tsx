import React, { useEffect, useRef } from 'react'
import { TextPressure } from '../components/reactbits/TextPressure'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'

interface HeroSectionProps {
  onOpenResume?: () => void
  theme?: 'light' | 'dark'
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume: _onOpenResume, theme = 'dark' }) => {
  const heroRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      if (tagRef.current) gsap.set(tagRef.current, { opacity: 1 })
      if (descRef.current) gsap.set(descRef.current, { opacity: 1 })
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 })
      if (glowRef.current) gsap.set(glowRef.current, { opacity: 1 })
      if (scrollHintRef.current) gsap.set(scrollHintRef.current, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(glowRef.current, { opacity: 1, duration: 1.2 }, 0)
        .to(tagRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        .to(scrollHintRef.current, { opacity: 1, duration: 0.8 }, 0.6)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction"
      className="relative h-screen h-[100svh] min-h-[100svh] overflow-hidden select-none touch-pan-y"
      style={{ background: 'var(--bg-main)' }}
    >
      {/* 1. Subtle SVG Noise Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px'
        }}
        aria-hidden="true"
      />

      {/* 2. Ambient Radiant Ember Glow Orb behind Title */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[580px] sm:h-[580px] md:w-[750px] md:h-[750px] pointer-events-none opacity-0 z-[6] transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(252,107,47,0.18) 0%, rgba(160,42,34,0.08) 40%, transparent 68%)'
        }}
        aria-hidden="true"
      />



      {/* 4. Top-Left Status Pill Badge */}
      <div
        ref={tagRef}
        className="absolute top-16 sm:top-20 md:top-24 left-4 sm:left-6 md:left-14 lg:left-20 z-[40] opacity-0 flex items-center gap-2 sm:gap-2.5 max-w-[calc(100vw-5rem)] px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ember shadow-[0_0_8px_#fc6b2f]" />
        </span>
        <span
          className="text-[10px] sm:text-[11px] text-[#B5B5B5] tracking-[0.16em] sm:tracking-[0.22em] uppercase font-semibold truncate"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Shipping Ideas Into Reality.
        </span>
      </div>

      {/* 5. Engineering Subtitle & Capability Chips (Adaptive: centered on mobile, pinned bottom-left on desktop) */}
      <div
        ref={descRef}
        className="absolute bottom-[16%] sm:bottom-[15%] md:bottom-[11%] lg:bottom-[13%] left-4 right-4 sm:left-6 sm:right-6 md:left-14 md:right-auto lg:left-20 z-[40] max-w-[92vw] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] opacity-0 text-center md:text-left mx-auto md:mx-0"
      >
        <p
          className="text-[11.5px] sm:text-[13px] md:text-[14px] text-[#B5B5B5] leading-[1.6] sm:leading-[1.75] font-normal tracking-wide"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Full-Stack Developer &amp; Computer Science Engineer crafting fast, resilient, and motion-driven digital products.
        </p>
        <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-zinc-300 tracking-wider">
            AAI NetSec
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-zinc-300 tracking-wider">
            CanSat UHF
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-zinc-300 tracking-wider">
            Gemini RAG
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-zinc-300 tracking-wider">
            C++ Systems
          </span>
        </div>
      </div>

      {/* 6. Magnetic Action Buttons (Adaptive: side-by-side on mobile, stacked on desktop) */}
      <div
        ref={ctaRef}
        className="absolute bottom-11 sm:bottom-12 md:bottom-[10%] lg:bottom-[12%] left-4 right-4 sm:left-auto sm:right-6 md:right-14 lg:right-20 z-[40] opacity-0 flex flex-row md:flex-col justify-center sm:justify-end items-center md:items-end gap-2.5 sm:gap-3.5 max-w-sm sm:max-w-none mx-auto sm:mx-0"
      >
        <a
          href="#projects"
          className="relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-bold text-[12px] sm:text-[13px] tracking-wide transition-all duration-300 overflow-hidden cursor-pointer bg-ember hover:bg-ember-bright text-white border border-ember/70 shadow-[0_0_25px_rgba(160,42,34,0.55)] hover:shadow-[0_0_40px_rgba(252,107,47,0.75)] hover:scale-105 active:scale-95 group touch-manipulation flex-1 sm:flex-initial"
          title="Explore Engineering Highlights"
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
            <span className="w-6 h-6 rounded-full bg-black/30 border border-white/25 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:border-white/60 group-hover:bg-black/40 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </span>
            <span className="whitespace-nowrap">Explore More</span>
          </span>
        </a>

        <a
          href="#contact"
          className="relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-bold text-[12px] sm:text-[13px] tracking-wide transition-all duration-300 overflow-hidden cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 group touch-manipulation backdrop-blur-md flex-1 sm:flex-initial"
          title="Direct Contact Transmission"
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:border-white/50 group-hover:bg-white/20 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </span>
            <span className="whitespace-nowrap">Let's Talk</span>
          </span>
        </a>
      </div>

      {/* 7. Center Kinetic Bold Variable Typography with Radiant Ember Backlight */}
      <div
        className="absolute top-[38%] sm:top-[42%] md:top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] select-none w-full flex flex-col items-center justify-center px-3 sm:px-4"
        aria-hidden="true"
      >
        <div className="w-full max-w-[94vw] sm:max-w-[720px] md:max-w-[900px] lg:max-w-[1100px] h-[68px] sm:h-[95px] md:h-[135px] lg:h-[165px] relative flex items-center justify-center transform-gpu">
          {/* Luminous Ember Back-Aura (Hardware-accelerated on GPU, 0 CPU re-rasterization!) */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[130%] pointer-events-none -z-10 rounded-full"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(ellipse at center, rgba(252, 107, 47, 0.22) 0%, rgba(160, 42, 34, 0.08) 50%, transparent 75%)'
                : 'radial-gradient(ellipse at center, rgba(160, 42, 34, 0.12) 0%, transparent 70%)'
            }}
          />
          <div style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }} className="cursor-default pointer-events-auto">
            <TextPressure
              text="DEV JANGID"
              fontFamily="Roboto Flex"
              flex={true}
              scale={true}
              width={true}
              weight={true}
              italic={true}
              alpha={false}
              stroke={false}
              radius={0.5}
              smoothing={0.4}
              idle="wave"
              idleSpeed={1}
              clickRipple={true}
              textColor={theme === 'dark' ? '#ffffff' : '#111116'}
              minFontSize={28}
              className="text-pressure-title"
            />
          </div>
        </div>

        {/* Cinematic Sub-headline */}
        <div className="mt-4 sm:mt-8 md:mt-12 text-center z-[20] px-2">
          <p
            className="hero-line text-[clamp(0.64rem,2.4vw,0.88rem)] md:text-[clamp(0.74rem,1.1vw,0.92rem)] font-extrabold tracking-[0.15em] sm:tracking-[0.26em] uppercase text-ember [text-shadow:0_0_12px_rgba(252,107,47,0.6)]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Crafting Interfaces That People Remember.
          </p>
        </div>
      </div>

      {/* 8. Center Animated Kinetic Scroll Indicator (Positioned with safe clearance) */}
      <a
        href="#introduction"
        ref={scrollHintRef}
        className="hero-scroll-indicator absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[45] flex flex-col items-center gap-1 sm:gap-1.5 opacity-0 cursor-pointer group select-none transition-transform duration-300 hover:scale-105"
        aria-label="Scroll to Philosophy section"
      >
        <span
          className="text-[9px] text-ash tracking-[0.35em] uppercase font-mono font-medium transition-colors group-hover:text-ember"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Scroll
        </span>
        <div className="scroll-pill-track w-[18px] h-[28px] sm:h-[30px] rounded-full border border-white/20 group-hover:border-ember/60 transition-colors flex items-start justify-center p-1 relative overflow-hidden bg-white/5 backdrop-blur-sm">
          <div className="scroll-pill-dot w-1.5 h-1.5 rounded-full bg-ember shadow-[0_0_8px_#A02A22]" />
        </div>
      </a>
    </section>
  )
}

export default HeroSection
