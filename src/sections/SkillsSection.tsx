import React, { useEffect, useRef, useState } from 'react'
import { skillCategories } from '../data/portfolio'
import { SpotlightCard } from '../components/reactbits/SpotlightCard'
import { Code, Cpu, Sparkles, Wrench } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [Code, Cpu, Sparkles, Wrench]
const SPOTLIGHTS = [
  'rgba(0, 229, 255, 0.15)',
  'rgba(204, 255, 0, 0.15)',
  'rgba(255, 85, 0, 0.15)',
  'rgba(0, 229, 255, 0.15)'
]

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.skill-block', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Technical Skills"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t-3 border-[#111317] dark:border-[#334155]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest text-[#FF5500] dark:text-[#CCFF00] uppercase mb-2">
            <span>[03]</span>
            <span>CAPABILITIES // TECH_STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
            TECHNICAL SKILLS
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-500 dark:text-gray-400 max-w-xs">
          Categorized technical competencies without fabricated rankings or arbitrary percentages.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skillCategories.map((cat, idx) => {
          const IconComp = ICONS[idx % ICONS.length]
          const isSelected = activeCategory === idx

          return (
            <SpotlightCard
              key={cat.title}
              spotlightColor={SPOTLIGHTS[idx % SPOTLIGHTS.length]}
              onClick={() => setActiveCategory(isSelected ? null : idx)}
              className={`skill-block p-6 sm:p-8 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[5px_5px_0px_#111317] dark:shadow-[5px_5px_0px_#1E293B] cursor-pointer transition-all ${
                isSelected ? 'ring-3 ring-[#CCFF00] translate-x-1' : 'hover:border-[#CCFF00]'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-[#111317] dark:border-[#334155]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FAF8F5] dark:bg-[#1E293B] border-2 border-[#111317] dark:border-[#334155] flex items-center justify-center text-[#111317] dark:text-[#CCFF00]">
                    <IconComp className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#111317] text-[#CCFF00] border border-[#111317]">
                  {cat.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 font-sans">
                {cat.description}
              </p>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] dark:bg-[#1A202C] text-[#111317] dark:text-[#F4F7FB] font-mono text-xs font-bold border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] hover:bg-[#CCFF00] hover:text-[#111317] dark:hover:bg-[#CCFF00] dark:hover:text-[#111317] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] border border-[#111317]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
