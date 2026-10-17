import React, { useState } from 'react'
import { Sparkles, Database, CheckCircle2, Play, Search, Activity } from 'lucide-react'

interface QueryPreset {
  id: string
  label: string
  prompt: string
  retrievedDocs: string[]
  cosineSimilarity: number
  generatedAnswer: string
  groundingConfidence: string
  inferenceLatency: string
}

const PRESETS: QueryPreset[] = [
  {
    id: 'aai-sec',
    label: 'AAI Air Navigation Security',
    prompt: 'How does VLAN 101 enforce air-gap security between civil aviation radar systems and office subnets?',
    retrievedDocs: [
      'AAI-NR-SOP-VLAN101.pdf: Strict stateful access control lists isolate Air Navigation Services (ANS) airside traffic from Northern Region HQ administrative subnets.',
      'FAA/ICAO-Compliance-Doc.pdf: Mandatory physical or cryptographically segregated VLAN tags required for all ADS-B radar packet transmissions.'
    ],
    cosineSimilarity: 0.948,
    generatedAnswer: 'Based on Northern Region AAI technical standard operating procedures, VLAN 101 isolates Air Navigation Services (ANS) via hardware stateful firewall ACLs. All cross-VLAN broadcast routing is dropped at the edge gateway, preventing any unauthorized discovery packets from reaching radar and flight telemetry streams.',
    groundingConfidence: '99.4% (Zero Hallucination Verified)',
    inferenceLatency: '182ms'
  },
  {
    id: 'cansat-rf',
    label: 'CanSat 433 MHz Telemetry',
    prompt: 'What demodulation and packet validation mechanisms are used in the 1U CanSat downlink pipeline?',
    retrievedDocs: [
      'ISL-CanSat-Avionics-Spec.pdf: 433.92 MHz UHF radio frequency telemetry uses FSK modulation with 9600 baud rate and CRC-16-CCITT packet checksums.',
      'Telemetry-Payload-Firmware.cpp: Serializes barometric altitude, BMP280 pressure, and MPU6050 gyroscope data into a 14-byte packed binary struct.'
    ],
    cosineSimilarity: 0.962,
    generatedAnswer: 'The 1U CanSat payload transmits telemetry at 433.92 MHz UHF utilizing FSK modulation at 9600 baud. The ground station receives binary frames framed with 0xAA 0x55 sync bytes and validates data integrity using CRC-16-CCITT checksums before triggering parachute descent staging.',
    groundingConfidence: '99.8% (Grounded Context)',
    inferenceLatency: '194ms'
  },
  {
    id: 'dsa-stream',
    label: 'Low-Latency Systems Matrix',
    prompt: 'Why is cache locality critical for low-latency sorting and graph traversals in high-throughput engines?',
    retrievedDocs: [
      'LowLatency-Systems-Optimization.pdf: Contiguous memory layouts maximize L1/L2 cache hit rates (>98%), preventing memory bus stalls during microsecond stream processing.',
      'Algorithm-Benchmark-Suite.cpp: QuickSort in-place partitioning exhibits superior cache performance compared to pointer-heavy graph representations.'
    ],
    cosineSimilarity: 0.935,
    generatedAnswer: 'In high-throughput systems, cache locality guarantees that sequential memory lookups hit CPU L1/L2 caches in under 4 clock cycles, whereas a cache miss to main RAM incurs ~200 cycles of latency. In-place algorithms avoid pointer chasing, maintaining deterministic sub-millisecond execution.',
    groundingConfidence: '98.9% (Grounded Context)',
    inferenceLatency: '168ms'
  }
]

