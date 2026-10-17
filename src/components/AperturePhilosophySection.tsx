import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AperturePhilosophySectionProps {
  onOpenResume?: () => void
}

export const AperturePhilosophySection: React.FC<AperturePhilosophySectionProps> = ({ onOpenResume: _onOpenResume }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      if (frameRef.current) gsap.set(frameRef.current, { clipPath: 'circle(150% at 50% 50%)' })
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 1, scale: 1, y: 0 })
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0 })
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: stageRef.current,
          anticipatePin: 1
        }
      })

      // Frame clip-path expands from circle(120px at 50% 50%) to full screen (0 -> 0.52)
      tl.fromTo(
        frameRef.current,
        {
          clipPath: 'circle(120px at 50% 50%)'
        },
        {
          clipPath: 'circle(145% at 50% 50%)',
          ease: 'power2.inOut',
          duration: 0.55
        },
        0
      )

      // Title & hint fade out early (0 -> 0.25)
      tl.to(titleRef.current, { opacity: 0, scale: 0.9, duration: 0.25, ease: 'power1.in' }, 0)
      tl.to(hintRef.current, { opacity: 0, y: 15, duration: 0.2, ease: 'power1.in' }, 0)

      // Media subtle zoom (0 -> 1.0)
      tl.fromTo(mediaRef.current, { scale: 1.15 }, { scale: 1.0, duration: 1, ease: 'none' }, 0)

      // Overlay manifesto fades in and settles (0.35 -> 0.65)
      tl.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.35
      )

      // Buffer zone (0.65 -> 1.0): Manifesto remains resting and comfortably readable while scrolling
      tl.to({}, { duration: 0.35 })
    }, trackRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="introduction" className="relative w-full">
      <div className="scroll-expand">
        <div ref={trackRef} className="scroll-expand__track">
          <div ref={stageRef} className="scroll-expand__stage">
            <div ref={frameRef} className="scroll-expand__frame">
              <img
                ref={mediaRef}
                className="scroll-expand__media"
                src="/images/philosophy-bg.jpg"
                alt="Atmospheric dark cinematic background"
                draggable={false}
              />
              <div className="scroll-expand__scrim" />
              <div ref={overlayRef} className="scroll-expand__overlay">
                <div
                  className="flex flex-col items-center justify-center gap-4 sm:gap-7 max-w-4xl mx-auto px-4 sm:px-6 select-none"
                  style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ember/60 bg-black/70 backdrop-blur-md shadow-[0_0_20px_rgba(160,42,34,0.35)]">
                    <span className="w-2 h-2 rounded-full bg-ember shadow-[0_0_10px_#A02A22] animate-pulse" />
                    <span className="philosophy-badge-text text-white text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
                      The Philosophy
                    </span>
                  </div>
                  <p className="philosophy-quote text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.35] sm:leading-[1.4] tracking-tight text-center max-w-3xl">
                    I believe great software is born at the intersection of engineering precision and design intuition. Every pixel, every interaction, every line of code is an opportunity to create something that moves people.
                  </p>
                </div>
              </div>
            </div>

            <h2 ref={titleRef} className="scroll-expand__title">
              The Philosophy
            </h2>

            <div ref={hintRef} className="scroll-expand__hint">
              <span className="scroll-expand__hint-dot" />
              <span>Scroll to expand</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AperturePhilosophySection
