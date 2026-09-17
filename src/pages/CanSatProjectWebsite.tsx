import React, { useState } from 'react'
import { Satellite, ArrowLeft, Check, Copy, Radio, Activity, Compass } from 'lucide-react'
import { CanSatTelemetryApp } from '../components/projects/CanSatTelemetryApp'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const CanSatProjectWebsite: React.FC<ProjectPageProps> = ({ onBack, theme = 'dark', onToggleTheme }) => {
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
            <span className="w-2 h-2 rounded-full bg-ember-bright shadow-[0_0_8px_#a02a22] animate-pulse" />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase hidden sm:inline">
              CANSAT_MISSION_CONTROL.LIVE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-ember/15 text-ember-bright border border-ember/30">
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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ember/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ember/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(160,42,34,0.3)] font-mono text-xs text-ember font-bold">
            <Satellite className="w-4 h-4 text-ember-bright animate-pulse" />
            <span>INDIA SPACE LAB // 1U CANSAT AVIONICS &amp; RF TELEMETRY</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            CanSat 1U Space Avionics &amp; Ground Station
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            Simulated 1U CanSat space payload transmitting live atmospheric pressure, barometric altitude, and payload temperature. Employs 433.92 MHz UHF radio frequency telemetry with ground station packet decoders, CRC-16 data integrity checks, and dual-stage autonomous parachute descent staging.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Carrier Frequency</span>
              <span className="text-xl sm:text-2xl font-bold text-ember-bright font-mono mt-1 block">433.92 MHz</span>
              <span className="text-[10px] text-zinc-500 font-mono">UHF Band Telemetry</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Modulation &amp; Baud</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 block">FSK 9600</span>
              <span className="text-[10px] text-zinc-500 font-mono">Binary Frame Stream</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Descent Staging</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono mt-1 block">500m AGL</span>
              <span className="text-[10px] text-zinc-500 font-mono">Parachute Ejection</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Packet Checksum</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1 block">CRC-16-CCITT</span>
              <span className="text-[10px] text-zinc-500 font-mono">Zero Frame Corruption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Live Application Apparatus */}
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono uppercase flex items-center gap-2">
              <Radio className="w-5 h-5 text-ember" />
              <span>Live Ground Station Console &amp; Flight Tracker</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Real-time avionics telemetry — Stream sensor readings, transmit manual uplink pings, or inspect C++ firmware.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-emerald-400">
            ● TELEMETRY LINK LOCKED
          </span>
        </div>

        <div className="rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <CanSatTelemetryApp />
        </div>
      </section>

      {/* Deep-Dive Technical Specifications Grid */}
      <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto border-t border-white/10 space-y-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono uppercase">
            Aerospace Architecture &amp; Firmware Subsystems
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-mono">
            Detailed hardware and embedded firmware implementations developed during the India Space Lab (ISL) program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Activity className="w-6 h-6 text-ember" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              1. Multi-Sensor Bus Interface
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              BMP280 barometric pressure and MPU6050 6-DOF inertial measurement units sampled via fast I2C bus at 400 kHz to capture precise atmospheric gradient lapse rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Radio className="w-6 h-6 text-ember" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              2. 433 MHz RF Telemetry Downlink
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Binary packet framing packed with sync preambles (0xAA 0x55) and transmitted using FSK modulation at 9600 baud, calibrated for link margins over 2 km line-of-sight.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <Compass className="w-6 h-6 text-ember" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              3. Dual-Stage Descent Mechanics
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Freefall deceleration monitored via atmospheric pressure thresholds. An autonomous servo release ejects a hemispherical parachute at 500m AGL for safe recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Standalone Website Footer */}
      <footer className="border-t border-white/10 px-4 sm:px-8 py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          <span>Dev Jangid // Aerospace Systems &amp; Embedded Firmware</span>
          <span className="block sm:inline sm:ml-2 text-zinc-500">India Space Lab (ISL)</span>
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

export default CanSatProjectWebsite
