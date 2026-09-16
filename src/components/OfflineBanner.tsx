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
      className="sticky top-0 z-50 w-full bg-ember text-white px-4 py-2 font-mono text-xs font-medium border-b border-ember-bright shadow-[0_4px_20px_rgba(160,42,34,0.4)] flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 animate-pulse" />
        <span>SYS://OFFLINE_MODE_ACTIVE — CACHED RESUME &amp; TELEMETRY READY</span>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 text-[10px] bg-black/20 px-2.5 py-0.5 rounded-full border border-white/20">
        <ShieldCheck className="w-3 h-3 text-white" />
        <span>OFFLINE RESILIENT ARCHITECTURE</span>
      </div>
    </div>
  )
}
