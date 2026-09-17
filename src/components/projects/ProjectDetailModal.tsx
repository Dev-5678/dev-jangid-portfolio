import React, { useEffect } from 'react'
import { X, Layers, Activity } from 'lucide-react'
import { AAINetworkSecurityApp } from './AAINetworkSecurityApp'
import { CanSatTelemetryApp } from './CanSatTelemetryApp'
import { GeminiRAGStudioApp } from './GeminiRAGStudioApp'
import { HighThroughputSystemsApp } from './HighThroughputSystemsApp'

export interface ProjectModalData {
  id: string
  number: string
  title: string
  domain: string
  description: string
  tags: string[]
  appType: 'aai' | 'cansat' | 'rag' | 'systems'
  architecture: {
    overview: string
    subsystems: { name: string; role: string; tech: string }[]
    securityAndIntegrity: string[]
    keyEngineeringAchievements: string[]
  }
}

interface ProjectDetailModalProps {
  isOpen: boolean
  onClose: () => void
  project: ProjectModalData | null
  initialTab?: 'apparatus' | 'blueprint'
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = 'apparatus'
}) => {
  const [activeTab, setActiveTab] = React.useState<'apparatus' | 'blueprint'>('apparatus')

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab, project])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Project Apparatus`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-6 bg-[#0c0d12] text-[#f4f4f6] rounded-2xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(160,42,34,0.3)] overflow-hidden font-sans backdrop-blur-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Action Bar */}
        <div className="px-5 sm:px-7 py-3.5 bg-neutral-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {project.number} // {project.title}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-ember/20 text-ember-bright border border-ember/40">
              {project.domain}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* View Switcher Tabs */}
            <div className="flex items-center p-0.5 rounded-full bg-black/40 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('apparatus')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'apparatus'
                    ? 'bg-ember text-white shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Live Apparatus</span>
              </button>
              <button
                onClick={() => setActiveTab('blueprint')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'blueprint'
                    ? 'bg-ember text-white shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Blueprint Spec</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-ember hover:text-white text-zinc-400 flex items-center justify-center transition-colors cursor-pointer"
              title="Close Modal"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 max-h-[82vh] overflow-y-auto space-y-6">
          {activeTab === 'apparatus' ? (
            <div className="space-y-4">
              {project.appType === 'aai' && <AAINetworkSecurityApp />}
              {project.appType === 'cansat' && <CanSatTelemetryApp />}
              {project.appType === 'rag' && <GeminiRAGStudioApp />}
              {project.appType === 'systems' && <HighThroughputSystemsApp />}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Architecture Overview */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-ember" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    System Architecture Overview
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {project.architecture.overview}
                </p>
              </div>

              {/* Subsystems Breakdown */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ember">
                  Core Subsystems &amp; Component Matrix
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {project.architecture.subsystems.map((sub, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-white text-xs font-mono">{sub.name}</div>
                        <div className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{sub.role}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-ember/15 text-ember-bright border border-ember/30 text-[10px] font-mono font-bold self-start mt-2">
                        {sub.tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Integrity Specifications */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ember">
                  Security, Protocols &amp; Data Integrity Guarantees
                </h4>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                  <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-zinc-300">
                    {project.architecture.securityAndIntegrity.map((sec, i) => (
                      <li key={i} className="leading-relaxed">
                        {sec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Engineering Achievements */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ember">
                  Quantified Engineering Highlights
                </h4>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                  <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-zinc-300">
                    {project.architecture.keyEngineeringAchievements.map((ach, i) => (
                      <li key={i} className="leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailModal
