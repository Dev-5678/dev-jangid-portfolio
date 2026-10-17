import React, { useEffect, useRef, useState } from 'react'
import { experienceHighlights, standaloneProjects } from '../data/portfolio'
import { FolderGit2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [viewMode, setViewMode] = useState<'highlights' | 'standalone'>('highlights')

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.proj-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [viewMode])

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Engineering Highlights and Projects"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t-3 border-[#111317] dark:border-[#334155]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest text-[#FF5500] dark:text-[#CCFF00] uppercase mb-2">
            <span>[04]</span>
            <span>ENGINEERING // HIGHLIGHTS_AND_PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
            WORK HIGHLIGHTS
          </h2>
        </div>

        {/* View Mode Toggle: Highlights vs Standalone Projects */}
        <div className="flex items-center p-1 bg-white dark:bg-[#131720] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] font-mono text-xs font-bold">
          <button
            onClick={() => setViewMode('highlights')}
            className={`px-3 py-1.5 transition-colors ${
              viewMode === 'highlights'
                ? 'bg-[#111317] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#111317]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#111317] dark:hover:text-[#F4F7FB]'
            }`}
          >
            Domain Highlights ({experienceHighlights.length})
          </button>
          <button
            onClick={() => setViewMode('standalone')}
            className={`px-3 py-1.5 transition-colors ${
              viewMode === 'standalone'
                ? 'bg-[#111317] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#111317]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#111317] dark:hover:text-[#F4F7FB]'
            }`}
          >
            Standalone Projects ({standaloneProjects.length})
          </button>
        </div>
      </div>

      {/* Mode 1: Resume-backed Domain Highlights */}
      {viewMode === 'highlights' && (
        <div className="space-y-8">
          <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] font-mono text-xs flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Honest technical focus areas derived from verified internships and training.
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#CCFF00] text-[#111317] font-bold text-[10px]">
              VERIFIED RESUME RECORD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {experienceHighlights.map((item, idx) => (
              <div
                key={item.id}
                className="proj-card brutal-card brutal-card-hover p-6 sm:p-7 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[5px_5px_0px_#111317] dark:shadow-[5px_5px_0px_#1E293B] flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#111317] dark:border-[#334155] font-mono text-[11px]">
                    <span className="font-bold text-[#FF5500] dark:text-[#CCFF00] uppercase">
                      {item.category}
                    </span>
                    <span className="text-gray-400 font-bold">0{idx + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-black text-xl uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB] mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Context note */}
                  <div className="p-2.5 bg-gray-50 dark:bg-[#1A202C] border border-[#111317] dark:border-[#334155] mb-4 text-[11px] font-mono text-gray-600 dark:text-gray-300">
                    <span className="text-gray-400 block text-[9px]">CONTEXT:</span>
                    {item.context}
                  </div>

                  {/* Technical Scope Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-dashed border-gray-200 dark:border-gray-800">
                    {item.technicalScope.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#FAF8F5] dark:bg-[#1A202C] text-[#111317] dark:text-[#F4F7FB] font-mono text-[10px] font-bold border border-[#111317] dark:border-[#334155]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: Standalone Projects (with honest, elegant empty state) */}
      {viewMode === 'standalone' && (
        <div className="proj-card brutal-card p-8 sm:p-12 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#1E293B] text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#FAF8F5] dark:bg-[#1A202C] border-3 border-[#111317] dark:border-[#CCFF00] shadow-[3px_3px_0px_#111317] flex items-center justify-center text-[#111317] dark:text-[#CCFF00]">
            <FolderGit2 className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="inline-block px-3 py-1 bg-[#111317] text-[#CCFF00] font-mono text-xs font-bold uppercase tracking-wider mb-4 border border-[#111317]">
            NO_FABRICATED_REPOSITORIES
          </div>

          <h3 className="text-2xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB] mb-3">
            Dedicated Standalone Projects
          </h3>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-6">
            In accordance with engineering integrity principles, no unverified standalone projects or placeholder links are published here. Dev's practical engineering work is captured under institutional internships (Airports Authority of India &amp; India Space Lab).
          </p>

          <div className="p-4 bg-gray-50 dark:bg-[#1A202C] border-2 border-dashed border-gray-300 dark:border-gray-700 font-mono text-xs text-left max-w-md mx-auto">
            <span className="text-[#FF5500] dark:text-[#CCFF00] font-bold block mb-1">
              // FOR DEVELOPER EXPANSION:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              To add standalone software projects with live demos or GitHub repositories, edit the <code>standaloneProjects</code> array in <code>src/data/portfolio.ts</code>.
            </span>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setViewMode('highlights')}
              className="brutal-btn px-6 py-3 bg-[#CCFF00] text-[#111317] font-mono font-bold text-xs uppercase tracking-wider"
            >
              Return to Domain Highlights
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
