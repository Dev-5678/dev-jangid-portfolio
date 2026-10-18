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
        .fromTo(scrollHintRef.current, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(2)' }, 0.65)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Smooth mouse/touch parallax matching the reel
  useEffect(() => {
    if (!heroRef.current) return

    // High-performance GSAP quickTo functions (zero memory allocation during mousemove)
    const quickTitleX = titleContainerRef.current ? gsap.quickTo(titleContainerRef.current, 'x', { duration: 0.8, ease: 'power2.out' }) : null
    const quickTitleY = titleContainerRef.current ? gsap.quickTo(titleContainerRef.current, 'y', { duration: 0.8, ease: 'power2.out' }) : null
    const quickGlowX = glowRef.current ? gsap.quickTo(glowRef.current, 'x', { duration: 1.0, ease: 'power2.out' }) : null
    const quickGlowY = glowRef.current ? gsap.quickTo(glowRef.current, 'y', { duration: 1.0, ease: 'power2.out' }) : null

    let rafScheduled = false
    let lastClientX = 0
    let lastClientY = 0

    const updateParallax = () => {
      rafScheduled = false
      const a = (lastClientX / window.innerWidth - 0.5) * 2
      const s = (lastClientY / window.innerHeight - 0.5) * 2

      if (quickTitleX && quickTitleY) {
        quickTitleX(24 * a)
        quickTitleY(14 * s)
      }
      if (quickGlowX && quickGlowY) {
        quickGlowX(32 * a)
        quickGlowY(20 * s)
      }
    }

    const handleMove = (clientX: number, clientY: number) => {
      lastClientX = clientX
      lastClientY = clientY
      if (!rafScheduled) {
        rafScheduled = true
        requestAnimationFrame(updateParallax)
      }
    }

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    const onLeave = () => {
      if (quickTitleX && quickTitleY) {
        quickTitleX(0)
        quickTitleY(0)
      }
      if (quickGlowX && quickGlowY) {
        quickGlowX(0)
        quickGlowY(0)
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

      {/* 4. Top-Left Status Pill Badge (Aligned in corner directly below DJ.) */}
      <div
        ref={tagRef}
        className="absolute top-16 sm:top-[72px] md:top-[76px] left-3 sm:left-5 md:left-6 lg:left-8 z-[40] opacity-0 flex items-center gap-2 sm:gap-2.5 max-w-[calc(100vw-5.5rem)] px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ember shadow-[0_0_8px_#fc6b2f]" />
        </span>
        <span
          className="text-[10px] sm:text-[11px] text-[#B5B5B5] tracking-[0.14em] sm:tracking-[0.2em] uppercase font-semibold truncate"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Shipping Ideas Into Reality.
        </span>
      </div>

      {/* 5. Engineering Subtitle (Anchored to Left Corner) */}
      <div
        ref={descRef}
        className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-3 sm:left-5 md:left-6 lg:left-8 z-[40] max-w-[280px] sm:max-w-[340px] md:max-w-[380px] opacity-0 text-left"
      >
        <p
          className="text-[11.5px] sm:text-[13px] md:text-[14px] text-[#C4C4C8] dark:text-[#E2E2E6] leading-[1.6] sm:leading-[1.75] font-normal tracking-wide drop-shadow-sm"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Full-Stack Developer &amp; Computer Science Engineer crafting fast, resilient, and motion-driven digital products.
        </p>
      </div>

      {/* 6. Magnetic Action Buttons (Anchored to Right Corner) */}
      <div
        ref={ctaRef}
        className="hero-cta-group absolute bottom-5 sm:bottom-6 md:bottom-8 right-3 sm:right-5 md:right-6 lg:right-8 z-[40] opacity-0 flex flex-col justify-end items-end gap-2 sm:gap-2.5"
      >
        <a
          href="#projects"
          className="relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-[11px] sm:text-[12.5px] tracking-wide transition-all duration-300 overflow-hidden cursor-pointer bg-ember hover:bg-ember-bright text-white border border-transparent shadow-[0_0_25px_rgba(160,42,34,0.5)] hover:shadow-[0_0_35px_rgba(252,107,47,0.8)] hover:scale-105 active:scale-95 group touch-manipulation text-center"
          title="Explore Engineering Highlights"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-2.5">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/30 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </span>
            <span className="whitespace-nowrap">Explore Work →</span>
          </span>
        </a>

        <a
          href="#contact"
          className="relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-[10.5px] sm:text-[11.5px] tracking-wide transition-all duration-300 overflow-hidden cursor-pointer bg-white/[0.06] text-white border border-white/20 hover:border-ember/50 hover:text-ember hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 group touch-manipulation backdrop-blur-md text-center"
          title="Direct Contact Transmission"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="whitespace-nowrap">Let's Talk →</span>
          </span>
        </a>
      </div>

      {/* 7. Center Kinetic Bold Variable Typography matching Instagram Reel (Scaled 85% to fit seamlessly on 100% zoom!) */}
      <div
        ref={titleContainerRef}
        className="absolute top-[28%] sm:top-[30%] md:top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] select-none w-full flex flex-col items-center justify-center px-4"
        aria-hidden="true"
      >
        <div className="w-full max-w-[580px] sm:max-w-[680px] md:max-w-[760px] h-[48px] sm:h-[72px] md:h-[105px] relative flex items-center justify-center transform-gpu drop-shadow-[0_0_35px_rgba(252,107,47,0.4)]">
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
              textColor={theme === 'dark' ? '#FFFFFF' : '#111116'}
              minFontSize={14}
              className="text-pressure-title"
            />
          </div>
        </div>

        {/* Cinematic Sub-headline */}
        <div className="mt-5 sm:mt-7 md:mt-10 lg:mt-12 text-center z-[20] px-2">
          <p
            className="hero-line text-[clamp(0.55rem,2vw,0.85rem)] md:text-[clamp(0.7rem,1vw,0.85rem)] font-extrabold tracking-[0.12em] sm:tracking-[0.24em] uppercase text-ember drop-shadow-[0_0_20px_rgba(252,107,47,0.7)]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Crafting Interfaces That People Remember.
          </p>
        </div>
      </div>

      {/* 8. Center Animated Kinetic Scroll Indicator (Streaming downwards animation to guide user smoothly down!) */}
      <a
        href="#introduction"
        ref={scrollHintRef}
        onClick={(e) => {
          e.preventDefault()
          const target = document.querySelector('#introduction')
          if (target) target.scrollIntoView({ behavior: 'smooth' })
        }}
        className="hero-scroll-indicator absolute bottom-2.5 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[45] flex flex-col items-center gap-1 opacity-0 cursor-pointer group select-none transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
        aria-label="Scroll down to The Philosophy section"
      >
        <span
          className="text-[9px] sm:text-[9.5px] tracking-[0.3em] uppercase font-mono font-bold transition-colors text-[#B5B5B5] group-hover:text-ember flex items-center gap-1 drop-shadow-sm"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span>Scroll</span>
        </span>
        <div className="w-[18px] h-[30px] sm:w-[20px] sm:h-[34px] rounded-full border-2 border-white/40 dark:border-white/40 light:border-zinc-800/60 group-hover:border-ember transition-colors flex items-start justify-center p-1 relative overflow-hidden bg-white/5 dark:bg-white/5 light:bg-black/5 backdrop-blur-md shadow-[0_0_15px_rgba(252,107,47,0.3)]">
          <div className="w-1.5 h-2.5 rounded-full bg-ember shadow-[0_0_10px_#fc6b2f] animate-scroll-glide" />
        </div>
        <div className="flex flex-col items-center -space-y-1 text-ember font-bold text-[10px] animate-bounce">
          <span>↓</span>
        </div>
      </a>
    </section>
  )
}

export default HeroSection
