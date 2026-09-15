import { useState, useCallback } from 'react'

export function useClipboard(onSuccessSound?: () => void) {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback((text: string, label?: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedText(label || text)
        onSuccessSound?.()
      } catch {
        // failed
      }
      document.body.removeChild(textArea)
      return
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label || text)
      onSuccessSound?.()
      setTimeout(() => {
        setCopiedText(null)
      }, 3000)
    }).catch(() => {
      // ignore
    })
  }, [onSuccessSound])

  const clearCopied = useCallback(() => {
    setCopiedText(null)
  }, [])

  return {
    copiedText,
    copy,
    clearCopied
  }
}
