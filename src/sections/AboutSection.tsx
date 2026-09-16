import React from 'react'
import { personalInfo } from '../data/portfolio'
import { Code2, Database, Network, Sparkles, MapPin, Terminal, Radio, Layers } from 'lucide-react'

const STRENGTHS = [
  {
    icon: Network,
    title: "Mission-Critical Systems & Network Security",
    desc: "Engineered network security compliance, evaluated enterprise subnet traffic, and supported live database replication at Airports Authority of India (Northern Region HQ) with high operational reliability."
  },
  {
    icon: Sparkles,
    title: "Generative AI & Multimodal RAG Systems",
    desc: "Architects production AI pipelines harnessing Gemini 1.5 Pro, high-dimensional vector embeddings, and retrieval-augmented generation (RAG) to autonomously reason over complex document corpora with deterministic precision."
  },
  {
    icon: Code2,
    title: "Algorithmic Complexity & Systems Engineering",
    desc: "Demonstrates rigorous computational foundations in Data Structures and Algorithms (DSA), low-level memory efficiency, and Object-Oriented Architecture in C++, Java, and Python for latency-critical execution."
  },
  {
    icon: Radio,
    title: "Aerospace Telemetry & Embedded IoT",
    desc: "Calibrated 433 MHz UHF radio frequency telemetry transceivers and designed sensor payload decoding architectures for 1U CanSat micro-satellites at India Space Lab under extreme operational constraints."
  },
  {
    icon: Database,
    title: "Enterprise Relational Databases & High Availability",
    desc: "Designs optimized relational schemas, executes ACID transaction tuning, and administers high-availability database replication routines that preserve absolute data integrity in enterprise environments."
  },
  {
    icon: Layers,
    title: "Full-Stack Web & Kinetic Architecture",
    desc: "Engineers high-performance, accessible full-stack applications with TypeScript, React 19, Next.js, Node.js RESTful APIs, and Tailwind CSS 4, integrated with GSAP physics-driven kinetic typography."
  }
]

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Dev Jangid"
      className="relative py-16 sm:py-24 md:py-36 overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {/* Top Hairline Separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" aria-hidden="true" />

      {/* Ambient Ember Glow Pool */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[300px] rounded-full opacity-10 pointer-events-none blur-[140px]"
        style={{ backgroundColor: 'var(--ember)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">Overview</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            About Dev Jangid
          </h2>
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base text-ash font-normal">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <MapPin className="w-4 h-4 text-ember shrink-0" />
              {personalInfo.location}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-ember font-medium">{personalInfo.educationSummary || 'B.Tech CSE (Expected 2027)'}</span>
          </div>
        </div>

        {/* Executive Statement Glass Card */}
        <div className="about-card glass-card p-6 sm:p-10 mb-8 sm:mb-12 relative overflow-hidden group">
          {/* Subtle ember radial accent in background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-ember/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ember/10 border border-ember/25 text-ember text-xs font-mono font-medium">
              <Terminal className="w-3.5 h-3.5" />
              <span>Executive Dossier</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-ash">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80">Status:</span>
              <span className="text-emerald-400 font-medium">{personalInfo.status}</span>
            </div>
          </div>

          <blockquote className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed text-cloud border-l-2 border-ember pl-5 sm:pl-7 my-6 italic">
            "{personalInfo.bio}"
          </blockquote>

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-ash block text-[11px] font-semibold tracking-wider uppercase mb-1">Degree &amp; Academic Base</span>
              <strong className="text-white text-sm font-semibold">{personalInfo.educationSummary || "B.Tech CSE (Expected 2027)"}</strong>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-ash block text-[11px] font-semibold tracking-wider uppercase mb-1">Core Specialization</span>
              <strong className="text-white text-sm font-semibold">Security • Systems • GenAI</strong>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-ash block text-[11px] font-semibold tracking-wider uppercase mb-1">Proven Track Record</span>
              <strong className="text-white text-sm font-semibold">AAI Northern HQ &amp; Space Lab</strong>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-ash block text-[11px] font-semibold tracking-wider uppercase mb-1">Location &amp; Mobility</span>
              <strong className="text-white text-sm font-semibold">{personalInfo.location}</strong>
            </div>
          </div>
        </div>

        {/* Technical Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {STRENGTHS.map((item, idx) => {
            const IconComponent = item.icon
            return (
              <div
                key={idx}
                className="about-card glass-card p-6 sm:p-7 group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-ember group-hover:scale-105 group-hover:bg-ember/10 group-hover:border-ember/30 transition-all duration-300 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cloud transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-ash leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