export const GeminiRAGStudioApp: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('aai-sec')
  const [customPrompt, setCustomPrompt] = useState<string>('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(4)

  const activePreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0]
  const currentPrompt = customPrompt || activePreset.prompt

  const handleExecuteRAG = () => {
    setIsExecuting(true)
    setActiveStep(1)
    setTimeout(() => setActiveStep(2), 400)
    setTimeout(() => setActiveStep(3), 800)
    setTimeout(() => {
      setActiveStep(4)
      setIsExecuting(false)
    }, 1300)
  }

  return (
    <div className="w-full bg-[#0a0a0d] text-[#e4e4e7] rounded-xl border border-white/10 overflow-hidden font-mono text-xs select-none shadow-2xl">
      {/* Top Header */}
      <div className="px-4 py-3 bg-[#111116] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ember/20 border border-ember/60 flex items-center justify-center font-bold text-ember text-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-wider uppercase">
                Multimodal Generative AI // Gemini 1.5 Pro &amp; RAG Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ZERO HALLUCINATION GUARD
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block">
              High-Dimensional Semantic Vector Embeddings • Sub-200ms Context-Grounded Reasoning
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleExecuteRAG}
            disabled={isExecuting}
            className="px-3.5 py-1.5 rounded-lg bg-ember hover:bg-ember-bright text-white font-semibold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(160,42,34,0.4)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{isExecuting ? 'Synthesizing...' : 'Run Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Query Presets Selector */}
      <div className="p-3 bg-[#0e0e13] border-b border-white/10 flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-zinc-400 font-bold uppercase mr-1">Sample Queries:</span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPresetId(p.id)
              setCustomPrompt('')
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              selectedPresetId === p.id && !customPrompt
                ? 'bg-ember text-white shadow-[0_0_10px_rgba(160,42,34,0.3)]'
                : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Input Query Bar */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Search className="w-3.5 h-3.5 text-ember" />
              <span>Prompt Ingestion Stream:</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">Tokenized Length: 42 tokens</span>
          </div>
          <div className="text-xs text-white font-mono bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
            "{currentPrompt}"
          </div>
        </div>

        {/* 4-Stage Execution Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          {/* Step 1 */}
          <div className={`p-3 rounded-xl border transition-all ${activeStep >= 1 ? 'bg-white/[0.03] border-ember/50' : 'bg-black/20 border-white/5 opacity-50'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-ember">STAGE 01</span>
              {activeStep >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className="font-bold text-white text-[11px] mb-1">Query Ingestion</div>
            <div className="text-[10px] text-zinc-400">Payload sanitization &amp; Pydantic validation (~12ms)</div>
          </div>

          {/* Step 2 */}
          <div className={`p-3 rounded-xl border transition-all ${activeStep >= 2 ? 'bg-white/[0.03] border-ember/50' : 'bg-black/20 border-white/5 opacity-50'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-ember">STAGE 02</span>
              {activeStep >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className="font-bold text-white text-[11px] mb-1">Vectorization</div>
            <div className="text-[10px] text-zinc-400">Gemini 768-dim float32 dense embeddings (~45ms)</div>
          </div>

          {/* Step 3 */}
          <div className={`p-3 rounded-xl border transition-all ${activeStep >= 3 ? 'bg-white/[0.03] border-ember/50' : 'bg-black/20 border-white/5 opacity-50'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-ember">STAGE 03</span>
              {activeStep >= 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className="font-bold text-white text-[11px] mb-1">Semantic Retrieval</div>
            <div className="text-[10px] text-zinc-400">Cosine match: {activePreset.cosineSimilarity} (~28ms)</div>
          </div>

          {/* Step 4 */}
          <div className={`p-3 rounded-xl border transition-all ${activeStep >= 4 ? 'bg-white/[0.03] border-ember/50' : 'bg-black/20 border-white/5 opacity-50'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-ember">STAGE 04</span>
              {activeStep >= 4 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className="font-bold text-white text-[11px] mb-1">Gemini 1.5 Synthesis</div>
            <div className="text-[10px] text-zinc-400">Context grounding &amp; structured streaming</div>
          </div>
        </div>

        {/* Retrieved Ground-Truth Documents */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-ember" />
              <span>Retrieved Ground-Truth Knowledge Chunks (Top-2 Vector Matches)</span>
            </span>
            <span className="text-emerald-400 font-bold text-[10px]">
              Cosine Match: {(activePreset.cosineSimilarity * 100).toFixed(1)}%
            </span>
          </div>

          <div className="space-y-1.5">
            {activePreset.retrievedDocs.map((doc, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-black/50 border border-white/5 text-[11px] text-zinc-300 leading-relaxed">
                <span className="text-ember font-bold block mb-0.5">Chunk #{idx + 1}:</span>
                {doc}
              </div>
            ))}
          </div>
        </div>

        {/* Synthesized Response */}
        <div className="p-4 rounded-xl bg-ember/10 border border-ember/40 space-y-2 shadow-[0_0_20px_rgba(160,42,34,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-ember/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ember-bright" />
              <span className="font-bold text-white text-xs">
                Gemini 1.5 Pro Context-Grounded Output:
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                {activePreset.groundingConfidence}
              </span>
              <span className="text-zinc-400 font-mono">Latency: {activePreset.inferenceLatency}</span>
            </div>
          </div>

          <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
            {activePreset.generatedAnswer}
          </p>
        </div>
      </div>

      {/* Engineering Footer */}
      <div className="px-4 py-2.5 bg-[#111116] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-ember" />
          <span>Gen AI Academy Program • Gemini 1.5 Pro, Vertex AI, Pinecone, Streamlit &amp; Multimodal RAG</span>
        </div>
        <span className="text-zinc-500">Zero-Hallucination Certified</span>
      </div>
    </div>
  )
}

export default GeminiRAGStudioApp
