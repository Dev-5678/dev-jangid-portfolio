import React from 'react'
import { WifiOff, ShieldCheck } from 'lucide-react'

interface OfflineBannerProps {
  isOnline: boolean
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline }) => {
  if (isOnline) return null

  return (
    <div
      role="alert"
      className="sticky top-0 z-50 w-full bg-[#FF5500] text-white px-4 py-2 font-mono text-xs font-bold border-b-3 border-[#111317] flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 animate-bounce" />
        <span>SYS://OFFLINE_MODE_ACTIVE — CACHED RESUME & TELEMETRY READY</span>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 text-[10px] bg-black/30 px-2 py-0.5 border border-white/50">
        <ShieldCheck className="w-3 h-3 text-[#CCFF00]" />
        <span>OFFLINE RESILIENT ARCHITECTURE</span>
      </div>
    </div>
  )
}
