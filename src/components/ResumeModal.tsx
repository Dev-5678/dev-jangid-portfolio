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
    >
      <div className="w-full max-w-4xl bg-white text-[#111317] border-4 border-[#111317] shadow-[10px_10px_0px_#CCFF00] my-8 overflow-hidden font-sans">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#111317] text-[#FAF8F5] border-b-3 border-[#111317]">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#CCFF00]">
            <FileText className="w-4 h-4 text-[#CCFF00]" />
            <span>VERIFIED_ENGINEERING_RESUME // DEV_JANGID.PDF</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-[#CCFF00] text-[#111317] font-mono font-bold text-xs hover:bg-[#b8e600] flex items-center gap-1.5 transition-colors border border-[#111317]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-500 hover:text-white text-gray-300 transition-colors"
              title="Close Resume"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Header Info */}
          <div className="border-b-2 border-[#111317] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111317]">
                  {personalInfo.name}
                </h2>
                <p className="text-sm font-mono font-bold text-[#FF5500] uppercase mt-1">
                  {personalInfo.title}
                </p>
              </div>

              <div className="font-mono text-xs text-gray-700 space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>{personalInfo.displayPhone}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-gray-800 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Practical Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-300 pb-1">
              <h3 className="font-mono text-xs font-black uppercase tracking-wider text-[#111317]">
                PRACTICAL INTERNSHIPS &amp; TRAINING
              </h3>
              <span className="text-[10px] font-mono font-bold text-gray-500">RESUME SOURCE OF TRUTH</span>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-3 bg-gray-50 border border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <strong className="text-sm font-bold text-[#111317]">
                      {exp.role} — {exp.organization}
                    </strong>
                    <span className="font-mono text-xs text-gray-600">
                      {exp.dates} {exp.location && `| ${exp.location}`}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 mt-2">
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
            <h3 className="font-mono text-xs font-black uppercase tracking-wider text-[#111317] border-b border-gray-300 pb-1">
              ACADEMIC CREDENTIALS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {educationHistory.map((edu) => (
                <div key={edu.id} className="p-3 bg-gray-50 border border-gray-300">
                  <strong className="text-xs font-bold text-[#111317] block">{edu.degree}</strong>
                  <span className="text-xs text-gray-700 block">{edu.institution}</span>
                  <span className="font-mono text-[10px] text-gray-500 mt-1 block">{edu.date} • {edu.location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-black uppercase tracking-wider text-[#111317] border-b border-gray-300 pb-1">
              TECHNICAL COMPETENCIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillCategories.map((c) => (
                <div key={c.title} className="text-xs">
                  <span className="font-bold text-[#111317] block mb-1">[{c.badge}] {c.title}:</span>
                  <span className="text-gray-700">{c.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-3 bg-[#CCFF00]/20 border-2 border-[#111317] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#111317]" />
              <strong>VERIFIED BY ORIGINAL CURRICULUM VITAE</strong>
            </div>
            <span className="text-[10px] text-gray-700 font-bold">FARIDABAD, INDIA 121005</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal
