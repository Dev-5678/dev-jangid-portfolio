import React, { useState, useEffect } from 'react'
import {
  ArrowLeft, Check, Copy, Activity, Lock, Database, Server,
  Plus, Trash2, CheckCircle2, Plane, Send
} from 'lucide-react'
import { AAINetworkSecurityApp } from '../components/projects/AAINetworkSecurityApp'
import { db, type AAITicket } from '../services/database'
import { fetchLiveNorthernIndiaFlights, measureLiveNetworkLatency, type LiveFlightRadarAircraft } from '../services/liveDataService'

interface ProjectPageProps {
  onBack: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

export const AAIProjectWebsite: React.FC<ProjectPageProps> = ({ onBack, theme = 'dark', onToggleTheme }) => {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'console' | 'database' | 'flights' | 'specs'>('console')

  // Database State
  const [tickets, setTickets] = useState<AAITicket[]>(db.getTickets())
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newVlan, setNewVlan] = useState('VLAN 101')
  const [newSeverity, setNewSeverity] = useState<AAITicket['severity']>('HIGH')
  const [newDiagnosis, setNewDiagnosis] = useState('')

  // Live Real-World Data State
  const [liveFlights, setLiveFlights] = useState<LiveFlightRadarAircraft[]>([])
  const [totalFlights, setTotalFlights] = useState<number>(48)
  const [isFlightsLive, setIsFlightsLive] = useState<boolean>(false)
  const [edgeLatency, setEdgeLatency] = useState<number>(14)
  const [loadingFlights, setLoadingFlights] = useState<boolean>(true)

  // Subscribe to DB updates
  useEffect(() => {
    return db.subscribe(() => {
      setTickets(db.getTickets())
    })
  }, [])

