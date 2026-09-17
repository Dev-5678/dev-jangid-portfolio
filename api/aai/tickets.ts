import type { VercelRequest, VercelResponse } from '@vercel/node'

interface Ticket {
  id: string
  title: string
  vlan: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'
  technician: string
  diagnosis: string
  timestamp: string
}

let ticketsStore: Ticket[] = [
  {
    id: 'TICK-101',
    title: 'ANS Airside VLAN 101 Stateful ACL Boundary Verification',
    vlan: 'VLAN 101',
    severity: 'CRITICAL',
    status: 'RESOLVED',
    technician: 'Dev Jangid',
    diagnosis: 'Inspected hardware edge gateway ACLs; verified zero broadcast routing into airside flight radar network.',
    timestamp: '2026-10-17 19:42:10'
  },
  {
    id: 'TICK-102',
    title: 'SQL Cluster High-Availability Replication Sync Lag Check',
    vlan: 'VLAN 310',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    technician: 'Dev Jangid',
    diagnosis: 'Optimized binary transaction log buffer; reduced replication sync lag to 1.4ms nominal.',
    timestamp: '2026-10-17 20:15:33'
  }
]

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      count: ticketsStore.length,
      database: 'AAI_NORTHERN_REGION_SQL_CLUSTER',
      data: ticketsStore
    })
  }

  if (req.method === 'POST') {
    const { title, vlan, severity, technician, diagnosis } = req.body || {}
    const newTicket: Ticket = {
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      title: title || 'Network Anomaly Inspection',
      vlan: vlan || 'VLAN 205',
      severity: severity || 'MEDIUM',
      status: 'OPEN',
      technician: technician || 'Dev Jangid',
      diagnosis: diagnosis || 'Under operational investigation.',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }
    ticketsStore.unshift(newTicket)
    return res.status(201).json({
      success: true,
      message: 'Ticket recorded into AAI SQL database.',
      ticket: newTicket
    })
  }

  return res.status(405).json({ error: 'Method Not Allowed' })
}
