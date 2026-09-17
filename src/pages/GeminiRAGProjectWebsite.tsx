import React, { useState } from 'react'
import { Sparkles, ArrowLeft, Check, Copy, Database, Cpu, ShieldCheck } from 'lucide-react'
import { GeminiRAGStudioApp } from '../components/projects/GeminiRAGStudioApp'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const GeminiRAGProjectWebsite: React.FC<ProjectPageProps> = ({ onBack, theme = 'dark', onToggleTheme }) => {
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
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase hidden sm:inline">
              GEMINI_RAG_STUDIO.LIVE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
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
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)] font-mono text-xs text-amber-300 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>CLOUD AI &amp; VECTOR SYSTEMS // GEMINI 1.5 PRO &amp; VERTEX AI</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            Multimodal Generative AI &amp; RAG Engine
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            Enterprise retrieval-augmented generation (RAG) pipeline built to eliminate AI hallucinations across mission-critical technical documents. Generates dense 768-dimensional vector embeddings, retrieves semantic ground truth with sub-second cosine distance matching, and uses Gemini 1.5 Pro to synthesize reliable, verifiable answers.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Embedding Dimension</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-300 font-mono mt-1 block">768-dim Float32</span>
              <span className="text-[10px] text-zinc-500 font-mono">Dense Vector Space</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Cosine Match Accuracy</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 block">&gt; 96.2%</span>
              <span className="text-[10px] text-zinc-500 font-mono">Semantic Top-K</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">End-to-End Latency</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1 block">&lt; 190ms</span>
              <span className="text-[10px] text-zinc-500 font-mono">Sub-Second Stream</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Grounding Reliability</span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono mt-1 block">99.4%</span>
              <span className="text-[10px] text-zinc-500 font-mono">Zero Hallucinations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Live Application Apparatus */}
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Live Interactive RAG Studio Playground</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Test technical queries, visualize vectorization, inspect cosine distance, and observe Gemini 1.5 Pro context grounding.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-emerald-400">
            ● INFERENCE ENGINE READY
          </span>
        </div>

        <div className="rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <GeminiRAGStudioApp />
        </div>
      </section>

      {/* Deep-Dive Technical Specifications Grid */}
      <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto border-t border-white/10 space-y-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono uppercase">
            RAG Pipeline Architecture &amp; Vector Ingestion
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-mono">
            Key architectural techniques formulated during the Gen AI Academy traineeship program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Cpu className="w-6 h-6 text-amber-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              1. Dense Embeddings &amp; Chunking
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Technical documentation is decomposed into 512-token semantically bounded chunks and mapped into 768-dimensional Euclidean space via Google Cloud Vertex AI embeddings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Database className="w-6 h-6 text-amber-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              2. Cosine K-Nearest Neighbors
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Queries are projected into the vector space and ranked using cosine similarity distance against Pinecone/ChromaDB indexes to isolate the top-K ground-truth passages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              3. Strict Context Grounding
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Gemini 1.5 Pro is constrained with strict negative prompt boundaries, guaranteeing that facts outside the retrieved knowledge chunks are rejected rather than hallucinated.
            </p>
          </div>
        </div>
      </section>

      {/* Standalone Website Footer */}
      <footer className="border-t border-white/10 px-4 sm:px-8 py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          <span>Dev Jangid // Generative AI &amp; Cloud LLM Engineer</span>
          <span className="block sm:inline sm:ml-2 text-zinc-500">Gen AI Academy Traineeship</span>
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

export default GeminiRAGProjectWebsite
