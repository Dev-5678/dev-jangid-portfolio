import React, { useState } from 'react'
import { personalInfo, experiences, skillCategories, educationHistory } from '../data/portfolio'
import { FileText, Printer, X, ShieldCheck, MapPin, Mail, Phone, Copy, Check, ExternalLink, Download } from 'lucide-react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  const plainTextResume = `DEV JANGID
Faridabad, Haryana, India 121005 | ${personalInfo.displayPhone} | ${personalInfo.email}
LinkedIn: https://www.linkedin.com/in/devjangid911/ | GitHub: https://github.com/Dev-5678

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Computer Science Engineering undergraduate (B.Tech CSE, Expected 2027) with hands-on technical experience at Airports Authority of India (AAI) and India Space Lab (ISL). Specialized in high-throughput backend systems, modern full-stack engineering, enterprise network security compliance, and multimodal Generative AI / RAG pipelines. Solid foundation in data structures, algorithmic optimization, and mission-critical system design.

================================================================================
EDUCATION
================================================================================
Jagannath University — Bahadurgarh, Haryana, India
Bachelor of Technology (B.Tech) in Computer Science & Engineering (Expected June 2027)
• Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, Network Security Compliance.

Jiva Public School — Faridabad, Haryana, India
Senior Secondary School Certificate (Class XII - PCM & Computer Science) (Completed April 2022)
• Focus Areas: Physics, Chemistry, Mathematics, Object-Oriented Programming with C++.

================================================================================
TECHNICAL SKILLS
================================================================================
• Programming Languages: TypeScript, Python 3, Modern C++, Java, JavaScript (ES6+), SQL (PostgreSQL, MySQL), C, Bash & Shell Scripting, HTML5 & CSS3.
• Full Stack Web Development: React 19, Next.js 15, Node.js, Express, Tailwind CSS 4, RESTful APIs, WebSockets, PostgreSQL, MongoDB, GSAP Motion Physics, Vite, Vitest, Playwright.
• Artificial Intelligence & Systems: Multimodal Generative AI, Gemini 1.5 Pro, Vertex AI, Retrieval-Augmented Generation (RAG), Vector Embeddings (Pinecone, ChromaDB), LangChain, Tool-Calling Agents, Streamlit, Prompt Optimization & Context Grounding.
• Core Computer Science & Systems: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Operating Systems & Concurrency, Computer Networks & TCP/IP, Linux Administration (POSIX), Database Replication, Network Security Compliance, Subnet/VLAN Segregation.
• Aerospace & Embedded Telemetry: 1U CanSat Payload Architecture, 433 MHz UHF Radio Telemetry, Microcontrollers (ESP32, Arduino, C++), Sensor Fusion, I2C / SPI / UART Bus Protocols, Drone Navigation Protocols, Ground Station Serial Decoding.
• DevOps, Security & Tooling: Git, GitHub Actions CI/CD, Docker & Containerization, Google Cloud Platform (GCP), Nginx Reverse Proxy, Wireshark Network Packet Inspection, Postman, Linux CLI & SSH.

================================================================================
PRACTICAL EXPERIENCE & INTERNSHIPS
================================================================================
Airports Authority of India (AAI) — New Delhi, India
Network Security & IT Intern | August 14, 2026 – September 25, 2026
• Supported Northern Region HQ IT division with enterprise network monitoring, system diagnostics, and operational troubleshooting for mission-critical civil aviation IT systems.
• Assisted with database replication, server routine maintenance, and critical administrative infrastructure to preserve high operational uptime.
• Diagnosed operational system tickets and verified network security compliance across internal administrative subnets and VLAN configurations.
• Documented technical standard operating procedures (SOPs) adopted by IT personnel to streamline incident response and operational continuity.

India Space Lab (ISL) — Faridabad, Haryana, India
Space Systems & CanSat Trainee | July 15, 2025 – July 31, 2025
• Engineered 1U CanSat payload architecture, telemetry tracking, and aerospace radio communication systems.
• Programmed embedded microcontrollers in C/C++ to interface barometric pressure, IMU, and temperature sensors with low-latency bus protocols.
• Calibrated 433 MHz UHF radio frequency telemetry downlink transceiver for live packet decoding at ground station receiver.
• Analyzed autonomous drone flight navigation protocols, sensor fusion telemetry, and parachute recovery deployment mechanisms.

