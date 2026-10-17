import React, { useEffect, useRef, useState } from 'react'
import { experienceHighlights } from '../data/portfolio'
import { SpotlightCard } from '../components/reactbits/SpotlightCard'
import { FolderGit2, Satellite, Cpu, Layers } from 'lucide-react'
import { CanSatTelemetryWidget } from '../components/telemetry/CanSatTelemetryWidget'
import { AAINetworkInspectorWidget } from '../components/telemetry/AAINetworkInspectorWidget'
import { GeminiRAGVisualizer } from '../components/ai/GeminiRAGVisualizer'
import { DSAComplexityWidget } from '../components/dsa/DSAComplexityWidget'
import { GitHubStatsCard } from '../components/github/GitHubStatsCard'
import { ProjectBlueprintModal, type BlueprintData } from '../components/ProjectBlueprintModal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HIGHLIGHT_SPOTLIGHTS = [
  'rgba(204, 255, 0, 0.15)',
  'rgba(0, 229, 255, 0.15)',
  'rgba(255, 85, 0, 0.15)'
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
  }
}

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [viewMode, setViewMode] = useState<'highlights' | 'simulators' | 'metrics' | 'standalone'>('highlights')
  const [activeBlueprint, setActiveBlueprint] = useState<BlueprintData | null>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.proj-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [viewMode])

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Engineering Highlights and Projects"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t-3 border-[#111317] dark:border-[#334155]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest text-[#FF5500] dark:text-[#CCFF00] uppercase mb-2">
            <span>[04]</span>
            <span>ENGINEERING // HIGHLIGHTS_AND_PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
            WORK HIGHLIGHTS
          </h2>
        </div>

        {/* View Mode Toggle: Highlights vs Simulators vs Metrics */}
        <div className="flex flex-wrap items-center p-1 bg-white dark:bg-[#131720] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155] font-mono text-xs font-bold gap-1">
          <button
            onClick={() => setViewMode('highlights')}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              viewMode === 'highlights'
                ? 'bg-[#111317] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#111317]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#111317] dark:hover:text-[#F4F7FB]'
            }`}
          >
            Domain Highlights ({experienceHighlights.length})
          </button>
          <button
            onClick={() => setViewMode('simulators')}
            className={`px-3 py-1.5 transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === 'simulators'
                ? 'bg-[#111317] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#111317]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#111317] dark:hover:text-[#F4F7FB]'
            }`}
          >
            <Satellite className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Interactive Simulators (4)</span>
          </button>
          <button
            onClick={() => setViewMode('metrics')}
            className={`px-3 py-1.5 transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === 'metrics'
                ? 'bg-[#111317] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#111317]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#111317] dark:hover:text-[#F4F7FB]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>Codebase Metrics</span>
          </button>
          <button
            onClick={() => setViewMode('standalone')}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              viewMode === 'standalone'
                ? 'bg-[#111317] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#111317]'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#111317] dark:hover:text-[#F4F7FB]'
            }`}
          >
            Standalone Projects
          </button>
        </div>
      </div>

      {/* Mode 1: Domain Highlights with Architectural Blueprint buttons */}
      {viewMode === 'highlights' && (
        <div className="space-y-8">
          <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] font-mono text-xs flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Technical domains backed by institutional internships and specialized training. Click blueprint to view system architectures.
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#CCFF00] text-[#111317] font-bold text-[10px]">
              BLUEPRINTS ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {experienceHighlights.map((item, idx) => (
              <SpotlightCard
                key={item.id}
                spotlightColor={HIGHLIGHT_SPOTLIGHTS[idx % HIGHLIGHT_SPOTLIGHTS.length]}
                className="proj-card brutal-card-hover p-6 sm:p-7 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[5px_5px_0px_#111317] dark:shadow-[5px_5px_0px_#1E293B] flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#111317] dark:border-[#334155] font-mono text-[11px]">
                    <span className="font-bold text-[#FF5500] dark:text-[#CCFF00] uppercase">
                      {item.category}
                    </span>
                    <span className="text-gray-400 font-bold">0{idx + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-black text-xl uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB] mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Context note */}
                  <div className="p-2.5 bg-gray-50 dark:bg-[#1A202C] border border-[#111317] dark:border-[#334155] mb-4 text-[11px] font-mono text-gray-600 dark:text-gray-300">
                    <span className="text-gray-400 block text-[9px]">CONTEXT:</span>
                    {item.context}
                  </div>

                  {/* Technical Scope Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 mb-4 border-t-2 border-dashed border-gray-200 dark:border-gray-800">
                    {item.technicalScope.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#FAF8F5] dark:bg-[#1A202C] text-[#111317] dark:text-[#F4F7FB] font-mono text-[10px] font-bold border border-[#111317] dark:border-[#334155]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Feature 11: View Architectural Blueprint Button */}
                  {BLUEPRINTS[item.id] && (
                    <button
                      onClick={() => setActiveBlueprint(BLUEPRINTS[item.id])}
                      className="w-full brutal-btn py-2 bg-white dark:bg-[#1A202C] text-[#111317] dark:text-[#CCFF00] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#CCFF00] hover:text-[#111317] dark:hover:bg-[#CCFF00] dark:hover:text-[#111317]"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>View Blueprint Spec</span>
                    </button>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: Interactive Engineering Simulators (4 Simulators) */}
      {viewMode === 'simulators' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] font-mono text-xs flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Four real-time interactive engineering simulators covering Space Telemetry, AAI Security Audits, Multimodal RAG, and DSA Algorithms.
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#00E5FF] text-[#111317] font-bold text-[10px]">
              SIMULATORS RUNNING
            </span>
          </div>

          {/* 1. CanSat Telemetry with Descent Radar */}
          <CanSatTelemetryWidget />

          {/* 2. AAI Network Compliance Inspector with Audit Trace */}
          <AAINetworkInspectorWidget />

          {/* 3. Multimodal RAG & Gemini Pipeline Trace */}
          <GeminiRAGVisualizer />

          {/* 4. DSA Complexity Benchmark Matrix */}
          <DSAComplexityWidget />
        </div>
      )}

      {/* Mode 3: Verified Codebase Metrics */}
      {viewMode === 'metrics' && (
        <div className="animate-in fade-in duration-300">
          <GitHubStatsCard />
        </div>
      )}

      {/* Mode 4: Standalone Projects */}
      {viewMode === 'standalone' && (
        <SpotlightCard
          spotlightColor="rgba(204, 255, 0, 0.15)"
          className="proj-card p-8 sm:p-12 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#1E293B] text-center max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-[#FAF8F5] dark:bg-[#1A202C] border-3 border-[#111317] dark:border-[#CCFF00] shadow-[3px_3px_0px_#111317] flex items-center justify-center text-[#111317] dark:text-[#CCFF00]">
            <FolderGit2 className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="inline-block px-3 py-1 bg-[#111317] text-[#CCFF00] font-mono text-xs font-bold uppercase tracking-wider mb-4 border border-[#111317]">
            NO_FABRICATED_REPOSITORIES
          </div>

          <h3 className="text-2xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB] mb-3">
            Dedicated Standalone Projects
          </h3>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-6">
            In accordance with engineering integrity principles, no unverified standalone projects or placeholder links are published here. Dev's practical engineering work is captured under institutional internships (Airports Authority of India &amp; India Space Lab).
          </p>

          <div className="p-4 bg-gray-50 dark:bg-[#1A202C] border-2 border-dashed border-gray-300 dark:border-gray-700 font-mono text-xs text-left max-w-md mx-auto">
            <span className="text-[#FF5500] dark:text-[#CCFF00] font-bold block mb-1">
              // FOR DEVELOPER EXPANSION:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              To add standalone software projects with live demos or GitHub repositories, edit the <code>standaloneProjects</code> array in <code>src/data/portfolio.ts</code>.
            </span>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setViewMode('highlights')}
              className="brutal-btn px-6 py-3 bg-[#CCFF00] text-[#111317] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Return to Domain Highlights
            </button>
          </div>
        </SpotlightCard>
      )}

      {/* Feature 11: Architectural Blueprint Modal */}
      <ProjectBlueprintModal
        isOpen={Boolean(activeBlueprint)}
        onClose={() => setActiveBlueprint(null)}
        blueprint={activeBlueprint}
      />
    </section>
  )
}

export default ProjectsSection
