import React, { useEffect, useRef } from 'react'
import { personalInfo } from '../data/portfolio'
import { CrystalizedBall } from '../components/reactbits/CrystalizedBall'
import { TextPressure } from '../components/reactbits/TextPressure'
import { ShinyText } from '../components/reactbits/ShinyText'
import { Magnet } from '../components/reactbits/Magnet'
import { ArrowDown, Mail, MapPin, FileText, Clock, Activity, Terminal } from 'lucide-react'
import { useLiveTelemetry } from '../hooks/useLiveTelemetry'
import gsap from 'gsap'

interface HeroSectionProps {
  onOpenResume?: () => void
  onOpenConsole?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onOpenConsole }) => {
  const { istTime, latency } = useLiveTelemetry()
  const heroRef = useRef<HTMLElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
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
      .from(titleWrapRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Status Badge with Live IST Telemetry */}
          <div
            ref={badgeRef}
            className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[3px_3px_0px_#111317] dark:shadow-[3px_3px_0px_#CCFF00] font-mono text-xs font-black text-[#111317] dark:text-[#F4F7FB] mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] border-2 border-[#111317] animate-pulse" />
            <ShinyText text="SYS://ACTIVE" speed={3} className="text-[#FF5500] dark:text-[#CCFF00] font-black uppercase tracking-wider" />
            <span className="text-gray-400 dark:text-gray-500 font-bold">|</span>
            <span className="flex items-center gap-1 text-[#111317] dark:text-[#F4F7FB] font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
              {personalInfo.location}
            </span>
            {istTime && (
              <>
                <span className="text-gray-400 dark:text-gray-500 font-bold hidden sm:inline">|</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-gray-700 dark:text-gray-300">
                  <Clock className="w-3 h-3 text-[#00E5FF]" />
                  <span>{istTime}</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-gray-500">
                  <Activity className="w-3 h-3 text-[#CCFF00]" />
                  <span>{latency}ms</span>
                </span>
              </>
            )}
          </div>

          {/* Main Name Typography powered by React Bits TextPressure */}
          <div ref={titleWrapRef} className="w-full max-w-xl h-24 sm:h-32 mb-2 flex items-center">
            <TextPressure
              text="DEV JANGID"
              fontFamily="Roboto Flex, Space Grotesk, sans-serif"
              flex={true}
              width={true}
              weight={true}
              italic={true}
              alpha={false}
              radius={0.6}
              smoothing={0.35}
              idle="wave"
              idleSpeed={1.2}
              clickRipple={true}
              textColor="currentColor"
              pressureColor="#CCFF00"
              className="text-[#111317] dark:text-[#F4F7FB] font-black tracking-tight"
            />
          </div>

          {/* Subtitle / Professional Title */}
          <div className="mt-3 px-3.5 py-1.5 bg-[#CCFF00] text-[#111317] font-mono font-black text-sm sm:text-lg uppercase tracking-wider border-3 border-[#111317] shadow-[3px_3px_0px_#111317]">
            {personalInfo.title}
          </div>

          {/* Resume-derived concise summary */}
          <p className="mt-6 text-base sm:text-lg text-[#1F2937] dark:text-gray-300 max-w-xl leading-relaxed">
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

          {/* Action CTAs with Magnet micro-interactions */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnet padding={30} magnetStrength={0.3}>
              <a
                href="#experience"
                className="brutal-btn px-6 py-3.5 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111317] font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 stroke-[3]" />
              </a>
            </Magnet>

            <Magnet padding={30} magnetStrength={0.3}>
              <a
                href="#contact"
                className="brutal-btn px-6 py-3.5 bg-white dark:bg-[#141820] text-[#111317] dark:text-[#F4F7FB] font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#1E293B]"
              >
                <Mail className="w-4 h-4 stroke-[2.5] text-[#FF5500] dark:text-[#CCFF00]" />
                <span>Get In Touch</span>
              </a>
            </Magnet>

            {onOpenResume && (
              <Magnet padding={30} magnetStrength={0.3}>
                <button
                  onClick={onOpenResume}
                  className="brutal-btn px-5 py-3.5 bg-white dark:bg-[#1E293B] text-[#111317] dark:text-[#CCFF00] font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-[#CCFF00] hover:text-[#111317] dark:hover:bg-[#CCFF00] dark:hover:text-[#111317]"
                  title="Inspect and Print Verified Resume"
                >
                  <FileText className="w-4 h-4 stroke-[2.5] text-[#FF5500]" />
                  <span>Resume [PDF]</span>
                </button>
              </Magnet>
            )}

            {onOpenConsole && (
              <Magnet padding={30} magnetStrength={0.3}>
                <button
                  onClick={onOpenConsole}
                  className="hidden sm:flex brutal-btn px-4 py-3.5 bg-[#111317] text-[#CCFF00] font-mono font-bold text-sm uppercase tracking-wider items-center gap-2 hover:bg-[#CCFF00] hover:text-[#111317] border-2 border-[#111317] dark:border-[#CCFF00]"
                  title="Launch Interactive Hacker CLI Terminal (Hotkey: `)"
                >
                  <Terminal className="w-4 h-4 stroke-[2.5]" />
                  <span>CLI [~]</span>
                </button>
              </Magnet>
            )}
          </div>
        </div>

        {/* Right Column: React Bits Crystalized Ball with Dev Jangid Details Inside (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <CrystalizedBall
            primaryColor="#E056FD"
            secondaryColor="#CCFF00"
            className="drop-shadow-[0_0_50px_rgba(224,86,253,0.25)]"
          />
        </div>
      </div>

      {/* Visible Scroll Cue */}
      <div className="mt-12 sm:mt-16 flex items-center justify-center">
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold text-[#111317] dark:text-gray-400 hover:text-[#FF5500] dark:hover:text-[#CCFF00] transition-colors group"
          aria-label="Scroll to About Section"
        >
          <span>SCROLL TO SYSTEM OVERVIEW</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#FF5500] dark:text-[#CCFF00]" />
        </a>
      </div>
    </section>
  )
}
