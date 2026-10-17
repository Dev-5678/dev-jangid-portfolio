import { useState, useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import { Navbar } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { SkillsSection } from './sections/SkillsSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { EducationSection } from './sections/EducationSection'
import { ContactSection } from './sections/ContactSection'
import { Footer } from './components/Footer'
import { MicroSlatsBg } from './components/reactbits/MicroSlatsBg'
import { VelocityMarquee } from './components/reactbits/VelocityMarquee'
import { DevConsole } from './components/DevConsole'
import { ResumeModal } from './components/ResumeModal'

export function App() {
  const { theme, toggleTheme } = useTheme()
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  // Global hotkey: backtick / tilde (`) toggles the hacker Dev Console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (e.key === '`' && !isInput) {
        e.preventDefault()
        setIsConsoleOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0A0D12] text-[#111317] dark:text-[#F4F7FB] selection:bg-[#CCFF00] selection:text-[#111317] relative">
      {/* React Bits Ambient Background: Micro Slats (Rolling Sea in Perspective) */}
      <MicroSlatsBg theme={theme} />

      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#CCFF00] focus:text-[#111317] focus:font-mono focus:font-bold focus:border-3 focus:border-[#111317] focus:shadow-[4px_4px_0px_#111317]"
      >
        Skip to main content
      </a>

      {/* Modern Responsive Navigation Header */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenConsole={() => setIsConsoleOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full" id="main-content">
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
        />
        
        {/* Infinite Dual-Band Velocity Marquee */}
        <VelocityMarquee />

        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Dev Console CLI Terminal Simulator */}
      <DevConsole
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
        onToggleTheme={toggleTheme}
      />

      {/* Verified Resume Modal with Print Capability */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
