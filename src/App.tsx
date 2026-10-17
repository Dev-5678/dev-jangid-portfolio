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
import { AAIProjectWebsite } from './pages/AAIProjectWebsite'
import { CanSatProjectWebsite } from './pages/CanSatProjectWebsite'
import { GeminiRAGProjectWebsite } from './pages/GeminiRAGProjectWebsite'
import { SystemsEngineProjectWebsite } from './pages/SystemsEngineProjectWebsite'

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

  // Dedicated Project Showcase Route Listener
  const getProjectRoute = () => {
    const hash = window.location.hash.toLowerCase()
    const path = window.location.pathname.toLowerCase()
    if (hash.includes('project/aai') || path.includes('/project/aai')) return 'aai'
    if (hash.includes('project/cansat') || path.includes('/project/cansat')) return 'cansat'
    if (hash.includes('project/gemini') || hash.includes('project/rag') || path.includes('/project/gemini') || path.includes('/project/rag')) return 'rag'
    if (hash.includes('project/systems') || hash.includes('project/high-throughput') || path.includes('/project/systems')) return 'systems'
    return null
  }

  const [projectRoute, setProjectRoute] = useState<string | null>(getProjectRoute())

  useEffect(() => {
    const handleHashChange = () => {
      setProjectRoute(getProjectRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [])

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

  // Direct Standalone Project Website Rendering
  if (projectRoute === 'aai') {
    return (
      <AAIProjectWebsite
        onBack={() => {
          window.location.hash = '#projects'
          setProjectRoute(null)
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  if (projectRoute === 'cansat') {
    return (
      <CanSatProjectWebsite
        onBack={() => {
          window.location.hash = '#projects'
          setProjectRoute(null)
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  if (projectRoute === 'rag') {
    return (
      <GeminiRAGProjectWebsite
        onBack={() => {
          window.location.hash = '#projects'
          setProjectRoute(null)
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  if (projectRoute === 'systems') {
    return (
      <SystemsEngineProjectWebsite
        onBack={() => {
          window.location.hash = '#projects'
          setProjectRoute(null)
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-ember selection:text-white relative transition-colors duration-300">
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

      {/* Feature 1: Recruiter 30-Second Executive Summary Floating Indicator */}
      {isTLDR && (
        <aside
          aria-label="TLDR active status"
          className="fixed bottom-6 left-4 sm:left-6 z-50 bg-[#0e0e11]/95 text-white border border-ember/40 px-4 py-2.5 rounded-2xl font-mono text-xs shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(160,42,34,0.3)] backdrop-blur-xl flex items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-ember rounded-full animate-ping" />
            <Zap className="w-3.5 h-3.5 text-ember fill-current" />
            <span className="font-bold text-ember uppercase text-[11px]">30s TL;DR Active</span>
          </div>
          <button
            onClick={toggleTLDR}
            aria-label="Disable TL;DR"
            className="px-2 py-0.5 bg-white/10 hover:bg-ember text-white rounded-full font-medium text-[10px] flex items-center gap-1 uppercase transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Close</span>
          </button>
        </aside>
      )}

      {/* Main Content Sections */}
      <main className="flex-1 w-full" id="main-content">
        <HeroSection
          theme={theme}
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
