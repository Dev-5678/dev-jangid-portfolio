import React, { useState } from 'react'
import { ProjectBlueprintModal, type BlueprintData } from '../components/ProjectBlueprintModal'
import { CanSatTelemetryWidget } from '../components/telemetry/CanSatTelemetryWidget'
import { AAINetworkInspectorWidget } from '../components/telemetry/AAINetworkInspectorWidget'
import { GeminiRAGVisualizer } from '../components/ai/GeminiRAGVisualizer'
import { DSAComplexityWidget } from '../components/dsa/DSAComplexityWidget'
import { X } from 'lucide-react'

interface ProjectItem {
  id: string
  number: string
  title: string
  description: string
  tags: string[]
  image: string
  alt: string
  simType: 'aai' | 'cansat' | 'rag' | 'dsa'
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'exp-high-1',
    number: '01 / 04',
    title: 'AAI Network Security & IT Infrastructure',
    description: 'Segregated enterprise architecture isolating Northern Region administrative systems from critical Air Navigation Services (ANS). Features continuous security compliance monitoring, database replication, and automated IT diagnostics.',
    tags: ['VLAN SEGREGATION', 'NETWORK ACLS', 'AIR NAVIGATION SERVICES', 'SQL CLUSTER'],
    image: '/portfolio/echo-crafting.png',
    alt: 'AAI Network Security Preview',
    simType: 'aai'
  },
  {
    id: 'exp-high-2',
    number: '02 / 04',
    title: 'CanSat & CubeSat Space Telemetry System',
    description: 'Simulated 1U CanSat payload measuring atmospheric pressure, altitude, and payload temperature. Employs 433 MHz UHF radio frequency telemetry with ground station packet decoders and parachute recovery triggers.',
    tags: ['433 MHZ UHF', 'EMBEDDED C/C++', 'FSK TELEMETRY', 'AEROSPACE'],
    image: '/portfolio/julian-vance.png',
    alt: 'CanSat Space Telemetry Preview',
    simType: 'cansat'
  },
  {
    id: 'exp-high-3',
    number: '03 / 04',
    title: 'Multimodal Generative AI & RAG Engine',
    description: 'Enterprise retrieval-augmented generation pipeline. Converts complex technical queries and documents into high-dimensional vector embeddings, retrieves semantic ground-truth context, and uses Gemini 1.5 Pro to synthesize reliable responses.',
    tags: ['GEMINI 1.5 PRO', 'VECTOR EMBEDDINGS', 'PYTHON', 'RAG PIPELINE'],
    image: '/portfolio/echo-studio.png',
    alt: 'Generative AI RAG Engine Preview',
    simType: 'rag'
  },
  {
    id: 'exp-high-4',
    number: '04 / 04',
    title: 'Data Structures & Algorithms Complexity Matrix',
    description: 'Benchmark suite evaluating asymptotic complexities across sorting, graph traversals, and dynamic programming algorithms. Built to guarantee deterministic microsecond latency in high-throughput data streams.',
    tags: ['C++', 'JAVA', 'BIG-O EFFICIENCY', 'ALGORITHMS'],
    image: '/portfolio/mocha-miso.jpg',
    alt: 'DSA Systems Matrix Preview',
    simType: 'dsa'
  }
]

