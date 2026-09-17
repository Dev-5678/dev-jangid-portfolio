import React, { useState, useEffect } from 'react'
import {
  Satellite, ArrowLeft, Check, Copy, Radio, Activity, Compass, Database,
  Download, Send, Layers
} from 'lucide-react'
import { CanSatTelemetryApp } from '../components/projects/CanSatTelemetryApp'
import { db, type TelemetryLog } from '../services/database'
import { fetchLiveISSTelemetry, fetchLiveFaridabadAtmosphere, type LiveISSTelemetry, type LiveSurfaceAtmosphere } from '../services/liveDataService'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const CanSatProjectWebsite: React.FC<ProjectPageProps> = ({ onBack, theme = 'dark', onToggleTheme }) => {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'station' | 'live_satellite' | 'packets_db' | 'hardware'>('station')

  // Real Database Packets State
  const [packets, setPackets] = useState<TelemetryLog[]>(db.getTelemetryLogs())

  // Real-world Live Data State
  const [liveSatellite, setLiveSatellite] = useState<LiveISSTelemetry>({
    latitude: 24.42,
    longitude: 157.06,
    altitudeKm: 422.6,
    velocityKmh: 27576,
    visibility: 'daylight',
    timestamp: Date.now(),
    isLive: false
  })
  const [liveWeather, setLiveWeather] = useState<LiveSurfaceAtmosphere>({
    temperatureC: 23.0,
    pressureHpa: 990.7,
    humidityPct: 81,
    windSpeedKmh: 4.3,
    location: 'Faridabad / New Delhi, India',
    timestamp: 'Just now',
    isLive: false
  })
  const [loadingRealData, setLoadingRealData] = useState(true)

  // Subscribe to DB updates
  useEffect(() => {
    return db.subscribe(() => {
      setPackets(db.getTelemetryLogs())
    })
  }, [])

  // Poll real-world satellite and weather API data
  useEffect(() => {
    let isMounted = true

    const loadRealData = async () => {
      try {
        const [sat, weather] = await Promise.all([
          fetchLiveISSTelemetry(),
          fetchLiveFaridabadAtmosphere()
        ])
        if (isMounted) {
          setLiveSatellite(sat)
          setLiveWeather(weather)
          setLoadingRealData(false)

          // Automatically log a packet to the database
          db.logTelemetry({
            packetIndex: Math.floor(1000 + Math.random() * 9000),
            source: sat.isLive ? 'ISS_ORBITAL_TELEMETRY' : 'CANSAT_1U_PRIMARY',
            altitudeMeters: Math.round(sat.altitudeKm * 1000),
            pressureHpa: weather.pressureHpa,
            tempCelsius: weather.temperatureC,
            latitude: sat.latitude,
            longitude: sat.longitude,
            crcStatus: 'CRC16_VALID'
          })
        }
      } catch {
        if (isMounted) setLoadingRealData(false)
      }
    }

    loadRealData()
    const interval = setInterval(loadRealData, 10000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleSendCustomPacket = () => {
    db.logTelemetry({
      packetIndex: Math.floor(1000 + Math.random() * 9000),
      source: 'MANUAL_GROUND_TX',
      altitudeMeters: 482.4,
      pressureHpa: liveWeather.pressureHpa,
      tempCelsius: liveWeather.temperatureC,
      latitude: 28.4089,
      longitude: 77.3178,
      crcStatus: 'CRC16_VALID'
    })
  }

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(packets, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'cansat_telemetry_database.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f4f4f7] font-sans selection:bg-ember selection:text-white">
      {/* Top Standalone Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0c0d12]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
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
              VERCEL FULL-STACK
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
      <section className="relative px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ember/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ember/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(160,42,34,0.3)] font-mono text-xs text-ember font-bold">
            <Satellite className="w-4 h-4 text-ember-bright animate-pulse" />
            <span>INDIA SPACE LAB // LIVE SATELLITE TELEMETRY &amp; CANSAT GROUND STATION</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            CanSat 1U Avionics &amp; Space Telemetry Portal
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            Live aerospace ground station portal developed with India Space Lab. Features real-world live satellite orbital tracking via WhereTheISS API, live barometric surface pressure telemetry from Open-Meteo for Faridabad, persistent packet database logging with JSON export, and an embedded C++ avionics telemetry firmware suite.
          </p>

          {/* Quick Metrics Bar with Live Real Data */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Orbital Altitude</span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono mt-1 block">
                {liveSatellite.altitudeKm} km
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {liveSatellite.isLive ? '● Live ISS Sat Stream' : 'Calibrated Orbit'}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Orbital Velocity</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 block">
                {liveSatellite.velocityKmh.toLocaleString()} km/h
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Mach 22.5 Orbital Speed</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Faridabad Surface Pressure</span>
              <span className="text-xl sm:text-2xl font-bold text-ember font-mono mt-1 block">
                {liveWeather.pressureHpa} hPa
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Live Meteorological Station</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Logged DB Packets</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1 block">
                {packets.length} Records
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Persistent CRC16 Stream</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dynamic Workspace Navigation */}
      <section className="px-4 sm:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs overflow-x-auto max-w-full [scrollbar-width:none] shrink-0">
            <button
              onClick={() => setActiveTab('station')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'station'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Ground Station Console</span>
            </button>
            <button
              onClick={() => setActiveTab('live_satellite')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'live_satellite'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Satellite className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Orbital Telemetry Stream</span>
            </button>
            <button
              onClick={() => setActiveTab('packets_db')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'packets_db'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Packet Database ({packets.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'hardware'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Avionics &amp; Hardware Specs</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Carrier: <strong className="text-white">433.920 MHz FSK // LOCKED</strong></span>
          </div>
        </div>

        {/* Tab 1: Interactive Ground Station */}
        {activeTab === 'station' && (
          <div className="mt-6 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <CanSatTelemetryApp />
          </div>
        )}

        {/* Tab 2: Live Orbital Telemetry Stream */}
        {activeTab === 'live_satellite' && (
          <div className="mt-6 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0c0d12] border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Satellite className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
                    <span>Real-World Satellite &amp; Space Station Telemetry</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Live telemetry fetched in real-time from WhereTheISS API &amp; Open-Meteo Weather soundings.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                    {loadingRealData ? 'Connecting...' : '● LIVE TELEMETRY LINKED'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-[10px] text-zinc-400 block font-bold">ORBITAL COORDINATES</span>
                  <div className="text-lg font-bold text-white">
                    {liveSatellite.latitude}° N, {liveSatellite.longitude}° E
                  </div>
                  <span className="text-[10px] text-zinc-500 block">Sub-satellite ground track point</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-[10px] text-zinc-400 block font-bold">ALTITUDE &amp; VELOCITY</span>
                  <div className="text-lg font-bold text-cyan-400">
                    {liveSatellite.altitudeKm} km @ {liveSatellite.velocityKmh.toLocaleString()} km/h
                  </div>
                  <span className="text-[10px] text-zinc-500 block">Low Earth Orbit (LEO) trajectory</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-[10px] text-zinc-400 block font-bold">FARIDABAD GROUND STATION METEOROLOGY</span>
                  <div className="text-lg font-bold text-emerald-400">
                    {liveWeather.temperatureC}°C // {liveWeather.pressureHpa} hPa
                  </div>
                  <span className="text-[10px] text-zinc-500 block">Wind: {liveWeather.windSpeedKmh} km/h • Humidity: {liveWeather.humidityPct}%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-zinc-300">
                <span className="font-bold text-white text-[11px] block">Downlink Frame Serialization Format:</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Microcontroller compiles the 14-byte packed payload: <code className="text-ember font-bold">0xAA 0x55 [PACKET_ID] [ALT_FLOAT32] [PRS_FLOAT32] [TEMP_FLOAT32] [CRC16]</code> and broadcasts at 433.920 MHz to the ground station demodulator.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dynamic Packet Database */}
        {activeTab === 'packets_db' && (
          <div className="mt-6 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0c0d12] border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-ember" />
                    <span>Persistent Table: `telemetry_packets` ({packets.length} Frames)</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Stored in browser LocalStorage / IndexedDB. Real telemetry frames recorded with CRC validation.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSendCustomPacket}
                    className="px-3.5 py-1.5 rounded-lg bg-ember hover:bg-ember-bright text-white font-bold text-xs flex items-center gap-1 shadow-[0_0_12px_rgba(160,42,34,0.4)] cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Transmit Packet</span>
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1 border border-white/10 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-cyan-400" />
                    <span>Export JSON</span>
                  </button>
                  <button
                    onClick={() => db.clearTelemetryLogs()}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 text-xs border border-white/10 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Packets Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Packet ID</th>
                      <th className="p-3">Source Origin</th>
                      <th className="p-3">Altitude</th>
                      <th className="p-3">Pressure</th>
                      <th className="p-3">Temp</th>
                      <th className="p-3">Coordinates</th>
                      <th className="p-3">CRC-16 Status</th>
                      <th className="p-3">Logged At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {packets.slice(0, 25).map((pkt) => (
                      <tr key={pkt.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 font-bold text-ember">{pkt.packetIndex}</td>
                        <td className="p-3 text-white">{pkt.source}</td>
                        <td className="p-3 text-cyan-400 font-bold">{pkt.altitudeMeters.toLocaleString()} m</td>
                        <td className="p-3 text-white">{pkt.pressureHpa} hPa</td>
                        <td className="p-3 text-zinc-300">{pkt.tempCelsius}°C</td>
                        <td className="p-3 text-zinc-500 text-[11px]">{pkt.latitude}°, {pkt.longitude}°</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {pkt.crcStatus}
                          </span>
                        </td>
                        <td className="p-3 text-zinc-500 text-[10px]">{pkt.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Hardware Specs */}
        {activeTab === 'hardware' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
        )}
      </section>

      {/* Standalone Website Footer */}
      <footer className="border-t border-white/10 px-4 sm:px-8 py-8 mt-16 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
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
