import React, { useState } from 'react'
import { ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, Terminal, Activity } from 'lucide-react'

interface SubnetNode {
  id: string
  name: string
  vlan: string
  ipRange: string
  role: string
  status: 'OPTIMAL' | 'AUDITING' | 'SECURE'
  traffic: string
  aclStatus: string
  description: string
  securityMetrics: {
    firewallRules: number
    activeSessions: number
    packetLoss: string
    latency: string
  }
}

const SUBNETS: SubnetNode[] = [
  {
    id: 'ans-airside',
    name: 'ANS_AIRSIDE_TELEMETRY',
    vlan: 'VLAN 101 (ISOLATED)',
    ipRange: '10.200.10.0/24',
    role: 'Air Navigation Services Flight Radar & Telemetry Routing',
    status: 'SECURE',
    traffic: '1.42 Gbps',
    aclStatus: 'STRICT_AIR_GAP_RULESET',
    description: 'Mission-critical air traffic management network. Completely isolated from general administrative subnets with zero public internet routing.',
    securityMetrics: {
      firewallRules: 48,
      activeSessions: 312,
      packetLoss: '0.000%',
      latency: '1.2ms'
    }
  },
  {
    id: 'nr-admin',
    name: 'NR_HQ_ADMINISTRATIVE',
    vlan: 'VLAN 205 (INTERNAL)',
    ipRange: '192.168.40.0/22',
    role: 'Northern Region HQ Administrative & Enterprise Operations',
    status: 'OPTIMAL',
    traffic: '480 Mbps',
    aclStatus: 'ROLE_BASED_ACCESS_ENFORCED',
    description: 'Corporate intranet for engineering staff, technical documentation, and ticket dispatching. Monitored for network security compliance.',
    securityMetrics: {
      firewallRules: 124,
      activeSessions: 890,
      packetLoss: '0.001%',
      latency: '3.8ms'
    }
  },
  {
    id: 'sql-cluster',
    name: 'SQL_PRIMARY_REPLICA',
    vlan: 'VLAN 310 (DMZ)',
    ipRange: '172.16.80.0/24',
    role: 'Relational Database Operations & High-Availability Sync',
    status: 'OPTIMAL',
    traffic: '320 Mbps',
    aclStatus: 'DATABASE_MUTUAL_TLS',
    description: 'High-availability SQL cluster supporting flight logs and administrative records with sub-5ms automated replication sync.',
    securityMetrics: {
      firewallRules: 32,
      activeSessions: 140,
      packetLoss: '0.000%',
      latency: '2.1ms'
    }
  },
  {
    id: 'edge-gateway',
    name: 'EDGE_PERIMETER_GATEWAY',
    vlan: 'VLAN 10 (INGRESS)',
    ipRange: '203.0.113.0/28',
    role: 'Hardware Firewall, Deep Packet Inspection & Intrusion Prevention',
    status: 'SECURE',
    traffic: '2.85 Gbps',
    aclStatus: 'STATEFUL_INSPECTION_ACTIVE',
    description: 'Perimeter hardware security appliance performing line-rate packet inspection, SSL termination, and real-time threat intelligence filtering.',
    securityMetrics: {
      firewallRules: 280,
      activeSessions: 1420,
      packetLoss: '0.000%',
      latency: '0.9ms'
    }
  }
]

