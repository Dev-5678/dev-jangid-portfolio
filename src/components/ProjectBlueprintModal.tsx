import React from 'react'
import { X, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react'

export interface BlueprintData {
  title: string
  subtitle: string
  architectureOverview: string
  components: { name: string; role: string; tech: string }[]
  securityAndCompliance: string[]
  keyChallengesSolved: string[]
}

interface ProjectBlueprintModalProps {
  isOpen: boolean
  onClose: () => void
  blueprint: BlueprintData | null
}

export const ProjectBlueprintModal: React.FC<ProjectBlueprintModalProps> = ({
  isOpen,
  onClose,
  blueprint
}) => {
  if (!isOpen || !blueprint) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${blueprint.title} Architecture Blueprint`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white dark:bg-[#0e0e12] text-[#141418] dark:text-[#f0f0f4] border border-black/10 dark:border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(160,42,34,0.2)] my-8 rounded-2xl overflow-hidden font-mono backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/5 dark:bg-black/50 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#141418] dark:text-white">
            <span className="w-2 h-2 rounded-full bg-ember inline-block shadow-[0_0_8px_#a02a22] animate-pulse" />
            <Layers className="w-4 h-4 text-ember" />
            <span>ARCHITECTURAL_BLUEPRINT // {blueprint.title.toUpperCase()}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-ember hover:text-white text-gray-500 dark:text-ash flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close architecture blueprint"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto text-xs text-[#141418] dark:text-[#F4F7FB]">
          <div>
            <span className="text-[10px] text-ember font-bold uppercase tracking-wider block">
              {blueprint.subtitle}
            </span>
            <h2 className="text-2xl font-bold uppercase tracking-tight mt-1 text-[#141418] dark:text-white">
              {blueprint.title}
            </h2>
          </div>

          {/* Overview */}
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
            <span className="text-[10px] text-ash uppercase font-bold block mb-1">
              Architecture Overview
            </span>
            <p className="font-sans text-xs text-gray-700 dark:text-silver leading-relaxed">
              {blueprint.architectureOverview}
            </p>
          </div>

          {/* Components Grid */}
          <div>
            <span className="text-[10px] text-ash uppercase font-bold block mb-2">
              Subsystem Modules &amp; Data Flow
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {blueprint.components.map((comp) => (
                <div
                  key={comp.name}
                  className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10"
                >
                  <div className="font-bold text-[11px] text-ember mb-1">
                    {comp.name}
                  </div>
                  <div className="text-[10px] text-gray-600 dark:text-ash font-sans mb-2">
                    {comp.role}
                  </div>
                  <div className="text-[9px] font-mono font-medium bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded border border-black/10 dark:border-white/15 inline-block text-gray-700 dark:text-silver">
                    {comp.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-ember text-xs">
              <ShieldCheck className="w-4 h-4 text-ember shrink-0" />
              <span>SECURITY PROTOCOLS &amp; INTEGRITY CONTROLS</span>
            </div>
            <ul className="space-y-1 text-gray-700 dark:text-silver font-sans text-xs list-disc list-inside">
              {blueprint.securityAndCompliance.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Key Engineering Challenges Solved */}
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ENGINEERING CHALLENGES OVERCOME</span>
            </div>
            <ul className="space-y-1 text-gray-700 dark:text-silver font-sans text-xs list-disc list-inside">
              {blueprint.keyChallengesSolved.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
