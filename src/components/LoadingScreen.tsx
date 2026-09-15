import React, { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onLoaded?: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Smooth progress counter up to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsFading(true)
            setTimeout(() => {
              setIsDone(true)
              onLoaded?.()
            }, 500)
          }, 200)
          return 100
        }
        const jump = Math.floor(Math.random() * 8) + 3
        return Math.min(100, prev + jump)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onLoaded])

  if (isDone) return null

  return (
    <div
      aria-hidden={isFading}
      className={`loading-screen ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        zIndex: 10000,
        backgroundColor: '#050505'
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
            transform: `scaleX(${progress / 100})`
          }}
        />
      </div>
    </div>
  )
}

export default LoadingScreen
