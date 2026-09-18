import React, { useEffect, useState, useCallback } from 'react'

interface LoadingScreenProps {
  onLoaded?: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  // Check if user has already visited in this session
  const alreadyVisited = typeof window !== 'undefined' && sessionStorage.getItem('dj_visited') === '1'
  const [progress, setProgress] = useState(alreadyVisited ? 100 : 0)
  const [isFading, setIsFading] = useState(false)
  const [isDone, setIsDone] = useState(alreadyVisited)

  const dismiss = useCallback(() => {
    setIsFading(true)
    try {
      sessionStorage.setItem('dj_visited', '1')
    } catch {
      // Ignore
    }
    setTimeout(() => {
      setIsDone(true)
      onLoaded?.()
    }, 150)
  }, [onLoaded])

  useEffect(() => {
    if (alreadyVisited) {
      onLoaded?.()
      return
    }

    // High-speed smooth progress counter (completes in ~240ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          dismiss()
          return 100
        }
        const jump = Math.floor(Math.random() * 15) + 18
        const next = Math.min(100, prev + jump)
        if (next >= 100) {
          clearInterval(interval)
          dismiss()
        }
        return next
      })
    }, 18)

    return () => clearInterval(interval)
  }, [alreadyVisited, dismiss, onLoaded])

  if (isDone) return null

  return (
    <div
      onClick={dismiss}
      onTouchStart={dismiss}
      role="status"
      aria-label="Loading portfolio"
      className={`loading-screen cursor-pointer ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        zIndex: 10000,
        backgroundColor: '#050505',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      <span className="loading-counter select-none">{progress}</span>

      <div className="flex items-center gap-2">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'var(--ash)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase'
          }}
        >
          Dev Jangid
        </span>
      </div>

      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{
            transform: `scaleX(${progress / 100})`,
            transition: 'transform 0.08s ease-out'
          }}
        />
      </div>

      <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-2 opacity-60">
        Click to skip
      </span>
    </div>
  )
}

export default LoadingScreen