export const AAINetworkSecurityApp: React.FC = () => {
  const [selectedSubnetId, setSelectedSubnetId] = useState<string>('ans-airside')
  const [isAuditing, setIsAuditing] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    '[21:40:12] SYS_INIT: Northern Region HQ Security Kernel v4.19 loaded.',
    '[21:40:14] ACL_AUDIT: Verified VLAN 101 isolation; 0 cross-subnet routes permitted.',
    '[21:40:17] DB_REPL: SQL Primary sync acknowledged from replica (lag: 1.4ms).',
    '[21:40:22] MON_DAEMON: 48 internal systems reporting nominal telemetry.'
  ])
  const [incidentResolved, setIncidentResolved] = useState(true)
  const [activeTab, setActiveTab] = useState<'topology' | 'logs' | 'incident'>('topology')

  const activeSubnet = SUBNETS.find((s) => s.id === selectedSubnetId) || SUBNETS[0]

  const handleRunFullAudit = () => {
    setIsAuditing(true)
    const newLog1 = `[${new Date().toLocaleTimeString()}] AUDIT_START: Initiating deep inspection across all 4 subnets...`
    setLogs((prev) => [newLog1, ...prev.slice(0, 15)])

    setTimeout(() => {
      const newLog2 = `[${new Date().toLocaleTimeString()}] PASS: ANS Airside VLAN 101 zero unauthorized MACs verified.`
      setLogs((prev) => [newLog2, ...prev.slice(0, 15)])
    }, 600)

    setTimeout(() => {
      const newLog3 = `[${new Date().toLocaleTimeString()}] PASS: SQL Cluster replication checksum validated (CRC32 matches).`
      setLogs((prev) => [newLog3, ...prev.slice(0, 15)])
    }, 1200)

    setTimeout(() => {
      const newLog4 = `[${new Date().toLocaleTimeString()}] AUDIT_COMPLETE: 100% compliance certified. Zero vulnerabilities detected.`
      setLogs((prev) => [newLog4, ...prev.slice(0, 15)])
      setIsAuditing(false)
    }, 1800)
  }

  const handleTriggerIncident = () => {
    setIncidentResolved(false)
    const alertLog = `[${new Date().toLocaleTimeString()}] ALERT: Suspected rogue ARP probe detected on VLAN 205 (IP: 192.168.40.188)!`
    setLogs((prev) => [alertLog, ...prev.slice(0, 15)])
  }

  const handleRemediateIncident = () => {
    const remediateLog1 = `[${new Date().toLocaleTimeString()}] SOP_EXEC: Applied automated isolation rule to MAC at 192.168.40.188.`
    const remediateLog2 = `[${new Date().toLocaleTimeString()}] RESOLVED: Ticket #AAI-NR-8941 closed. Network integrity restored to 100%.`
    setLogs((prev) => [remediateLog2, remediateLog1, ...prev.slice(0, 15)])
    setIncidentResolved(true)
  }

  return (
    <div className="w-full bg-[#0a0a0d] text-[#e4e4e7] rounded-xl border border-white/10 overflow-hidden font-mono text-xs select-none shadow-2xl">
      {/* Top Engineering Banner */}
      <div className="px-4 py-3 bg-[#111116] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ember/20 border border-ember/60 flex items-center justify-center font-bold text-ember text-xs">
            AAI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-wider uppercase">
                Airports Authority of India // Northern Region HQ
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                99.98% UPTIME
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block">
              Enterprise Network Security Compliance, ANS Subnet Segregation &amp; DB Replication Engine
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleRunFullAudit}
            disabled={isAuditing}
            className="px-3 py-1.5 rounded-lg bg-ember hover:bg-ember-bright text-white font-semibold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(160,42,34,0.4)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Auditing...' : 'Run Security Audit'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#0e0e13] border-b border-white/10 text-[11px]">
        <button
          onClick={() => setActiveTab('topology')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'topology'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Subnet Topology ({SUBNETS.length})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3 h-3 text-ember" />
          <span>Security Kernel Logs</span>
        </button>
        <button
          onClick={() => setActiveTab('incident')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'incident'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          {!incidentResolved ? (
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          ) : (
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          )}
          <span>Ticket Diagnosis &amp; SOP</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5">
        {activeTab === 'topology' && (
          <div className="space-y-4">
            {/* Subnet Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SUBNETS.map((node) => {
                const isSelected = node.id === selectedSubnetId
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedSubnetId(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-ember/10 border-ember/60 shadow-[0_0_20px_rgba(160,42,34,0.2)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-zinc-400 font-bold tracking-wider">{node.vlan}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    </div>
                    <div className="font-bold text-white text-xs truncate mb-1">{node.name}</div>
                    <div className="text-[10px] text-zinc-400 font-mono mb-2">{node.ipRange}</div>
                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/10">
                      <span className="text-zinc-400">Traffic:</span>
                      <span className="text-ember font-bold">{node.traffic}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Active Subnet Inspector Detail Panel */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-ember" />
                    <span>{activeSubnet.name} — {activeSubnet.vlan}</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{activeSubnet.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono text-[10px]">
                    ACL Policy: <strong className="text-white">{activeSubnet.aclStatus}</strong>
                  </span>
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed text-xs">
                {activeSubnet.description}
              </p>

              {/* Security Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-zinc-400 uppercase font-medium block">Active Firewall Rules</span>
                  <span className="text-sm font-bold text-white mt-1 block">{activeSubnet.securityMetrics.firewallRules} Enforced</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-zinc-400 uppercase font-medium block">Active Sessions</span>
                  <span className="text-sm font-bold text-white mt-1 block">{activeSubnet.securityMetrics.activeSessions} Conn</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-zinc-400 uppercase font-medium block">Packet Loss</span>
                  <span className="text-sm font-bold text-emerald-400 mt-1 block">{activeSubnet.securityMetrics.packetLoss}</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-zinc-400 uppercase font-medium block">Routing Latency</span>
                  <span className="text-sm font-bold text-ember mt-1 block">{activeSubnet.securityMetrics.latency}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">REAL-TIME SYSLOG STREAM</span>
              <span className="text-[10px] text-zinc-500">Live Buffer: {logs.length} entries</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5 max-h-64 overflow-y-auto">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    log.includes('ALERT')
                      ? 'text-rose-400 font-bold bg-rose-500/10 p-1 rounded'
                      : log.includes('PASS') || log.includes('COMPLETE') || log.includes('RESOLVED')
                      ? 'text-emerald-400'
                      : 'text-zinc-300'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'incident' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${incidentResolved ? 'text-zinc-400' : 'text-amber-400 animate-pulse'}`} />
                  <span className="font-bold text-white text-xs uppercase">
                    Incident Dispatcher // Trouble Ticket #AAI-NR-8941
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {incidentResolved ? (
                    <button
                      onClick={handleTriggerIncident}
                      className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 text-[10px] font-bold transition-all cursor-pointer"
                    >
                      Simulate Ingress Rogue Probe
                    </button>
                  ) : (
                    <button
                      onClick={handleRemediateIncident}
                      className="px-3 py-1 rounded bg-emerald-500 text-black font-bold text-[10px] hover:bg-emerald-400 transition-all cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    >
                      Execute SOP Automated Remediation
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-zinc-400">Diagnosis Status:</span>
                    <span className={incidentResolved ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {incidentResolved ? 'CLEARED & COMPLIANT' : 'ACTIVE INVESTIGATION'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    {incidentResolved
                      ? 'All Northern Region administrative and airside subnets are passing security audits. Standard operating procedures (SOPs) are fully documented.'
                      : 'An anomalous ARP broadcast packet was intercepted attempting cross-VLAN discovery from administrative desktop subnet. Ready for automated ACL firewall quarantine.'}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-zinc-400 font-mono">
                  Verified Internship Scope: Formulated technical documentation and SOPs adopted by AAI IT personnel to ensure rapid operational continuity.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Engineering Footer */}
      <div className="px-4 py-2.5 bg-[#0e0e13] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-ember" />
          <span>Verified Tech Stack: VLAN Segregation, Linux ACLs, MySQL Cluster Sync, Wireshark, ITIL SOPs</span>
        </div>
        <span className="text-zinc-500">Airports Authority of India • Northern Region HQ</span>
      </div>
    </div>
  )
}

export default AAINetworkSecurityApp
