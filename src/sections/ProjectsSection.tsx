import React, { useState } from 'react'
import { ProjectDetailModal, type ProjectModalData } from '../components/projects/ProjectDetailModal'
import { ArrowUpRight, Layers } from 'lucide-react'

const PROJECTS: ProjectModalData[] = [
  {
    id: 'aai-netsec',
    number: '01 / 05',
    title: 'AAI Network Security & IT Infrastructure',
    domain: 'Enterprise Infrastructure & Civil Aviation Security',
    description: 'Segregated enterprise architecture isolating Northern Region administrative subnets from critical Air Navigation Services (ANS). Features stateful firewall packet inspection, continuous security compliance auditing, and high-availability MySQL cluster replication with automated IT incident diagnostics.',
    tags: ['VLAN SEGREGATION', 'NETWORK ACLS', 'AIR NAVIGATION SERVICES', 'SQL CLUSTER', 'ITIL SOPS'],
    appType: 'aai',
    image: '/projects/aai-security.jpg',
    liveMetrics: [
      { label: 'VLAN 101 ANS', value: '100% Isolated' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Compliance', value: 'Zero Violations' }
    ],
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
    number: '02 / 05',
    title: 'CanSat & CubeSat Space Telemetry System',
    domain: 'Aerospace Systems & Embedded C++ Firmware',
    description: '1U CanSat aerospace telemetry payload transmitting live barometric altitude, atmospheric pressure, and dual-axis gyroscopic pitch/roll orientation packets. Employs 433.92 MHz UHF radio frequency telemetry with ground station packet decoders and dual-stage parachute descent triggers.',
    tags: ['433 MHZ UHF', 'EMBEDDED C/C++', 'FSK TELEMETRY', 'SENSORS I2C/SPI', 'AEROSPACE'],
    appType: 'cansat',
    image: '/projects/cansat-space.jpg',
    liveMetrics: [
      { label: 'RF Telemetry', value: '433.92 MHz UHF' },
      { label: 'Integrity', value: 'CRC-16 OK' },
      { label: 'Descent Trigger', value: '<500m AGL' }
    ],
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
    number: '03 / 05',
    title: 'Multimodal Generative AI & RAG Engine',
    domain: 'Cloud AI, Vector Systems & LLM Engineering',
    description: 'Enterprise retrieval-augmented generation (RAG) pipeline. Converts complex technical queries and documentation into dense 768-dimensional vector embeddings, retrieves semantic ground-truth context via cosine similarity, and utilizes Gemini 1.5 Pro to synthesize reliable, zero-hallucination responses.',
    tags: ['GEMINI 1.5 PRO', 'VECTOR EMBEDDINGS', 'COSINE SIMILARITY', 'MULTIMODAL RAG', 'STREAMLIT'],
    appType: 'rag',
    image: '/projects/gemini-rag.jpg',
    liveMetrics: [
      { label: 'Vector Store', value: '768-Dim Dense' },
      { label: 'Latency', value: '<180ms' },
      { label: 'Grounding', value: 'Zero Hallucination' }
    ],
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
    number: '04 / 05',
    title: 'High-Throughput Low-Latency Systems Engine',
    domain: 'Core Computer Science & Systems Performance',
    description: 'High-throughput algorithmic profiling and streaming telemetry engine. Implements cache-aligned in-place QuickSort partitioning, flat min-heap Dijkstra routing, and Robin Hood open-addressing hash maps to guarantee microsecond deterministic execution under peak computational load.',
    tags: ['MODERN C++', 'CACHE LOCALITY', 'BIG-O COMPLEXITY', 'IN-PLACE SORTING', 'SYSTEMS ENGINE'],
    appType: 'systems',
    image: '/projects/systems-engine.jpg',
    liveMetrics: [
      { label: 'Throughput', value: '2.4M ops/ms' },
      { label: 'L1 Cache Hit', value: '99.4%' },
      { label: 'Memory', value: 'Zero Heap Alloc' }
    ],
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
  },
  {
    id: 'proxispeak',
    number: '05 / 05',
    title: 'ProxiSpeak Geospatial Audio Ecosystem',
    domain: 'Geospatial WebSockets & Spatial Audio Systems',
    description: 'Real-time 2D spatial audio communication ecosystem. Calculates dynamic inverse-square Euclidean distance attenuation and stereo panning across virtual coordinate maps, enabling proximity-based conversations with zero audio bleed.',
    tags: ['SPATIAL AUDIO', 'WEBSOCKETS', 'EUCLIDEAN MATH', 'REACT 19', 'PROXIMITY ATTENUATION'],
    appType: 'proxispeak',
    image: '/projects/proxispeak.svg',
    liveMetrics: [
      { label: 'Spatial Latency', value: '<24ms' },
      { label: 'Falloff Curve', value: 'Inverse-Square' },
      { label: 'Peer Capacity', value: '128 Active' }
    ],
    architecture: {
      overview: 'Distributed real-time spatial audio and avatar positioning platform. Leverages HTML5 canvas tracking, Web Audio API GainNode/StereoPannerNode synthesis, and low-latency Socket.io delta frames for fluid multi-user proximity conversations.',
      subsystems: [
        { name: 'Euclidean Proximity Engine', role: 'Real-time distance calculation & acoustic radius thresholding', tech: 'Vector Math' },
        { name: 'Web Audio Spatial Panner', role: 'Dynamic volume attenuation and directional stereo panning', tech: 'Web Audio API' },
        { name: 'WebSockets Event Bus', role: 'High-frequency coordinate delta broadcast and state sync', tech: 'Socket.io' }
      ],
      securityAndIntegrity: [
        'Boundary-enforced coordinate clipping preventing avatar out-of-bounds exploits.',
        'Strict volume clamping preventing acoustic audio clipping and ear fatigue.',
        'Isolated room channels preventing cross-talk between distant campus clusters.'
      ],
      keyEngineeringAchievements: [
        'Built interactive 60 FPS 2D campus map with keyboard avatar locomotion and sub-pixel interpolation.',
        'Engineered smooth logarithmic audio attenuation with zero cross-room acoustic bleed.'
      ]
    }
  }
]

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectModalData | null>(null)
  const [modalInitialTab, setModalInitialTab] = useState<'apparatus' | 'blueprint'>('blueprint')

  const openCaseStudy = (project: ProjectModalData, tab: 'apparatus' | 'blueprint' = 'blueprint') => {
    setModalInitialTab(tab)
    setActiveModalProject(project)
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
              Full-Stack Standalone Web Applications &amp; Case Studies
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
            FROM MISSION-CRITICAL CIVIL AVIATION RADAR &amp; AEROSPACE TELEMETRY TO GEOSPATIAL AUDIO &amp; CLOUD AI — COMPLETE DYNAMIC WEBSITES WITH REAL-WORLD DATA.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {PROJECTS.map((p, idx) => {
            const isEven = idx % 2 === 1

            return (
              <div
                key={p.id}
                className="relative rounded-2xl sm:rounded-[32px] bg-white/[0.04] bg-[radial-gradient(ellipse_at_top_left,rgba(160,42,34,0.14),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.12),transparent_50%)] border border-white/20 backdrop-blur-2xl overflow-hidden px-4 py-6 sm:px-10 sm:py-10 lg:px-14 lg:py-14 min-h-[380px] sm:min-h-[480px] lg:min-h-[530px] flex flex-col justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_24px_rgba(255,255,255,0.03)] transform-gpu transition-all hover:border-ember/50"
              >
                {/* Top Hairline Gradient Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-6 flex flex-col justify-between h-full space-y-4 sm:space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Launch & Case Study Action Bar */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full">
                      <a
                        href={`#/project/${p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_4px_25px_rgba(255,255,255,0.4)] group touch-manipulation cursor-pointer"
                        title="Launch Dedicated Full-Stack Webpage in New Tab"
                      >
                        <span>Launch Live App</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-black stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </a>

                      <button
                        onClick={() => openCaseStudy(p, 'blueprint')}
                        className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-ember/20 hover:bg-ember/35 text-white border border-ember/50 font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(160,42,34,0.3)]"
                        title="Open Interactive Architecture Blueprint & Case Study Modal"
                      >
                        <Layers className="w-3.5 h-3.5 text-ember-bright shrink-0" />
                        <span>Case Study &amp; Blueprint</span>
                      </button>

                      {p.id === 'proxispeak' && (
                        <a
                          href="https://github.com/Dev-5678/ProxiSpeak"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                          title="Inspect ProxiSpeak Repository on GitHub"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>Repository</span>
                        </a>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-ember uppercase tracking-wider">
                          {p.number} // {p.domain}
                        </span>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]"
                        style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
                      >
                        {p.title}
                      </h3>
                    </div>

                    <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9.5px] sm:text-[11px] font-bold tracking-wider text-white uppercase bg-white/[0.06] border border-white/15 backdrop-blur-lg shadow-sm"
                          style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cinematic Visual Preview */}
                  <div className={`lg:col-span-6 flex items-center justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      onClick={() => openCaseStudy(p, 'blueprint')}
                      className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#090a0f] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] group cursor-pointer transition-all duration-500 hover:border-ember/70 hover:shadow-[0_25px_70px_rgba(160,42,34,0.35)] hover:-translate-y-1"
                      title="Click to view full architecture case study and interactive apparatus"
                    >
                      <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-black/50">
                        {/* Live Status Badge */}
                        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md z-10 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                            LIVE SYSTEM
                          </span>
                        </div>

                        {p.image && (
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-108 group-hover:brightness-110"
                          />
                        )}

                        {/* Ember Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

                        {/* Interactive Blueprint Pill on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ember text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_35px_rgba(160,42,34,0.8)] transform scale-95 group-hover:scale-100 transition-transform duration-300">
                            <Layers className="w-4 h-4" />
                            <span>Inspect Architecture Blueprint</span>
                          </span>
                        </div>

                        {/* Floating Telemetry Metric Badges */}
                        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex flex-wrap items-center gap-1 sm:gap-2 z-10">
                          {p.liveMetrics?.map((m) => (
                            <div
                              key={m.label}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-black/85 border border-white/20 backdrop-blur-md flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-mono shadow-md"
                            >
                              <span className="text-zinc-400">{m.label}:</span>
                              <span className="text-white font-bold">{m.value}</span>
                            </div>
                          ))}
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

      {/* Interactive Case Study & Blueprint Modal */}
      <ProjectDetailModal
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        project={activeModalProject}
        initialTab={modalInitialTab}
      />
    </section>
  )
}

export default ProjectsSection