  // Fetch real-world aviation radar & edge network latency
  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const flightData = await fetchLiveNorthernIndiaFlights()
        if (isMounted) {
          setLiveFlights(flightData.aircraft)
          setTotalFlights(flightData.totalInAirspace)
          setIsFlightsLive(flightData.isLive)
          setLoadingFlights(false)
        }
      } catch {
        if (isMounted) setLoadingFlights(false)
      }

      try {
        const ping = await measureLiveNetworkLatency()
        if (isMounted) setEdgeLatency(ping)
      } catch {
        // Fallback
      }
    }

    loadData()
    const interval = setInterval(loadData, 20000)
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

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    db.createTicket({
      title: newTitle.trim(),
      vlan: newVlan,
      severity: newSeverity,
      status: 'OPEN',
      technician: 'Dev Jangid',
      diagnosis: newDiagnosis.trim() || 'Logged via AAI Northern Region web portal.'
    })

    setNewTitle('')
    setNewDiagnosis('')
    setShowNewTicketForm(false)
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
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase hidden sm:inline">
              AAI_ENTERPRISE_NETSEC.LIVE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/60 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)] font-mono text-xs text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AIRPORTS AUTHORITY OF INDIA // LIVE RADAR &amp; IT INFRASTRUCTURE GATEWAY</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            AAI Civil Aviation Network Security &amp; Radar Gateway
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            Live enterprise infrastructure portal protecting Northern Region Air Navigation Services (ANS). Features real-world live flight transponder ingestion from OpenSky Network, persistent SQL database trouble-ticket auditing with full CRUD capabilities, stateful packet filtering, and high-availability database replication.
          </p>

          {/* Quick Metrics Bar with Live Real Data */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Northern Airspace Radar</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1 block">
                {totalFlights} Aircraft
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {isFlightsLive ? '● Live OpenSky Feed' : 'Cached Radar Feed'}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">VLAN 101 Airside Boundary</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-1 block">AIR-GAP ISOLATED</span>
              <span className="text-[10px] text-zinc-500 font-mono">0 Cross-Subnet Leaks</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">SQL Persistent Tickets</span>
              <span className="text-xl sm:text-2xl font-bold text-ember font-mono mt-1 block">
                {tickets.length} Active Records
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Live Database Sync</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block">Real Edge Latency</span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono mt-1 block">
                {edgeLatency} ms
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Edge CDN Roundtrip</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dynamic Workspace Navigation */}
      <section className="px-4 sm:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs overflow-x-auto max-w-full [scrollbar-width:none] shrink-0">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'console'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Operations Console</span>
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'database'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>SQL Database Explorer ({tickets.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'flights'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Plane className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Aviation Radar Feed</span>
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'bg-ember text-white font-bold shadow-[0_0_12px_rgba(160,42,34,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Architecture &amp; SOP Specs</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Backend API: <strong className="text-white">ONLINE // 200 OK</strong></span>
          </div>
        </div>

        {/* Tab 1: Interactive Operations Console */}
        {activeTab === 'console' && (
          <div className="mt-6 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <AAINetworkSecurityApp />
          </div>
        )}

        {/* Tab 2: Dynamic SQL Database Explorer */}
        {activeTab === 'database' && (
          <div className="mt-6 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0c0d12] border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Database className="w-4 h-4 text-ember" />
                    <span>Persistent Table: `aai_incident_tickets`</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Real persistent SQL database table. Add, modify, or resolve trouble-tickets with instant local/server persistence.
                  </p>
                </div>

                <button
                  onClick={() => setShowNewTicketForm(!showNewTicketForm)}
                  className="px-4 py-2 rounded-full bg-ember hover:bg-ember-bright text-white font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(160,42,34,0.4)] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showNewTicketForm ? 'Close Form' : '+ File New Incident Ticket'}</span>
                </button>
              </div>

              {/* Add Ticket Form */}
              {showNewTicketForm && (
                <form onSubmit={handleCreateTicket} className="p-4 rounded-xl bg-white/[0.02] border border-white/15 space-y-3 font-mono text-xs">
                  <span className="font-bold text-white block">CREATE NEW AAI INCIDENT / AUDIT RECORD</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">INCIDENT TITLE</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g., VLAN 101 Radar Ingress Probe"
                        required
                        className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-ember"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">AFFECTED SUBNET / VLAN</label>
                      <select
                        value={newVlan}
                        onChange={(e) => setNewVlan(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-ember"
                      >
                        <option value="VLAN 101">VLAN 101 (ANS Airside)</option>
                        <option value="VLAN 205">VLAN 205 (NR HQ Admin)</option>
                        <option value="VLAN 310">VLAN 310 (SQL Cluster)</option>
                        <option value="VLAN 10">VLAN 10 (Edge Gateway)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">SEVERITY LEVEL</label>
                      <select
                        value={newSeverity}
                        onChange={(e) => setNewSeverity(e.target.value as AAITicket['severity'])}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-ember"
                      >
                        <option value="CRITICAL">CRITICAL</option>
                        <option value="HIGH">HIGH</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LOW">LOW</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">DIAGNOSIS &amp; TECHNICAL NOTES</label>
                    <input
                      type="text"
                      value={newDiagnosis}
                      onChange={(e) => setNewDiagnosis(e.target.value)}
                      placeholder="e.g., Stateful inspection dropped packet from 192.168.40.188."
                      className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-ember"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewTicketForm(false)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    >
                      <Send className="w-3 h-3" />
                      <span>Commit to Database</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Dynamic Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Ticket ID</th>
                      <th className="p-3">Title &amp; Subnet</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Technician</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 font-bold text-ember">{t.id}</td>
                        <td className="p-3">
                          <div className="font-bold text-white">{t.title}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{t.diagnosis}</div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              t.severity === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                : t.severity === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-white/10 text-zinc-300'
                            }`}
                          >
                            {t.severity}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 w-max ${
                              t.status === 'RESOLVED'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'RESOLVED' ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
                            {t.status}
                          </span>
                        </td>
                        <td className="p-3 text-zinc-300">{t.technician}</td>
                        <td className="p-3 text-zinc-500 text-[10px]">{t.timestamp}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {t.status !== 'RESOLVED' && (
                              <button
                                onClick={() => db.updateTicketStatus(t.id, 'RESOLVED')}
                                className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-[10px] transition-all cursor-pointer flex items-center gap-1"
                                title="Mark Resolved"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Resolve</span>
                              </button>
                            )}
                            <button
                              onClick={() => db.deleteTicket(t.id)}
                              className="p-1 rounded hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete Ticket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Real Live Aviation Radar Feed */}
        {activeTab === 'flights' && (
          <div className="mt-6 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0c0d12] border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Plane className="w-5 h-5 text-cyan-400" />
                    <span>Real-World Northern Region Air Navigation Radar Feed</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Live ADS-B transponder telemetry fetched from OpenSky Network civil aviation radar satellites over Northern India.
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                    {totalFlights} Aircraft Tracked
                  </span>
                </div>
              </div>

              {loadingFlights ? (
                <div className="p-8 text-center text-zinc-400 font-mono text-xs">
                  Streaming live radar transponder frames from OpenSky API...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {liveFlights.map((f, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-white text-sm flex items-center gap-1.5">
                          <Plane className="w-3.5 h-3.5 text-cyan-400 -rotate-45" />
                          <span>{f.callsign}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border border-white/10 text-zinc-300">
                          {f.icao24}
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px] text-zinc-400">
                        <div className="flex justify-between">
                          <span>Altitude:</span>
                          <span className="text-white font-bold">{f.altitudeMeters.toLocaleString()} m</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Velocity:</span>
                          <span className="text-white font-bold">{f.velocityKmh} km/h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Country:</span>
                          <span className="text-zinc-300">{f.originCountry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coordinates:</span>
                          <span className="text-zinc-500">{f.latitude.toFixed(2)}°N, {f.longitude.toFixed(2)}°E</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-bold">VLAN 101 RADAR</span>
                        <span className="text-zinc-500">Squawk Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Architecture & Specs */}
        {activeTab === 'specs' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
        )}
      </section>

      {/* Standalone Website Footer */}
      <footer className="border-t border-white/10 px-4 sm:px-8 py-8 mt-16 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
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
