import { useState, useCallback, useEffect } from 'react'

export function useTLDRMode() {
  const [isTLDR, setIsTLDR] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('recruiter_tldr_mode') === 'true'
  })

  useEffect(() => {
    try {
      localStorage.setItem('recruiter_tldr_mode', isTLDR ? 'true' : 'false')
      if (isTLDR) {
        document.body.classList.add('tldr-mode-active')
      } else {
        document.body.classList.remove('tldr-mode-active')
      }
    } catch {
      // ignore
    }
  }, [isTLDR])

  const toggleTLDR = useCallback(() => {
    setIsTLDR((prev) => !prev)
  }, [])

  return {
    isTLDR,
    toggleTLDR
  }
}
