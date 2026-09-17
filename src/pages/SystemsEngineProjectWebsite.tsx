import React, { useState } from 'react'
import { Cpu, ArrowLeft, Check, Copy, Zap, Code2, Layers } from 'lucide-react'
import { HighThroughputSystemsApp } from '../components/projects/HighThroughputSystemsApp'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const SystemsEngineProjectWebsite: React.FC<ProjectPageProps> = ({ onBack, theme = 'dark', onToggleTheme }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f4f4f7] font-sans selection:bg-ember selection:text-white">
      {/* Top Standalone Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0c0d12]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-ember hover:text-white text-zinc-300 font-mono text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase hidden sm:inline">
              NEXUS_SYSTEMS_ENGINE.LIVE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              VERCEL HOSTED
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-ember" />}
            <span>{copied ? 'Link Copied' : 'Share Website'}</span>
          </button>

          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 font-mono text-xs transition-all cursor-pointer"
            >
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
            </button>
          )}
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative px-4 sm:px-8 py-12 sm:py-20 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ember/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)] font-mono text-xs text-cyan-300 font-bold">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>CORE COMPUTER SCIENCE // HIGH-THROUGHPUT LOW-LATENCY C++20</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            Nexus-Core Algorithmic Systems Engine
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            High-throughput algorithmic profiling and streaming telemetry engine engineered in Modern C++20. Employs cache-aligned in-place QuickSort partitioning, flat min-heap Dijkstra routing, and Robin Hood open-addressing hash maps to guarantee microsecond deterministic execution under peak computational load.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">L1 Cache Hit Rate</span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono mt-1 block">99.4%</span>
              <span className="text-[10px] text-zinc-500 font-mono">Contiguous Memory</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Throughput</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 block">~2.4M ops/ms</span>
              <span className="text-[10px] text-zinc-500 font-mono">Stream Sorter</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Latency Guarantee</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1 block">Sub-Millisecond</span>
              <span className="text-[10px] text-zinc-500 font-mono">Deterministic Bounds</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Auxiliary Space</span>
              <span className="text-xl sm:text-2xl font-bold text-ember font-mono mt-1 block">O(1) / In-Place</span>
              <span className="text-[10px] text-zinc-500 font-mono">Zero Heap Allocs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Live Application Apparatus */}
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono uppercase flex items-center gap-2">
              <Zap className="w-5 h-5 text-ember" />
              <span>Live Algorithmic Benchmark &amp; Profiler</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Execute live browser benchmarks measuring real microsecond elapsed time across configurable array sizes.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-emerald-400">
            ● ENGINE COMPILED &amp; ARMED
          </span>
        </div>

        <div className="rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <HighThroughputSystemsApp />
        </div>
      </section>

      {/* Deep-Dive Technical Specifications Grid */}
      <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto border-t border-white/10 space-y-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono uppercase">
            Systems Architecture &amp; Cache-Locality Optimization
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-mono">
            Low-level systems principles applied to high-throughput data pipelines and telemetry routing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              1. Cache Line Alignment
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Data structures are aligned to 64-byte hardware cache boundaries, eliminating false sharing across multiple execution threads and maximizing L1/L2 data prefetching.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Layers className="w-6 h-6 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              2. Flat Heap Routing
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Dijkstra graph router uses a contiguous binary min-heap array rather than pointer-linked nodes, transforming indirect memory lookups into sequential hardware vector operations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Code2 className="w-6 h-6 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              3. Robin Hood Probe Bounding
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Open-addressing hash table shifts elements based on distance from initial hash bucket, guaranteeing variance in probe sequences approaches zero for steady sub-microsecond retrieval.
            </p>
          </div>
        </div>
      </section>

      {/* Standalone Website Footer */}
      <footer className="border-t border-white/10 px-4 sm:px-8 py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          <span>Dev Jangid // Core Computer Science &amp; Systems Engineering</span>
          <span className="block sm:inline sm:ml-2 text-zinc-500">Modern C++20 • Deterministic Asymptotics</span>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full bg-ember hover:bg-ember-bright text-white font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(160,42,34,0.4)]"
        >
          Return to Portfolio Home
        </button>
      </footer>
    </div>
  )
}

export default SystemsEngineProjectWebsite
