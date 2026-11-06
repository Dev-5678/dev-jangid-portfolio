import React, { useState, useMemo } from 'react'
import { ProjectDetailModal, type ProjectModalData } from '../components/projects/ProjectDetailModal'
import { Layers, Play, Search, X, ShieldCheck } from 'lucide-react'
import { ALL_PROJECTS, STACK_CATEGORIES, type StackKey, type ProjectData } from '../data/allProjectsData'

export const ProjectsSection: React.FC = () => {
  const [selectedStack, setSelectedStack] = useState<StackKey>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeModalProject, setActiveModalProject] = useState<ProjectModalData | null>(null)
  const [modalInitialTab, setModalInitialTab] = useState<'apparatus' | 'blueprint'>('blueprint')

  const openCaseStudy = (project: ProjectData, tab: 'apparatus' | 'blueprint' = 'blueprint') => {
    setModalInitialTab(tab)
    setActiveModalProject(project as ProjectModalData)
  }

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchesStack = selectedStack === 'all' || p.stackKey === selectedStack
      if (!matchesStack) return false

      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.architecture.subsystems.some((s) => s.tech.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
      )
    })
  }, [selectedStack, searchQuery])

  return (
    <section
      id="projects"
      aria-label="Engineering Highlights and Projects"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ember/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(160,42,34,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
            <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase font-mono">
              40 VERIFIED ENGINEERING IMPLEMENTATIONS // 8 ARCHITECTURAL STACKS
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
            FROM MISSION-CRITICAL CIVIL AVIATION RADAR &amp; AEROSPACE TELEMETRY TO LOCK-FREE ENGINES &amp; DISTRIBUTED SAGA MICROSERVICES &mdash; 100% ORIGINAL, BESPOKE ARCHITECTURES.
          </p>
        </div>

        {/* Stack Category Filter Tabs & Search Bar */}
        <div className="flex flex-col gap-4 bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Top Row: Search and Active Results Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search 40 projects by keyword, tech (e.g. C++, Kafka, FastAPI, AVX2)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center font-mono text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>
                Showing <strong className="text-white">{filteredProjects.length}</strong> of{' '}
                <strong className="text-white">40</strong> Projects
              </span>
            </div>
          </div>

          {/* Bottom Row: Stack Filter Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10">
            {STACK_CATEGORIES.map((cat) => {
              const isActive = selectedStack === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedStack(cat.key)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-ember text-white border border-ember shadow-[0_0_15px_rgba(160,42,34,0.5)] scale-[1.02]'
                      : 'bg-black/40 text-zinc-400 border border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] ${
                      isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid Display */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 font-mono">
            <p className="text-sm text-zinc-400">No engineering implementations found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSelectedStack('all')
                setSearchQuery('')
              }}
              className="px-4 py-2 rounded-xl bg-ember text-white text-xs font-bold hover:bg-ember-bright transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((p) => {
              return (
                <div
                  key={p.id}
                  className="relative rounded-2xl bg-white/[0.03] bg-[radial-gradient(ellipse_at_top_left,rgba(160,42,34,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08),transparent_50%)] border border-white/15 backdrop-blur-2xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] transform-gpu transition-all hover:border-ember/60 hover:-translate-y-1 group"
                >
                  {/* Top Hairline Gradient Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="space-y-4">
                    {/* Header Row: Number, Stack Tag & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-ember uppercase tracking-wider">
                          {p.number}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">//</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white/5 border border-white/10 text-zinc-300">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/15 text-[9px] font-mono font-bold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>VERIFIED</span>
                      </div>
                    </div>

                    {/* Title & Domain */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                        {p.domain}
                      </span>
                      <h3
                        className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-ember-bright transition-colors"
                        style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
                      >
                        {p.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {p.description}
                    </p>

                    {/* Dev's Authentic Rationale Pill */}
                    {p.devNotes && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-ember shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          <strong className="text-zinc-300 font-mono text-[10px] uppercase">Dev Rationale: </strong>
                          {p.devNotes}
                        </span>
                      </div>
                    )}

                    {/* Live Metrics Strip */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {p.liveMetrics?.map((m) => (
                        <div
                          key={m.label}
                          className="px-2.5 py-1 rounded-lg bg-black/70 border border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono shadow-sm"
                        >
                          <span className="text-zinc-400">{m.label}:</span>
                          <span className="text-emerald-400 font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider text-zinc-300 uppercase bg-white/[0.04] border border-white/10 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold text-zinc-500 font-mono">
                          +{p.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-6 mt-4 border-t border-white/10">
                    <button
                      onClick={() => openCaseStudy(p, 'apparatus')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[11px] tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
                      title={`Launch ${p.title} Live Interactive Apparatus Simulator`}
                    >
                      <Play className="w-3.5 h-3.5 fill-black stroke-black shrink-0" />
                      <span>Test Apparatus</span>
                    </button>

                    <button
                      onClick={() => openCaseStudy(p, 'blueprint')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ember/20 hover:bg-ember/35 text-white border border-ember/50 font-semibold text-[11px] tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer active:scale-95 shadow-[0_0_10px_rgba(160,42,34,0.25)]"
                      title="Inspect Architecture Blueprint & Case Study"
                    >
                      <Layers className="w-3.5 h-3.5 text-ember-bright shrink-0" />
                      <span>Blueprint</span>
                    </button>

                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-[11px] tracking-wider uppercase transition-all ml-auto cursor-pointer"
                        title={`Inspect ${p.title} Repository on GitHub`}
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span className="hidden sm:inline">Repo</span>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
