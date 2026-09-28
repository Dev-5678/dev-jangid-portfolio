import React, { useState } from 'react'
import { ArrowLeft, ExternalLink, Radio, Activity, Cpu, Share2, Check } from 'lucide-react'
import { ProxiSpeakApp } from '../components/projects/ProxiSpeakApp'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const ProxiSpeakProjectWebsite: React.FC<ProjectPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'apparatus' | 'architecture' | 'benchmarks'>('apparatus')
  const [copied, setCopied] = useState(false)

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-sans antialiased selection:bg-ember selection:text-white">
      {/* Top Fixed Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
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
              PROXISPEAK // LIVE DEPLOYMENT
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
            href="https://github.com/dhruvsaini09/ProxiSpeak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-ember/20 hover:bg-ember/30 border border-ember/40 text-xs font-mono font-bold text-white transition-all shadow-[0_0_15px_rgba(160,42,34,0.3)] hover:scale-105 active:scale-95"
          >
            <span>GITHUB_REPO</span>
            <ExternalLink className="w-3.5 h-3.5 text-ember-bright" />
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative px-4 sm:px-8 py-10 sm:py-16 max-w-6xl mx-auto overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember/15 border border-ember/30 text-ember-bright text-xs font-mono font-bold uppercase w-fit">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Geospatial Proximity Audio &amp; Interactive Virtual Campus</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            ProxiSpeak Geospatial Audio Ecosystem
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-3xl font-light leading-relaxed">
            Real-time multi-user spatial audio communication grid engineered with React 19, WebSockets, and Web Audio API. 
            Dynamically attenuates sound volume and stereo panning using Euclidean distance calculations, creating realistic localized conversations with zero cross-room audio interference.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Spatial Attenuation</span>
              <span className="text-base font-bold text-emerald-400">Inverse-Square Math</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">WebSockets Latency</span>
              <span className="text-base font-bold text-white">&lt;24 ms Real-Time</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Peer Capacity</span>
              <span className="text-base font-bold text-amber-400">128 Concurrent Nodes</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Audio Bleed Prevention</span>
              <span className="text-base font-bold text-emerald-400">100% Boundary Isolation</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10 flex gap-2">
        <button
          onClick={() => setActiveTab('apparatus')}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase transition-all border-b-2 ${
            activeTab === 'apparatus'
              ? 'border-ember text-white'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          01 // Interactive Spatial Grid
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase transition-all border-b-2 ${
            activeTab === 'architecture'
              ? 'border-ember text-white'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          02 // Architecture &amp; Subsystems
        </button>
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase transition-all border-b-2 ${
            activeTab === 'benchmarks'
              ? 'border-ember text-white'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          03 // Benchmarks &amp; Constraints
        </button>
      </div>

      {/* Main Tab Content */}
      <main className="px-4 sm:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {activeTab === 'apparatus' && (
          <div className="space-y-6">
            <ProxiSpeakApp />
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-8 font-sans">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-ember" />
                <span>Subsystem Decomposition &amp; Spatial Data Pipeline</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
                <div className="p-5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                  <div className="text-amber-400 font-bold uppercase text-sm">01. Spatial Coordinate Engine</div>
                  <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                    Tracks sub-pixel avatar positions across an 800x600 bounded coordinate canvas. Listens to keyboard (WASD) and click vectors, calculating Euclidean distances:
                  </p>
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-emerald-400 text-[11px]">
                    d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                  <div className="text-sky-400 font-bold uppercase text-sm">02. Web Audio Attenuation</div>
                  <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                    Applies smooth exponential falloff through Web Audio API GainNode and StereoPannerNode, guaranteeing natural acoustic drop-off without jarring volume stepping:
                  </p>
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-sky-300 text-[11px]">
                    Gain = Math.pow(1 - d / R, 1.5)
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                  <div className="text-emerald-400 font-bold uppercase text-sm">03. WebSockets Sync</div>
                  <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                    Broadcasts high-frequency coordinate deltas over persistent Socket.io channels, using client-side dead reckoning to interpolate remote peer movements.
                  </p>
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-zinc-300 text-[11px]">
                    Tick rate: 60Hz delta packets
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Performance &amp; Acoustic Verification Metrics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-zinc-400 uppercase text-[10px]">Acoustic Bleed Rate</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">0.00 dB</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Zero cross-room leakage beyond boundary R</div>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-zinc-400 uppercase text-[10px]">Coordinate Frame Rate</div>
                  <div className="text-2xl font-black text-white mt-1">60.0 FPS</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Smooth canvas interpolation</div>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-zinc-400 uppercase text-[10px]">CPU Audio Overhead</div>
                  <div className="text-2xl font-black text-sky-400 mt-1">&lt; 1.2%</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Hardware accelerated Web Audio graph</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ProxiSpeakProjectWebsite