const BLUEPRINTS: Record<string, BlueprintData> = {
  'exp-high-1': {
    title: 'AAI Network Security & IT Infrastructure',
    subtitle: 'Airports Authority of India // Northern Region HQ',
    architectureOverview: 'Segregated enterprise architecture isolating Northern Region administrative systems from critical Air Navigation Services (ANS). Features continuous security compliance monitoring, database replication, and IT ticketing integration.',
    components: [
      { name: 'Core Firewall & Gateway', role: 'Perimeter defense & compliance audit', tech: 'Network Security ACLs' },
      { name: 'ANS Airside Subnet', role: 'Low-latency flight telemetry routing', tech: 'VLAN Segregation' },
      { name: 'SQL Operational Cluster', role: 'Staff workflows & administrative records', tech: 'Relational Database' }
    ],
    securityAndCompliance: [
      'Strict adherence to Northern Region IT compliance and operational standards.',
      'Least-privilege role assignment and encrypted network communications.',
      'Automated daily health diagnostics and anomaly escalation workflows.'
    ],
    keyChallengesSolved: [
      'Maintaining 99.98% operational uptime across HQ infrastructure.',
      'Resolving internal technical tickets with comprehensive SOP documentation.'
    ]
  },
  'exp-high-2': {
    title: 'CanSat & CubeSat Space Telemetry System',
    subtitle: 'India Space Lab // Aerospace Engineering',
    architectureOverview: 'Simulated 1U CanSat payload measuring atmospheric pressure, altitude, and payload temperature. Employs 433 MHz UHF radio frequency telemetry with ground station packet decoders and parachute recovery triggers.',
    components: [
      { name: 'Sensor Array (BMP280/IMU)', role: 'Barometric pressure & orientation', tech: 'I2C / SPI Bus' },
      { name: 'Microcontroller Core', role: 'Packet serialization & telemetry logic', tech: 'Embedded C/C++' },
      { name: '433MHz UHF Transceiver', role: 'Radio downlink transmission to ground', tech: 'FSK Modulation' }
    ],
    securityAndCompliance: [
      'Telemetry payload verification against signal corruption via CRC checks.',
      'Dual-stage descent protocol (freefall followed by parachute deployment at 500m).'
    ],
    keyChallengesSolved: [
      'Handling rapid descent deceleration while preserving sensor sample rates.',
      'Tracking packet transmission integrity in noisy RF environments.'
    ]
  },
  'exp-high-3': {
    title: 'Multimodal Generative AI & RAG Engine',
    subtitle: 'Generative AI Traineeship // Cloud Solutions',
    architectureOverview: 'Enterprise retrieval-augmented generation pipeline. Converts complex technical queries and documents into high-dimensional vector embeddings, retrieves semantic ground-truth context, and uses Gemini 1.5 Pro to synthesize reliable responses.',
    components: [
      { name: 'Streamlit Interface', role: 'Real-time interactive user workspace', tech: 'Python / Streamlit' },
      { name: 'Embedding & Vector Store', role: 'Cosine similarity semantic retrieval', tech: 'Gemini Embeddings' },
      { name: 'Gemini 1.5 Pro Engine', role: 'Multimodal context reasoning & generation', tech: 'Google AI SDK' }
    ],
    securityAndCompliance: [
      'Zero-hallucination prompt constraints with strict context grounding.',
      'Sanitized API payload tokens and secure cloud deployment.'
    ],
    keyChallengesSolved: [
      'Synthesizing multimodal technical inputs (text + diagrams) into clear action plans.',
      'Optimizing end-to-end inference latency under 250ms.'
    ]
  },
  'exp-high-4': {
    title: 'Data Structures & Algorithms Complexity Matrix',
    subtitle: 'Core Computer Science & Systems',
    architectureOverview: 'High-performance algorithmic implementations focusing on cache locality, asymptotic bounds, and deterministic execution times under peak computational load.',
    components: [
      { name: 'Graph Traversal Engine', role: 'Shortest path & topological routing', tech: 'C++ Dijkstra / A*' },
      { name: 'Dynamic Memory Cache', role: 'State memoization & amortized lookup', tech: 'Hash Maps / Red-Black Trees' },
      { name: 'Execution Benchmark', role: 'Real-time microsecond profiling', tech: 'Chrono Profiling' }
    ],
    securityAndCompliance: [
      'Deterministic memory bounds preventing buffer overruns.',
      'Asymptotically optimal space complexity guarantees.'
    ],
    keyChallengesSolved: [
      'Achieving sub-millisecond route optimization in large network topologies.',
      'Eliminating garbage-collection pauses in critical loops.'
    ]
  }
}

