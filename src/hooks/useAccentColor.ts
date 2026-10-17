import { useState, useEffect, useCallback } from 'react'

export interface AccentColorOption {
  id: string
  name: string
  hex: string
}

export const ACCENT_COLORS: AccentColorOption[] = [
  { id: 'lime', name: 'Electric Lime', hex: '#CCFF00' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#00E5FF' },
  { id: 'orange', name: 'Blaze Orange', hex: '#FF5500' },
  { id: 'matrix', name: 'Matrix Green', hex: '#00FF66' }
]

export function useAccentColor() {
  const [accent, setAccent] = useState<AccentColorOption>(() => {
    if (typeof window === 'undefined') return ACCENT_COLORS[0]
    const saved = localStorage.getItem('portfolio_accent')
    const match = ACCENT_COLORS.find((c) => c.id === saved)
    return match || ACCENT_COLORS[0]
  })

  const changeAccent = useCallback((colorId: string) => {
    const target = ACCENT_COLORS.find((c) => c.id === colorId) || ACCENT_COLORS[0]
    setAccent(target)
    try {
      localStorage.setItem('portfolio_accent', target.id)
      document.documentElement.style.setProperty('--accent', target.hex)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent', accent.hex)
    }
  }, [accent])

  return {
    accent,
    accentList: ACCENT_COLORS,
    changeAccent
  }
}
