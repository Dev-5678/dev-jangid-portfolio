import React from 'react'
import { personalInfo, navItems } from '../data/portfolio'
import { ArrowUp } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#111317] text-[#FAF8F5] border-t-4 border-[#CCFF00] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-gray-800">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-[#CCFF00] text-[#111317] font-black font-sans text-lg flex items-center justify-center border border-[#111317]">
                {personalInfo.monogram}
              </span>
              <span className="text-xl font-black uppercase tracking-tight text-[#FAF8F5]">
                {personalInfo.name}
              </span>
            </div>
            <p className="font-mono text-xs text-gray-400">
              {personalInfo.title} • {personalInfo.location}
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 font-mono text-xs" aria-label="Footer Navigation">
            {navItems.map((item) => (
              <a
                key={item.code}
                href={item.href}
                className="text-gray-400 hover:text-[#CCFF00] transition-colors uppercase tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="brutal-btn p-3 bg-[#1A202C] text-[#CCFF00] border-2 border-[#334155] shadow-[2px_2px_0px_#CCFF00] hover:bg-[#CCFF00] hover:text-[#111317] transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Lower Meta Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-400">
          <div>
            &copy; {CURRENT_YEAR} {personalInfo.name}. All verified credentials preserved.
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span>BUILT WITH REACT • TS • TAILWIND • GSAP</span>
            <span className="text-[#CCFF00]">■</span>
            <span>NEO-BRUTALISM</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
