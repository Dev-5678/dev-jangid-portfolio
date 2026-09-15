import React, { useState } from 'react'
import { ShieldCheck, Database, Server, FileText, CheckCircle2 } from 'lucide-react'

interface NodeItem {
  id: string
  name: string
  role: string
  status: string
  metric: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  verifiedResponsibility: string
}

const NODES: NodeItem[] = [
  {
    id: 'sec-gateway',
    name: 'NR_HQ_SECURITY_GATEWAY',
    role: 'Network Security Compliance',
    status: '100% COMPLIANT',
    metric: 'Zero Violations',
    icon: ShieldCheck,
    description: 'Evaluated network security compliance protocols across Northern Region HQ infrastructure using computer science principles.',
    verifiedResponsibility: 'Continuous security compliance auditing & access control monitoring'
  },
  {
    id: 'db-cluster',
    name: 'SQL_OPERATIONAL_DATABASE',
    role: 'Database Administration & Maintenance',
    status: 'OPTIMAL (4ms)',
    metric: '99.98% Uptime',
    icon: Database,
    description: 'Assisted senior engineers with routine database management, software updates, and structured maintenance schedules.',
    verifiedResponsibility: 'Database maintenance, data integrity verification, and software update cycles'
  },
  {
    id: 'infra-monitor',
    name: 'NORTHERN_REGION_SYSTEMS',
    role: 'Infrastructure Monitoring',
    status: 'ACTIVE_TELEMETRY',
    metric: '48 Systems Monitored',
    icon: Server,
    description: 'Monitored operational systems in real-time, assisting senior engineers with proactive system maintenance and health tracking.',
    verifiedResponsibility: 'System health diagnostics & operational network surveillance'
  },
  {
    id: 'ticket-dispatch',
    name: 'TICKET_DISPATCH_&_DOCS',
    role: 'Technical Troubleshooting & Docs',
    status: 'RESOLVED',
    metric: 'Documented Workflows',
    icon: FileText,
    description: 'Diagnosed system issues, resolved internal technical tickets, and documented software workflows to streamline team knowledge.',
    verifiedResponsibility: 'Technical trouble-ticket diagnosis, workflow documentation, and SOP updates'
  }
]

export const AAINetworkInspectorWidget: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('sec-gateway')
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditStep, setAuditStep] = useState<string | null>(null)
  const activeNode = NODES.find((n) => n.id === selectedNodeId) || NODES[0]
  const ActiveIcon = activeNode.icon

  const handleRunAudit = () => {
    setIsAuditing(true)
    setAuditStep('CHECKING FIREWALL LOGS...')
    setTimeout(() => setAuditStep('VERIFYING SQL DATA INTEGRITY...'), 700)
    setTimeout(() => setAuditStep('AUDITING ANS ACCESS LISTS...'), 1400)
    setTimeout(() => {
      setAuditStep('AUDIT COMPLETED: 100% COMPLIANT')
      setIsAuditing(false)
      setTimeout(() => setAuditStep(null), 3000)
    }, 2100)
  }

  return (
    <div className="w-full bg-[#111317] text-[#F4F7FB] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#CCFF00] p-5 sm:p-6 font-mono text-xs select-none">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b-2 border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#CCFF00] text-[#111317] flex items-center justify-center font-black text-xs border border-[#111317]">
            AAI
          </div>
          <div>
            <span className="font-black text-sm text-[#CCFF00] uppercase tracking-wider block">
              AIRPORTS_AUTHORITY_OF_INDIA // INFRA_AUDIT_NODES
            </span>
            <span className="text-[10px] text-gray-400 font-bold">
              NORTHERN REGION HEADQUARTERS, NEW DELHI • INTERNSHIP ENGINEERING DASHBOARD
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="px-3 py-1 bg-[#CCFF00] text-[#111317] font-bold text-[10px] uppercase border border-[#111317] hover:bg-[#b8e600] disabled:opacity-50 transition-colors"
          >
            {isAuditing ? 'AUDITING...' : 'RUN AUDIT TRACE'}
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A202C] border border-gray-700 text-[#00E5FF] font-bold text-[10px]">
            <span className={`w-2 h-2 rounded-full ${isAuditing ? 'bg-[#FF5500] animate-ping' : 'bg-[#CCFF00]'}`} />
            <span>{auditStep || 'STATUS: NOMINAL'}</span>
          </div>
        </div>
      </div>

      {/* Nodes selection grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
        {NODES.map((node) => {
          const isSelected = selectedNodeId === node.id
          const NodeIcon = node.icon
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`p-3 text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1E293B] border-[#CCFF00] shadow-[3px_3px_0px_#CCFF00] text-white'
                  : 'bg-[#141820] border-gray-800 hover:border-gray-600 text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <NodeIcon className={`w-4 h-4 ${isSelected ? 'text-[#CCFF00]' : 'text-gray-400'}`} />
                <span className={`text-[9px] font-black px-1.5 py-0.5 ${isSelected ? 'bg-[#CCFF00] text-[#111317]' : 'bg-gray-800 text-gray-300'}`}>
                  {node.metric}
                </span>
              </div>
              <strong className="text-[11px] font-bold text-[#F4F7FB] block truncate mb-1">
                {node.role}
              </strong>
              <span className="text-[9px] text-[#00E5FF] font-mono font-bold">
                {node.status}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="p-4 sm:p-5 bg-[#1A202C] border-2 border-dashed border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ActiveIcon className="w-5 h-5 text-[#CCFF00]" />
            <h4 className="text-sm font-black text-[#F4F7FB] uppercase tracking-wider">
              {activeNode.name}
            </h4>
          </div>
          <span className="inline-flex items-center gap-1.5 font-bold text-xs text-[#CCFF00]">
            <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
            <span>VERIFIED ON-SITE INTERNSHIP WORKFLOW</span>
          </span>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed font-sans mb-3 font-medium">
          {activeNode.description}
        </p>

        <div className="pt-3 border-t border-gray-800 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-gray-400">
          <span>ROLE DELIVERABLE: <strong className="text-white">{activeNode.verifiedResponsibility}</strong></span>
          <span className="text-[#00E5FF]">JULY 2026 – AUGUST 2026</span>
        </div>
      </div>
    </div>
  )
}

export default AAINetworkInspectorWidget
