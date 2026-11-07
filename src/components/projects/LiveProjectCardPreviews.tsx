import React, { useState, useEffect, useRef } from 'react'

// 1. AAI Network Security Live Dynamic Preview
export const AAILivePreview: React.FC = () => {
  const [packets, setPackets] = useState<string[]>([
    'TCP [ACK] 192.168.101.42 -> 10.0.4.12:443 [VLAN 101 PERMIT]',
    'UDP [DNS] 10.0.2.15:53 -> 10.0.0.2:53 [INSPECTED // OK]',
    'ICMP [ECHO] 192.168.1.100 -> 10.0.4.1 [AIR-GAP DROP]'
  ])
  const [packetCount, setPacketCount] = useState(1420)

  useEffect(() => {
    const samplePackets = [
      'TCP [SYN] 192.168.101.88 -> 10.0.4.15:8080 [PERMIT]',
      'TCP [ACK] 10.0.4.12 -> 192.168.101.42:443 [ESTABLISHED]',
      'ARP [WHO-HAS] 10.0.4.1 tell 10.0.4.12 [VERIFIED GW]',
      'TLS [HANDSHAKE] ANS-Node-2 -> ANS-Master [mTLS OK]',
      'ICMP [REJECT] 172.16.0.4 -> 10.0.4.1 [ACL VIOLATION DROP]'
    ]

    const interval = setInterval(() => {
      const nextPkt = samplePackets[Math.floor(Math.random() * samplePackets.length)]
      const timestamp = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100)
      setPackets((prev) => [`[${timestamp}] ${nextPkt}`, prev[0], prev[1]])
      setPacketCount((c) => c + Math.floor(Math.random() * 8 + 2))
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col justify-between p-3.5 font-mono text-[10px] text-zinc-300">
      {/* Top Status Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>VLAN 101 ANS AIR-GAP ACTIVE</span>
        </div>
        <div className="text-[9px] text-zinc-400">
          INSPECTION RATE: <span className="text-white font-bold">{packetCount.toLocaleString()} pkts/s</span>
        </div>
      </div>

      {/* Live Scrolling Packet Log */}
      <div className="space-y-1.5 my-auto">
        <div className="text-[9px] text-zinc-400 tracking-wider">LIVE FIREWALL PACKET INSPECTION FEED:</div>
        {packets.map((pkt, i) => (
          <div
            key={i}
            className={`px-2 py-1 rounded bg-black/60 border border-white/10 text-[9.5px] truncate transition-all ${
              pkt.includes('DROP')
                ? 'text-red-400 border-red-500/30'
                : pkt.includes('mTLS')
                ? 'text-cyan-300 border-cyan-500/30'
                : 'text-emerald-300 border-emerald-500/20'
            }`}
          >
            {pkt}
          </div>
        ))}
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">ANS SUBNET</span>
          <span className="text-white font-bold">100% Isolated</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">UPTIME SLA</span>
          <span className="text-emerald-400 font-bold">99.98%</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">PACKET LOSS</span>
          <span className="text-white font-bold">0.00%</span>
        </div>
      </div>
    </div>
  )
}

// 2. CanSat Telemetry Live Dynamic Preview
export const CanSatLivePreview: React.FC = () => {
  const [altitude, setAltitude] = useState(428.4)
  const [velocity, setVelocity] = useState(8.2)
  const [pitch, setPitch] = useState(11.8)
  const [roll, setRoll] = useState(-4.2)
  const [rssi, setRssi] = useState(-78)

  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((alt) => {
        const next = alt - 0.8
        return next < 80 ? 450.0 : parseFloat(next.toFixed(1))
      })
      setVelocity(parseFloat((7.8 + Math.random() * 0.8).toFixed(1)))
      setPitch(parseFloat((10 + Math.random() * 4).toFixed(1)))
      setRoll(parseFloat((-5 + Math.random() * 3).toFixed(1)))
      setRssi(-75 - Math.floor(Math.random() * 6))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col justify-between p-3.5 font-mono text-[10px] text-zinc-300">
      {/* Top RF Telemetry Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>433.92 MHz UHF DOWNLINK</span>
        </div>
        <div className="text-[9px] text-emerald-400 font-bold">
          CRC-16: <span className="text-white">VALID</span> // RSSI: <span className="text-white">{rssi} dBm</span>
        </div>
      </div>

      {/* Real-Time Attitude & Descent Gauges */}
      <div className="grid grid-cols-2 gap-3 my-auto">
        <div className="p-2 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] text-zinc-400 uppercase">Barometric Altitude</span>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {altitude} <span className="text-xs text-amber-400 font-normal">m AGL</span>
          </div>
          <div className="text-[9px] text-zinc-400 flex items-center justify-between pt-1">
            <span>Descent Rate:</span>
            <span className="text-white font-bold">↓ {velocity} m/s</span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] text-zinc-400 uppercase">Gyro Attitude (IMU)</span>
          <div className="flex items-baseline gap-2">
            <div>
              <span className="text-[8px] text-zinc-400 block">PITCH</span>
              <span className="text-sm font-bold text-cyan-400">{pitch > 0 ? `+${pitch}` : pitch}°</span>
            </div>
            <div>
              <span className="text-[8px] text-zinc-400 block">ROLL</span>
              <span className="text-sm font-bold text-amber-400">{roll}°</span>
            </div>
          </div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-1 pt-1 font-bold">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span>Descent Trigger: Ready</span>
          </div>
        </div>
      </div>

      {/* Bottom RF Framing Strip */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] text-zinc-400">
        <span>FSK 9600 BAUD</span>
        <span>STAGE 1: DROGUE ARMED</span>
        <span className="text-white font-bold">BMP280 + MPU6050</span>
      </div>
    </div>
  )
}

