import React, { useEffect, useRef } from 'react'
import { educationHistory } from '../data/portfolio'
import { TiltedCard } from '../components/reactbits/TiltedCard'
import { DecryptedText } from '../components/reactbits/DecryptedText'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.edu-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
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
      id="education"
      aria-label="Academic History"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t-3 border-[#111317] dark:border-[#334155]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest text-[#FF5500] dark:text-[#CCFF00] uppercase mb-2">
            <span>[05]</span>
            <span>ACADEMIC // CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
            <DecryptedText text="EDUCATION" speed={30} maxIterations={10} />
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-500 dark:text-gray-400 max-w-xs">
          Academic qualifications verified from official resume credentials.
        </p>
      </div>

      {/* Grid of Education Cards with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {educationHistory.map((edu, idx) => (
          <div key={edu.id} className="edu-card">
            <TiltedCard
              maxTilt={8}
              className="p-6 sm:p-8 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[5px_5px_0px_#111317] dark:shadow-[5px_5px_0px_#1E293B] flex flex-col justify-between h-full"
            >
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#111317] dark:border-[#334155] font-mono text-xs">
                  <span className="px-2.5 py-1 bg-[#111317] text-[#CCFF00] font-bold text-xs uppercase">
                    {edu.isExpected ? 'IN_PROGRESS' : 'COMPLETED'}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-[#FF5500] dark:text-[#CCFF00]">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.date}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB] mb-2">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <div className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-gray-200 mt-2">
                  <GraduationCap className="w-5 h-5 text-[#CCFF00] dark:text-[#CCFF00] stroke-[2.5]" />
                  <span>{edu.institution}</span>
                </div>
              </div>

              {/* Location footer */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-between font-mono text-xs text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                  {edu.location}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">#0{idx + 1}</span>
              </div>
            </TiltedCard>
          </div>
        ))}
      </div>
    </section>
  )
}
