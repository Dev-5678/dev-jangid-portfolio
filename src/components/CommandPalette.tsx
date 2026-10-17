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
      title: 'Copy Email (devjangid911@gmail.com)',
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#131720] border-4 border-[#111317] dark:border-[#334155] shadow-[8px_8px_0px_#111317] dark:shadow-[8px_8px_0px_var(--accent,#CCFF00)] overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b-3 border-[#111317] dark:border-[#334155] bg-[#FAF8F5] dark:bg-[#0A0D12]">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Type a command or jump to section... (Esc to close)"
            className="flex-1 bg-transparent text-[#111317] dark:text-[#F4F7FB] font-mono text-sm placeholder:text-gray-400 focus:outline-none"
          />
          <span className="text-[10px] bg-gray-200 dark:bg-[#1E293B] text-gray-700 dark:text-gray-300 px-2 py-0.5 border border-[#111317] dark:border-[#334155]">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-[#1E293B]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-[var(--accent,#CCFF00)] text-[#111317] font-bold'
                      : 'text-[#111317] dark:text-[#F4F7FB] hover:bg-gray-100 dark:hover:bg-[#1A202C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{action.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                        isSelected
                          ? 'border-[#111317] text-[#111317]'
                          : 'border-gray-300 dark:border-gray-700 text-gray-500'
                      }`}
                    >
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-black/10 dark:bg-white/10">
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
        <div className="flex items-center justify-between px-4 py-2 border-t-2 border-[#111317] dark:border-[#334155] bg-[#FAF8F5] dark:bg-[#0A0D12] text-[10px] text-gray-500">
          <span>Navigate with [↑] [↓], Execute with [↵]</span>
          <span className="text-[var(--accent,#CCFF00)] font-bold">DEV_JANGID // CMD_PALETTE</span>
        </div>
      </div>
    </div>
  )
}