export const ProjectsSection: React.FC = () => {
  const [activeBlueprint, setActiveBlueprint] = useState<BlueprintData | null>(null)
  const [activeSimulator, setActiveSimulator] = useState<'aai' | 'cansat' | 'rag' | 'dsa' | null>(null)

  return (
    <section
      id="projects"
      aria-label="Engineering Highlights and Projects"
      className="relative w-full pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-36 bg-transparent z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <h2
            className="inline-block select-none text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#EAE6E1] uppercase mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            SELECTED PROJECTS
          </h2>
          <p
            className="text-[11px] sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#C4C4C8] uppercase max-w-2xl mx-auto leading-relaxed px-2"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            FROM MISSION-CRITICAL SYSTEMS TO CLOUD AI ARCHITECTURES — CRAFTED WITH MOTION, PURPOSE, AND PRECISION.
          </p>
        </div>

        {/* Project Cards (Exact alternating 2-column layout from reel) */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {PROJECTS.map((p, idx) => {
            const isEven = idx % 2 === 1

            return (
              <div
                key={p.id}
                className="relative rounded-2xl sm:rounded-[32px] bg-white/[0.04] border border-white/20 backdrop-blur-3xl overflow-hidden px-4 py-6 sm:px-10 sm:py-10 lg:px-14 lg:py-14 min-h-[380px] sm:min-h-[480px] lg:min-h-[530px] flex flex-col justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_24px_rgba(255,255,255,0.03)] transform-gpu"
              >
                {/* Dual Corner Ambient Aurora Glows */}
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Top Hairline Gradient Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-6 flex flex-col justify-between h-full space-y-4 sm:space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                      <button
                        onClick={() => setActiveSimulator(p.simType)}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white text-black font-semibold text-[11px] sm:text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.25)] group touch-manipulation cursor-pointer"
                        title="Launch Interactive Simulator"
                      >
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2L24 22H0L12 2Z" />
                        </svg>
                        <span>Interactive Simulator</span>
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>

                      {BLUEPRINTS[p.id] && (
                        <button
                          onClick={() => setActiveBlueprint(BLUEPRINTS[p.id])}
                          className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer"
                        >
                          Blueprint Spec
                        </button>
                      )}

                      <span className="ml-auto text-[11px] sm:text-xs font-mono text-slate-400 font-bold tracking-widest uppercase">
                        {p.number}
                      </span>
                    </div>

                    <h3
                      className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                      style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
                    >
                      {p.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
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

                  {/* Mockup Preview Column */}
                  <div className={`lg:col-span-6 flex items-center justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      onClick={() => setActiveSimulator(p.simType)}
                      className="relative w-full max-w-xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 bg-white/[0.03] backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] p-1.5 sm:p-3 group cursor-pointer"
                    >
                      {/* macOS Window Controls */}
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/[0.05] border-b border-white/10 rounded-t-lg sm:rounded-t-xl">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27c93f]" />
                        <span className="ml-2 font-mono text-[10px] text-gray-400 truncate">
                          preview://{p.id}.runtime
                        </span>
                      </div>

                      <img
                        src={p.image}
                        alt={p.alt}
                        loading="lazy"
                        className="w-full h-auto object-cover rounded-b-lg sm:rounded-b-xl group-hover:scale-[1.02] transition-transform duration-500 transform-gpu"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive Simulator Modal */}
      {activeSimulator && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveSimulator(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d0f] border border-white/20 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Live Simulator Runtime // {activeSimulator.toUpperCase()}
              </span>
              <button
                onClick={() => setActiveSimulator(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeSimulator === 'aai' && <AAINetworkInspectorWidget />}
            {activeSimulator === 'cansat' && <CanSatTelemetryWidget />}
            {activeSimulator === 'rag' && <GeminiRAGVisualizer />}
            {activeSimulator === 'dsa' && <DSAComplexityWidget />}
          </div>
        </div>
      )}

      {/* Architectural Blueprint Modal */}
      <ProjectBlueprintModal
        isOpen={Boolean(activeBlueprint)}
        onClose={() => setActiveBlueprint(null)}
        blueprint={activeBlueprint}
      />
    </section>
  )
}

export default ProjectsSection
