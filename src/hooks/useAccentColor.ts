import { useState, useEffect, useCallback } from 'react'

export interface AccentColorOption {
  id: string
  name: string
  hex: string
}

export const ACCENT_COLORS: AccentColorOption[] = [
  { id: 'ember', name: 'Crimson Ember', hex: '#A02A22' },
  { id: 'vibrant', name: 'Vibrant Solar', hex: '#FC6B2F' },
  { id: 'gold', name: 'Imperial Gold', hex: '#E5A93C' },
  { id: 'obsidian', name: 'Silver Smoke', hex: '#B0B0B3' }
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
