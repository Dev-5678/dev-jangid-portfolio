import React, { useEffect, useRef } from 'react'
import { TextPressure } from '../components/reactbits/TextPressure'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'

interface HeroSectionProps {
  onOpenResume?: () => void
  theme?: 'light' | 'dark'
}

// Exact floating atmospheric dust particles from the reel
const DUST_PARTICLES = [
  { size: 2.1, isEmber: true, top: 12, left: 8, duration: 6.2, delay: 0 },
  { size: 1.5, isEmber: false, top: 25, left: 82, duration: 7.4, delay: 0.6 },
  { size: 2.8, isEmber: false, top: 40, left: 15, duration: 5.8, delay: 1.2 },
  { size: 1.2, isEmber: true, top: 58, left: 91, duration: 8.1, delay: 1.8 },
  { size: 2.4, isEmber: false, top: 72, left: 24, duration: 6.9, delay: 2.4 },
  { size: 1.8, isEmber: false, top: 18, left: 64, duration: 5.5, delay: 3 },
  { size: 2.6, isEmber: true, top: 84, left: 45, duration: 7.8, delay: 3.6 },
  { size: 1.4, isEmber: false, top: 33, left: 37, duration: 6.1, delay: 4.2 },
  { size: 2.2, isEmber: false, top: 67, left: 78, duration: 8.5, delay: 4.8 },
  { size: 1.6, isEmber: true, top: 50, left: 6, duration: 5.2, delay: 5.4 },
  { size: 2.5, isEmber: false, top: 28, left: 95, duration: 7.1, delay: 6 },
  { size: 1.3, isEmber: false, top: 88, left: 12, duration: 6.6, delay: 6.6 },
  { size: 2.0, isEmber: true, top: 15, left: 48, duration: 8.0, delay: 7.2 },
  { size: 1.7, isEmber: false, top: 44, left: 71, duration: 5.9, delay: 7.8 },
  { size: 2.3, isEmber: false, top: 79, left: 58, duration: 7.3, delay: 8.4 },
  { size: 1.1, isEmber: true, top: 62, left: 31, duration: 6.4, delay: 9.0 },
  { size: 2.7, isEmber: false, top: 92, left: 84, duration: 8.3, delay: 9.6 },
  { size: 1.9, isEmber: false, top: 38, left: 52, duration: 5.6, delay: 10.2 }
]

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume: _onOpenResume, theme = 'dark' }) => {
  const heroRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const dustRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLAnchorElement>(null)

  // Staggered cinematic reveal timeline
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

  // Smooth mouse/touch parallax matching the reel
  useEffect(() => {
    if (!heroRef.current) return

    const handleMove = (clientX: number, clientY: number) => {
      const a = (clientX / window.innerWidth - 0.5) * 2
      const s = (clientY / window.innerHeight - 0.5) * 2

      if (titleContainerRef.current) {
        gsap.to(titleContainerRef.current, { x: 30 * a, y: 18 * s, duration: 1.2, ease: 'power2.out' })
      }
      if (glowRef.current) {
        gsap.to(glowRef.current, { x: 45 * a, y: 30 * s, duration: 1.4, ease: 'power2.out' })
      }
      if (dustRef.current) {
        const dustNodes = dustRef.current.querySelectorAll('.dust')
        dustNodes.forEach((node, i) => {
          gsap.to(node, {
            x: a * (2 + 0.8 * i),
            y: s * (1.5 + 0.6 * i),
            duration: 1.8 + 0.08 * i,
            ease: 'power2.out'
          })
        })
      }
    }

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    const onLeave = () => {
      if (titleContainerRef.current) gsap.to(titleContainerRef.current, { x: 0, y: 0, duration: 1.8, ease: 'power2.out' })
      if (glowRef.current) gsap.to(glowRef.current, { x: 0, y: 0, duration: 1.8, ease: 'power2.out' })
      if (dustRef.current) {
        const dustNodes = dustRef.current.querySelectorAll('.dust')
        dustNodes.forEach((node) => gsap.to(node, { x: 0, y: 0, duration: 2, ease: 'power2.out' }))
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onLeave, { passive: true })
    window.addEventListener('touchcancel', onLeave, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onLeave)
      window.removeEventListener('touchcancel', onLeave)
      document.removeEventListener('mouseleave', onLeave)
    }
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

      {/* 2. Ambient Floating Dust Particles from Reel */}
      <div ref={dustRef} className="absolute inset-0 pointer-events-none z-[8]" aria-hidden="true">
        {DUST_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="dust absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.isEmber ? 'rgba(252,107,47,0.55)' : 'rgba(255,255,255,0.22)',
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0.75
            }}
          />
        ))}
      </div>

      {/* 3. Ambient Radiant Ember Glow Orb behind Title (Reel specification) */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] pointer-events-none opacity-0 z-[6] transform-gpu"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(252,107,47,0.18) 0%, rgba(252,107,47,0.05) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(160,42,34,0.12) 0%, transparent 68%)',
          filter: 'blur(35px)'
        }}
        aria-hidden="true"
      />

      {/* 4. Top-Left Status Pill Badge */}
      <div
        ref={tagRef}
        className="absolute top-12 sm:top-20 md:top-24 left-4 sm:left-6 md:left-14 lg:left-20 z-[40] opacity-0 flex items-center gap-2 sm:gap-2.5 max-w-[calc(100vw-5rem)] px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ember shadow-[0_0_8px_#fc6b2f]" />
        </span>
        <span
          className="text-[10px] sm:text-[11px] text-[#B5B5B5] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold truncate"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Shipping Ideas Into Reality.
        </span>
      </div>

      {/* 5. Engineering Subtitle & Capability Chips */}
      <div
        ref={descRef}
        className="absolute bottom-[20%] sm:bottom-[18%] md:top-[72%] md:bottom-auto left-4 sm:left-6 md:left-14 lg:left-20 z-[40] max-w-[calc(100vw-2rem)] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] opacity-0 text-center md:text-left mx-auto md:mx-0"
      >
        <p
          className="text-[11.5px] sm:text-[13px] md:text-[14px] text-[#B5B5B5] leading-[1.6] sm:leading-[1.8] font-normal tracking-wide"
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

      {/* 6. Magnetic Action Buttons (Reel style) */}
      <div
        ref={ctaRef}
        className="absolute bottom-6 sm:bottom-[8%] md:bottom-[12%] left-4 right-4 sm:left-auto sm:right-6 md:right-14 lg:right-20 z-[40] opacity-0 flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-2.5 sm:gap-3.5"
      >
        <a
          href="#projects"
          className="relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-bold text-[11px] sm:text-[13px] tracking-wide transition-all duration-300 overflow-hidden cursor-pointer bg-ember hover:bg-ember-bright text-white border border-transparent shadow-[0_0_25px_rgba(160,42,34,0.4)] hover:shadow-[0_0_40px_rgba(252,107,47,0.7)] hover:scale-105 active:scale-95 group touch-manipulation flex-1 sm:flex-initial"
          title="Explore Engineering Highlights"
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
            <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border border-white/30 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </span>
            <span className="whitespace-nowrap">Explore Work →</span>
          </span>
        </a>

        <a
          href="#contact"
          className="relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-[11px] sm:text-[12px] tracking-wide transition-all duration-300 overflow-hidden cursor-pointer bg-transparent text-white border border-white/20 hover:border-ember/50 hover:text-ember hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 group touch-manipulation backdrop-blur-md flex-1 sm:flex-initial"
          title="Direct Contact Transmission"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="whitespace-nowrap">Let's Talk →</span>
          </span>
        </a>
      </div>

      {/* 7. Center Kinetic Bold Variable Typography matching Instagram Reel */}
      <div
        ref={titleContainerRef}
        className="absolute top-[25%] sm:top-[28%] md:top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] select-none w-full flex flex-col items-center justify-center px-4"
        aria-hidden="true"
      >
        <div className="w-full max-w-[700px] md:max-w-[850px] h-[52px] sm:h-[80px] md:h-[135px] relative flex items-center justify-center scale-y-[1.15] transform-gpu drop-shadow-[0_0_35px_rgba(252,107,47,0.3)]">
          <div style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }} className="cursor-default pointer-events-auto">
            <TextPressure
              text="DEV JANGID"
              fontFamily="Roboto Flex"
              flex={true}
              scale={false}
              width={true}
              weight={true}
              italic={true}
              alpha={false}
              stroke={false}
              textColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.88)' : '#111116'}
              minFontSize={16}
              className="text-pressure-title"
            />
          </div>
        </div>

        {/* Cinematic Sub-headline */}
        <div className="mt-12 sm:mt-2.5 md:mt-4 text-center z-[20] px-2">
          <p
            className="hero-line text-[clamp(0.55rem,2.2vw,0.88rem)] md:text-[clamp(0.72rem,1.08vw,0.88rem)] font-extrabold tracking-[0.12em] sm:tracking-[0.25em] uppercase text-ember drop-shadow-[0_0_20px_rgba(252,107,47,0.7)]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Crafting Interfaces That People Remember.
          </p>
        </div>
      </div>

      {/* 8. Center Animated Kinetic Scroll Indicator from reel */}
      <a
        href="#introduction"
        ref={scrollHintRef}
        className="hero-scroll-indicator absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[45] flex flex-col items-center gap-2 opacity-0 cursor-pointer group select-none transition-transform duration-300 hover:scale-105"
        aria-label="Scroll to Philosophy section"
      >
        <span
          className="text-[9px] text-[#B5B5B5]/60 tracking-[0.35em] uppercase font-mono font-medium transition-colors group-hover:text-ember"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div
            className="absolute w-full h-3 bg-ember/60 animate-pulse"
            style={{ animation: 'reveal-up 2s ease-in-out infinite' }}
          />
        </div>
      </a>
    </section>
  )
}

export default HeroSection