// 3. Gemini RAG Studio Live Dynamic Preview
export const RAGLivePreview: React.FC = () => {
  const [similarity, setSimilarity] = useState(0.948)
  const [latency, setLatency] = useState(142)
  const [tokens, setTokens] = useState(1850)

  useEffect(() => {
    const interval = setInterval(() => {
      setSimilarity(parseFloat((0.935 + Math.random() * 0.03).toFixed(3)))
      setLatency(130 + Math.floor(Math.random() * 25))
      setTokens((t) => t + Math.floor(Math.random() * 12 + 4))
    }, 1400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col justify-between p-3.5 font-mono text-[10px] text-zinc-300">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>GEMINI 1.5 PRO // DENSE VECTOR RETRIEVAL</span>
        </div>
        <div className="text-[9px] text-zinc-400">
          STORE: <span className="text-white font-bold">768-DIM CHROMA</span>
        </div>
      </div>

      {/* Live Semantic Query Box */}
      <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 space-y-2 my-auto">
        <div className="text-[9px] text-zinc-400 flex items-center justify-between">
          <span>ACTIVE QUERY MATCH:</span>
          <span className="text-emerald-400 font-bold">GROUNDED 100%</span>
        </div>
        <div className="text-xs text-white font-bold truncate">
          &quot;AAI Northern Region ANS radar failover protocol SOP&quot;
        </div>
        <div className="flex items-center justify-between text-[9px] pt-1 border-t border-white/5">
          <span className="text-zinc-400">
            Cosine Similarity: <strong className="text-emerald-400">{similarity}</strong>
          </span>
          <span className="text-zinc-400">
            End-to-End Latency: <strong className="text-white">{latency} ms</strong>
          </span>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">RE-RANKER</span>
          <span className="text-white font-bold">Dense + BM25</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">GROUNDING</span>
          <span className="text-emerald-400 font-bold">Zero Hallucination</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">PROCESSED</span>
          <span className="text-white font-bold">{tokens.toLocaleString()} tokens</span>
        </div>
      </div>
    </div>
  )
}

// 4. High-Throughput Systems Live Dynamic Preview
export const SystemsLivePreview: React.FC = () => {
  const [ops, setOps] = useState(2450000)
  const [cacheHit, setCacheHit] = useState(99.4)

  useEffect(() => {
    const interval = setInterval(() => {
      setOps(2420000 + Math.floor(Math.random() * 60000))
      setCacheHit(parseFloat((99.2 + Math.random() * 0.4).toFixed(1)))
    }, 1100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col justify-between p-3.5 font-mono text-[10px] text-zinc-300">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>C++20 CACHE-CONSCIOUS ENGINE</span>
        </div>
        <div className="text-[9px] text-zinc-400">
          BUS ALIGN: <span className="text-white font-bold">64-BYTE CACHE LINE</span>
        </div>
      </div>

      {/* Live Benchmark Performance Comparator */}
      <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 space-y-2 my-auto">
        <div className="flex items-center justify-between text-[9px] text-zinc-400">
          <span>ALGORITHMIC EXECUTION COMPARISON:</span>
          <span className="text-emerald-400 font-bold">8.9x SPEEDUP</span>
        </div>

        {/* Bar 1: Dev Cache-Aligned Partitioning */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[9px]">
            <span className="text-emerald-300 font-bold">Dev Cache-Aligned In-Place QuickSort:</span>
            <span className="text-emerald-400 font-bold">0.42 µs (Zero Alloc)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-emerald-400 w-[18%]" />
          </div>
        </div>

        {/* Bar 2: Standard Pointer Heap Chaining */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[9px]">
            <span className="text-zinc-400">Standard std::sort Heap Allocator:</span>
            <span className="text-red-400 font-bold">3.81 µs (Cache Misses)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-red-400/80 w-[85%]" />
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">THROUGHPUT</span>
          <span className="text-white font-bold">{(ops / 1000000).toFixed(2)}M ops/s</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">L1 CACHE HIT</span>
          <span className="text-emerald-400 font-bold">{cacheHit}%</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">HEAP ALLOC</span>
          <span className="text-white font-bold">0 Bytes</span>
        </div>
      </div>
    </div>
  )
}

// 5. ProxiSpeak Geospatial Audio Live Dynamic Preview
export const ProxiSpeakLivePreview: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [distance, setDistance] = useState(2.8)
  const [gainDb, setGainDb] = useState(-3.8)
  const [pan, setPan] = useState(-0.35)

  useEffect(() => {
    let animationFrameId: number
    let phase = 0

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const render = () => {
      phase += 0.06
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw audio waveform wave
      ctx.beginPath()
      ctx.strokeStyle = '#06b6d4'
      ctx.lineWidth = 2

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.05 + phase) * 14 * Math.cos(x * 0.02 + phase * 0.5)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const interval = setInterval(() => {
      const d = parseFloat((2.0 + Math.random() * 2.5).toFixed(1))
      setDistance(d)
      setGainDb(parseFloat((-2.5 - d * 1.5).toFixed(1)))
      setPan(parseFloat((-0.6 + Math.random() * 1.2).toFixed(2)))
    }, 1200)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col justify-between p-3.5 font-mono text-[10px] text-zinc-300">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>WEB AUDIO API // 2D SPATIAL PROXIMITY GRID</span>
        </div>
        <div className="text-[9px] text-zinc-400">
          FALLOFF: <span className="text-white font-bold">INVERSE-SQUARE</span>
        </div>
      </div>

      {/* Animated Live Waveform & Proximity Radar */}
      <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 space-y-2 my-auto">
        <div className="flex items-center justify-between text-[9px] text-zinc-400">
          <span>REAL-TIME STEREO AUDIO ATTENUATION OSCILLOSCOPE:</span>
          <span className="text-cyan-400 font-bold">30 Hz DELTA SYNC</span>
        </div>
        <div className="w-full h-11 bg-black/90 rounded border border-white/5 overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} width={280} height={44} className="w-full h-full" />
        </div>
        <div className="flex items-center justify-between text-[9px] pt-0.5">
          <span>
            Avatar Distance: <strong className="text-white">{distance} m</strong>
          </span>
          <span>
            Gain Attenuation: <strong className="text-emerald-400">{gainDb} dB</strong>
          </span>
          <span>
            Stereo Pan: <strong className="text-cyan-300">{pan > 0 ? `+${pan} R` : `${pan} L`}</strong>
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">SPATIAL LATENCY</span>
          <span className="text-emerald-400 font-bold">&lt;24 ms</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">AUDIO BLEED</span>
          <span className="text-white font-bold">Zero Outside Radius</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[8px]">ACTIVE PEERS</span>
          <span className="text-white font-bold">128 Concurrently</span>
        </div>
      </div>
    </div>
  )
}

// 6. vAlloc Segregated Memory Allocator Live Dynamic Preview
export const VAllocLivePreview: React.FC = () => {
  const [allocSpeed, setAllocSpeed] = useState(34)
  const [valgrindStatus, setValgrindStatus] = useState<string | null>(null)
  const [activeBlocks, setActiveBlocks] = useState([
    { size: '64B', tag: '0x1000', alloc: true, label: 'TCB_Task1' },
    { size: '128B', tag: '0x1040', alloc: true, label: 'Telemetry_Buf' },
    { size: '64B', tag: '0x10C0', alloc: false, label: 'Free_Bucket' },
    { size: '256B', tag: '0x1100', alloc: true, label: 'UHF_Packet' },
    { size: '128B', tag: '0x1200', alloc: false, label: 'Free_Bucket' },
    { size: '512B', tag: '0x1280', alloc: true, label: 'Sensor_Cache' }
  ])

  const totalAllocated = activeBlocks.filter(b => b.alloc).reduce((acc, b) => acc + parseInt(b.size), 0)
  const allocPercent = ((totalAllocated / 2048) * 100).toFixed(1)

  const handleAlloc = (e: React.MouseEvent, sizeStr: string) => {
    e.stopPropagation()
    const freeIdx = activeBlocks.findIndex((b) => !b.alloc)
    if (freeIdx !== -1) {
      setActiveBlocks((prev) => {
        const next = [...prev]
        next[freeIdx] = { ...next[freeIdx], size: sizeStr, alloc: true, label: `DynAlloc_${sizeStr}` }
        return next
      })
      setAllocSpeed(Math.floor(28 + Math.random() * 10))
    }
  }

  const handleCoalesce = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveBlocks((prev) =>
      prev.map((b, i) => (i % 2 === 1 ? { ...b, alloc: false, label: 'Free_Coalesced' } : b))
    )
    setAllocSpeed(22)
  }

  const handleValgrind = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValgrindStatus('Scanning arena...')
    setTimeout(() => {
      setValgrindStatus('0 BYTES LEAKED // CLEAN')
      setTimeout(() => setValgrindStatus(null), 2500)
    }, 600)
  }

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col justify-between p-3 sm:p-4 font-mono text-[10px] text-zinc-300 select-none">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>vAlloc // SEGREGATED HEAP ARENA</span>
        </div>
        <div className="text-[9px] text-zinc-400">
          ALLOC SPEED: <span className="text-white font-bold">{allocSpeed} ns</span> // <span className="text-emerald-400 font-bold">8-BYTE ALIGNED</span>
        </div>
      </div>

      {/* Middle Arena Stage */}
      <div className="space-y-2 my-auto">
        {/* Memory Capacity Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[9px]">
            <span className="text-zinc-400">HEAP CAPACITY UTILIZATION:</span>
            <span className="text-emerald-400 font-bold">{totalAllocated}B / 2048B ({allocPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-800/80 border border-white/10 overflow-hidden flex">
            {activeBlocks.map((b, i) => (
              <div
                key={i}
                style={{ width: `${(parseInt(b.size) / 2048) * 100}%` }}
                className={`h-full transition-all duration-300 ${
                  b.alloc ? 'bg-emerald-500 border-r border-black/40' : 'bg-transparent border-r border-zinc-700/50'
                }`}
                title={`${b.label}: ${b.size} (${b.alloc ? 'Allocated' : 'Free'})`}
              />
            ))}
          </div>
        </div>

        {/* Visual Memory Blocks Layout */}
        <div className="grid grid-cols-6 gap-1 p-1.5 bg-black/80 rounded-lg border border-white/10 text-center">
          {activeBlocks.map((b, i) => (
            <div
              key={i}
              className={`p-1 rounded text-[8.5px] font-bold transition-all ${
                b.alloc
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.25)]'
                  : 'bg-zinc-800/60 text-zinc-500 border border-white/5'
              }`}
            >
              <div className="truncate">{b.size}</div>
              <div className="text-[7px] text-zinc-400 truncate">{b.alloc ? b.label : 'FREE'}</div>
            </div>
          ))}
        </div>

        {/* Direct Interactive Actions on the Card */}
        <div className="flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-white/10">
          <span className="text-[8.5px] text-zinc-400 font-bold uppercase flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            Sandbox:
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => handleAlloc(e, '64B')}
              className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40 text-[8.5px] font-bold cursor-pointer transition-all active:scale-95"
            >
              + Alloc 64B
            </button>
            <button
              onClick={(e) => handleAlloc(e, '128B')}
              className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/40 text-[8.5px] font-bold cursor-pointer transition-all active:scale-95"
            >
              + Alloc 128B
            </button>
            <button
              onClick={handleCoalesce}
              className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 text-[8.5px] font-bold cursor-pointer transition-all active:scale-95"
            >
              Coalesce
            </button>
            <button
              onClick={handleValgrind}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[8.5px] font-bold cursor-pointer transition-all active:scale-95"
            >
              {valgrindStatus || 'Valgrind Check'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">FRAGMENTATION</span>
          <span className="text-emerald-400 font-bold">&lt; 2.4%</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">BOUNDARY TAGS</span>
          <span className="text-white font-bold">O(1) Instant</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">VALGRIND STATUS</span>
          <span className="text-emerald-400 font-bold">Zero Leaks</span>
        </div>
      </div>
    </div>
  )
}

// 7. ApexShell POSIX Command Shell Live Dynamic Preview
export const ApexShellLivePreview: React.FC = () => {
  const [cmdIndex, setCmdIndex] = useState(0)
  const [activeJobs, setActiveJobs] = useState(3)
  const commands = [
    { cmd: 'cat telemetry.log | grep ERR | wc -l', out: '0 errors found across 4,200 flight frames', note: 'Multi-stage IPC Pipe' },
    { cmd: 'ps aux | grep sensor_daemon', out: 'dev  4092  0.0  0.1  ./sensor_daemon & [RUNNING]', note: 'Process Supervisor' },
    { cmd: 'uname -srm', out: 'Linux 6.8.0-40-generic x86_64 POSIX.1-2008', note: 'Kernel Architecture' },
    { cmd: 'top -b -n 1 | head -n 3', out: 'Tasks: 148 total, 1 running, 147 sleeping, 0 zombie leaks', note: 'Process Table' }
  ]

  const handleCommandPick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation()
    setCmdIndex(idx)
  }

  const handleForkDaemon = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveJobs(j => j + 1)
  }

  const curr = commands[cmdIndex]

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col justify-between p-3 sm:p-4 font-mono text-[10px] text-zinc-300 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>ApexShell v2.4 // POSIX COMMAND SHELL</span>
        </div>
        <div className="text-[9px] text-zinc-400">
          SIGCHLD REAPER: <span className="text-emerald-400 font-bold">waitpid() ACTIVE</span>
        </div>
      </div>

      {/* Terminal Screen Stage */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-black/80 border border-white/10 space-y-2 my-auto">
        <div className="flex items-center justify-between text-[8.5px] text-zinc-400 border-b border-white/5 pb-1">
          <span>ACTIVE PIPELINE EXECUTION:</span>
          <span className="text-cyan-400 font-bold">{curr.note}</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[9.5px]">
            <span className="text-emerald-400 font-bold">dev@apex-kernel:~$</span>
            <span className="text-white font-bold">{curr.cmd}</span>
          </div>
          <div className="text-[9px] text-zinc-300 pl-3 border-l-2 border-emerald-500/50 py-0.5 bg-white/[0.02]">
            {curr.out}
          </div>
        </div>

        {/* Interactive Command Chips on Card Face */}
        <div className="flex flex-wrap items-center justify-between gap-1 pt-1.5 border-t border-white/10">
          <span className="text-[8.5px] text-zinc-400 font-bold uppercase flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            Run:
          </span>
          <div className="flex items-center gap-1">
            {['pipe (|)', 'ps aux', 'uname', 'top'].map((c, i) => (
              <button
                key={c}
                onClick={(e) => handleCommandPick(e, i)}
                className={`px-2 py-0.5 rounded text-[8.5px] font-bold cursor-pointer transition-all active:scale-95 ${
                  cmdIndex === i
                    ? 'bg-cyan-500 text-black shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                    : 'bg-white/10 text-zinc-300 hover:text-white hover:bg-white/15'
                }`}
              >
                {c}
              </button>
            ))}
            <button
              onClick={handleForkDaemon}
              className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 border border-emerald-500/40 text-[8.5px] font-bold cursor-pointer transition-all active:scale-95"
            >
              + Fork ({activeJobs})
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">PIPELINING</span>
          <span className="text-white font-bold">Multi-Stage (|)</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">SIGNALS TRAPPED</span>
          <span className="text-cyan-400 font-bold">SIGINT / SIGTSTP</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">ZOMBIE REAPING</span>
          <span className="text-emerald-400 font-bold">0 Leaks Clean</span>
        </div>
      </div>
    </div>
  )
}

// 8. TitanNet Raw Packet Sniffer Live Dynamic Preview
export const TitanNetLivePreview: React.FC = () => {
  const [selectedProto, setSelectedProto] = useState<string>('ALL')
  const [alertTriggered, setAlertTriggered] = useState<boolean>(false)
  const [packetCount, setPacketCount] = useState<number>(1520)
  const [packets, setPackets] = useState<Array<{ proto: string; text: string; status: string }>>([
    { proto: 'TCP', text: '192.168.101.42:443 -> 10.0.4.12 [ACK Seq=1 Win=64k]', status: 'INSPECTED' },
    { proto: 'ARP', text: 'Who has 10.0.4.12? Tell 10.0.4.1 (ANS Gateway)', status: 'VALID' },
    { proto: 'UDP', text: '10.0.2.15:53210 -> 10.0.0.2:53 [DNS Query aai.gov.in]', status: 'PASSED' }
  ])

  useEffect(() => {
    const list = [
      { proto: 'TCP', text: '10.0.4.12:8080 -> 192.168.101.42:443 [SYN-ACK]', status: 'ESTABLISHED' },
      { proto: 'ARP', text: '10.0.4.12 is at 00:0c:29:4f:8e:33 [ANS Verified]', status: 'VERIFIED' },
      { proto: 'UDP', text: '10.0.4.12:8000 -> 10.0.0.2:8000 [Telemetry Sink]', status: 'STREAM' },
      { proto: 'TCP', text: '192.168.101.88 -> 10.0.4.15:8080 [PUSH, ACK 512B]', status: 'INSPECTED' }
    ]

    const interval = setInterval(() => {
      const p = list[Math.floor(Math.random() * list.length)]
      setPackets((prev) => [p, prev[0], prev[1]])
      setPacketCount(c => c + Math.floor(Math.random() * 6 + 1))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const handleFilter = (e: React.MouseEvent, proto: string) => {
    e.stopPropagation()
    setSelectedProto(proto)
  }

  const handleSpoofAlert = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAlertTriggered(true)
    setPackets((prev) => [
      { proto: 'ARP', text: 'CRITICAL: Rogue ARP Reply! 10.0.4.1 hijacked by de:ad:be:ef:13:37', status: 'ALERT' },
      ...prev
    ])
    setTimeout(() => setAlertTriggered(false), 3500)
  }

  const visiblePackets = packets.filter(
    (p) => selectedProto === 'ALL' || p.proto === selectedProto
  )

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col justify-between p-3 sm:p-4 font-mono text-[10px] text-zinc-300 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-ember font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
          <span>AF_PACKET RAW SNIFFER // ETH0</span>
        </div>
        <div className="text-[9px]">
          {alertTriggered ? (
            <span className="px-2 py-0.5 rounded bg-red-600/30 border border-red-500 text-red-300 font-bold animate-pulse">
              ! SPOOF ATTACK FLAGGED
            </span>
          ) : (
            <span className="text-zinc-400">
              RATE: <strong className="text-white">{packetCount} pkts/s</strong> // <span className="text-emerald-400 font-bold">BPF ACTIVE</span>
            </span>
          )}
        </div>
      </div>

      {/* Live Dissected Packet Table Stage */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-black/80 border border-white/10 space-y-1.5 my-auto">
        <div className="flex items-center justify-between text-[8.5px] text-zinc-400 border-b border-white/5 pb-1">
          <span>LIVE AF_PACKET INGRESS STREAM:</span>
          <span className="text-emerald-400 font-bold">PROMISCUOUS MODE</span>
        </div>

        <div className="space-y-1">
          {visiblePackets.slice(0, 3).map((pkt, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded border text-[9px] truncate flex items-center justify-between transition-all ${
                pkt.status === 'ALERT'
                  ? 'bg-red-950/80 border-red-500 text-red-200 font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                  : 'bg-black/70 border-white/10 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className={`px-1.5 py-0.2 rounded text-[7.5px] font-bold ${
                  pkt.proto === 'TCP' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                  pkt.proto === 'ARP' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {pkt.proto}
                </span>
                <span className="truncate">{pkt.text}</span>
              </div>
              <span className="text-[7.5px] font-mono text-zinc-400 ml-1 shrink-0">{pkt.status}</span>
            </div>
          ))}
        </div>

        {/* Interactive Filters on Card Face */}
        <div className="flex flex-wrap items-center justify-between gap-1 pt-1.5 border-t border-white/10">
          <div className="flex items-center gap-1">
            {['ALL', 'TCP', 'UDP', 'ARP'].map((pr) => (
              <button
                key={pr}
                onClick={(e) => handleFilter(e, pr)}
                className={`px-2 py-0.5 rounded text-[8.5px] font-bold cursor-pointer transition-all active:scale-95 ${
                  selectedProto === pr ? 'bg-ember text-white shadow-[0_0_8px_rgba(160,42,34,0.4)]' : 'bg-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {pr}
              </button>
            ))}
          </div>
          <button
            onClick={handleSpoofAlert}
            className="px-2.5 py-0.5 rounded bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/50 text-[8.5px] font-bold cursor-pointer transition-all active:scale-95 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          >
            Simulate ARP Attack
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">LAYER COVERAGE</span>
          <span className="text-white font-bold">L2, L3 &amp; L4</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">THROUGHPUT</span>
          <span className="text-ember font-bold">1,500 pkts/s</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">CPU LOAD</span>
          <span className="text-emerald-400 font-bold">&lt; 1.8%</span>
        </div>
      </div>
    </div>
  )
}

// 9. ByteVM Stack-Based Virtual Machine Live Dynamic Preview
export const ByteVMLivePreview: React.FC = () => {
  const [step, setStep] = useState(0)
  const [program, setProgram] = useState<'fib' | 'fact'>('fib')
  const [isAutoRunning, setIsAutoRunning] = useState(false)

  const stepsFib = [
    { pc: '0x00', op: 'OP_PUSH 0', r0: 0, r1: 1, stack: '[ 0 ]', note: 'Init F(0)' },
    { pc: '0x02', op: 'OP_PUSH 1', r0: 0, r1: 1, stack: '[ 0, 1 ]', note: 'Init F(1)' },
    { pc: '0x04', op: 'OP_ADD', r0: 1, r1: 1, stack: '[ 1 ]', note: 'F(0)+F(1) -> 1' },
    { pc: '0x05', op: 'OP_STORE R0', r0: 1, r1: 1, stack: '[ ]', note: 'R0 <= 1' },
    { pc: '0x07', op: 'OP_PUSH 2', r0: 1, r1: 2, stack: '[ 2 ]', note: 'F(3) Next Term' },
    { pc: '0x09', op: 'OP_HALT', r0: 1, r1: 2, stack: '[ ]', note: 'Evaluation Done' }
  ]

  const stepsFact = [
    { pc: '0x00', op: 'OP_PUSH 5', r0: 5, r1: 1, stack: '[ 5 ]', note: 'Load N=5' },
    { pc: '0x02', op: 'OP_PUSH 4', r0: 5, r1: 4, stack: '[ 5, 4 ]', note: 'Load N-1=4' },
    { pc: '0x04', op: 'OP_MULT', r0: 20, r1: 3, stack: '[ 20 ]', note: '5 * 4 = 20' },
    { pc: '0x05', op: 'OP_PUSH 6', r0: 20, r1: 6, stack: '[ 20, 6 ]', note: 'Accumulator' },
    { pc: '0x07', op: 'OP_MULT', r0: 120, r1: 0, stack: '[ 120 ]', note: 'Result: 5! = 120' },
    { pc: '0x09', op: 'OP_HALT', r0: 120, r1: 0, stack: '[ ]', note: 'Halt Execution' }
  ]

  const currentSteps = program === 'fib' ? stepsFib : stepsFact

  useEffect(() => {
    if (!isAutoRunning) return
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % currentSteps.length)
    }, 700)
    return () => clearInterval(interval)
  }, [isAutoRunning, currentSteps.length])

  const handleStepNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setStep((prev) => (prev + 1) % currentSteps.length)
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    setStep(0)
    setIsAutoRunning(false)
  }

  const handleToggleAuto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAutoRunning(!isAutoRunning)
  }

  const handleSwitchProgram = (e: React.MouseEvent, prg: 'fib' | 'fact') => {
    e.stopPropagation()
    setProgram(prg)
    setStep(0)
  }

  const s = currentSteps[step]

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col justify-between p-3 sm:p-4 font-mono text-[10px] text-zinc-300 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>ByteVM // 16-OPCODE VIRTUAL MACHINE</span>
        </div>
        <div className="text-[9px] text-zinc-400">
          PC: <span className="text-white font-bold">{s.pc}</span> // <span className="text-amber-400 font-bold">{program === 'fib' ? 'FIBONACCI' : 'FACTORIAL'}</span>
        </div>
      </div>

      {/* Disassembler & Register State Stage */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-black/80 border border-white/10 space-y-2 my-auto">
        <div className="grid grid-cols-2 gap-2">
          {/* Opcode & Annotation */}
          <div className="p-1.5 rounded bg-black/90 border border-white/5 space-y-0.5">
            <span className="text-[8px] text-zinc-400 uppercase block">Active Opcode</span>
            <div className="text-xs font-bold text-amber-300 truncate">{s.op}</div>
            <div className="text-[8px] text-zinc-400 truncate">{s.note}</div>
          </div>

          {/* Virtual CPU Registers */}
          <div className="p-1.5 rounded bg-black/90 border border-white/5 space-y-0.5">
            <span className="text-[8px] text-zinc-400 uppercase block">Virtual Registers</span>
            <div className="flex items-center gap-2 text-[9px] font-bold">
              <span className="text-cyan-400">R0: {s.r0}</span>
              <span className="text-emerald-400">R1: {s.r1}</span>
            </div>
            <div className="text-[8px] text-zinc-400 truncate">STACK: <strong className="text-white">{s.stack}</strong></div>
          </div>
        </div>

        {/* Interactive ISA Controls */}
        <div className="flex flex-wrap items-center justify-between gap-1 pt-1.5 border-t border-white/10">
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => handleSwitchProgram(e, 'fib')}
              className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer transition-all ${
                program === 'fib' ? 'bg-amber-500 text-black' : 'bg-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              Fib
            </button>
            <button
              onClick={(e) => handleSwitchProgram(e, 'fact')}
              className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer transition-all ${
                program === 'fact' ? 'bg-amber-500 text-black' : 'bg-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              Fact
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleStepNext}
              className="px-2.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/50 text-[8.5px] font-bold cursor-pointer transition-all active:scale-95 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
            >
              Step F10 &rarr;
            </button>
            <button
              onClick={handleToggleAuto}
              className={`px-2 py-0.5 rounded text-[8.5px] font-bold cursor-pointer transition-all active:scale-95 ${
                isAutoRunning ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isAutoRunning ? 'Pause' : 'Auto'}
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-zinc-300 text-[8.5px] cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-[9px]">
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">OPCODE SET</span>
          <span className="text-white font-bold">16 Custom ISA</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">EVAL STACK</span>
          <span className="text-amber-400 font-bold">256 Frames</span>
        </div>
        <div className="bg-white/5 p-1 rounded text-center">
          <span className="text-zinc-400 block text-[7.5px]">HEAP OVERHEAD</span>
          <span className="text-emerald-400 font-bold">0B (Static BSS)</span>
        </div>
      </div>
    </div>
  )
}
