import React, { useState } from 'react'
import { ShieldCheck, ArrowLeft, Check, Copy, Activity, Lock, Database, Server } from 'lucide-react'
import { AAINetworkSecurityApp } from '../components/projects/AAINetworkSecurityApp'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const AAIProjectWebsite: React.FC<ProjectPageProps> = ({ onBack, theme = 'dark', onToggleTheme }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f4f4f7] font-sans selection:bg-ember selection:text-white">
      {/* Top Standalone Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0c0d12]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-ember hover:text-white text-zinc-300 font-mono text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase hidden sm:inline">
              AAI_ENTERPRISE_NETSEC.LIVE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              VERCEL HOSTED
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-ember" />}
            <span>{copied ? 'Link Copied' : 'Share Website'}</span>
          </button>

          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 font-mono text-xs transition-all cursor-pointer"
            >
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
            </button>
          )}
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative px-4 sm:px-8 py-12 sm:py-20 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ember/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ember/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(160,42,34,0.3)] font-mono text-xs text-ember font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CIVIL AVIATION ENTERPRISE ARCHITECTURE // NORTHERN REGION HQ</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            AAI Network Security &amp; Air Navigation Systems
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            Segregated multi-tiered enterprise architecture deployed across Northern Region Headquarters. Isolates mission-critical Air Navigation Services (ANS) flight radar streams from general administrative corporate subnets with stateful deep packet inspection, automated rogue ARP detection, and high-availability database replication.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Operational Uptime</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1 block">99.98%</span>
              <span className="text-[10px] text-zinc-500 font-mono">Northern Region HQ</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Airside Subnet (VLAN 101)</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 block">100% ISOLATED</span>
              <span className="text-[10px] text-zinc-500 font-mono">Air-Gap Boundary</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">DB Replication Lag</span>
              <span className="text-xl sm:text-2xl font-bold text-ember font-mono mt-1 block">1.4ms</span>
              <span className="text-[10px] text-zinc-500 font-mono">Multi-Node SQL Sync</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Security Audit Status</span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono mt-1 block">0 BREACHES</span>
              <span className="text-[10px] text-zinc-500 font-mono">ICAO/FAA Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Live Application Apparatus */}
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono uppercase flex items-center gap-2">
              <Activity className="w-5 h-5 text-ember" />
              <span>Live Operational Console &amp; Topology Inspector</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Fully interactive engineering apparatus — Click subnets, execute security audits, or trigger incident resolution workflows.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-emerald-400">
            ● READY FOR INTERACTION
          </span>
        </div>

        {/* Live App Container */}
        <div className="rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <AAINetworkSecurityApp />
        </div>
      </section>

      {/* Deep-Dive Technical Specifications Grid */}
      <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto border-t border-white/10 space-y-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono uppercase">
            Architectural Blueprint &amp; Security Protocols
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-mono">
            Detailed engineering mechanisms utilized during the internship at Airports Authority of India (AAI).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Lock className="w-6 h-6 text-ember" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              1. VLAN Boundary Segmentation
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Airside flight navigation telemetry operates on isolated VLAN 101 with stateful firewall rules preventing any broadcast crossing into administrative corporate networks (VLAN 205).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Database className="w-6 h-6 text-ember" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              2. SQL Multi-Node Replication
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Continuous replication between primary administrative database and hot standby replicas with sub-2ms transaction log propagation, ensuring zero downtime in operational records.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Server className="w-6 h-6 text-ember" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              3. Standard Operating Procedures (SOPs)
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Authored standardized operational runbooks for diagnosing hardware tickets, resolving rogue network anomalies, and verifying system uptime adopted by AAI IT personnel.
            </p>
          </div>
        </div>
      </section>

      {/* Standalone Website Footer */}
      <footer className="border-t border-white/10 px-4 sm:px-8 py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          <span>Dev Jangid // Computer Science &amp; Systems Engineer</span>
          <span className="block sm:inline sm:ml-2 text-zinc-500">Airports Authority of India (AAI) IT Division</span>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full bg-ember hover:bg-ember-bright text-white font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(160,42,34,0.4)]"
        >
          Return to Portfolio Home
        </button>
      </footer>
    </div>
  )
}

export default AAIProjectWebsite
