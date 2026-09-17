import { useState, useEffect } from 'react'

export function useAntiPlagiarism() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Elegant copy attribution appending
    const handleCopy = (e: ClipboardEvent) => {
      const selection = document.getSelection()
      if (!selection || selection.toString().length < 30) return

      const originalText = selection.toString()
      const citation = `\n\n/* ────────────────────────────────────────────────────────────\n * [VERIFIED ORIGINAL WORK — 0% PLAGIARISM GUARANTEE]\n * Author: Dev Jangid (Computer Science Engineer, Faridabad, India)\n * Portfolio: https://dev-jangid-portfolio.vercel.app\n * Protected under MIT License & Intellectual Property Rights\n * ──────────────────────────────────────────────────────────── */`

      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', originalText + citation)
        e.preventDefault()

        setToastMessage('Copied to clipboard with verified authorship & anti-plagiarism attribution.')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      }
    }

    // Graceful context-menu protection with notification
    const handleContextMenu = (e: MouseEvent) => {
      // Allow standard right click on inputs/textareas
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return
      }

      setToastMessage('🛡️ Protected IP: 100% Original Engineering Architecture by Dev Jangid • Verified 0% Plagiarism')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }

    document.addEventListener('copy', handleCopy)
    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return {
    showToast,
    toastMessage,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false)
  }
}
