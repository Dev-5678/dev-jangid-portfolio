import React from 'react'
import { MicroSlats } from './MicroSlats'

interface MicroSlatsBgProps {
  className?: string
  theme?: 'light' | 'dark'
}

export const MicroSlatsBg: React.FC<MicroSlatsBgProps> = ({ className = '', theme }) => {
  const isDark = theme
    ? theme === 'dark'
    : typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden ${className}`}
    >
      <MicroSlats
        key={isDark ? 'dark-slats' : 'light-slats'}
        preset={isDark ? 'storm' : 'swell'}
        color={isDark ? '#8B5CF6' : '#A78BFA'}
        glintColor={isDark ? '#E9D5FF' : '#4338CA'}
        backgroundColor={isDark ? '#0A0D12' : '#FAF8F5'}
        slatWidth={isDark ? 9 : 8}
        slatHeight={isDark ? 24 : 22}
        gap={isDark ? 3.5 : 4}
        roundness={0.85}
        interactive={true}
        cursorStrength={1.4}
        cursorSize={55}
        swirl={0.25}
        trail={1.8}
        lean={0.25}
      />
    </div>
  )
}

export default MicroSlatsBg
