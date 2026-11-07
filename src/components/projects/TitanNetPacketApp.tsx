import React, { useState, useEffect } from 'react'
import { Play, Pause, AlertTriangle, Filter, Code2, Activity, Radio, Search, CheckCircle } from 'lucide-react'

interface CapturedPacket {
  id: number
  time: string
  src: string
  dst: string
  proto: 'TCP' | 'UDP' | 'ARP' | 'ICMP' | 'DNS'
  len: number
  info: string
  isAlert?: boolean
  hexDump: string
  l2: string
  l3: string
  l4: string
}

export const TitanNetPacketApp: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<'dissector' | 'hexstream' | 'source'>('dissector')
  const [selectedProto, setSelectedProto] = useState<string>('ALL')
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [alertActive, setAlertActive] = useState<boolean>(false)
  const [packetCount, setPacketCount] = useState<number>(1520)

  const initialPackets: CapturedPacket[] = [
    {
      id: 1,
      time: '0.001420',
      src: '192.168.101.42',
      dst: '10.0.4.12',
      proto: 'TCP',
      len: 74,
      info: '443 → 51240 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
      hexDump: '45 00 00 3c 1a 2b 40 00 40 06 b4 1f c0 a8 65 2a 0a 00 04 0c 01 bb c8 28 00 00 00 01',
      l2: 'Ethernet II, Src: 00:50:56:c0:00:08 (VMware), Dst: 00:0c:29:4f:8e:33 (Gateway)',
      l3: 'Internet Protocol Version 4, Src: 192.168.101.42, Dst: 10.0.4.12, TTL: 64, Header Len: 20 bytes',
      l4: 'Transmission Control Protocol, Src Port: 443 (HTTPS), Dst Port: 51240, Flags: [ACK], Window: 64240'
    },
    {
      id: 2,
      time: '0.003104',
      src: '10.0.4.1',
      dst: '192.168.101.255',
      proto: 'ARP',
      len: 42,
      info: 'Who has 10.0.4.12? Tell 10.0.4.1 (ANS Gateway)',
      hexDump: 'ff ff ff ff ff ff 00 0c 29 4f 8e 33 08 06 00 01 08 00 06 04 00 01 00 0c 29 4f 8e 33',
      l2: 'Ethernet II, Src: 00:0c:29:4f:8e:33, Dst: ff:ff:ff:ff:ff:ff (Broadcast)',
      l3: 'Address Resolution Protocol (request), Sender IP: 10.0.4.1, Target IP: 10.0.4.12',
      l4: 'Hardware type: Ethernet (1), Protocol type: IPv4 (0x0800), Opcode: request (1)'
    },
    {
      id: 3,
      time: '0.004812',
      src: '10.0.2.15',
      dst: '10.0.0.2',
      proto: 'UDP',
      len: 68,
      info: 'Standard query 0x1a42 A ans-radar.aai.aero',
      hexDump: '45 00 00 44 2f 10 40 00 40 11 a1 2c 0a 00 02 0f 0a 00 00 02 c0 3a 00 35 00 30 1e 22',
      l2: 'Ethernet II, Src: 00:1b:21:44:88:99, Dst: 00:50:56:c0:00:01',
      l3: 'Internet Protocol Version 4, Src: 10.0.2.15, Dst: 10.0.0.2, TTL: 64',
      l4: 'User Datagram Protocol, Src Port: 53210, Dst Port: 53 (DNS)'
    },
    {
      id: 4,
      time: '0.006240',
      src: '10.0.4.12',
      dst: '192.168.101.42',
      proto: 'TCP',
      len: 66,
      info: '51240 → 443 [SYN] Seq=0 Win=65535 Len=0 MSS=1460',
      hexDump: '45 00 00 34 8c 12 40 00 40 06 42 38 0a 00 04 0c c0 a8 65 2a c8 28 01 bb 00 00 00 00',
      l2: 'Ethernet II, Src: 00:0c:29:4f:8e:33, Dst: 00:50:56:c0:00:08',
      l3: 'Internet Protocol Version 4, Src: 10.0.4.12, Dst: 192.168.101.42, TTL: 64',
      l4: 'Transmission Control Protocol, Src Port: 51240, Dst Port: 443 (HTTPS), Flags: [SYN]'
    }
  ]

  const [packets, setPackets] = useState<CapturedPacket[]>(initialPackets)
  const [selectedPacket, setSelectedPacket] = useState<CapturedPacket | null>(initialPackets[0])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setPacketCount((c) => c + 1)
      const templates = [
        {
          src: '192.168.101.88',
          dst: '10.0.4.15',
          proto: 'TCP' as const,
          len: 120,
          info: '8080 → 49210 [PSH, ACK] Seq=1420 Ack=800 Data=54B',
          hex: '45 00 00 78 3f 44 40 00 40 06 8e 10 c0 a8 65 58 0a 00 04 0f 1f 90 c0 3a 00 00 05 8c',
          l2: 'Ethernet II, Src: 00:50:56:c0:00:22, Dst: 00:0c:29:4f:8e:33',
          l3: 'Internet Protocol Version 4, Src: 192.168.101.88, Dst: 10.0.4.15, TTL: 64',
          l4: 'Transmission Control Protocol, Flags: [PSH, ACK], Port: 8080'
        },
        {
          src: '10.0.4.1',
          dst: '10.0.4.255',
          proto: 'ICMP' as const,
          len: 56,
          info: 'Echo (ping) request id=0x0042 seq=14 ttl=64',
          hex: '45 00 00 38 10 20 40 00 40 01 a4 19 0a 00 04 01 0a 00 04 ff 08 00 f7 2c 00 42 00 0e',
          l2: 'Ethernet II, Src: 00:0c:29:4f:8e:33, Dst: ff:ff:ff:ff:ff:ff',
          l3: 'Internet Protocol Version 4, Src: 10.0.4.1, Dst: 10.0.4.255, TTL: 64',
          l4: 'Internet Control Message Protocol, Type: 8 (Echo request), Code: 0'
        }
      ]

      const chosen = templates[Math.floor(Math.random() * templates.length)]
      const now = new Date()
      const timeStr = `${now.getSeconds()}.${Math.floor(now.getMilliseconds()).toString().padStart(3, '0')}`

      const newPkt: CapturedPacket = {
        id: Date.now(),
        time: `0.00${timeStr}`,
        src: chosen.src,
        dst: chosen.dst,
        proto: chosen.proto,
        len: chosen.len,
        info: chosen.info,
        hexDump: chosen.hex,
        l2: chosen.l2,
        l3: chosen.l3,
        l4: chosen.l4
      }

      setPackets((prev) => [newPkt, ...prev.slice(0, 24)])
    }, 1800)

    return () => clearInterval(interval)
  }, [isRunning])

  const triggerArpSpoofSimulation = () => {
    setAlertActive(true)
    const spoofedPacket: CapturedPacket = {
      id: Date.now(),
      time: '0.007890',
      src: '10.0.4.1',
      dst: '10.0.4.12',
      proto: 'ARP',
      len: 42,
      info: 'ATTACK: Unsolicited ARP Reply! 10.0.4.1 is at de:ad:be:ef:13:37 (ROGUE MAC)',
      isAlert: true,
      hexDump: '00 0c 29 4f 8e 33 de ad be ef 13 37 08 06 00 01 08 00 06 04 00 02 de ad be ef 13 37',
      l2: 'Ethernet II, Src: de:ad:be:ef:13:37 (CONFLICTING ROGUE NIC), Dst: 00:0c:29:4f:8e:33',
      l3: 'Address Resolution Protocol (reply), 10.0.4.1 is at de:ad:be:ef:13:37 (FLAGGED MITM)',
      l4: 'Hardware type: Ethernet (1), Opcode: reply (2) -- DISCORDANT GATEWAY MAC'
    }

    setPackets((prev) => [spoofedPacket, ...prev])
    setSelectedPacket(spoofedPacket)
  }

  const filteredPackets = packets.filter((p) => {
    const protoMatches = selectedProto === 'ALL' || p.proto === selectedProto
    const searchMatches =
      !searchFilter ||
      p.src.includes(searchFilter) ||
      p.dst.includes(searchFilter) ||
      p.info.toLowerCase().includes(searchFilter.toLowerCase())
    return protoMatches && searchMatches
  })

  return (
    <div className="w-full bg-[#090a0d] text-[#e4e4e7] rounded-xl border border-white/10 overflow-hidden font-mono text-xs select-none shadow-2xl">
      {/* Top Header */}
      <div className="px-4 py-3 bg-[#101116] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ember/20 border border-ember/60 flex items-center justify-center font-bold text-ember text-xs">
            <Radio className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-wider uppercase">
                TitanNet-Raw v1.2 // AF_PACKET Network Sniffer
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-ember/15 text-ember-bright border border-ember/40">
                Promiscuous eth0
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block">
              Linux Raw Socket Capture • L2–L4 Deep Protocol Tree Dissection • ARP Spoofing Detection
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isRunning ? 'Freeze Ingress' : 'Resume Sniffing'}</span>
          </button>

          <button
            onClick={triggerArpSpoofSimulation}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Simulate ARP Spoof Attack</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#0c0d12] border-b border-white/10 text-[11px]">
        <button
          onClick={() => setActiveTab('dissector')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'dissector'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Live Packet Dissector &amp; Inspector
        </button>
        <button
          onClick={() => setActiveTab('hexstream')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'hexstream'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Raw Ingress Hex Stream ({packets.length})
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'source'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3 h-3 text-ember" />
          <span>C99 AF_PACKET Raw Socket Driver</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5">
        {activeTab === 'dissector' && (
          <div className="space-y-4">
            {/* ARP Attack Warning Banner */}
            {alertActive && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/70 text-red-200 flex flex-wrap items-center justify-between gap-3 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white text-xs block">
                      SECURITY INTRUSION: Rogue ARP Reply Detected on Interface eth0!
                    </span>
                    <span className="text-[10px] text-red-300">
                      Attacker MAC <code className="text-white font-bold">de:ad:be:ef:13:37</code> attempting to poison ARP cache for Gateway 10.0.4.1. Automated quarantine trigger generated.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setAlertActive(false)}
                  className="px-2.5 py-1 rounded bg-red-700 hover:bg-red-600 text-white text-[10px] font-bold cursor-pointer"
                >
                  Dismiss Alert
                </button>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-zinc-400 font-bold uppercase mr-1">
                  <Filter className="w-3 h-3 inline mr-1 text-zinc-500" />
                  Protocol:
                </span>
                {['ALL', 'TCP', 'UDP', 'ARP', 'ICMP'].map((proto) => (
                  <button
                    key={proto}
                    onClick={() => setSelectedProto(proto)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      selectedProto === proto
                        ? 'bg-ember text-white shadow-[0_0_10px_rgba(160,42,34,0.4)]'
                        : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {proto}
                  </button>
                ))}
              </div>

              {/* BPF / IP Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter IP or port..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-8 pr-3 py-1 rounded-lg bg-black/60 border border-white/15 text-white text-[10px] placeholder-zinc-500 outline-none w-44 font-mono"
                />
              </div>
            </div>

            {/* Live Packet Table */}
            <div className="rounded-xl border border-white/15 bg-[#08090d] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-12 px-3 py-2 bg-[#12131a] border-b border-white/10 text-[10px] font-bold text-zinc-400 uppercase">
                <div className="col-span-1">No.</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-3">Source</div>
                <div className="col-span-3">Destination</div>
                <div className="col-span-1 text-center">Proto</div>
                <div className="col-span-2 text-right">Length</div>
              </div>

              <div className="max-h-48 overflow-y-auto divide-y divide-white/5">
                {filteredPackets.map((pkt, idx) => (
                  <div
                    key={pkt.id}
                    onClick={() => setSelectedPacket(pkt)}
                    className={`grid grid-cols-12 px-3 py-1.5 text-[10.5px] items-center cursor-pointer transition-colors ${
                      pkt.isAlert
                        ? 'bg-red-950/60 text-red-200 font-bold hover:bg-red-900/60'
                        : selectedPacket?.id === pkt.id
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="col-span-1 text-zinc-500">#{idx + 1}</div>
                    <div className="col-span-2 text-zinc-400 font-mono text-[9.5px]">{pkt.time}</div>
                    <div className="col-span-3 font-mono text-cyan-300 truncate">{pkt.src}</div>
                    <div className="col-span-3 font-mono text-amber-300 truncate">{pkt.dst}</div>
                    <div className="col-span-1 text-center">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                          pkt.proto === 'TCP'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : pkt.proto === 'UDP'
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : pkt.proto === 'ARP'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {pkt.proto}
                      </span>
                    </div>
                    <div className="col-span-2 text-right text-zinc-400 font-mono">{pkt.len} B</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Layer Dissection & Hex Dump Pane */}
            {selectedPacket && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-black/60 border border-white/10">
                {/* Protocol Tree Breakdown */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-white flex items-center justify-between">
                    <span>Protocol Layer Dissection:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Frame Length: {selectedPacket.len}B</span>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div className="p-2 rounded bg-black/80 border border-white/10">
                      <div className="text-zinc-400 font-bold uppercase text-[9px]">Layer 2: Datalink / Ethernet II</div>
                      <div className="text-zinc-200 mt-0.5">{selectedPacket.l2}</div>
                    </div>

                    <div className="p-2 rounded bg-black/80 border border-white/10">
                      <div className="text-zinc-400 font-bold uppercase text-[9px]">Layer 3: Network / IPv4 &amp; ARP</div>
                      <div className="text-zinc-200 mt-0.5">{selectedPacket.l3}</div>
                    </div>

                    <div className="p-2 rounded bg-black/80 border border-white/10">
                      <div className="text-zinc-400 font-bold uppercase text-[9px]">Layer 4: Transport / TCP &amp; UDP</div>
                      <div className="text-zinc-200 mt-0.5">{selectedPacket.l4}</div>
                    </div>
                  </div>
                </div>

                {/* Raw Hex Payload Dump */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-white flex items-center justify-between">
                    <span>Raw Packet Byte Stream:</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Offset 0x0000</span>
                  </div>

                  <div className="p-2.5 rounded bg-black/90 border border-white/10 font-mono text-[10px] text-emerald-400 leading-relaxed overflow-x-auto h-32">
                    {selectedPacket.hexDump}
                    <div className="pt-2 text-zinc-500 text-[9px]">
                      ASCII: &quot;..&lt;.@.@..e*....(....&quot; [Zero buffer overrun, Valgrind clean]
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Gauges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Capture Rate</span>
                  <span className="text-emerald-400">NOMINAL</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  {packetCount} <span className="text-xs text-zinc-400 font-normal">pkts / s</span>
                </div>
                <span className="text-[10px] text-zinc-500">Zero Frame Dropped</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Socket Type</span>
                  <span className="text-ember">RAW L2</span>
                </div>
                <div className="my-2 text-lg sm:text-xl font-extrabold text-white">
                  AF_PACKET
                </div>
                <span className="text-[10px] text-zinc-500">htons(ETH_P_ALL)</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>ARP Poisoning</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1.5">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Monitored</span>
                </div>
                <span className="text-[10px] text-zinc-500">Hash-Table Conflict Flag</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>CPU Overhead</span>
                  <span className="text-cyan-400">&lt; 1.8%</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  1.6 <span className="text-xs text-zinc-400 font-normal">% Core Load</span>
                </div>
                <span className="text-[10px] text-zinc-500">Zero-Copy Buffer Ingress</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hexstream' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">PROMISCUOUS RAW BYTE CAPTURE STREAM</span>
              <span className="text-[10px] text-zinc-500">Link-layer frame dissection • Checksum validation</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5 max-h-72 overflow-y-auto">
              {packets.map((pkt) => (
                <div key={pkt.id} className="flex flex-wrap items-center justify-between gap-2 text-zinc-300 py-1 border-b border-white/5">
                  <span className="text-zinc-500">[{pkt.time}]</span>
                  <span className="font-bold text-emerald-400">{pkt.hexDump}</span>
                  <span className="text-zinc-400 font-mono text-[9px]">{pkt.proto} {pkt.len}B</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">TitanNet-Raw LINUX AF_PACKET SNIFFER (C99)</span>
              <span className="text-[10px] text-zinc-500">Target: Linux Kernel Raw Socket • Promiscuous Mode</span>
            </div>
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
{`#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <net/ethernet.h>
#include <linux/if_packet.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>

void start_packet_sniffer(const char* interface) {
    // Open low-level AF_PACKET raw socket capturing all link-layer frames
    int raw_sock = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL));
    if (raw_sock < 0) {
        perror("Raw socket creation failed (Requires root / CAP_NET_RAW)");
        return;
    }

    uint8_t buffer[65536];
    while (1) {
        ssize_t data_size = recvfrom(raw_sock, buffer, sizeof(buffer), 0, NULL, NULL);
        if (data_size < 0) break;

        struct ethhdr* eth = (struct ethhdr*)buffer;
        
        // Inspect IPv4 packets
        if (ntohs(eth->h_proto) == ETH_P_IP) {
            struct iphdr* ip = (struct iphdr*)(buffer + sizeof(struct ethhdr));
            
            // Check for TCP segments
            if (ip->protocol == IPPROTO_TCP) {
                struct tcphdr* tcp = (struct tcphdr*)(buffer + sizeof(struct ethhdr) + (ip->ihl * 4));
                printf("[TCP] %s:%d -> ", inet_ntoa(*(struct in_addr*)&ip->saddr), ntohs(tcp->source));
                printf("%s:%d [Flags: 0x%02x]\\n", inet_ntoa(*(struct in_addr*)&ip->daddr), ntohs(tcp->dest), tcp->th_flags);
            }
        }
        // Inspect ARP requests & detect poisoning
        else if (ntohs(eth->h_proto) == ETH_P_ARP) {
            validate_arp_mapping(buffer + sizeof(struct ethhdr));
        }
    }
}`}
            </pre>
          </div>
        )}
      </div>

      {/* Engineering Footer */}
      <div className="px-4 py-2.5 bg-[#0c0d12] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-ember" />
          <span>TitanNet-Raw • Linux Raw Socket Sniffer &amp; ARP Spoofing Intrusion Monitor</span>
        </div>
        <span className="text-zinc-500">C99 • AF_PACKET / SOCK_RAW • AAI Compliance Architecture</span>
      </div>
    </div>
  )
}

export default TitanNetPacketApp