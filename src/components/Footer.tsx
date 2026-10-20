import React from 'react'
import { personalInfo, navItems } from '../data/portfolio'
import { ArrowUp, CheckCircle2 } from 'lucide-react'

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
              {personalInfo.title} â€¢ {personalInfo.location}
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
            <span className="text-zinc-600">â€¢</span>
            <a
              href="https://github.com/Dev-5678"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>@Dev-5678</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
