import React, { useState, useEffect } from 'react'

const SECTION_MAP: Record<string, string> = {
  hero: '00 // SYS_INIT',
  philosophy: '00.5 // PHILOSOPHY',
  about: '01 // OVERVIEW',
  experience: '02 // EXPERIENCE',
  skills: '03 // STACK & CAPABILITIES',
  projects: '04 // HIGHLIGHTS & SIMS',
  education: '05 // ACADEMICS',
  contact: '06 // TRANSMISSION'
}

export const ScrollProgressHUD: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('00 // SYS_INIT')

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)))
        setScrollProgress(progress)
      }

      // Check current section
      const sectionIds = ['contact', 'education', 'projects', 'skills', 'experience', 'about', 'philosophy', 'hero']
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(SECTION_MAP[id] || id.toUpperCase())
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <aside aria-label="Reading progress HUD" className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top Progress Bar */}
      <div className="w-full h-1 bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full bg-ember transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating HUD Indicator (Desktop only) */}
      <div className="hidden lg:flex items-center gap-2 absolute top-3 right-6 px-3 py-1 bg-[#0a0a0d]/90 backdrop-blur-md text-[#e8e8ea] border border-white/10 rounded-full font-mono text-[10px] font-bold shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
        <span className="text-gray-300">{activeSection}</span>
        <span className="text-ember font-black">[{scrollProgress}%]</span>
      </div>
    </aside>
  )
}
