import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { Navbar } from './components/Navbar'
import { PortalEntry } from './components/PortalEntry'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { SkillsSection } from './sections/SkillsSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { EducationSection } from './sections/EducationSection'
import { ContactSection } from './sections/ContactSection'
import { Footer } from './components/Footer'
import { ClickSpark } from './components/reactbits/ClickSpark'
import { MicroSlatsBg } from './components/reactbits/MicroSlatsBg'
import { Dock } from './components/reactbits/Dock'

export function App() {
  const { theme, toggleTheme } = useTheme()
  const [isPortalOpen, setIsPortalOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    // Don't show portal if URL has hash anchor (e.g. direct link to #experience)
    if (window.location.hash) return false
    // Check if user visited in this session
    return sessionStorage.getItem('hasVisitedPortal') !== 'true'
  })

  const handlePortalEnter = () => {
    setIsPortalOpen(false)
    try {
      sessionStorage.setItem('hasVisitedPortal', 'true')
    } catch {
      // ignore in restricted environments
    }
  }

  const handleOpenPortal = () => {
    setIsPortalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0A0D12] text-[#111317] dark:text-[#F4F7FB] selection:bg-[#CCFF00] selection:text-[#111317] relative">
      {/* React Bits Ambient Background: Micro Slats (Rolling Sea in Perspective) */}
      <MicroSlatsBg />

      {/* React Bits Click Effects: Neon Spark Particle Bursts */}
      <ClickSpark sparkColor={['#CCFF00', '#00E5FF', '#FF5500', '#FFFFFF']} sparkCount={14} sparkSize={3} />

      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#CCFF00] focus:text-[#111317] focus:font-mono focus:font-bold focus:border-3 focus:border-[#111317] focus:shadow-[4px_4px_0px_#111317]"
      >
        Skip to main content
      </a>

      {/* Interactive Portal Entry Overlay (Lakshay-13 inspired) */}
      <PortalEntry isOpen={isPortalOpen} onEnter={handlePortalEnter} />

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPortal={handleOpenPortal}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full pb-20" id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* React Bits Modern Floating Dock Navigation */}
      <Dock
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPortal={handleOpenPortal}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
