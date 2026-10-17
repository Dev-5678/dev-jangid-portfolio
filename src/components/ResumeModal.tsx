import React from 'react'
import { personalInfo, experiences, skillCategories, educationHistory } from '../data/portfolio'
import { FileText, Printer, X, ShieldCheck, MapPin, Mail, Phone } from 'lucide-react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      role="dialog"
      aria-label="Verified Resume Document"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white dark:bg-[#0e0e12] text-[#141418] dark:text-[#f0f0f4] border border-black/10 dark:border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(160,42,34,0.2)] my-8 rounded-2xl overflow-hidden font-sans backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/5 dark:bg-black/50 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#141418] dark:text-white">
            <span className="w-2 h-2 rounded-full bg-ember inline-block shadow-[0_0_8px_#a02a22] animate-pulse" />
            <FileText className="w-4 h-4 text-ember" />
            <span>VERIFIED_ENGINEERING_RESUME // DEV_JANGID.PDF</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-ember hover:bg-ember-bright text-white font-mono font-semibold text-xs rounded-full shadow-[0_0_15px_rgba(160,42,34,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-ember hover:text-white text-gray-500 dark:text-ash flex items-center justify-center transition-colors cursor-pointer"
              title="Close Resume"
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Header Info */}
          <div className="border-b border-black/10 dark:border-white/10 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141418] dark:text-white">
                  {personalInfo.name}
                </h2>
                <p className="text-sm font-mono font-semibold text-ember uppercase mt-1">
                  {personalInfo.title}
                </p>
              </div>

              <div className="font-mono text-xs text-gray-600 dark:text-ash space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ember" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-ember" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-ember" />
                  <span>{personalInfo.displayPhone}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-gray-700 dark:text-silver leading-relaxed font-normal">
              {personalInfo.bio}
            </p>
          </div>

          {/* Practical Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ember">
                PRACTICAL INTERNSHIPS &amp; TRAINING
              </h3>
              <span className="text-[10px] font-mono text-gray-500 dark:text-ash uppercase">VERIFIED MILESTONES</span>
            </div>

            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <strong className="text-sm font-bold text-[#141418] dark:text-white">
                      {exp.role} — {exp.organization}
                    </strong>
                    <span className="font-mono text-xs text-ember font-medium">
                      {exp.dates} {exp.location && `| ${exp.location}`}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-700 dark:text-silver space-y-1 mt-2">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ember border-b border-black/10 dark:border-white/10 pb-2">
              ACADEMIC CREDENTIALS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {educationHistory.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
                  <strong className="text-xs font-bold text-[#141418] dark:text-white block">{edu.degree}</strong>
                  <span className="text-xs text-gray-600 dark:text-ash block mt-0.5">{edu.institution}</span>
                  <span className="font-mono text-[10px] text-ember mt-1 block">{edu.date} • {edu.location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ember border-b border-black/10 dark:border-white/10 pb-2">
              TECHNICAL COMPETENCIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillCategories.map((c) => (
                <div key={c.title} className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs">
                  <span className="font-bold text-[#141418] dark:text-white block mb-1">[{c.badge}] {c.title}:</span>
                  <span className="text-gray-700 dark:text-silver leading-relaxed">{c.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-4 rounded-xl bg-ember/10 border border-ember/30 flex items-center justify-between font-mono text-xs text-ember">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-ember shrink-0" />
              <strong>VERIFIED BY ORIGINAL CURRICULUM VITAE</strong>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-ash font-medium">FARIDABAD, INDIA 121005</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal
