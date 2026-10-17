import { useState, useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import { useSoundEffects } from './hooks/useSoundEffects'
import { useAccentColor } from './hooks/useAccentColor'
import { useTLDRMode } from './hooks/useTLDRMode'
import { useClipboard } from './hooks/useClipboard'
import { useOnlineStatus } from './hooks/useOnlineStatus'

import { StaggeredMenu } from './components/reactbits/StaggeredMenu'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { SkillsSection } from './sections/SkillsSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { EducationSection } from './sections/EducationSection'
import { ContactSection } from './sections/ContactSection'
import { LoadingScreen } from './components/LoadingScreen'
import { AperturePhilosophySection } from './components/AperturePhilosophySection'
import { DevConsole } from './components/DevConsole'
import { ResumeModal } from './components/ResumeModal'
import { CommandPalette } from './components/CommandPalette'
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
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#e8e8ea] selection:bg-[#a02a22] selection:text-white relative">
      {/* Cinematic Counter Loading Screen (from reel) */}
      <LoadingScreen />

      {/* Global SVG Fractal Noise Overlay (from reel) */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Feature 15: Offline Resilient Mode Banner */}
      <OfflineBanner isOnline={isOnline} />

      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-ember focus:text-white focus:font-sans focus:font-semibold focus:rounded-full focus:shadow-[0_0_25px_rgba(160,42,34,0.6)] focus:border focus:border-white/20"
      >
        Skip to main content
      </a>

      {/* Cinematic Staggered Menu Header (Exact Reel Replica) */}
      <StaggeredMenu
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
        items={[
          { label: 'Home', link: '#hero' },
          { label: 'Philosophy', link: '#introduction' },
          { label: 'Projects', link: '#projects' },
          { label: 'Experience', link: '#experience' },
          { label: 'About', link: '#about' },
          { label: 'Skills', link: '#skills' },
          { label: 'Education', link: '#education' },
          { label: 'Contact', link: '#contact' }
        ]}
        socialItems={[
          { label: 'GitHub', link: personalInfo.github || 'https://github.com' },
          { label: 'LinkedIn', link: personalInfo.linkedin || 'https://linkedin.com' },
          { label: 'Email', link: `mailto:${personalInfo.email}` },
          { label: 'Twitter / X', link: 'https://x.com' }
        ]}
        colors={['#18181e', '#23232c', '#0f0f12']}
        accentColor="#a02a22"
      />

      {/* Feature 1: Recruiter 30-Second Executive Summary Alert Banner */}
      {isTLDR && (
        <div className="bg-[#0e0e11] text-white border-b border-ember/30 px-4 py-3 font-mono text-xs backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-ember rounded-full animate-ping" />
              <Zap className="w-4 h-4 text-ember fill-current" />
              <span className="font-bold text-ember uppercase">30-SECOND RECRUITER TL;DR ACTIVE:</span>
              <span className="text-ash hidden md:inline">
                Displaying high-impact institutional highlights (AAI, ISL, Gemini RAG, C++/Java).
              </span>
            </div>
            <button
              onClick={toggleTLDR}
              className="self-start sm:self-auto px-2.5 py-1 bg-ember/20 hover:bg-ember text-white rounded-full font-medium text-[10px] flex items-center gap-1 uppercase transition-colors border border-ember/40 cursor-pointer"
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

        {/* Viral Reel Flex: Scroll-Expanding Philosophy & System Architecture Aperture */}
        <AperturePhilosophySection
          onOpenResume={() => {
            playClick()
            setIsResumeOpen(true)
          }}
        />

        {/* Projects Section with 5 macOS Window Cards (matches Reel order) */}
        <ProjectsSection />

        {/* Experience Section with Reel Ember Glow */}
        <ExperienceSection isTLDR={isTLDR} />

        {/* About Dev Jangid Section */}
        <AboutSection />

        {/* Technical Skills Section */}
        <SkillsSection />

        {/* Education & Credentials Section */}
        <EducationSection />

        {/* Contact Section with Direct Transmission & Back-to-Top Footer */}
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
    </div>
  )
}

export default App
