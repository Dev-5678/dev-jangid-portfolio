import React, { useEffect, useRef } from 'react'
import { personalInfo } from '../data/portfolio'
import { MorphingGraphic } from '../components/MorphingGraphic'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import gsap from 'gsap'

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        delay: 0.1
      })
      .from(titleRef.current?.querySelectorAll('.hero-anim-text') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
      }, "-=0.3")
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, "-=0.4")
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background Decorative Tech Elements */}
      <div className="absolute top-10 right-4 sm:right-10 pointer-events-none opacity-20 dark:opacity-10 hidden lg:block">
        <div className="w-64 h-64 border-4 border-dashed border-[#111317] dark:border-[#CCFF00] rounded-full animate-[spin_40s_linear_infinite]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Status Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5] dark:bg-[#131720] border-2 border-[#111317] dark:border-[#334155] shadow-[3px_3px_0px_#111317] dark:shadow-[3px_3px_0px_#CCFF00] font-mono text-xs font-bold text-[#111317] dark:text-[#F4F7FB] mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] border border-[#111317] animate-pulse" />
            <span className="text-[#FF5500] dark:text-[#CCFF00] font-black uppercase">SYS://ACTIVE</span>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#FF5500]" />
              {personalInfo.location}
            </span>
          </div>

          {/* Main Oversized Typography */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] uppercase text-[#111317] dark:text-[#F4F7FB]"
          >
            <span className="hero-anim-text block">DEV</span>
            <span className="hero-anim-text block text-transparent bg-clip-text bg-gradient-to-r from-[#111317] via-[#334155] to-[#111317] dark:from-[#F4F7FB] dark:via-[#CCFF00] dark:to-[#F4F7FB]">
              JANGID
            </span>
          </h1>

          {/* Subtitle / Professional Title */}
          <div className="mt-4 px-3 py-1 bg-[#CCFF00] text-[#111317] font-mono font-black text-sm sm:text-lg uppercase tracking-wider border-2 border-[#111317] shadow-[2px_2px_0px_#111317]">
            {personalInfo.title}
          </div>

          {/* Resume-derived concise summary */}
          <p className="mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed">
            Hands-on experience at <strong className="font-bold text-[#111317] dark:text-[#F4F7FB] underline decoration-[#CCFF00] decoration-2">Airports Authority of India</strong> in system maintenance and network security compliance, alongside telemetry and satellite payloads at <strong className="font-bold text-[#111317] dark:text-[#F4F7FB] underline decoration-[#00E5FF] decoration-2">India Space Lab</strong> and modern <strong className="font-bold text-[#111317] dark:text-[#F4F7FB] underline decoration-[#FF5500] decoration-2">Generative AI RAG</strong> solutions.
          </p>

          {/* Technical Pills */}
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs font-bold">
            <span className="px-2.5 py-1 bg-white dark:bg-[#141820] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] text-[#111317] dark:text-[#F4F7FB]">
              #DSA &amp; OOP
            </span>
            <span className="px-2.5 py-1 bg-white dark:bg-[#141820] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] text-[#111317] dark:text-[#F4F7FB]">
              #C++ / Java / SQL
            </span>
            <span className="px-2.5 py-1 bg-white dark:bg-[#141820] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] text-[#111317] dark:text-[#F4F7FB]">
              #Gemini &amp; Multimodal RAG
            </span>
            <span className="px-2.5 py-1 bg-white dark:bg-[#141820] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] text-[#111317] dark:text-[#F4F7FB]">
              #Network Security
            </span>
          </div>

          {/* Action CTAs */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="brutal-btn px-6 py-3.5 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111317] font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 stroke-[3]" />
            </a>

            <a
              href="#contact"
              className="brutal-btn px-6 py-3.5 bg-white dark:bg-[#141820] text-[#111317] dark:text-[#F4F7FB] font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#1E293B]"
            >
              <Mail className="w-4 h-4 stroke-[2.5] text-[#FF5500] dark:text-[#CCFF00]" />
              <span>Get In Touch</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Neo-Brutalist Morphing Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-md brutal-card p-6 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] relative shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#CCFF00]">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#111317] dark:border-[#334155] font-mono text-xs">
              <span className="font-bold uppercase text-gray-500 dark:text-gray-400">TELEMETRY_ENGINE</span>
              <span className="px-2 py-0.5 bg-[#00E5FF] text-[#111317] font-bold text-[10px]">LIVE_DATA</span>
            </div>

            {/* Morphing Graphic SVG Component */}
            <MorphingGraphic className="my-2" />

            {/* Quick telemetry summary */}
            <div className="mt-5 pt-3 border-t-2 border-dashed border-gray-300 dark:border-gray-700 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-2 bg-gray-50 dark:bg-[#1A202C] border border-[#111317] dark:border-[#334155]">
                <div className="text-[10px] text-gray-400">ORGANIZATION</div>
                <div className="font-bold truncate text-[#111317] dark:text-[#F4F7FB]">AAI &amp; ISL Intern</div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-[#1A202C] border border-[#111317] dark:border-[#334155]">
                <div className="text-[10px] text-gray-400">DEGREE STATUS</div>
                <div className="font-bold text-[#111317] dark:text-[#F4F7FB]">Graduating 2027</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visible Scroll Cue */}
      <div className="mt-12 sm:mt-16 flex items-center justify-center">
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-[#111317] dark:hover:text-[#CCFF00] transition-colors group"
          aria-label="Scroll to About Section"
        >
          <span>SCROLL TO SYSTEM OVERVIEW</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#FF5500] dark:text-[#CCFF00]" />
        </a>
      </div>
    </section>
  )
}
