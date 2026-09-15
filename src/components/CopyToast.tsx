import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface CopyToastProps {
  message: string | null
  onClose: () => void
}

export const CopyToast: React.FC<CopyToastProps> = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#111317] text-[#FAF8F5] border-3 border-[#CCFF00] shadow-[5px_5px_0px_#CCFF00] font-mono text-xs font-bold animate-in slide-in-from-bottom-3 duration-200"
    >
      <div className="w-6 h-6 rounded-full bg-[#CCFF00] text-[#111317] flex items-center justify-center font-black">
        <CheckCircle2 className="w-4 h-4 stroke-[3]" />
      </div>
      <div>
        <div className="text-[#CCFF00] uppercase tracking-wider text-[10px]">
          [SYSTEM_CLIPBOARD // COPIED]
        </div>
        <div className="text-white font-mono mt-0.5 truncate max-w-xs">{message}</div>
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white text-xs px-1.5 py-0.5 border border-gray-600 hover:border-white transition-colors"
        aria-label="Dismiss copy notification"
      >
        ✕
      </button>
    </div>
  )
}
