import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Radio, Activity, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

interface AudioNode {
  id: string
  name: string
  x: number
  y: number
  radius: number
  color: string
  label: string
  status: string
}

const PEER_NODES: AudioNode[] = [
  { id: 'node-ai-lab', name: 'AI & Robotics Lab', x: 180, y: 150, radius: 120, color: '#fc6b2f', label: 'Audio Stream Active (3 peers)', status: 'Broadcasting' },
  { id: 'node-library', name: 'Central Library Huddle', x: 580, y: 140, radius: 110, color: '#38bdf8', label: 'Quiet Zone (1 peer)', status: 'Whisper Mode' },
  { id: 'node-cafeteria', name: 'Open Amphitheatre', x: 260, y: 440, radius: 130, color: '#10b981', label: 'Open Discussion (5 peers)', status: 'Spatial High' },
  { id: 'node-server-room', name: 'Telemetry Command Core', x: 620, y: 430, radius: 120, color: '#a855f7', label: 'Tech Lead Stream (2 peers)', status: 'Secure VoIP' }
]

export const ProxiSpeakApp: React.FC = () => {
  const [position, setPosition] = useState({ x: 400, y: 300 })
  const [nearestNode, setNearestNode] = useState<AudioNode | null>(null)
  const [nearestDistance, setNearestDistance] = useState<number>(999)
  const [volumeLevel, setVolumeLevel] = useState<number>(0)
  const [stereoPan, setStereoPan] = useState<number>(0)
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false)
  const [activePeersCount] = useState<number>(11)

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const panNodeRef = useRef<StereoPannerNode | null>(null)

  // Canvas bounds
  const WIDTH = 800
  const HEIGHT = 580

  // Movement handler
  const moveAvatar = (dx: number, dy: number) => {
    setPosition((prev) => {
      const newX = Math.max(30, Math.min(WIDTH - 30, prev.x + dx))
      const newY = Math.max(30, Math.min(HEIGHT - 30, prev.y + dy))
      return { x: newX, y: newY }
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 24 : 12
      if (['ArrowUp', 'w', 'W'].includes(e.key)) { e.preventDefault(); moveAvatar(0, -step) }
      if (['ArrowDown', 's', 'S'].includes(e.key)) { e.preventDefault(); moveAvatar(0, step) }
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) { e.preventDefault(); moveAvatar(-step, 0) }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) { e.preventDefault(); moveAvatar(step, 0) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Proximity math
  useEffect(() => {
    let closest: AudioNode | null = null
    let minD = 999999

    PEER_NODES.forEach((node) => {
      const d = Math.hypot(position.x - node.x, position.y - node.y)
      if (d < minD) {
        minD = d
        closest = node
      }
    })

    setNearestNode(closest)
    setNearestDistance(Math.round(minD))

    if (closest) {
      const effectiveRadius = (closest as AudioNode).radius
      if (minD > effectiveRadius) {
        setVolumeLevel(0)
      } else {
        // Inverse-distance smooth attenuation curve
        const factor = 1 - minD / effectiveRadius
        const vol = Math.min(100, Math.round(Math.pow(factor, 1.5) * 100))
        setVolumeLevel(vol)

        // Stereo pan based on relative X position
        const relX = ((closest as AudioNode).x - position.x) / effectiveRadius
        setStereoPan(Math.max(-1, Math.min(1, Number(relX.toFixed(2)))))
      }
    }
  }, [position])

  // Web Audio Synth for spatial audio feedback
  const toggleAudio = () => {
    if (!isAudioEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioContextRef.current = ctx

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        let pan: StereoPannerNode | null = null

        if (ctx.createStereoPanner) {
          pan = ctx.createStereoPanner()
          panNodeRef.current = pan
        }

        osc.type = 'sine'
        osc.frequency.setValueAtTime(220, ctx.currentTime)
        gain.gain.setValueAtTime(0, ctx.currentTime)

        if (pan) {
          osc.connect(gain)
          gain.connect(pan)
          pan.connect(ctx.destination)
        } else {
          osc.connect(gain)
          gain.connect(ctx.destination)
        }

        osc.start()
        oscillatorRef.current = osc
        gainNodeRef.current = gain
        setIsAudioEnabled(true)
      } catch (err) {
        console.warn('Web Audio init error:', err)
      }
    } else {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop() } catch {}
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      setIsAudioEnabled(false)
    }
  }

  // Update audio volume and pan
  useEffect(() => {
    if (isAudioEnabled && gainNodeRef.current && audioContextRef.current) {
      const targetGain = (volumeLevel / 100) * 0.15
      gainNodeRef.current.gain.setTargetAtTime(targetGain, audioContextRef.current.currentTime, 0.05)
      if (panNodeRef.current) {
        panNodeRef.current.pan.setTargetAtTime(stereoPan, audioContextRef.current.currentTime, 0.05)
      }
    }
  }, [volumeLevel, stereoPan, isAudioEnabled])

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop() } catch {}
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-[#080a0f] text-white rounded-2xl border border-white/10 font-sans">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ember/20 border border-ember/40 flex items-center justify-center text-ember-bright shadow-[0_0_15px_rgba(160,42,34,0.3)]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                GEOSPATIAL AUDIO GRID // ACTIVE
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              ProxiSpeak Proximity Node Attenuation Engine
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
              isAudioEnabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-white/5 border-white/10 text-ash hover:text-white hover:bg-white/10'
            }`}
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isAudioEnabled ? 'AUDIO SYNTH: ON' : 'ENABLE AUDIO SYNTH'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Canvas Map Viewport */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const scaleX = WIDTH / rect.width
              const scaleY = HEIGHT / rect.height
              const clickX = (e.clientX - rect.left) * scaleX
              const clickY = (e.clientY - rect.top) * scaleY
              setPosition({ x: Math.round(clickX), y: Math.round(clickY) })
            }}
            className="relative w-full aspect-[4/3] max-h-[460px] rounded-xl overflow-hidden border-2 border-white/20 bg-[#090d16] cursor-crosshair select-none shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Audio Node Zones */}
            {PEER_NODES.map((node) => {
              const isNearby = nearestNode?.id === node.id && volumeLevel > 0
              return (
                <div
                  key={node.id}
                  style={{
                    left: `${(node.x / WIDTH) * 100}%`,
                    top: `${(node.y / HEIGHT) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute flex flex-col items-center pointer-events-none"
                >
                  {/* Proximity Influence Radius Circle */}
                  <div
                    style={{
                      width: `${(node.radius * 2 * 100) / WIDTH}cqw`,
                      height: `${(node.radius * 2 * 100) / WIDTH}cqw`,
                      borderColor: node.color,
                      backgroundColor: `${node.color}10`
                    }}
                    className={`rounded-full border border-dashed transition-all duration-300 ${
                      isNearby ? 'border-solid animate-pulse shadow-[0_0_25px_currentColor]' : 'opacity-40'
                    }`}
                  />

                  {/* Core Node Beacon */}
                  <div
                    style={{ backgroundColor: node.color }}
                    className="absolute w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-black shadow-lg"
                  >
                    <Radio className="w-3.5 h-3.5 text-black" />
                  </div>

                  {/* Node Label */}
                  <div className="absolute top-7 px-2 py-0.5 rounded bg-black/80 border border-white/15 text-[9px] font-mono text-zinc-300 whitespace-nowrap shadow-md">
                    {node.name}
                  </div>
                </div>
              )
            })}

            {/* User Avatar */}
            <div
              style={{
                left: `${(position.x / WIDTH) * 100}%`,
                top: `${(position.y / HEIGHT) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute pointer-events-none transition-all duration-75 flex flex-col items-center"
            >
              {/* Outer Pulse Wave */}
              <div className="absolute -inset-2 rounded-full border border-ember/60 animate-ping" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ember to-amber-400 border-2 border-white shadow-[0_0_20px_#fc6b2f] flex items-center justify-center text-[10px] font-black text-black">
                YOU
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-black/90 border border-ember/40 text-[8px] font-mono font-bold text-ember-bright uppercase">
                ({position.x}, {position.y})
              </div>
            </div>

            {/* Instruction Overlay */}
            <div className="absolute bottom-2.5 left-2.5 px-3 py-1.5 rounded-lg bg-black/85 border border-white/10 text-[10px] font-mono text-zinc-400 pointer-events-none">
              Use <strong className="text-white">WASD / Arrow Keys</strong> or <strong className="text-white">Click anywhere</strong> to move avatar
            </div>
          </div>

          {/* Mobile Directional Keypad */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-3">
            <button onClick={() => moveAvatar(0, -20)} className="p-2.5 rounded-lg bg-white/10 border border-white/15 active:bg-ember">
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
            <div className="flex gap-2">
              <button onClick={() => moveAvatar(-20, 0)} className="p-2.5 rounded-lg bg-white/10 border border-white/15 active:bg-ember">
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
              <button onClick={() => moveAvatar(0, 20)} className="p-2.5 rounded-lg bg-white/10 border border-white/15 active:bg-ember">
                <ArrowDown className="w-4 h-4 text-white" />
              </button>
              <button onClick={() => moveAvatar(20, 0)} className="p-2.5 rounded-lg bg-white/10 border border-white/15 active:bg-ember">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry & Attenuation HUD */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase">Euclidean Distance Math</span>
              <Activity className="w-4 h-4 text-ember animate-pulse" />
            </div>

            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Target Sound Source</div>
              <div className="text-base font-bold text-white mt-0.5">
                {nearestNode?.name || 'Searching...'}
              </div>
              <div className="text-xs font-mono text-zinc-400">
                Status: <span className="text-emerald-400">{nearestNode?.status}</span>
              </div>
            </div>

            {/* Distance Metric */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">Distance ($d$)</span>
                <span className="text-lg font-black text-white">{nearestDistance} px</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">Stereo Pan</span>
                <span className="text-lg font-black text-amber-400">
                  {stereoPan > 0 ? `+${stereoPan} R` : stereoPan < 0 ? `${stereoPan} L` : 'Center'}
                </span>
              </div>
            </div>

            {/* Volume Attenuation Gauge */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Proximity Volume:</span>
                <span className={`font-bold ${volumeLevel > 0 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  {volumeLevel > 0 ? `${volumeLevel}% (In Range)` : '0% (Muted / Out of Range)'}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/10 p-0.5">
                <div
                  style={{ width: `${volumeLevel}%` }}
                  className={`h-full rounded-full transition-all duration-150 ${
                    volumeLevel > 60
                      ? 'bg-gradient-to-r from-emerald-500 to-amber-400 shadow-[0_0_12px_#34d399]'
                      : 'bg-gradient-to-r from-sky-500 to-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* Formula display */}
            <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] text-zinc-400 space-y-1">
              <div className="text-amber-400 font-bold">// Inverse Square Formula</div>
              <div>Volume = (1 - d / R)^1.5</div>
              <div className="text-zinc-500">Zero audio bleed outside threshold radius R.</div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[9px] text-zinc-400 uppercase block">WebSockets Ping</span>
              <span className="text-sm font-bold text-emerald-400">18 ms</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[9px] text-zinc-400 uppercase block">Network Peers</span>
              <span className="text-sm font-bold text-white">{activePeersCount} Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProxiSpeakApp
