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
