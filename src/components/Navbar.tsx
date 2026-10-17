import React, { useState } from 'react'
import { personalInfo, navItems } from '../data/portfolio'
import { Sun, Moon, Menu, X, Orbit } from 'lucide-react'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onOpenPortal: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 dark:bg-[#0A0D12]/90 backdrop-blur-md border-b-3 border-[#111317] dark:border-[#334155] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
          aria-label="Dev Jangid Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#CCFF00] text-[#111317] font-black font-sans text-xl sm:text-2xl flex items-center justify-center border-2 border-[#111317] shadow-[2px_2px_0px_#111317] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#111317] transition-all">
            {personalInfo.monogram}
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase text-[#111317] dark:text-[#F4F7FB]">
              {personalInfo.name}
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#FF5500] dark:text-[#CCFF00] uppercase tracking-wider">
              {personalInfo.title}
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.code}
              href={item.href}
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#111317] dark:text-[#F4F7FB] hover:text-[#FF5500] dark:hover:text-[#CCFF00] transition-colors flex items-center gap-1 group py-1"
            >
              <span className="text-[10px] text-gray-400 dark:text-gray-500 group-hover:text-[#FF5500] dark:group-hover:text-[#CCFF00]">
                {item.code}.
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle & Portal Trigger & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Re-open Portal Button */}
          <button
            onClick={onOpenPortal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold bg-white dark:bg-[#141820] text-[#111317] dark:text-[#F4F7FB] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#CCFF00] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            title="Open Interactive Telemetry Portal"
            aria-label="Open Interactive Telemetry Portal"
          >
            <Orbit className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" style={{ animationDuration: '8s' }} />
            <span>PORTAL</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#141820] text-[#111317] dark:text-[#CCFF00] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#CCFF00] hover:bg-[#CCFF00] hover:text-[#111317] dark:hover:bg-[#CCFF00] dark:hover:text-[#111317] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Moon className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-white dark:bg-[#141820] text-[#111317] dark:text-[#F4F7FB] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-3 border-[#111317] dark:border-[#334155] bg-[#FAF8F5] dark:bg-[#0A0D12] px-4 py-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.code}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between p-3 bg-white dark:bg-[#131720] border-2 border-[#111317] dark:border-[#334155] shadow-[3px_3px_0px_#111317] dark:shadow-[3px_3px_0px_#334155] font-mono text-sm font-bold uppercase tracking-wider text-[#111317] dark:text-[#F4F7FB] hover:bg-[#CCFF00] hover:text-[#111317] transition-all"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#FF5500] dark:text-[#CCFF00] font-mono">
                  [{item.code}]
                </span>
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenPortal()
              }}
              className="mt-2 flex items-center justify-center gap-2 p-3 bg-[#CCFF00] text-[#111317] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#111317] shadow-[3px_3px_0px_#111317]"
            >
              <Orbit className="w-4 h-4 text-[#111317]" />
              Launch Telemetry Portal
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
