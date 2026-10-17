import React, { useState } from 'react'
import {
  User,
  Briefcase,
  Cpu,
  Layers,
  GraduationCap,
  Mail,
  Sun,
  Moon,
  Orbit
} from 'lucide-react'

interface DockProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onOpenPortal: () => void
}

interface DockItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  action?: () => void
  accentColor?: string
}

export const Dock: React.FC<DockProps> = ({ theme, onToggleTheme, onOpenPortal }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const items: DockItem[] = [
    { id: 'about', label: 'About', icon: User, href: '#about', accentColor: '#00E5FF' },
    { id: 'experience', label: 'Experience', icon: Briefcase, href: '#experience', accentColor: '#CCFF00' },
    { id: 'skills', label: 'Skills', icon: Cpu, href: '#skills', accentColor: '#FF5500' },
    { id: 'projects', label: 'Highlights', icon: Layers, href: '#projects', accentColor: '#CCFF00' },
    { id: 'education', label: 'Education', icon: GraduationCap, href: '#education', accentColor: '#00E5FF' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact', accentColor: '#FF5500' },
    { id: 'portal', label: 'Telemetry Portal', icon: Orbit, action: onOpenPortal, accentColor: '#CCFF00' },
    {
      id: 'theme',
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: theme === 'dark' ? Sun : Moon,
      action: onToggleTheme,
      accentColor: '#CCFF00'
    }
  ]

  return (
    <aside
      aria-label="Quick Actions Dock"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 bg-[#FAF8F5]/90 dark:bg-[#131720]/90 backdrop-blur-md border-3 border-[#111317] dark:border-[#334155] shadow-[4px_4px_0px_#111317] dark:shadow-[4px_4px_0px_#CCFF00] flex items-end gap-2 sm:gap-3 select-none"
    >
      {items.map((item, idx) => {
        const IconComponent = item.icon
        const isHovered = hoveredIdx === idx
        const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1

        const scale = isHovered ? 'scale-125 -translate-y-2' : isNeighbor ? 'scale-110 -translate-y-1' : 'scale-100'

        const content = (
          <div
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] cursor-pointer transition-all duration-200 ${scale} hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#111317] dark:hover:bg-[#CCFF00] dark:hover:text-[#111317]`}
          >
            <IconComponent className="w-5 h-5 transition-transform" />

            {/* Tooltip */}
            {isHovered && (
              <span className="absolute -top-9 px-2 py-0.5 bg-[#111317] text-[#CCFF00] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#CCFF00] whitespace-nowrap shadow-[2px_2px_0px_#CCFF00] pointer-events-none">
                {item.label}
              </span>
            )}
          </div>
        )

        return item.href ? (
          <a key={item.id} href={item.href} aria-label={item.label} className="focus:outline-none focus:ring-2 focus:ring-[#CCFF00]">
            {content}
          </a>
        ) : (
          <button key={item.id} onClick={item.action} aria-label={item.label} className="focus:outline-none focus:ring-2 focus:ring-[#CCFF00]">
            {content}
          </button>
        )
      })}
    </aside>
  )
}
