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
        className="w-full max-w-3xl bg-white dark:bg-[#131720] border-4 border-[#111317] dark:border-[#334155] shadow-[10px_10px_0px_#111317] dark:shadow-[10px_10px_0px_#CCFF00] my-8 overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#111317] text-[#FAF8F5] border-b-3 border-[#111317]">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#CCFF00]">
            <Layers className="w-4 h-4 text-[#CCFF00]" />
            <span>ARCHITECTURAL_BLUEPRINT // {blueprint.title.toUpperCase()}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500 hover:text-white text-gray-300 transition-colors"
            aria-label="Close architecture blueprint"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto text-xs text-[#111317] dark:text-[#F4F7FB]">
          <div>
            <span className="text-[10px] text-[#FF5500] dark:text-[#CCFF00] font-black uppercase tracking-wider block">
              {blueprint.subtitle}
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tight mt-1 text-[#111317] dark:text-white">
              {blueprint.title}
            </h2>
          </div>

          {/* Overview */}
          <div className="p-4 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155]">
            <span className="text-[10px] text-gray-500 uppercase font-black block mb-1">
              Architecture Overview
            </span>
            <p className="font-sans text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {blueprint.architectureOverview}
            </p>
          </div>

          {/* Components Grid */}
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-black block mb-2">
              Subsystem Modules & Data Flow
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {blueprint.components.map((comp) => (
                <div
                  key={comp.name}
                  className="p-3 bg-white dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155]"
                >
                  <div className="font-bold text-[11px] text-[#FF5500] dark:text-[#CCFF00] mb-1">
                    {comp.name}
                  </div>
                  <div className="text-[10px] text-gray-600 dark:text-gray-400 font-sans mb-2">
                    {comp.role}
                  </div>
                  <div className="text-[9px] font-bold bg-[#FAF8F5] dark:bg-[#0A0D12] px-1.5 py-0.5 border border-gray-300 dark:border-gray-700 inline-block">
                    {comp.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="p-4 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#111317] dark:text-[#CCFF00] text-xs">
              <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
              <span>SECURITY PROTOCOLS & INTEGRITY CONTROLS</span>
            </div>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-sans text-xs list-disc list-inside">
              {blueprint.securityAndCompliance.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Key Engineering Challenges Solved */}
          <div className="p-4 bg-white dark:bg-[#141820] border-2 border-[#111317] dark:border-[#334155] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#FF5500] text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#FF5500]" />
              <span>ENGINEERING CHALLENGES OVERCOME</span>
            </div>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-sans text-xs list-disc list-inside">
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
