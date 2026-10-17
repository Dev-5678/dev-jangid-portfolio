import { useState, useCallback, useEffect } from 'react'

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('sound_enabled')
    return saved !== 'true' // Muted by default for polite UX
  })

  useEffect(() => {
    try {
      localStorage.setItem('sound_enabled', isMuted ? 'false' : 'true')
    } catch {
      // ignore
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const playSynthSound = useCallback((frequency: number, type: OscillatorType, duration: number, endFreq?: number) => {
    if (isMuted || typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration)
      }

      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + duration)
      setTimeout(() => {
        ctx.close().catch(() => {})
      }, (duration + 0.1) * 1000)
    } catch {
      // AudioContext policy or restricted environment
    }
  }, [isMuted])

  const playClick = useCallback(() => {
    playSynthSound(600, 'triangle', 0.04, 150)
  }, [playSynthSound])

  const playBeep = useCallback(() => {
    playSynthSound(1050, 'sine', 0.06)
  }, [playSynthSound])

  const playSuccess = useCallback(() => {
    playSynthSound(523.25, 'triangle', 0.08)
    setTimeout(() => playSynthSound(659.25, 'triangle', 0.1), 60)
    setTimeout(() => playSynthSound(783.99, 'triangle', 0.15), 120)
  }, [playSynthSound])

  return {
    isMuted,
    toggleMute,
    playClick,
    playBeep,
    playSuccess
  }
}
