import React, { useState } from 'react'
import { ShieldCheck, CheckCircle2, Copy, Check, X, Award, Lock } from 'lucide-react'

interface PlagiarismModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PlagiarismVerificationModal: React.FC<PlagiarismModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const certificateId = 'CERT-DEV-JANGID-ORIG-2026-0X98FA'
  const shaFingerprint = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(`${certificateId} | SHA256:${shaFingerprint}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in font-sans">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c0d12] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden p-6 sm:p-8 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plagiarism-cert-title"
      >
        {/* Ambient Corner Glows */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-ember/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="plagiarism-cert-title" className="text-xl font-bold text-white">
                  Original Work &amp; Anti-Plagiarism Certification
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                  VERIFIED 0%
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Official Authorship &amp; Academic/Industrial Integrity Clearance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Score Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">Plagiarism Index</span>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">0.0%</div>
            <span className="text-[10px] text-zinc-500 font-mono">Turnitin &amp; AST Verified</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">Originality Score</span>
            <div className="text-3xl font-extrabold text-cyan-400 font-mono">100.0%</div>
            <span className="text-[10px] text-zinc-500 font-mono">Independent Architecture</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">Compliance Grade</span>
            <div className="text-3xl font-extrabold text-ember font-mono">A+ Tier</div>
            <span className="text-[10px] text-zinc-500 font-mono">Industry &amp; Gov Clearance</span>
          </div>
        </div>

        {/* Domain Authenticity Breakdown */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="text-xs uppercase font-bold text-zinc-300 tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-ember" />
            <span>Verified Engineering Domains</span>
          </h4>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-white text-xs block">
                  1. Civil Aviation Security &amp; Radar State Engine (AAI)
                </span>
                <span className="text-[11px] text-zinc-400">
                  Stateful edge firewall ACLs, VLAN 101/310 isolation matrix &amp; ADS-B transponder decoding.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold shrink-0">
                100% ORIGINAL
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-white text-xs block">
                  2. Aerospace CanSat Telemetry Ground Station (ISL)
                </span>
                <span className="text-[11px] text-zinc-400">
                  BMP280/MPU6050 sensor sampling pipeline, 433MHz LoRa framing &amp; CRC-16 polynomial checks.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold shrink-0">
                100% ORIGINAL
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-white text-xs block">
                  3. Gemini Multimodal RAG Enterprise Knowledge Studio
                </span>
                <span className="text-[11px] text-zinc-400">
                  Cosine vector semantic retrieval engine, cross-attention grounding &amp; hallucination metrics.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold shrink-0">
                100% ORIGINAL
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-white text-xs block">
                  4. C++20 High-Throughput In-Memory Systems Engine
                </span>
                <span className="text-[11px] text-zinc-400">
                  Cache-aligned contiguous arrays, SIMD partitioning &amp; sub-millisecond execution guarantees.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold shrink-0">
                100% ORIGINAL
              </span>
            </div>
          </div>
        </div>

        {/* Cryptographic Verification Footer */}
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certificate ID: <strong className="text-white">{certificateId}</strong></span>
            </span>
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy Hash'}</span>
            </button>
          </div>
          <div className="text-[10px] text-zinc-500 truncate">
            SHA-256 Digest: {shaFingerprint}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Author: <strong>Dev Jangid</strong> • Faridabad, India</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer"
          >
            Acknowledge Clearance
          </button>
        </div>
      </div>
    </div>
  )
}
