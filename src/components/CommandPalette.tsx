import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  FileText,
  Terminal,
  Sun,
  Moon,
  Zap,
  Mail,
  User,
  Briefcase,
  Cpu,
  Layers,
  GraduationCap,
  Download,
  Palette
} from 'lucide-react'
import { ACCENT_COLORS } from '../hooks/useAccentColor'
import { downloadVCard } from '../utils/vCard'
import { personalInfo } from '../data/portfolio'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onToggleTheme: () => void
  theme: 'light' | 'dark'
  onOpenConsole: () => void
  onOpenResume: () => void
  isTLDR: boolean
  onToggleTLDR: () => void
  onCopyEmail: () => void
  onSelectAccent: (accentId: string) => void
}

interface PaletteAction {
  id: string
  title: string
  category: 'NAVIGATION' | 'ACTIONS' | 'ACCENTS'
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
  run: () => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  theme,
  onOpenConsole,
  onOpenResume,
  isTLDR,
  onToggleTLDR,
  onCopyEmail,
  onSelectAccent
}) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const actions: PaletteAction[] = [
    // Actions
    {
      id: 'resume',
      title: 'Inspect Verified Resume [PDF]',
      category: 'ACTIONS',
      icon: FileText,
      shortcut: 'P',
      run: () => {
        onClose()
        onOpenResume()
      }
    },
    {
      id: 'download-resume-pdf',
      title: 'Download Official Resume (Dev_Jangid_Resume.pdf)',
      category: 'ACTIONS',
      icon: Download,
      run: () => {
        onClose()
        const link = document.createElement('a')
        link.href = '/Dev_Jangid_Resume.pdf'
        link.download = 'Dev_Jangid_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    },
    {
      id: 'cli',
      title: 'Launch Interactive Hacker CLI Terminal',
      category: 'ACTIONS',
      icon: Terminal,
      shortcut: '~',
      run: () => {
        onClose()
        onOpenConsole()
      }
    },
    {
      id: 'tldr',
      title: isTLDR ? 'Disable Recruiter 30s TL;DR Mode' : 'Enable Recruiter 30s TL;DR Mode',
      category: 'ACTIONS',
      icon: Zap,
      run: () => {
        onClose()
        onToggleTLDR()
      }
    },
    {
      id: 'theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'ACTIONS',
      icon: theme === 'dark' ? Sun : Moon,
      run: () => {
        onClose()
        onToggleTheme()
      }
    },
    {
      id: 'copy-email',
      title: `Copy Email (${personalInfo.email})`,
      category: 'ACTIONS',
      icon: Mail,
      run: () => {
        onClose()
        onCopyEmail()
      }
    },
    {
      id: 'vcard',
      title: 'Download vCard Contact Card (.vcf)',
      category: 'ACTIONS',
      icon: Download,
      run: () => {
        onClose()
        downloadVCard()
      }
    },

    // Navigation
    {
      id: 'nav-about',
      title: 'Jump to Section: About Overview',
      category: 'NAVIGATION',
      icon: User,
      run: () => {
        onClose()
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-exp',
      title: 'Jump to Section: Experience (AAI, ISL, GenAI)',
      category: 'NAVIGATION',
      icon: Briefcase,
      run: () => {
        onClose()
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-skills',
      title: 'Jump to Section: Technical Stack & Skills',
      category: 'NAVIGATION',
      icon: Cpu,
      run: () => {
        onClose()
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-projects',
      title: 'Jump to Section: Highlights & Simulators',
      category: 'NAVIGATION',
      icon: Layers,
      run: () => {
        onClose()
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-edu',
      title: 'Jump to Section: Academic History',
      category: 'NAVIGATION',
      icon: GraduationCap,
      run: () => {
        onClose()
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-contact',
      title: 'Jump to Section: Direct Contact Channels',
      category: 'NAVIGATION',
      icon: Mail,
      run: () => {
        onClose()
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    },

    // Accents
    ...ACCENT_COLORS.map((accent) => ({
      id: `accent-${accent.id}`,
      title: `Set UI Accent: ${accent.name} (${accent.hex})`,
      category: 'ACCENTS' as const,
      icon: Palette,
      run: () => {
        onClose()
        onSelectAccent(accent.id)
      }
    }))
  ]

  const filtered = actions.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].run()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white/95 dark:bg-[#0e0e12]/95 text-[#141418] dark:text-[#f0f0f4] border border-black/10 dark:border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(160,42,34,0.25)] rounded-2xl overflow-hidden font-mono backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <Search className="w-5 h-5 text-ember shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Type a command or jump to section... (Esc to close)"
            className="flex-1 bg-transparent text-[#141418] dark:text-[#f0f0f4] font-mono text-sm placeholder:text-gray-400 dark:placeholder:text-ash/60 focus:outline-none"
          />
          <span className="text-[10px] font-mono bg-black/5 dark:bg-white/10 text-gray-600 dark:text-silver px-2 py-0.5 rounded-md border border-black/10 dark:border-white/15">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2.5 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-ash">
              No matching commands or destinations found.
            </div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon
              const isSelected = idx === selectedIndex

              return (
                <button
                  key={action.id}
                  onClick={action.run}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs rounded-xl transition-all ${
                    isSelected
                      ? 'bg-ember text-white shadow-[0_0_20px_rgba(160,42,34,0.4)] font-medium'
                      : 'text-[#141418] dark:text-[#e8e8ea] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-ember'}`} />
                    <span>{action.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] uppercase px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? 'border-white/30 text-white'
                          : 'border-black/10 dark:border-white/10 text-gray-500 dark:text-ash'
                      }`}
                    >
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                          isSelected
                            ? 'bg-white/20 border-white/30 text-white'
                            : 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/15 text-gray-600 dark:text-silver'
                        }`}
                      >
                        {action.shortcut}
                      </span>
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-black/20 text-[11px] text-gray-500 dark:text-ash">
          <span>Navigate with [↑] [↓] • Execute with [↵]</span>
          <span className="text-ember font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ember inline-block animate-pulse" />
            DEV_JANGID // CMD
          </span>
        </div>
      </div>
    </div>
  )
}
