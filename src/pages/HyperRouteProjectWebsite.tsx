import React, { useState } from 'react'
import { ArrowLeft, ExternalLink, Activity, Share2, Check } from 'lucide-react'
import { HyperRouteApp } from '../components/projects/HyperRouteApp'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const HyperRouteProjectWebsite: React.FC<ProjectPageProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false)

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-[#f1f5f9] font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Fixed Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#06080d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-white transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PORTFOLIO_HOME</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
              HYPERROUTE // DISTRIBUTED EDGE GATEWAY
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={copyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-all cursor-pointer active:scale-95"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED' : 'SHARE'}</span>
          </button>

          <a
            href="https://github.com/Dev-5678/HyperRoute"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-mono font-bold text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
          >
            <span>GITHUB_REPO</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>High-Throughput Reverse Proxy &amp; Rate Limiter</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
            HyperRoute Edge Gateway
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Ultra low-latency distributed reverse proxy with sliding-window token bucket rate-limiting, dynamic upstream health checks, and sub-millisecond OpenMetrics Prometheus instrumentation.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-zinc-500 uppercase text-[10px]">p99 Latency</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">&lt;2.80ms</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Benchmark under 120k rps</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-zinc-500 uppercase text-[10px]">Rate Limiting</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1">Token Bucket</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Sliding 60-second window</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-zinc-500 uppercase text-[10px]">Telemetry</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">Prometheus</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">OpenMetrics formatted</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6">
          <h2 className="text-lg font-bold font-mono text-white mb-4">Architecture Apparatus Preview</h2>
          <HyperRouteApp />
        </div>
      </main>
    </div>
  )
}

export default HyperRouteProjectWebsite