Google Gen AI Academy — Remote / Hybrid
Generative AI & Multimodal RAG Scholar | June 2024 (1 Month)
• Completed intensive curriculum in generative artificial intelligence architectures, Gemini 1.5 Pro APIs, and Google Cloud Vertex AI.
• Developed production-grade retrieval-augmented generation (RAG) pipelines incorporating high-dimensional vector embeddings and cosine similarity search.
• Deployed interactive Python Streamlit prototypes for real-time document reasoning, multimodal synthesis, and context-grounded retrieval.
• Formulated prompt engineering workflows and grounded context retrieval to minimize hallucinations in complex technical queries.
`

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(plainTextResume)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Verified Resume Document"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white dark:bg-[#0d0e12] text-[#141418] dark:text-[#f0f0f4] border border-black/10 dark:border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(160,42,34,0.25)] my-6 rounded-2xl overflow-hidden font-sans backdrop-blur-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3.5 bg-neutral-100 dark:bg-black/60 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#141418] dark:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_#10b981] animate-pulse" />
            <FileText className="w-4 h-4 text-ember" />
            <span>DEV_JANGID_RESUME_2026.PDF</span>
            <span className="hidden md:inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Check className="w-3 h-3" /> ATS COMPLIANT (SINGLE-COLUMN)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
            <button
              onClick={handleCopyText}
              className="px-3 sm:px-3.5 py-1.5 bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 dark:hover:bg-white/20 text-[#141418] dark:text-white font-mono font-medium text-xs rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              title="Copy ATS Plain Text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-ember" />
                  <span>COPY ATS TEXT</span>
                </>
              )}
            </button>

            <a
              href="/Dev_Jangid_Resume.pdf"
              download="Dev_Jangid_Resume.pdf"
              className="px-3 sm:px-3.5 py-1.5 bg-ember/15 border border-ember/40 hover:bg-ember text-white font-mono font-semibold text-xs rounded-full shadow-[0_0_12px_rgba(160,42,34,0.3)] transition-all flex items-center gap-1.5 cursor-pointer group"
              title="Download Dev_Jangid_Resume.pdf directly"
            >
              <Download className="w-3.5 h-3.5 text-ember group-hover:text-white transition-colors" />
              <span>DOWNLOAD PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-3.5 sm:px-4 py-1.5 bg-ember hover:bg-ember-bright text-white font-mono font-semibold text-xs rounded-full shadow-[0_0_15px_rgba(160,42,34,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
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

        {/* ATS-Friendly Document Sheet */}
        <div
          id="resume-document"
          className="p-6 sm:p-10 md:p-12 space-y-7 max-h-[82vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0 bg-white dark:bg-[#0c0d11]"
        >
          {/* Header Info */}
          <div className="border-b-2 border-neutral-900/80 dark:border-white/20 pb-5 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141418] dark:text-white font-mono">
              {personalInfo.name}
            </h1>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-ember mt-1">
              {personalInfo.title}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-ember" />
                {personalInfo.location}
              </span>
              <span>•</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1 hover:text-ember transition-colors underline-offset-2 hover:underline"
              >
                <Mail className="w-3.5 h-3.5 text-ember" />
                {personalInfo.email}
              </a>
              <span>•</span>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-1 hover:text-ember transition-colors underline-offset-2 hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-ember" />
                {personalInfo.displayPhone}
              </a>
              <span>•</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1 text-ember hover:underline"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1 text-ember hover:underline"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <section aria-labelledby="resume-summary">
            <h2
              id="resume-summary"
              className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-[#141418] dark:text-white border-b border-neutral-300 dark:border-white/15 pb-1 mb-2.5"
            >
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              Computer Science Engineering undergraduate (B.Tech CSE, Expected 2027) with hands-on technical experience at Airports Authority of India (AAI) and India Space Lab (ISL). Specialized in high-throughput backend architecture, modern full-stack web engineering, enterprise network security compliance, and cutting-edge generative AI / multimodal RAG systems. Solid foundation in data structures, algorithms, and mission-critical low-latency systems.
            </p>
          </section>

          {/* Technical Skills — Industry Standard ATS Format */}
          <section aria-labelledby="resume-skills">
            <h2
              id="resume-skills"
              className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-[#141418] dark:text-white border-b border-neutral-300 dark:border-white/15 pb-1 mb-3"
            >
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-neutral-900 dark:text-white sm:min-w-[210px] shrink-0">
                    • {cat.title}:
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {cat.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Practical Experience & Internships */}
          <section aria-labelledby="resume-experience">
            <h2
              id="resume-experience"
              className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-[#141418] dark:text-white border-b border-neutral-300 dark:border-white/15 pb-1 mb-3"
            >
              PRACTICAL INTERNSHIPS &amp; EXPERIENCE
            </h2>

            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {exp.organization} — <span className="font-medium italic text-ember">{exp.role}</span>
                    </span>
                    <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      {exp.dates} {exp.location && `| ${exp.location}`}
                    </span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="leading-relaxed">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section aria-labelledby="resume-education">
            <h2
              id="resume-education"
              className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-[#141418] dark:text-white border-b border-neutral-300 dark:border-white/15 pb-1 mb-3"
            >
              EDUCATION &amp; CREDENTIALS
            </h2>

            <div className="space-y-4">
              {educationHistory.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {edu.institution}
                    </span>
                    <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                      {edu.date} | {edu.location}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verification Footnote */}
          <div className="no-print pt-3 border-t border-neutral-300 dark:border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 text-ember">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                VERIFIED ATS-COMPLIANT CURRICULUM VITAE
              </span>
            </div>
            <span>FARIDABAD, HARYANA, INDIA 121005</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal
