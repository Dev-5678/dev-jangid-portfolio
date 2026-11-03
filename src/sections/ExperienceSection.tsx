import React, { useState } from 'react'
import { ShieldCheck, Radio, Sparkles, ChevronDown, ChevronUp, Lock, Terminal, Cpu, Database } from 'lucide-react'

interface ExperienceSectionProps {
  isTLDR?: boolean
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isTLDR: _isTLDR = false }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      className="relative py-16 sm:py-24 md:py-40 overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {/* Top Hairline Separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" aria-hidden="true" />
      
      {/* Ambient Ember Glow Pool */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] rounded-full pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(ellipse, rgba(160, 42, 34, 0.12) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 px-4 sm:px-6 md:px-8">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">Experience</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Where I've Been
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ash max-w-xl leading-relaxed font-normal">
            My professional journey through institutional internships and mission-critical engineering environments.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12 max-w-4xl mx-auto">
          {/* Experience Item 1: AAI */}
          <div className="exp-item group pb-8 sm:pb-12 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-6 md:gap-12 transition-all duration-300">
            <div className="md:w-1/3 flex-shrink-0">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-ash tracking-wider block mb-1">
                14 August 2026 — 25 Sept 2026
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block font-mono text-ember group-hover:text-ember-bright transition-colors">
                Airports Authority of India
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block mt-1">
                New Delhi, India // Northern Region HQ
              </span>
            </div>
            <div className="md:w-2/3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  VERIFIED CIVIL AVIATION INFRASTRUCTURE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 text-zinc-400 border border-white/10">
                  VLAN 101 ANS AIRSIDE ISOLATION
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-cloud transition-colors">
                Network Security &amp; IT Intern
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-ash leading-relaxed mb-3 sm:mb-5 font-normal">
                Northern Region HQ IT division. Supported enterprise network monitoring, system diagnostics, and operational compliance.
              </p>
              <ul className="space-y-2 sm:space-y-2.5">
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Supported network security protocols and verified compliance across internal administrative subnets</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Assisted with database replication and server hardware maintenance routines</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Documented technical SOPs and resolved operational IT support tickets with 99.98% adherence</span>
                </li>
              </ul>

              {/* Technical Architecture Drawer Toggle */}
              <div className="mt-4 pt-3">
                <button
                  onClick={() => toggleExpand('aai')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-ember hover:text-ember-bright font-mono text-[11px] font-bold border border-white/10 transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-ember" />
                  <span>{expandedId === 'aai' ? 'Hide Technical Architecture & Scope' : 'Inspect Technical Architecture & Compliance Specs'}</span>
                  {expandedId === 'aai' ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                </button>

                {expandedId === 'aai' && (
                  <div className="mt-3 p-4 rounded-xl bg-black/60 border border-ember/30 font-mono text-[11px] space-y-2.5 animate-in fade-in duration-200">
                    <div className="text-ember font-bold text-xs uppercase flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>AAI Northern Region HQ // Systems &amp; Security Matrix</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">NETWORK ISOLATION</span>
                        <strong className="text-white">Airside VLAN 101</strong>: Dedicated strict air-gap isolating flight navigation services from headquarters traffic.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">SECURITY COMPLIANCE</span>
                        <strong className="text-white">Stateful L3/L4 ACLs</strong>: Zero default route to public WAN. Automatic rogue ARP quarantine protocols.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">HIGH AVAILABILITY</span>
                        <strong className="text-white">MySQL Cluster</strong>: Sub-5ms automated replication sync between regional primary and standby nodes.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">INCIDENT CONTINUITY</span>
                        <strong className="text-white">ITIL SOP Standards</strong>: Formulated standard operating procedures reducing diagnostic MTTR by 35%.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Experience Item 2: India Space Lab */}
          <div className="exp-item group pb-8 sm:pb-12 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-6 md:gap-12 transition-all duration-300">
            <div className="md:w-1/3 flex-shrink-0">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-ash tracking-wider block mb-1">
                15 July 2025 — 31 July 2025
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block font-mono text-ember group-hover:text-ember-bright transition-colors">
                India Space Lab
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block mt-1">
                Haryana, India // Space Systems Division
              </span>
            </div>
            <div className="md:w-2/3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Radio className="w-3 h-3 text-amber-400" />
                  VERIFIED AEROSPACE TELEMETRY &amp; RF
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 text-zinc-400 border border-white/10">
                  433.92 MHz UHF FSK DOWNLINK
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-cloud transition-colors">
                Space Systems &amp; CanSat Trainee
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-ash leading-relaxed mb-3 sm:mb-5 font-normal">
                Hands-on training in miniature satellite architectures, telemetry payloads, and aerospace communications.
              </p>
              <ul className="space-y-2 sm:space-y-2.5">
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Designed and assembled 1U CanSat payload incorporating barometric pressure and temperature sensors</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Calibrated 433 MHz UHF radio frequency telemetry downlink transceiver for live packet decoding</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Formulated parachute recovery protocols and evaluated descent rates from simulated altitudes</span>
                </li>
              </ul>

              {/* Technical Architecture Drawer Toggle */}
              <div className="mt-4 pt-3">
                <button
                  onClick={() => toggleExpand('isl')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-ember hover:text-ember-bright font-mono text-[11px] font-bold border border-white/10 transition-all cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-ember" />
                  <span>{expandedId === 'isl' ? 'Hide Aerospace Avionics Specs' : 'Inspect Aerospace Avionics & RF Link Specs'}</span>
                  {expandedId === 'isl' ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                </button>

                {expandedId === 'isl' && (
                  <div className="mt-3 p-4 rounded-xl bg-black/60 border border-ember/30 font-mono text-[11px] space-y-2.5 animate-in fade-in duration-200">
                    <div className="text-ember font-bold text-xs uppercase flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>ISL CanSat Avionics // Telemetry Link Budget</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">RADIO DOWNLINK</span>
                        <strong className="text-white">433.92 MHz UHF</strong>: FSK modulation at 9600 baud. Real-time packet parsing with CRC-16-CCITT checksum validation.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">SENSOR BUS</span>
                        <strong className="text-white">I2C / SPI Fusion</strong>: Bosch BMP280 barometric altitude sensor &amp; MPU6050 6-DoF gyro orientation.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">PAYLOAD ENCLOSURE</span>
                        <strong className="text-white">1U Form Factor</strong>: 66mm diameter x 115mm height cylindrical chassis with integrated solar cell test strips.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">DESCENT RECOVERY</span>
                        <strong className="text-white">Dual-Stage Parachute</strong>: Barometric trigger activates deployment at &lt;500m AGL, reducing terminal velocity to 3.8 m/s.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Experience Item 3: Generative AI */}
          <div className="exp-item group pb-8 sm:pb-12 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-6 md:gap-12 transition-all duration-300">
            <div className="md:w-1/3 flex-shrink-0">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-ash tracking-wider block mb-1">
                June 2024 (1 Month)
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block font-mono text-ember group-hover:text-ember-bright transition-colors">
                Gen AI Academy Program
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block mt-1">
                Google Cloud Platform &amp; Vertex AI
              </span>
            </div>
            <div className="md:w-2/3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  VERIFIED AI RAG ARCHITECTURE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 text-zinc-400 border border-white/10">
                  768-DIM VECTOR EMBEDDINGS
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-cloud transition-colors">
                Generative AI &amp; Multimodal RAG Scholar
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-ash leading-relaxed mb-3 sm:mb-5 font-normal">
                Specialized curriculum exploring Google Cloud GenAI SDKs, vector embeddings, and retrieval-augmented pipelines.
              </p>
              <ul className="space-y-2 sm:space-y-2.5">
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Engineered multimodal query interfaces combining technical documents and Gemini models</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Implemented vector cosine similarity semantic search reducing inference latency to under 250ms</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Deployed end-to-end interactive Streamlit apps on cloud instances</span>
                </li>
              </ul>

              {/* Technical Architecture Drawer Toggle */}
              <div className="mt-4 pt-3">
                <button
                  onClick={() => toggleExpand('genai')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-ember hover:text-ember-bright font-mono text-[11px] font-bold border border-white/10 transition-all cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-ember" />
                  <span>{expandedId === 'genai' ? 'Hide RAG Pipeline Specs' : 'Inspect RAG Pipeline & Vector Store Specs'}</span>
                  {expandedId === 'genai' ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                </button>

                {expandedId === 'genai' && (
                  <div className="mt-3 p-4 rounded-xl bg-black/60 border border-ember/30 font-mono text-[11px] space-y-2.5 animate-in fade-in duration-200">
                    <div className="text-ember font-bold text-xs uppercase flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Google AI // Multimodal Vector Pipeline</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">LLM FOUNDATION</span>
                        <strong className="text-white">Gemini 1.5 Pro</strong>: Long-context inference engine with strict system prompts for zero hallucination.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">VECTOR EMBEDDINGS</span>
                        <strong className="text-white">768-Dim Dense</strong>: Cosine similarity ranking over chunked technical documentation corpus.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">LATENCY BENCHMARK</span>
                        <strong className="text-white">&lt;250ms Query p95</strong>: Optimized document retrieval and streaming token delivery.
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 block text-[9.5px]">DEPLOYMENT RUNTIME</span>
                        <strong className="text-white">Streamlit Cloud</strong>: Microservices integration with Google Cloud Vertex AI SDK.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
