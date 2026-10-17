import React, { useState } from 'react'
import { ProjectDetailModal, type ProjectModalData } from '../components/projects/ProjectDetailModal'
import { Layers, Play, Radio, ShieldCheck, Sparkles, Cpu, ExternalLink, Terminal } from 'lucide-react'

const PROJECTS: ProjectModalData[] = [
  {
    id: 'aai-netsec',
    number: '01 / 04',
    title: 'AAI Network Security & IT Infrastructure',
    domain: 'Enterprise Infrastructure & Civil Aviation Security',
    description: 'Segregated enterprise architecture isolating Northern Region administrative subnets from critical Air Navigation Services (ANS). Features stateful firewall packet inspection, continuous security compliance auditing, and high-availability MySQL cluster replication with automated IT incident diagnostics.',
    tags: ['VLAN SEGREGATION', 'NETWORK ACLS', 'AIR NAVIGATION SERVICES', 'SQL CLUSTER', 'ITIL SOPS'],
    appType: 'aai',
    architecture: {
      overview: 'Multi-tiered enterprise network isolating mission-critical flight radar and navigation telemetry (ANS) from administrative and internal headquarters operations. Implements least-privilege stateful packet inspection, zero public internet routing on airside subnets, and automated disaster-recovery database synchronization.',
      subsystems: [
        { name: 'Core Security Perimeter Gateway', role: 'Stateful firewall, deep packet filtering & compliance monitoring', tech: 'Network Security ACLs' },
        { name: 'ANS Airside Telemetry Subnet', role: 'Dedicated flight radar routing with strict air-gap isolation', tech: 'VLAN 101 Segregation' },
        { name: 'SQL High-Availability Cluster', role: 'Automated database replication and operational records', tech: 'MySQL / Multi-Node Sync' }
      ],
      securityAndIntegrity: [
        'Zero cross-VLAN broadcast routing permitted between administrative desktops and flight radar subnets.',
        'Continuous compliance auditing with automated rogue ARP detection and immediate quarantine workflows.',
        'Cryptographically enforced mutual TLS for database communication across regional server nodes.'
      ],
      keyEngineeringAchievements: [
        'Maintained 99.98% operational uptime across Northern Region HQ IT infrastructure.',
        'Formulated technical standard operating procedures (SOPs) adopted by IT personnel to streamline troubleshooting and incident resolution.'
      ]
    }
  },
  {
    id: 'cansat-telemetry',
    number: '02 / 04',
    title: 'CanSat & CubeSat Space Telemetry System',
    domain: 'Aerospace Systems & Embedded C++ Firmware',
    description: '1U CanSat aerospace telemetry payload transmitting live barometric altitude, atmospheric pressure, and dual-axis gyroscopic pitch/roll orientation packets. Employs 433.92 MHz UHF radio frequency telemetry with ground station packet decoders and dual-stage parachute descent triggers.',
    tags: ['433 MHZ UHF', 'EMBEDDED C/C++', 'FSK TELEMETRY', 'SENSORS I2C/SPI', 'AEROSPACE'],
    appType: 'cansat',
    architecture: {
      overview: 'Compact 1U space payload engineered to collect atmospheric lapse data and flight dynamics during high-altitude descent. Microcontroller samples onboard barometric and inertial sensors over I2C/SPI, encodes data into binary telemetry frames, and transmits over 433 MHz UHF radio frequency with CRC-16 checksum integrity.',
      subsystems: [
        { name: 'Sensor Array (BMP280 + MPU6050)', role: 'Barometric pressure, altitude & gyroscopic pitch/roll', tech: 'I2C / SPI Bus Protocol' },
        { name: 'Microcontroller Core (ATmega/ESP32)', role: 'Telemetry packet serialization, CRC calculation & descent logic', tech: 'Embedded C++' },
        { name: '433.92 MHz UHF Transceiver', role: 'Long-range FSK radio frequency downlink to ground station', tech: 'FSK 9600 Baud' }
      ],
      securityAndIntegrity: [
        'Frame validation using CRC-16-CCITT to detect and reject radio packet corruption under noisy RF environments.',
        'Autonomous dual-stage parachute deployment trigger activated when altitude falls below 500m AGL.'
      ],
      keyEngineeringAchievements: [
        'Engineered live packet decoding pipeline processing 9600 baud telemetry with zero packet drop.',
        'Conducted telemetry tracking and radio link calibration during live field tests with India Space Lab.'
      ]
    }
  },
  {
    id: 'gemini-rag',
    number: '03 / 04',
    title: 'Multimodal Generative AI & RAG Engine',
    domain: 'Cloud AI, Vector Systems & LLM Engineering',
    description: 'Enterprise retrieval-augmented generation (RAG) pipeline. Converts complex technical queries and documentation into dense 768-dimensional vector embeddings, retrieves semantic ground-truth context via cosine similarity, and utilizes Gemini 1.5 Pro to synthesize reliable, zero-hallucination responses.',
    tags: ['GEMINI 1.5 PRO', 'VECTOR EMBEDDINGS', 'COSINE SIMILARITY', 'MULTIMODAL RAG', 'STREAMLIT'],
    appType: 'rag',
    architecture: {
      overview: 'End-to-end intelligent knowledge synthesis architecture combining Google Cloud Vertex AI, Gemini 1.5 Pro, and vector database retrieval. Employs semantic chunking, cosine distance ranking, and strict prompt grounding constraints to guarantee hallucination-free technical responses.',
      subsystems: [
        { name: 'Multimodal Ingestion Pipeline', role: 'Document chunking, tokenization & Pydantic payload validation', tech: 'Python / Streamlit' },
        { name: 'Vector Store & Semantic Retrieval', role: 'Dense 768-dim embeddings with cosine similarity ranking', tech: 'Gemini Embeddings' },
        { name: 'Gemini 1.5 Pro Inference Engine', role: 'Context-grounded reasoning & multimodal response synthesis', tech: 'Google AI SDK' }
      ],
      securityAndIntegrity: [
        'Strict context grounding preventing LLM hallucination on compliance and mission-critical queries.',
        'Sanitized API token management and enterprise rate-limiting to preserve low latency under load.'
      ],
      keyEngineeringAchievements: [
        'Maintained sub-200ms end-to-end retrieval and inference latency across technical query benchmarks.',
        'Developed interactive Streamlit applications during the Gen AI Academy traineeship program.'
      ]
    }
  },
  {
    id: 'high-throughput-systems',
    number: '04 / 04',
    title: 'High-Throughput Low-Latency Systems Engine',
    domain: 'Core Computer Science & Systems Performance',
    description: 'High-throughput algorithmic profiling and streaming telemetry engine. Implements cache-aligned in-place QuickSort partitioning, flat min-heap Dijkstra routing, and Robin Hood open-addressing hash maps to guarantee microsecond deterministic execution under peak computational load.',
    tags: ['MODERN C++', 'CACHE LOCALITY', 'BIG-O COMPLEXITY', 'IN-PLACE SORTING', 'SYSTEMS ENGINE'],
    appType: 'systems',
    architecture: {
      overview: 'Low-latency computational engine engineered in Modern C++ to maximize CPU cache-line locality and minimize memory bus stalls. Designed for telemetry stream sorting, route optimization, and sub-microsecond state lookup in real-time environments.',
      subsystems: [
        { name: 'In-Place Partitioning Sorter', role: 'Cache-aligned QuickSort with unrolled loops and zero heap allocations', tech: 'C++20 std::swap' },
        { name: 'Flat Min-Heap Graph Router', role: 'Dijkstra shortest-path optimization with contiguous memory layout', tech: 'Contiguous Heap Array' },
        { name: 'Robin Hood Hash Map', role: 'Open-addressing hash table with bounded probe lengths', tech: 'FNV-1a Hashing' }
      ],
      securityAndIntegrity: [
        'Deterministic asymptotic time complexity bounds preventing algorithmic complexity attacks.',
        'Strict memory bounds checking eliminating buffer overflows and heap fragmentation.'
      ],
      keyEngineeringAchievements: [
        'Achieved 99.4% L1 cache hit rate during benchmark runs across 100,000 telemetry elements.',
        'Delivered sub-millisecond execution guarantees on high-throughput data streams.'
      ]
    }
  }
]

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectModalData | null>(null)
  const [modalInitialTab, setModalInitialTab] = useState<'apparatus' | 'blueprint'>('apparatus')

  const handleOpenApparatus = (p: ProjectModalData) => {
    setActiveProject(p)
    setModalInitialTab('apparatus')
  }

  const handleOpenBlueprint = (p: ProjectModalData) => {
    setActiveProject(p)
    setModalInitialTab('blueprint')
  }

  return (
    <section
      id="projects"
      aria-label="Engineering Highlights and Projects"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="flex flex-col gap-10 sm:gap-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ember/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(160,42,34,0.3)]">
            <span className="w-2 h-2 rounded-full bg-ember shadow-[0_0_10px_#A02A22] animate-pulse" />
            <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
              Selected Projects
            </span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            ENGINEERING HIGHLIGHTS
          </h2>

          <p
            className="text-ash text-xs sm:text-sm md:text-base max-w-2xl font-light tracking-wide"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            FROM MISSION-CRITICAL CIVIL AVIATION TO AEROSPACE TELEMETRY &amp; CLOUD AI — CRAFTED WITH MATHEMATICAL PRECISION.
          </p>
        </div>

        {/* Project Cards (Alternating 2-column layout matching reel) */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {PROJECTS.map((p, idx) => {
            const isEven = idx % 2 === 1

            return (
              <div
                key={p.id}
                className="relative rounded-2xl sm:rounded-[32px] bg-white/[0.04] border border-white/20 backdrop-blur-3xl overflow-hidden px-4 py-6 sm:px-10 sm:py-10 lg:px-14 lg:py-14 min-h-[380px] sm:min-h-[480px] lg:min-h-[530px] flex flex-col justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_24px_rgba(255,255,255,0.03)] transform-gpu transition-all hover:border-ember/40"
              >
                {/* Dual Corner Ambient Aurora Glows */}
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-ember/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Hairline Gradient Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-6 flex flex-col justify-between h-full space-y-4 sm:space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <a
                        href={`#/project/${p.id}`}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white text-black font-semibold text-[11px] sm:text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-[0_4px_25px_rgba(255,255,255,0.3)] group touch-manipulation cursor-pointer"
                        title="Visit Standalone Showcase Website"
                      >
                        <span>Visit Live Website</span>
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </a>

                      <button
                        onClick={() => handleOpenApparatus(p)}
                        className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer flex items-center gap-1.5"
                        title="Quick Modal View"
                      >
                        <Play className="w-3 h-3 text-ember fill-ember" />
                        <span>Quick View Modal</span>
                      </button>

                      <button
                        onClick={() => handleOpenBlueprint(p)}
                        className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 border border-white/10 font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer flex items-center gap-1"
                        title="Blueprint Specifications"
                      >
                        <Layers className="w-3 h-3 text-ember" />
                        <span>Blueprint</span>
                      </button>

                      <span className="ml-auto text-[11px] sm:text-xs font-mono text-zinc-400 font-bold tracking-widest uppercase">
                        {p.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-ember uppercase tracking-wider block mb-1">
                        {p.domain}
                      </span>
                      <h3
                        className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
                        style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
                      >
                        {p.title}
                      </h3>
                    </div>

                    <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2.5 pt-2 sm:pt-4">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider text-white uppercase bg-white/[0.06] border border-white/15 backdrop-blur-lg shadow-sm"
                          style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Live Mini-HUD Preview Column */}
                  <div className={`lg:col-span-6 flex items-center justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      onClick={() => {
                        window.location.hash = `#/project/${p.id}`
                      }}
                      className="relative w-full max-w-xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 bg-[#090a0f] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] p-2 sm:p-4 group cursor-pointer transition-all hover:border-ember/60 hover:shadow-[0_20px_60px_rgba(160,42,34,0.3)]"
                      title="1-Click: Open full showcase website"
                    >
                      {/* Terminal Chrome Window Bar */}
                      <div className="flex items-center justify-between px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/[0.05] border-b border-white/10 rounded-t-lg sm:rounded-t-xl mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          <span className="ml-2 font-mono text-[10px] text-zinc-400 truncate">
                            runtime://{p.id}.apparatus
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ONLINE
                        </span>
                      </div>

                      {/* Mini Live Dashboard Card Content */}
                      <div className="p-3 sm:p-4 rounded-lg bg-black/60 border border-white/5 font-mono text-xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            {p.appType === 'aai' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                            {p.appType === 'cansat' && <Radio className="w-4 h-4 text-ember-bright animate-pulse" />}
                            {p.appType === 'rag' && <Sparkles className="w-4 h-4 text-amber-400" />}
                            {p.appType === 'systems' && <Cpu className="w-4 h-4 text-cyan-400" />}
                            <span className="text-white font-bold text-[11px] uppercase tracking-wide">
                              {p.title}
                            </span>
                          </div>
                        </div>

                        {/* Domain Specific Visual Indicators */}
                        {p.appType === 'aai' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">VLAN 101 Airside ANS:</span>
                              <span className="text-emerald-400 font-bold">100% ISOLATED</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">SQL Replica Lag:</span>
                              <span className="text-white font-bold">1.4ms (Nominal)</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Compliance Audit:</span>
                              <span className="text-ember font-bold">ZERO VIOLATIONS</span>
                            </div>
                          </div>
                        )}

                        {p.appType === 'cansat' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">RF Carrier:</span>
                              <span className="text-ember font-bold">433.920 MHz FSK</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Altitude Staging:</span>
                              <span className="text-white font-bold">482.4m // Parachute Armed</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Packet Integrity:</span>
                              <span className="text-emerald-400 font-bold">CRC16 VALIDATED</span>
                            </div>
                          </div>
                        )}

                        {p.appType === 'rag' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Vector Embeddings:</span>
                              <span className="text-amber-400 font-bold">768-dim Float32</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Cosine Similarity:</span>
                              <span className="text-white font-bold">0.962 (Top Match)</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Inference Speed:</span>
                              <span className="text-emerald-400 font-bold">&lt; 190ms</span>
                            </div>
                          </div>
                        )}

                        {p.appType === 'systems' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Sorting Throughput:</span>
                              <span className="text-cyan-400 font-bold">2.4M ops/ms</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">L1 Cache Hit Rate:</span>
                              <span className="text-white font-bold">99.4% (In-Place)</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-400">Execution Guarantee:</span>
                              <span className="text-emerald-400 font-bold">Sub-Millisecond Bound</span>
                            </div>
                          </div>
                        )}

                        {/* Interactive Trigger Overlay */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 group-hover:text-white transition-colors">
                          <span className="flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-ember" />
                            <span>1-Click: Open full showcase website</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold group-hover:bg-ember transition-colors flex items-center gap-1">
                            <span>VISIT SITE</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Unified Project Detail Modal */}
      <ProjectDetailModal
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
        project={activeProject}
        initialTab={modalInitialTab}
      />
    </section>
  )
}

export default ProjectsSection
