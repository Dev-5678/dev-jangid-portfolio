import React from 'react'
import { personalInfo, navItems } from '../data/portfolio'
import { ArrowUp, Github, CheckCircle2 } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#08090d] text-white border-t border-ember/30 py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-ember/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-9 h-9 rounded-xl bg-ember text-white font-black font-sans text-base flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(160,42,34,0.5)]">
                {personalInfo.monogram}
              </span>
              <span className="text-xl font-bold uppercase tracking-tight text-white" style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}>
                {personalInfo.name}
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400">
              {personalInfo.title} • {personalInfo.location}
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 font-mono text-xs" aria-label="Footer Navigation">
            {navItems.map((item) => (
              <a
                key={item.code}
                href={item.href}
                className="text-zinc-400 hover:text-ember-bright transition-colors uppercase tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-3 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/15 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all cursor-pointer hover:border-ember/40 active:scale-95"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Lower Meta Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span>&copy; {CURRENT_YEAR} {personalInfo.name}. All verified credentials preserved.</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SYSTEMS OPERATIONAL</span>
            </span>
            <span className="text-zinc-600">•</span>
            <a
              href="https://github.com/Dev-5678"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@Dev-5678</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
