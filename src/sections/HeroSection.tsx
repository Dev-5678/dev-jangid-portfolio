import React, { useEffect, useRef } from 'react'
import { TextPressure } from '../components/reactbits/TextPressure'
import gsap from 'gsap'

interface HeroSectionProps {
  onOpenResume?: () => void
  theme?: 'light' | 'dark'
}

const DUST_PARTICLES = [
  { size: 2.1, color: 'rgba(252,107,47,0.5)', top: '12%', left: '8%', duration: 6.2, delay: 0 },
  { size: 1.5, color: 'rgba(255,255,255,0.2)', top: '25%', left: '82%', duration: 7.4, delay: 0.6 },
  { size: 2.8, color: 'rgba(255,255,255,0.2)', top: '40%', left: '15%', duration: 5.8, delay: 1.2 },
  { size: 1.2, color: 'rgba(252,107,47,0.5)', top: '58%', left: '91%', duration: 8.1, delay: 1.8 },
  { size: 2.4, color: 'rgba(255,255,255,0.2)', top: '72%', left: '24%', duration: 6.9, delay: 2.4 },
  { size: 1.8, color: 'rgba(255,255,255,0.2)', top: '18%', left: '64%', duration: 5.5, delay: 3 },
  { size: 2.6, color: 'rgba(252,107,47,0.5)', top: '84%', left: '45%', duration: 7.8, delay: 3.6 },
  { size: 1.4, color: 'rgba(255,255,255,0.2)', top: '33%', left: '37%', duration: 6.1, delay: 4.2 },
  { size: 2.2, color: 'rgba(255,255,255,0.2)', top: '67%', left: '78%', duration: 8.5, delay: 4.8 },
  { size: 1.6, color: 'rgba(252,107,47,0.5)', top: '50%', left: '6%', duration: 5.2, delay: 5.4 },
  { size: 2.5, color: 'rgba(255,255,255,0.2)', top: '28%', left: '95%', duration: 7.1, delay: 6 },
  { size: 1.3, color: 'rgba(255,255,255,0.2)', top: '88%', left: '12%', duration: 6.6, delay: 6.6 },
  { size: 2.0, color: 'rgba(252,107,47,0.5)', top: '15%', left: '48%', duration: 8.0, delay: 7.2 },
  { size: 1.7, color: 'rgba(255,255,255,0.2)', top: '44%', left: '71%', duration: 5.9, delay: 7.8 },
  { size: 2.3, color: 'rgba(255,255,255,0.2)', top: '79%', left: '58%', duration: 7.3, delay: 8.4 },
  { size: 1.1, color: 'rgba(252,107,47,0.5)', top: '62%', left: '31%', duration: 6.4, delay: 9 },
  { size: 2.7, color: 'rgba(255,255,255,0.2)', top: '92%', left: '84%', duration: 8.3, delay: 9.6 },
  { size: 1.9, color: 'rgba(255,255,255,0.2)', top: '38%', left: '52%', duration: 5.6, delay: 10.2 }
]

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume: _onOpenResume, theme = 'dark' }) => {
  const heroRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

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

      {/* 2. Ambient Ember Glow Orb behind Title */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] pointer-events-none opacity-0 z-[6]"
        style={{
          background: 'radial-gradient(circle, rgba(252,107,47,0.12) 0%, rgba(252,107,47,0.03) 45%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        aria-hidden="true"
      />

      {/* 3. Floating Ambient Micro-Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-[8]" aria-hidden="true">
        {DUST_PARTICLES.map((d, i) => (
          <div
            key={i}
            className="dust absolute rounded-full"
            style={{
              width: `${d.size}px`,
              height: `${d.size}px`,
              backgroundColor: d.color,
              top: d.top,
              left: d.left,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`
            }}
          />
        ))}
      </div>

      {/* 4. Top-Left Status Pill Badge */}
      <div
        ref={tagRef}
        className="absolute top-12 sm:top-20 md:top-24 left-4 sm:left-6 md:left-14 lg:left-20 z-[40] opacity-0 flex items-center gap-2 sm:gap-2.5 max-w-[calc(100vw-5rem)]"
      >
        <span className="w-[7px] h-[7px] shrink-0 rounded-full bg-ember animate-pulse" />
        <span
          className="text-[10px] sm:text-[11px] text-[#B5B5B5] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium truncate"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Shipping Ideas Into Reality.
        </span>
      </div>

      {/* 5. Bottom-Left Engineering Subtitle */}
      <div
        ref={descRef}
        className="absolute bottom-[20%] sm:bottom-[18%] md:top-[74%] md:bottom-auto left-4 sm:left-6 md:left-14 lg:left-20 z-[40] max-w-[calc(100vw-2rem)] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] opacity-0"
      >
        <p
          className="text-[11.5px] sm:text-[13px] md:text-[14px] text-[#B5B5B5] leading-[1.6] sm:leading-[1.8] font-normal tracking-wide"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Full-Stack Developer &amp; Computer Science Engineer crafting fast, resilient, and motion-driven digital products.
        </p>
      </div>

      {/* 6. Bottom-Right Magnetic Action Buttons (Exact 2-button layout from Reel) */}
      <div
        ref={ctaRef}
        className="absolute bottom-6 sm:bottom-[8%] md:bottom-[12%] left-4 right-4 sm:left-auto sm:right-6 md:right-14 lg:right-20 z-[40] opacity-0 flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-2.5 sm:gap-3.5"
      >
        <a
          href="#projects"
          className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-colors duration-300 overflow-hidden cursor-pointer bg-ember text-white hover:bg-ember-bright border border-transparent shadow-[0_0_25px_rgba(160,42,34,0.4)] !rounded-full !px-4 sm:!px-7 !py-2.5 sm:!py-3.5 !text-[11px] sm:!text-[13px] !tracking-wide group touch-manipulation"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="flex items-center gap-2 sm:gap-3">
              <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border border-void/30 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="sm:w-[12px] sm:h-[12px]">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Explore Work →
            </span>
          </span>
        </a>

        <a
          href="#contact"
          className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-medium text-[11px] sm:text-[13px] tracking-wide transition-colors duration-300 overflow-hidden cursor-pointer bg-transparent text-white border border-white/20 hover:border-ember/50 hover:text-ember !border-white/15 touch-manipulation"
        >
          <span className="relative z-10 flex items-center gap-2">Let's Talk →</span>
        </a>
      </div>

      {/* 7. Center Kinetic Variable Typography with Ember Stroke & Drop Shadow */}
      <div
        className="absolute top-[40%] sm:top-[42%] md:top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] pointer-events-none select-none w-full flex flex-col items-center justify-center px-4"
        aria-hidden="true"
      >
        <div className="w-full max-w-[700px] md:max-w-[850px] h-[52px] sm:h-[80px] md:h-[135px] relative flex items-center justify-center scale-y-[1.15] transform-gpu drop-shadow-[0_0_35px_rgba(252,107,47,0.3)]">
          <div style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }}>
            <TextPressure
              text="DEV JANGID"
              fontFamily="Roboto Flex, Space Grotesk, sans-serif"
              flex={true}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              alpha={false}
              textColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.88)' : 'rgba(24, 24, 27, 0.95)'}
              minFontSize={16}
              className="text-pressure-title tp-flex"
            />
          </div>
        </div>

        {/* Cinematic Sub-headline */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center z-[20] px-2">
          <p
            className="hero-line text-[clamp(0.55rem,2.2vw,0.88rem)] md:text-[clamp(0.72rem,1.08vw,0.88rem)] font-extrabold tracking-[0.12em] sm:tracking-[0.25em] uppercase text-ember drop-shadow-[0_0_20px_rgba(252,107,47,0.7)]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Crafting Interfaces That People Remember.
          </p>
        </div>
      </div>

      {/* 8. Center Animated Scroll Indicator Line */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[45] hidden md:flex flex-col items-center gap-2 opacity-0"
      >
        <span
          className="text-[9px] text-[#B5B5B5]/60 tracking-[0.35em] uppercase"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div
            className="absolute w-full h-3 bg-ember/60"
            style={{ animation: 'reveal-up 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
