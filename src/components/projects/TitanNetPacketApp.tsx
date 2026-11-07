import React, { useState, useEffect } from 'react'
import { Play, Pause, AlertTriangle, ShieldCheck, Filter } from 'lucide-react'

interface CapturedPacket {
  id: number
  time: string
  src: string
  dst: string
  proto: 'TCP' | 'UDP' | 'ARP' | 'ICMP' | 'TLS'
  len: number
  info: string
  isAlert?: boolean
  hexDump: string
  l2: string
  l3: string
  l4: string
}

export const TitanNetPacketApp: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState<boolean>(true)
  const [selectedProto, setSelectedProto] = useState<string>('ALL')
  const [selectedPacket, setSelectedPacket] = useState<CapturedPacket | null>(null)
  const [alertActive, setAlertActive] = useState<boolean>(false)

  const initialPackets: CapturedPacket[] = [
    {
      id: 1,
      time: '0.001420',
      src: '192.168.101.42',
      dst: '10.0.4.12',
      proto: 'TCP',
      len: 74,
      info: '443 → 51240 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
      hexDump: '45 00 00 3c 1a 2b 40 00 40 06 b4 1f c0 a8 65 2a 0a 00 04 0c',
      l2: 'Ethernet II, Src: 00:50:56:c0:00:08, Dst: 00:0c:29:4f:8e:33',
      l3: 'Internet Protocol Version 4, Src: 192.168.101.42, Dst: 10.0.4.12, TTL: 64',
      l4: 'Transmission Control Protocol, Src Port: 443, Dst Port: 51240, Flags: [ACK]'
    },
    {
      id: 2,
      time: '0.003104',
      src: '10.0.4.1',
      dst: '192.168.101.255',
      proto: 'ARP',
      len: 42,
      info: 'Who has 10.0.4.12? Tell 10.0.4.1 (ANS Gateway)',
      hexDump: 'ff ff ff ff ff ff 00 0c 29 4f 8e 33 08 06 00 01 08 00 06 04',
      l2: 'Ethernet II, Src: 00:0c:29:4f:8e:33, Dst: ff:ff:ff:ff:ff:ff (Broadcast)',
      l3: 'Address Resolution Protocol (request), Sender IP: 10.0.4.1, Target IP: 10.0.4.12',
      l4: 'Hardware type: Ethernet (1), Protocol type: IPv4 (0x0800)'
    },
    {
      id: 3,
      time: '0.004812',
      src: '10.0.2.15',
      dst: '10.0.0.2',
      proto: 'UDP',
      len: 68,
      info: 'Standard query 0x1a42 A ans-radar.aai.aero',
      hexDump: '45 00 00 44 2f 10 40 00 40 11 a1 2c 0a 00 02 0f 0a 00 00 02',
      l2: 'Ethernet II, Src: 00:1b:21:44:88:99, Dst: 00:50:56:c0:00:01',
      l3: 'Internet Protocol Version 4, Src: 10.0.2.15, Dst: 10.0.0.2, TTL: 64',
      l4: 'User Datagram Protocol, Src Port: 53210, Dst Port: 53 (DNS)'
    }
  ]

  const [packets, setPackets] = useState<CapturedPacket[]>(initialPackets)

  useEffect(() => {
    setSelectedPacket(initialPackets[0])
  }, [])

  useEffect(() => {
    if (!isCapturing) return

    const timer = setInterval(() => {
      const templates: Omit<CapturedPacket, 'id' | 'time'>[] = [
        {
          src: '192.168.101.42',
          dst: '10.0.4.12',
          proto: 'TCP',
          len: 66,
          info: '51240 → 443 [ACK] Seq=1420 Ack=2840 Win=65535 Len=0',
          hexDump: '45 00 00 42 1f a4 40 00 40 06 a2 31 c0 a8 65 2a 0a 00 04 0c',
          l2: 'Ethernet II, Src: 00:50:56:c0:00:08, Dst: 00:0c:29:4f:8e:33',
          l3: 'Internet Protocol Version 4, Src: 192.168.101.42, Dst: 10.0.4.12, TTL: 64',
          l4: 'Transmission Control Protocol, Src Port: 51240, Dst Port: 443, Flags: [ACK]'
        },
        {
          src: '10.0.4.12',
          dst: '10.0.4.1',
          proto: 'ICMP',
          len: 84,
          info: 'Echo (ping) request id=0x0024 seq=12 ttl=64',
          hexDump: '45 00 00 54 a1 00 40 00 40 01 32 1f 0a 00 04 0c 0a 00 04 01',
          l2: 'Ethernet II, Src: 00:0c:29:4f:8e:33, Dst: 00:50:56:c0:00:08',
          l3: 'Internet Protocol Version 4, Src: 10.0.4.12, Dst: 10.0.4.1, TTL: 64',
          l4: 'Internet Control Message Protocol, Type: 8 (Echo request), Code: 0'
        },
        {
          src: '10.0.4.15',
          dst: '10.0.4.12',
          proto: 'TLS',
          len: 128,
          info: 'Application Data (Encrypted mTLS Flight Radar Telemetry)',
          hexDump: '17 03 03 00 7b 00 00 00 00 00 00 00 01 a4 2f 8b c9 33 12 40',
          l2: 'Ethernet II, Src: 00:1a:2b:44:99:11, Dst: 00:0c:29:4f:8e:33',
          l3: 'Internet Protocol Version 4, Src: 10.0.4.15, Dst: 10.0.4.12, TTL: 64',
          l4: 'Transport Layer Security, TLSv1.3 Record Layer: Application Data'
        }
      ]

      const chosen = templates[Math.floor(Math.random() * templates.length)]
      const timestamp = (0.01 + Math.random() * 0.9).toFixed(6)

      setPackets((prev) => [
        {
          id: Date.now(),
          time: timestamp,
          ...chosen
        },
        ...prev.slice(0, 19)
      ])
    }, 1600)

    return () => clearInterval(timer)
  }, [isCapturing])

  const triggerArpSpoofSimulation = () => {
    setAlertActive(true)
    const spoofPacket: CapturedPacket = {
      id: Date.now(),
      time: '0.005992',
      src: '192.168.1.105',
      dst: '192.168.1.1',
      proto: 'ARP',
      len: 42,
      isAlert: true,
      info: '⚠️ SPOOF ALERT: 192.168.1.1 is at 00:1a:2b:3c:4d:5e (Rogue MAC Collision!)',
      hexDump: 'ff ff ff ff ff ff 00 1a 2b 3c 4d 5e 08 06 00 01 08 00 06 04',
      l2: 'Ethernet II, Src: 00:1a:2b:3c:4d:5e (ROGUE), Dst: ff:ff:ff:ff:ff:ff (Broadcast)',
      l3: 'Address Resolution Protocol (reply), 192.168.1.1 is at 00:1a:2b:3c:4d:5e',
      l4: 'DISSECTOR ALERT: Gateway MAC mismatch with baseline 00:0c:29:4f:8e:33!'
    }

    setPackets((prev) => [spoofPacket, ...prev])
    setSelectedPacket(spoofPacket)
  }

  const filteredPackets = packets.filter((p) => {
    if (selectedProto === 'ALL') return true
    return p.proto === selectedProto
  })

  return (
    <div className="w-full bg-[#08090d] border border-white/10 rounded-2xl overflow-hidden font-mono text-xs text-zinc-300 shadow-2xl p-4 sm:p-6 space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isCapturing ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <h3 className="font-bold text-white text-sm sm:text-base uppercase tracking-wider">
              TitanNet-Raw — Raw Socket Network Packet Dissector &amp; ARP Sentinel
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400 block mt-0.5">
            C99 Linux AF_PACKET Raw Sockets // Layer 2/3/4 Header Dissection // Real-Time ARP Poisoning Detection
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Capture:</span>
            <span className="text-emerald-400 font-bold">{isCapturing ? 'STREAMING' : 'PAUSED'}</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Inspection:</span>
            <span className="text-cyan-400 font-bold">1,240 pkts/s</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Overhead:</span>
            <span className="text-emerald-400 font-bold">&lt;1.8% CPU</span>
          </div>
        </div>
      </div>

      {/* Control Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] p-2.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsCapturing(!isCapturing)}
            className={`px-3 py-1.5 rounded-lg font-bold text-[10.5px] uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              isCapturing ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500 text-black'
            }`}
          >
            {isCapturing ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Sniffer</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black stroke-black" />
                <span>Resume Sniffer</span>
              </>
            )}
          </button>

          <button
            onClick={triggerArpSpoofSimulation}
            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/35 text-red-300 border border-red-500/40 font-bold text-[10.5px] uppercase flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Simulate ARP Spoof Attack</span>
          </button>
        </div>

        {/* Protocol Filters */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {['ALL', 'TCP', 'UDP', 'ARP', 'ICMP'].map((proto) => (
            <button
              key={proto}
              onClick={() => setSelectedProto(proto)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                selectedProto === proto
                  ? 'bg-ember text-white shadow'
                  : 'bg-black/50 text-zinc-400 border border-white/10 hover:text-white'
              }`}
            >
              {proto}
            </button>
          ))}
        </div>
      </div>

      {/* ARP Attack Warning Alert */}
      {alertActive && (
        <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 flex items-center justify-between text-red-300 text-[11px] animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <strong>TITANNET SENTINEL ALERT:</strong> Unsolicited ARP packet detected! IP 192.168.1.1 advertised by
              unrecognized MAC address (00:1a:2b:3c:4d:5e). Gateway poisoning blocked!
            </span>
          </div>
          <button
            onClick={() => setAlertActive(false)}
            className="px-2 py-0.5 rounded bg-red-500/30 text-white font-bold text-[9px] hover:bg-red-500/50"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* Main Split View: Packet Table & Packet Detail Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Packet Table (Left 7 Cols) */}
        <div className="lg:col-span-7 rounded-xl bg-black/80 border border-white/10 overflow-hidden shadow-inner flex flex-col">
          <div className="bg-neutral-900/90 px-3 py-1.5 border-b border-white/10 grid grid-cols-12 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
            <span className="col-span-2">Time</span>
            <span className="col-span-3">Source</span>
            <span className="col-span-3">Destination</span>
            <span className="col-span-1">Proto</span>
            <span className="col-span-3">Info</span>
          </div>

          <div className="max-h-[220px] overflow-y-auto divide-y divide-white/5 text-[10px]">
            {filteredPackets.map((pkt) => {
              const isSelected = selectedPacket?.id === pkt.id
              return (
                <div
                  key={pkt.id}
                  onClick={() => setSelectedPacket(pkt)}
                  className={`px-3 py-1.5 grid grid-cols-12 items-center cursor-pointer transition-colors ${
                    pkt.isAlert
                      ? 'bg-red-500/20 text-red-300'
                      : isSelected
                      ? 'bg-ember/25 text-white font-bold'
                      : 'hover:bg-white/5 text-zinc-300'
                  }`}
                >
                  <span className="col-span-2 font-mono text-zinc-400">{pkt.time}</span>
                  <span className="col-span-3 truncate font-mono">{pkt.src}</span>
                  <span className="col-span-3 truncate font-mono">{pkt.dst}</span>
                  <span className="col-span-1">
                    <span
                      className={`px-1 py-0.2 rounded text-[8px] font-bold ${
                        pkt.proto === 'TCP'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : pkt.proto === 'ARP'
                          ? 'bg-amber-500/20 text-amber-300'
                          : pkt.proto === 'UDP'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {pkt.proto}
                    </span>
                  </span>
                  <span className="col-span-3 truncate text-zinc-400 pl-1">{pkt.info}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Packet Inspector (Right 5 Cols) */}
        <div className="lg:col-span-5 rounded-xl bg-black/80 border border-white/10 p-3.5 space-y-2.5 max-h-[250px] overflow-y-auto text-[10px]">
          <div className="font-bold text-white border-b border-white/10 pb-1 flex items-center justify-between text-[11px]">
            <span>PACKET PROTOCOL TREE</span>
            {selectedPacket && <span className="text-zinc-400">{selectedPacket.len} Bytes</span>}
          </div>

          {selectedPacket ? (
            <div className="space-y-2">
              <div className="p-2 rounded bg-black/60 border border-white/5 space-y-0.5">
                <div className="text-cyan-400 font-bold">▶ Layer 2 (Data Link):</div>
                <div className="text-zinc-300 pl-2 leading-relaxed">{selectedPacket.l2}</div>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/5 space-y-0.5">
                <div className="text-emerald-400 font-bold">▶ Layer 3 (Network):</div>
                <div className="text-zinc-300 pl-2 leading-relaxed">{selectedPacket.l3}</div>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/5 space-y-0.5">
                <div className="text-amber-400 font-bold">▶ Layer 4 (Transport / Protocol):</div>
                <div className="text-zinc-300 pl-2 leading-relaxed">{selectedPacket.l4}</div>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/5 space-y-0.5 font-mono text-[9px]">
                <div className="text-zinc-400 font-bold">Raw Payload Hex Dump:</div>
                <div className="text-zinc-500 tracking-widest break-all">{selectedPacket.hexDump}</div>
              </div>
            </div>
          ) : (
            <div className="text-zinc-500 text-center py-8">Select a packet from the table to inspect headers</div>
          )}
        </div>
      </div>

      {/* Engineering Rationale */}
      <div className="p-3.5 rounded-xl bg-ember/[0.08] border border-ember/30 text-[11px] text-zinc-200 font-sans leading-relaxed flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-ember-bright shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-mono text-[10px] uppercase block mb-0.5">
            Dev&apos;s Engineering Trade-Offs (AF_PACKET Promiscuous Mode Dissection):
          </strong>
          Standard user-space socket programs only see Layer 4 payloads after the kernel TCP/IP stack strips protocol headers. By binding directly to AF_PACKET raw sockets with ETH_P_ALL in Linux, TitanNet captures the full Ethernet frame directly off the network card without packet copy overhead, allowing real-time ARP spoofing and Man-in-the-Middle detection.
        </div>
      </div>
    </div>
  )
}

export default TitanNetPacketApp
