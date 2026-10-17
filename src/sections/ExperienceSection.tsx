import React, { useEffect, useRef } from 'react'
import { experiences } from '../data/portfolio'
import { SpotlightCard } from '../components/reactbits/SpotlightCard'
import { DecryptedText } from '../components/reactbits/DecryptedText'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.exp-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Professional Experience"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t-3 border-[#111317] dark:border-[#334155]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest text-[#FF5500] dark:text-[#CCFF00] uppercase mb-2">
            <span>[02]</span>
            <span>TIMELINE // WORK_HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
            <DecryptedText text="PRACTICAL EXPERIENCE" speed={30} maxIterations={10} />
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-500 dark:text-gray-400 max-w-xs">
          Documented internships and specialized technology training programs.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-4 sm:pl-8 border-l-4 border-[#111317] dark:border-[#334155] space-y-10 sm:space-y-12">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="exp-card relative group">
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[27px] sm:-left-[43px] top-6 w-6 h-6 rounded-none bg-[#CCFF00] border-3 border-[#111317] shadow-[2px_2px_0px_#111317] flex items-center justify-center font-mono text-[10px] font-black text-[#111317] select-none">
              {index + 1}
            </div>

            {/* Experience Card with Spotlight */}
            <SpotlightCard
              spotlightColor="rgba(204, 255, 0, 0.12)"
              className="p-6 sm:p-8 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[5px_5px_0px_#111317] dark:shadow-[5px_5px_0px_#1E293B] group-hover:border-[#CCFF00] transition-all"
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-[#111317] dark:border-[#334155] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#111317] text-[#CCFF00] font-bold text-xs uppercase">
                    {exp.type}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                      {exp.location}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 font-bold text-[#FF5500] dark:text-[#CCFF00] bg-gray-100 dark:bg-[#1E293B] px-2.5 py-1 border border-gray-300 dark:border-gray-700">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.dates}</span>
                </div>
              </div>

              {/* Role Title and Organization */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
                  {exp.role}
                </h3>
                <div className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 mt-1">
                  <Briefcase className="w-4 h-4 text-[#00E5FF]" />
                  <span>{exp.organization}</span>
                </div>
              </div>

              {/* Responsibilities List */}
              <ul className="space-y-3 my-5" aria-label="Key Responsibilities">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 bg-[#CCFF00] text-[#111317] flex items-center justify-center font-mono text-[10px] font-black border border-[#111317]">
                      ✓
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Applied Tags */}
              <div className="pt-4 border-t-2 border-dashed border-gray-200 dark:border-gray-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase mr-1">
                    APPLIED:
                  </span>
                  {exp.skillsApplied.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-[#1A202C] text-[#111317] dark:text-[#F4F7FB] font-mono text-xs border border-[#111317] dark:border-[#334155]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  )
}
