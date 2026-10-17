import React, { useState } from 'react'
import { personalInfo, navItems } from '../data/portfolio'
import { Sun, Moon, Menu, X, Terminal, FileText, Search, Zap, Volume2, VolumeX } from 'lucide-react'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onOpenConsole?: () => void
  onOpenResume?: () => void
  onOpenCommandPalette?: () => void
  isTLDR?: boolean
  onToggleTLDR?: () => void
  isMuted?: boolean
  onToggleMute?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenConsole,
  onOpenResume,
  onOpenCommandPalette,
  isTLDR = false,
  onToggleTLDR,
  isMuted = true,
  onToggleMute
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-[#050505]/85 border-white/10 text-white'
        : 'bg-[#f6f6f9]/85 border-black/10 text-[#141418] shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ember rounded-full p-1"
          aria-label="Dev Jangid Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/15 font-bold font-sans text-sm sm:text-base flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-ember/50 group-hover:bg-ember/10 group-hover:text-ember transition-all duration-300">
            {personalInfo.monogram}
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight uppercase group-hover:text-ember transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans font-medium text-ash uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ember inline-block" />
              <span>{personalInfo.title}</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.code}
              href={item.href}
              className="text-xs font-medium uppercase tracking-wider text-ash hover:text-[var(--text-main)] px-3 py-1.5 rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Feature 2: Command Palette Trigger Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-ash hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all duration-200 cursor-pointer"
              title="Open Command Palette (Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5 text-ash" />
              <span>CMD</span>
              <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-silver font-mono">
                ⌘K
              </span>
            </button>
          )}

          {/* Feature 1: Recruiter TL;DR Mode Toggle */}
          {onToggleTLDR && (
            <button
              onClick={onToggleTLDR}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer ${
                isTLDR
                  ? 'bg-ember text-white border-ember shadow-[0_0_15px_rgba(160,42,34,0.5)]'
                  : 'bg-white/5 hover:bg-white/10 text-ash hover:text-white border-white/10 hover:border-white/20'
              }`}
              title="Toggle Recruiter 30-Second Executive TL;DR Mode"
              aria-label="Toggle Recruiter 30-Second Executive TL;DR Mode"
            >
              <Zap className={`w-3.5 h-3.5 ${isTLDR ? 'fill-current text-white' : 'text-amber-400'}`} />
              <span>{isTLDR ? 'TL;DR ON' : '30s TL;DR'}</span>
            </button>
          )}

          {/* Feature 12: Mechanical Sound Effects Toggle */}
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-ash hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
              title={isMuted ? 'Unmute Mechanical Sound Effects' : 'Mute Sound Effects'}
              aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-ash" /> : <Volume2 className="w-3.5 h-3.5 text-ember" />}
            </button>
          )}

          {/* CLI Dev Console Button */}
          {onOpenConsole && (
            <button
              onClick={onOpenConsole}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-ash hover:text-white border border-white/10 hover:border-ember/40 rounded-full transition-all duration-200 cursor-pointer"
              title="Open Interactive Terminal (~)"
              aria-label="Open Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-ember" />
              <span>CLI [~]</span>
            </button>
          )}

          {/* Verified Resume Modal Button (Reel Signature Ember Pill) */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white bg-ember hover:bg-ember-bright rounded-full shadow-[0_0_20px_rgba(160,42,34,0.45)] transition-all duration-300 cursor-pointer group"
              title="Inspect Verified Resume PDF"
              aria-label="Inspect Verified Resume PDF"
            >
              <FileText className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              <span>Resume</span>
            </button>
          )}

          {/* Theme Switch Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-ash hover:text-white border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-silver transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-ash hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-5 py-6 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 ${
          theme === 'dark'
            ? 'border-white/10 bg-[#0a0a0d]/95 text-white'
            : 'border-black/10 bg-[#ffffff]/95 text-[#141418]'
        }`}>
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.code}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-sm font-medium transition-all"
              >
                <span>{item.label}</span>
                <span className="text-xs text-ember font-mono font-medium">
                  {item.code}
                </span>
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              {onToggleTLDR && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onToggleTLDR()
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    isTLDR
                      ? 'bg-ember text-white border-ember'
                      : 'bg-white/5 text-ash hover:text-white border-white/10'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>{isTLDR ? 'Turn Off TL;DR Mode' : 'Enable 30s TL;DR'}</span>
                </button>
              )}

              {onOpenResume && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenResume()
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-ember hover:bg-ember-bright text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(160,42,34,0.4)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspect Verified Resume PDF</span>
                </button>
              )}

              {onOpenConsole && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenConsole()
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-ash hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Terminal className="w-4 h-4 text-ember" />
                  <span>Launch CLI Terminal [~]</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
