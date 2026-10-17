import { useState, useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import { useSoundEffects } from './hooks/useSoundEffects'
import { useAccentColor } from './hooks/useAccentColor'
import { useTLDRMode } from './hooks/useTLDRMode'
import { useClipboard } from './hooks/useClipboard'
import { useOnlineStatus } from './hooks/useOnlineStatus'

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
import { AtmosphericOverlay } from './components/AtmosphericOverlay'
import { AperturePhilosophySection } from './components/AperturePhilosophySection'
import { VelocityMarquee } from './components/reactbits/VelocityMarquee'
import { DevConsole } from './components/DevConsole'
import { ResumeModal } from './components/ResumeModal'
import { CommandPalette } from './components/CommandPalette'
import { ScrollProgressHUD } from './components/ScrollProgressHUD'
import { OfflineBanner } from './components/OfflineBanner'
import { CopyToast } from './components/CopyToast'
import { personalInfo } from './data/portfolio'
import { Zap, X } from 'lucide-react'

export function App() {
  const { theme, toggleTheme } = useTheme()
  const { isMuted, toggleMute, playClick, playSuccess } = useSoundEffects()
  const { changeAccent } = useAccentColor()
  const { isTLDR, toggleTLDR } = useTLDRMode()
  const { copiedText, copy, clearCopied } = useClipboard(playSuccess)
  const isOnline = useOnlineStatus()

  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Global hotkeys: backtick (`) for CLI terminal, Ctrl+K / Cmd+K for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)

      // Command Palette (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        playClick()
        setIsPaletteOpen((prev) => !prev)
        return
      }

      // Hacker CLI console (`)
      if (e.key === '`' && !isInput) {
        e.preventDefault()
        playClick()
        setIsConsoleOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playClick])

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0A0D12] text-[#111317] dark:text-[#F4F7FB] selection:bg-[var(--accent,#CCFF00)] selection:text-[#111317] relative">
      {/* Feature 15: Offline Resilient Mode Banner */}
      <OfflineBanner isOnline={isOnline} />

      {/* Feature 5: Top Scroll Progress Bar & HUD Section Indicator */}
      <ScrollProgressHUD />

      {/* Ambient Micro-Slats 3D Background */}
      <MicroSlatsBg theme={theme} />

      {/* Atmospheric Micro-Dust & Organic Noise Overlay */}
      <AtmosphericOverlay theme={theme} />

      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[var(--accent,#CCFF00)] focus:text-[#111317] focus:font-mono focus:font-bold focus:border-3 focus:border-[#111317] focus:shadow-[4px_4px_0px_#111317]"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        onToggleTheme={() => {
          playClick()
          toggleTheme()
        }}
        onOpenConsole={() => {
          playClick()
          setIsConsoleOpen(true)
        }}
        onOpenResume={() => {
          playClick()
          setIsResumeOpen(true)
        }}
        onOpenCommandPalette={() => {
          playClick()
          setIsPaletteOpen(true)
        }}
        isTLDR={isTLDR}
        onToggleTLDR={() => {
          playClick()
          toggleTLDR()
        }}
        isMuted={isMuted}
        onToggleMute={() => {
          toggleMute()
        }}
      />

      {/* Feature 1: Recruiter 30-Second Executive Summary Alert Banner */}
      {isTLDR && (
        <div className="bg-[#111317] text-[#FAF8F5] border-b-3 border-[#FF5500] px-4 py-3 font-mono text-xs">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF5500] rounded-full animate-ping" />
              <Zap className="w-4 h-4 text-[#FF5500] fill-current" />
              <span className="font-bold text-[#FF5500] uppercase">30-SECOND RECRUITER TL;DR ACTIVE:</span>
              <span className="text-gray-300 hidden md:inline">
                Displaying high-impact institutional highlights (AAI, ISL, Gemini RAG, C++/Java).
              </span>
            </div>
            <button
              onClick={toggleTLDR}
              className="self-start sm:self-auto px-2 py-0.5 bg-[#FF5500] hover:bg-[#e04b00] text-white font-bold text-[10px] flex items-center gap-1 uppercase transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Disable TL;DR</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1 w-full" id="main-content">
        <HeroSection
          onOpenResume={() => {
            playClick()
            setIsResumeOpen(true)
          }}
        />
        
        {/* Infinite Dual-Band Velocity Marquee */}
        <VelocityMarquee />

        {/* Viral Reel Flex: Scroll-Expanding Philosophy & System Architecture Aperture */}
        <AperturePhilosophySection
          onOpenResume={() => {
            playClick()
            setIsResumeOpen(true)
          }}
        />

        <AboutSection />
        
        {/* Experience Section with Tag Filters & TL;DR Mode */}
        <ExperienceSection isTLDR={isTLDR} />
        
        <SkillsSection />
        
        {/* Projects Section with 4 Interactive Simulators & Blueprint Modals */}
        <ProjectsSection />
        
        <EducationSection />
        
        {/* Contact Section with One-Click Copy & vCard Download */}
        <ContactSection onCopyText={(text, label) => copy(text, label)} />
      </main>

      {/* Feature 2: Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenConsole={() => setIsConsoleOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        isTLDR={isTLDR}
        onToggleTLDR={toggleTLDR}
        onCopyEmail={() => copy(personalInfo.email, personalInfo.email)}
        onSelectAccent={(colorId) => {
          changeAccent(colorId)
          playSuccess()
        }}
      />

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

      {/* Feature 3: Tactile Copy Notification Toast */}
      <CopyToast message={copiedText} onClose={clearCopied} />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
