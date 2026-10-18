import React, { useState, useMemo, useCallback } from 'react'
import { Volume2, VolumeX, Eye, Sparkles } from 'lucide-react'

export interface KeySkill {
  id: string
  label: string
  subLabel?: string
  name: string
  category: string
  color: {
    base: string
    light: string
    dark: string
    sideDark: string
    sideDarker: string
    sideDeep: string
    glow: string
    text: string
  }
  description: string
  iconType: string
}

export const KEYBOARD_SKILLS: KeySkill[] = [
  // --- ROW 1: Programming Languages ---
  {
    id: 'ts',
    label: 'TS',
    subLabel: '5.x',
    name: 'TypeScript',
    category: 'Language',
    color: {
      base: '#007acc',
      light: '#3192e0',
      dark: '#0062a3',
      sideDark: '#004f85',
      sideDarker: '#003d66',
      sideDeep: '#002b47',
      glow: 'rgba(0, 122, 204, 0.75)',
      text: '#ffffff'
    },
    description: 'Strict static type safety, generics, and enterprise architecture.',
    iconType: 'ts'
  },
  {
    id: 'js',
    label: 'JS',
    subLabel: 'ES24',
    name: 'JavaScript',
    category: 'Language',
    color: {
      base: '#f7df1e',
      light: '#fae852',
      dark: '#e0c70f',
      sideDark: '#b8a204',
      sideDarker: '#8f7e02',
      sideDeep: '#665900',
      glow: 'rgba(247, 223, 30, 0.7)',
      text: '#111111'
    },
    description: 'Modern ECMAScript, event loop, asynchronous promises, and V8 runtime.',
    iconType: 'js'
  },
  {
    id: 'py',
    label: 'PY',
    subLabel: '3.12',
    name: 'Python 3',
    category: 'Language',
    color: {
      base: '#2b5b84',
      light: '#3c79ad',
      dark: '#1e415e',
      sideDark: '#17334a',
      sideDarker: '#102436',
      sideDeep: '#0a1621',
      glow: 'rgba(55, 118, 171, 0.75)',
      text: '#ffd43b'
    },
    description: 'Multimodal AI, semantic vector search backends, and data science.',
    iconType: 'py'
  },
  {
    id: 'cpp',
    label: 'C++',
    subLabel: 'C++20',
    name: 'Modern C++',
    category: 'Language',
    color: {
      base: '#00599c',
      light: '#1f7ec7',
      dark: '#004275',
      sideDark: '#00335a',
      sideDarker: '#002542',
      sideDeep: '#001729',
      glow: 'rgba(0, 89, 156, 0.75)',
      text: '#ffffff'
    },
    description: 'Low-latency algorithms, deterministic memory management, and firmware.',
    iconType: 'cpp'
  },
  {
    id: 'c',
    label: 'C',
    subLabel: 'POSIX',
    name: 'C Language',
    category: 'Language',
    color: {
      base: '#4a5568',
      light: '#718096',
      dark: '#2d3748',
      sideDark: '#232b38',
      sideDarker: '#1a202c',
      sideDeep: '#10141b',
      glow: 'rgba(160, 174, 192, 0.65)',
      text: '#e2e8f0'
    },
    description: 'Bare-metal register manipulation, microcontrollers, and hardware interrupts.',
    iconType: 'c'
  },
  {
    id: 'java',
    label: 'JAVA',
    subLabel: '21',
    name: 'Java LTS',
    category: 'Language',
    color: {
      base: '#e76f51',
      light: '#f4a261',
      dark: '#c75336',
      sideDark: '#9f3f27',
      sideDarker: '#7a2f1c',
      sideDeep: '#541f11',
      glow: 'rgba(231, 111, 81, 0.7)',
      text: '#ffffff'
    },
    description: 'Object-oriented programming, JVM memory architecture, and concurrency.',
    iconType: 'java'
  },
  {
    id: 'html5',
    label: '5',
    subLabel: 'CSS3',
    name: 'HTML5 & CSS3',
    category: 'Web',
    color: {
      base: '#e34f26',
      light: '#f0653f',
      dark: '#ba3c18',
      sideDark: '#942f11',
      sideDarker: '#73230b',
      sideDeep: '#4d1606',
      glow: 'rgba(227, 79, 38, 0.75)',
      text: '#ffffff'
    },
    description: 'Semantic DOM architecture, 3D matrix transforms, and responsive design.',
    iconType: 'html5'
  },

  // --- ROW 2: Full Stack Web Engineering ---
  {
    id: 'next',
    label: 'N',
    subLabel: '15',
    name: 'Next.js 15',
    category: 'Framework',
    color: {
      base: '#18181b',
      light: '#27272a',
      dark: '#09090b',
      sideDark: '#050507',
      sideDarker: '#020203',
      sideDeep: '#000000',
      glow: 'rgba(255, 255, 255, 0.5)',
      text: '#fafafa'
    },
    description: 'React Server Components (RSC), App Router, streaming SSR, and Edge APIs.',
    iconType: 'next'
  },
  {
    id: 'tailwind',
    label: '≈',
    subLabel: 'v4',
    name: 'Tailwind CSS 4',
    category: 'Framework',
    color: {
      base: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      sideDark: '#0e7490',
      sideDarker: '#155e75',
      sideDeep: '#164e63',
      glow: 'rgba(6, 182, 212, 0.75)',
      text: '#ffffff'
    },
    description: 'Zero-runtime utility styling, custom design tokens, and fluid typography.',
    iconType: 'tailwind'
  },
  {
    id: 'node',
    label: '⬢',
    subLabel: 'Node',
    name: 'Node.js',
    category: 'Runtime',
    color: {
      base: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
      sideDark: '#15803d',
      sideDarker: '#166534',
      sideDeep: '#14532d',
      glow: 'rgba(34, 197, 94, 0.75)',
      text: '#ffffff'
    },
    description: 'Event-driven high-concurrency backend services, streams, and worker threads.',
    iconType: 'node'
  },
  {
    id: 'express',
    label: 'ex',
    subLabel: 'API',
    name: 'Express.js',
    category: 'Framework',
    color: {
      base: '#3f3f46',
      light: '#52525b',
      dark: '#27272a',
      sideDark: '#18181b',
      sideDarker: '#111113',
      sideDeep: '#09090b',
      glow: 'rgba(161, 161, 170, 0.65)',
      text: '#ffffff'
    },
    description: 'RESTful API routing, JWT authentication, and security middleware pipelines.',
    iconType: 'express'
  },
  {
    id: 'react',
    label: '⚛',
    subLabel: '19',
    name: 'React 19',
    category: 'Framework',
    color: {
      base: '#00b4d8',
      light: '#48cae4',
      dark: '#0096c7',
      sideDark: '#0077b6',
      sideDarker: '#023e8a',
      sideDeep: '#03045e',
      glow: 'rgba(0, 180, 216, 0.85)',
      text: '#ffffff'
    },
    description: 'Concurrent hooks, state compiler, optimistic UI, and virtual DOM reconciliation.',
    iconType: 'react'
  },
  {
    id: 'postgres',
    label: 'PG',
    subLabel: 'SQL',
    name: 'PostgreSQL',
    category: 'Database',
    color: {
      base: '#336791',
      light: '#4b7ea8',
      dark: '#265073',
      sideDark: '#1c3d59',
      sideDarker: '#132c40',
      sideDeep: '#0a1a26',
      glow: 'rgba(51, 103, 145, 0.75)',
      text: '#ffffff'
    },
    description: 'Relational ACID schema design, B-Tree indexing, and connection pooling.',
    iconType: 'postgres'
  },
  {
    id: 'mongo',
    label: '🍃',
    subLabel: 'NoSQL',
    name: 'MongoDB',
    category: 'Database',
    color: {
      base: '#10b981',
      light: '#34d399',
      dark: '#059669',
      sideDark: '#047857',
      sideDarker: '#065f46',
      sideDeep: '#064e3b',
      glow: 'rgba(16, 185, 129, 0.75)',
      text: '#ffffff'
    },
    description: 'Document modeling, aggregation pipelines, and high-volume collections.',
    iconType: 'mongo'
  },

  // --- ROW 3: AI, Cloud & DevOps ---
  {
    id: 'git',
    label: '⑂',
    subLabel: 'Git',
    name: 'Git VCS',
    category: 'DevOps',
    color: {
      base: '#f05032',
      light: '#f5745d',
      dark: '#c73b22',
      sideDark: '#9f2d18',
      sideDarker: '#77200f',
      sideDeep: '#4e1307',
      glow: 'rgba(240, 80, 50, 0.75)',
      text: '#ffffff'
    },
    description: 'Branching strategies, interactive rebasing, bisecting, and commit hygiene.',
    iconType: 'git'
  },
  {
    id: 'github',
    label: '🐙',
    subLabel: 'CI/CD',
    name: 'GitHub Actions',
    category: 'DevOps',
    color: {
      base: '#24292e',
      light: '#3f4448',
      dark: '#1b1f23',
      sideDark: '#14171a',
      sideDarker: '#0d0f11',
      sideDeep: '#050607',
      glow: 'rgba(255, 255, 255, 0.45)',
      text: '#ffffff'
    },
    description: 'Automated CI/CD test workflows, linting matrices, and container deployment.',
    iconType: 'github'
  },
  {
    id: 'gemini',
    label: '✦',
    subLabel: 'Pro',
    name: 'Gemini 1.5 Pro',
    category: 'AI & Cloud',
    color: {
      base: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      sideDark: '#4338ca',
      sideDarker: '#3730a3',
      sideDeep: '#312e81',
      glow: 'rgba(99, 102, 241, 0.85)',
      text: '#ffffff'
    },
    description: 'Long-context multimodal reasoning (2M tokens), vision analysis, and tool calling.',
    iconType: 'gemini'
  },
  {
    id: 'rag',
    label: 'RAG',
    subLabel: 'Embed',
    name: 'Multimodal RAG',
    category: 'AI & Cloud',
    color: {
      base: '#fc6b2f',
      light: '#fd8c5a',
      dark: '#d94d14',
      sideDark: '#ad390c',
      sideDarker: '#822706',
      sideDeep: '#571702',
      glow: 'rgba(252, 107, 47, 0.85)',
      text: '#ffffff'
    },
    description: 'High-dimensional embeddings, ChromaDB vector search, and grounded citations.',
    iconType: 'rag'
  },
  {
    id: 'vertex',
    label: '☁',
    subLabel: 'GCP',
    name: 'Google Cloud & Vertex AI',
    category: 'Cloud',
    color: {
      base: '#4285f4',
      light: '#6ba3f7',
      dark: '#1a73e8',
      sideDark: '#1557b0',
      sideDarker: '#103e7d',
      sideDeep: '#0b264d',
      glow: 'rgba(66, 133, 244, 0.75)',
      text: '#ffffff'
    },
    description: 'Managed model endpoints, serverless functions, and cloud infrastructure.',
    iconType: 'vertex'
  },
  {
    id: 'docker',
    label: '🐳',
    subLabel: 'Box',
    name: 'Docker Containers',
    category: 'DevOps',
    color: {
      base: '#0284c7',
      light: '#38bdf8',
      dark: '#0369a1',
      sideDark: '#075985',
      sideDarker: '#0c4a6e',
      sideDeep: '#082f49',
      glow: 'rgba(2, 132, 199, 0.75)',
      text: '#ffffff'
    },
    description: 'Multi-stage lean Dockerfiles, container isolation, and Compose network bridges.',
    iconType: 'docker'
  },
  {
    id: 'linux',
    label: '🐧',
    subLabel: 'POSIX',
    name: 'Linux System Administration',
    category: 'Systems',
    color: {
      base: '#1c1917',
      light: '#292524',
      dark: '#0c0a09',
      sideDark: '#070605',
      sideDarker: '#040303',
      sideDeep: '#000000',
      glow: 'rgba(250, 204, 21, 0.6)',
      text: '#facc15'
    },
    description: 'Systemd daemons, SSH tunnels, shell automation, and POSIX permissions.',
    iconType: 'linux'
  },

  // --- ROW 4: Aerospace, Telemetry & Systems ---
  {
    id: 'cansat',
    label: '🛰',
    subLabel: '1U',
    name: '1U CanSat Payload',
    category: 'Aerospace',
    color: {
      base: '#eab308',
      light: '#fde047',
      dark: '#ca8a04',
      sideDark: '#a16207',
      sideDarker: '#78350f',
      sideDeep: '#451a03',
      glow: 'rgba(234, 179, 8, 0.8)',
      text: '#18181b'
    },
    description: 'Miniature space payload architecture, barometric calibration, and descent telemetry.',
    iconType: 'cansat'
  },
  {
    id: 'uhf',
    label: '📡',
    subLabel: '433M',
    name: '433 MHz RF Telemetry',
    category: 'Aerospace',
    color: {
      base: '#0284c7',
      light: '#38bdf8',
      dark: '#0369a1',
      sideDark: '#075985',
      sideDarker: '#0c4a6e',
      sideDeep: '#082f49',
      glow: 'rgba(2, 132, 199, 0.75)',
      text: '#ffffff'
    },
    description: 'FSK radio frequency packet decoding, RF link budgets, and live telemetry.',
    iconType: 'uhf'
  },
  {
    id: 'esp32',
    label: '⚡',
    subLabel: 'MCU',
    name: 'ESP32 & Embedded C++',
    category: 'Embedded',
    color: {
      base: '#e11d48',
      light: '#fb7185',
      dark: '#be123c',
      sideDark: '#9f1239',
      sideDarker: '#881337',
      sideDeep: '#4c0519',
      glow: 'rgba(225, 29, 72, 0.75)',
      text: '#ffffff'
    },
    description: 'I2C/SPI sensor fusion, hardware timers, interrupts, and serial UART streams.',
    iconType: 'esp32'
  },
  {
    id: 'sec',
    label: '🛡',
    subLabel: 'VLAN',
    name: 'Network Security & VLANs',
    category: 'Security',
    color: {
      base: '#0284c7',
      light: '#0ea5e9',
      dark: '#0369a1',
      sideDark: '#075985',
      sideDarker: '#0c4a6e',
      sideDeep: '#082f49',
      glow: 'rgba(14, 165, 233, 0.75)',
      text: '#ffffff'
    },
    description: 'VLAN network segregation, firewall packet inspection, and civil aviation IT compliance.',
    iconType: 'sec'
  },
  {
    id: 'wireshark',
    label: '🦈',
    subLabel: 'PCAP',
    name: 'Wireshark Packet Analysis',
    category: 'Security',
    color: {
      base: '#1d4ed8',
      light: '#3b82f6',
      dark: '#1e40af',
      sideDark: '#1e3a8a',
      sideDarker: '#172554',
      sideDeep: '#0f172a',
      glow: 'rgba(29, 78, 216, 0.75)',
      text: '#ffffff'
    },
    description: 'Deep TCP/IP packet capture, frame dissection, and latency diagnostics.',
    iconType: 'wireshark'
  },
  {
    id: 'dsa',
    label: '∿',
    subLabel: 'BigO',
    name: 'Data Structures & Algorithms',
    category: 'Core CS',
    color: {
      base: '#10b981',
      light: '#34d399',
      dark: '#059669',
      sideDark: '#047857',
      sideDarker: '#065f46',
      sideDeep: '#064e3b',
      glow: 'rgba(160, 174, 192, 0.75)',
      text: '#ffffff'
    },
    description: 'Asymptotic complexity optimization, trees, graphs, and dynamic programming.',
    iconType: 'dsa'
  },
  {
    id: 'vite',
    label: '⚡V',
    subLabel: 'HMR',
    name: 'Vite & Tooling',
    category: 'Tooling',
    color: {
      base: '#8b5cf6',
      light: '#a78bfa',
      dark: '#6d28d9',
      sideDark: '#5b21b6',
      sideDarker: '#4c1d95',
      sideDeep: '#2e1065',
      glow: 'rgba(139, 92, 246, 0.8)',
      text: '#ffffff'
    },
    description: 'ESM hot module replacement (HMR), Rollup tree shaking, and fast builds.',
    iconType: 'vite'
  }
]

// --- Realistic Mechanical Audio Synthesizer ---
class RealisticAudioEngine {
  private ctx: AudioContext | null = null

  private getCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  playDownstroke(pitch: number = 1.0) {
    try {
      const ctx = this.getCtx()
      if (!ctx) return

      // Downstroke mechanical bottom-out thock
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(160 * pitch, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(45 * pitch, ctx.currentTime + 0.07)

      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.075)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.08)

      // Snap burst
      const bufferSize = Math.floor(ctx.sampleRate * 0.015)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1400 * pitch, ctx.currentTime)
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.09, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)
      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start()
      noise.stop(ctx.currentTime + 0.025)
    } catch {}
  }

  playUpstroke(pitch: number = 1.0) {
    try {
      const ctx = this.getCtx()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(540 * pitch, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(780 * pitch, ctx.currentTime + 0.025)
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.035)
    } catch {}
  }

  playHover(pitch: number = 1.0) {
    try {
      const ctx = this.getCtx()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const freq = 360 * pitch
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + 0.025)
      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.035)
    } catch {}
  }
}

const audioEngine = new RealisticAudioEngine()

export const InteractiveSkillsKeyboard: React.FC = () => {
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>(null)
  const [activeKeyId, setActiveKeyId] = useState<string>('ts')
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [view3D, setView3D] = useState<boolean>(true)

  // Currently inspected key
  const inspectedKey = useMemo(() => {
    const targetId = hoveredKeyId || activeKeyId
    return KEYBOARD_SKILLS.find((k) => k.id === targetId) || KEYBOARD_SKILLS[0]
  }, [hoveredKeyId, activeKeyId])

  // Key Hover Handler
  const handleKeyHover = useCallback(
    (key: KeySkill, idx: number) => {
      setHoveredKeyId(key.id)
      if (soundEnabled) {
        const pitch = 0.88 + (idx % 7) * 0.04
        audioEngine.playHover(pitch)
      }
    },
    [soundEnabled]
  )

  // Key Click Handler with Real Spring Plunge & Return
  const handleKeyClick = useCallback(
    (key: KeySkill, idx: number) => {
      setActiveKeyId(key.id)
      setHoveredKeyId(key.id)
      setPressedKeyId(key.id)

      const pitch = 0.88 + (idx % 7) * 0.05
      if (soundEnabled) audioEngine.playDownstroke(pitch)

      setTimeout(() => {
        setPressedKeyId(null)
        if (soundEnabled) audioEngine.playUpstroke(pitch)
      }, 125)
    },
    [soundEnabled]
  )

  return (
    <div className="w-full mt-14 sm:mt-20 select-none">
      {/* Header Eyebrow & Themed Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
            <span className="text-ember text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Tactile Stack // Interactive Hardware
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Interactive Tech Stack</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-ash border border-white/10 uppercase tracking-widest hidden sm:inline-block">
              28 Switches
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-ash mt-1 max-w-xl">
            A sculpted 3D mechanical macropad showcasing core programming languages and engineering tools. Hover or click any switch.
          </p>
        </div>

        {/* Global Controls: Sound Toggle & Perspective View Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
              soundEnabled
                ? 'bg-ember/15 border-ember/40 text-ember hover:bg-ember/25'
                : 'bg-white/5 border-white/10 text-ash hover:text-white'
            }`}
            title={soundEnabled ? 'Mute Mechanical Switch Audio' : 'Enable Mechanical Switch Audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Perspective View Toggle */}
          <button
            type="button"
            onClick={() => setView3D((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
              view3D
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25'
                : 'bg-white/5 border-white/10 text-ash hover:text-white'
            }`}
            title="Toggle between 3D Isometric View and Flat Studio View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[11px]">{view3D ? '3D ISOMETRIC' : '2D STUDIO'}</span>
          </button>
        </div>
      </div>

      {/* Clean, Realistic Minimal Legend (No Cheesy RPG Stats or Confusing Percentages) */}
      <div className="mb-6 p-4 rounded-xl bg-[#0c0d12] border border-white/10 relative overflow-hidden shadow-xl">
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${inspectedKey.color.base}, transparent)`,
            boxShadow: `0 0 16px ${inspectedKey.color.glow}`
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Color Accent Indicator */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm shrink-0 shadow-md border border-white/20 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${inspectedKey.color.light}, ${inspectedKey.color.base})`,
                color: inspectedKey.color.text,
                boxShadow: `0 2px 10px ${inspectedKey.color.glow}`
              }}
            >
              {inspectedKey.label}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-base tracking-tight">
                  {inspectedKey.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/5 text-cloud border border-white/10">
                  {inspectedKey.category}
                </span>
              </div>
              <p className="text-xs text-ash mt-0.5 font-normal leading-relaxed">
                {inspectedKey.description}
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ash/60 shrink-0 self-end sm:self-auto">
            <span>SWITCH // CHERRY MX</span>
          </div>
        </div>
      </div>

      {/* 3D Hardware Keyboard Stage - Realistic Mechanical Macropad */}
      <div
        className="w-full flex items-center justify-center py-6 sm:py-10 md:py-12 overflow-visible"
        style={{
          perspective: view3D ? '1300px' : 'none',
          perspectiveOrigin: '50% 35%'
        }}
      >
        {/* Chassis Body */}
        <div
          className="relative transition-all duration-300 ease-out shrink-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: view3D
              ? 'rotateX(52deg) rotateZ(-26deg) rotateY(6deg)'
              : 'none'
          }}
        >
          {/* Main Mechanical Keyboard Case (Chassis) */}
          <div
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-white/15 transition-all duration-300"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #181922 0%, #101118 60%, #08090d 100%)',
              boxShadow: view3D
                ? `
                  0 2px 0 #282a3a,
                  0 4px 0 #1e202d,
                  0 8px 0 #14151e,
                  0 14px 0 #0d0e14,
                  0 20px 0 #07070a,
                  0 30px 45px rgba(0, 0, 0, 0.85),
                  0 0 60px rgba(252, 107, 47, 0.10)
                `
                : '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
          >
            {/* CNC Corner Screws */}
            <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>
            <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#52525b] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1 h-[0.5px] bg-[#18181b]" />
            </div>

            {/* Recessed Switch Plate */}
            <div
              className="relative p-2.5 sm:p-3.5 rounded-xl border border-black/80 shadow-inner"
              style={{
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(180deg, #090a0f 0%, #0d0e14 100%)',
                boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8)'
              }}
            >
              {/* Keyboard Grid: 4 rows of 7 keys */}
              <div 
                className="grid grid-cols-7 gap-2.5 sm:gap-3 md:gap-3.5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {KEYBOARD_SKILLS.map((skill, idx) => {
                  const isHovered = hoveredKeyId === skill.id
                  const isSelected = activeKeyId === skill.id
                  const isPressed = pressedKeyId === skill.id

                  return (
                    <div
                      key={skill.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${skill.name} keycap`}
                      className="relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 p-0 border-0 bg-transparent cursor-pointer focus:outline-none"
                      style={{
                        transformStyle: 'preserve-3d',
                        touchAction: 'manipulation'
                      }}
                      onPointerEnter={() => handleKeyHover(skill, idx)}
                      onPointerLeave={() => setHoveredKeyId(null)}
                      onPointerDown={() => handleKeyClick(skill, idx)}
                      onClick={() => handleKeyClick(skill, idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleKeyClick(skill, idx)
                        }
                      }}
                    >
                      {/* 1. Underlying Switch Bed & Red Cross Stem */}
                      <div
                        className="absolute inset-1 rounded-md bg-[#07080c] border border-white/5 flex items-center justify-center pointer-events-none"
                        style={{ transform: 'translateZ(0px)' }}
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] bg-[#991b1b] border border-[#7f1d1d] flex items-center justify-center shadow-inner">
                          {/* Cross stem */}
                          <div 
                            className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 transition-transform duration-100 ease-out"
                            style={{
                              transform: isPressed ? 'scale(0.7) translateY(1px)' : isHovered ? 'scale(1.2) translateY(-1px)' : 'scale(1)'
                            }}
                          >
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-1 bg-[#ef4444] rounded-[0.5px]" />
                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-[#ef4444] rounded-[0.5px]" />
                          </div>
                        </div>

                        {/* Underglow LED projection */}
                        <div
                          className="absolute inset-0 rounded-md transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${skill.color.glow} 0%, transparent 75%)`,
                            opacity: isHovered || isSelected ? 0.95 : 0.08
                          }}
                        />
                      </div>

                      {/* 2. Sculpted High-Profile 3D Keycap Body */}
                      <div
                        className="absolute inset-0 rounded-[7px] sm:rounded-[9px] transition-all duration-150 transform-gpu flex flex-col items-center justify-center pointer-events-none"
                        style={{
                          transformStyle: 'preserve-3d',
                          // Dynamic Spring Plunge vs Elevation
                          transform: view3D
                            ? isPressed
                              ? 'translateZ(2px) translateY(3px) scale(0.96)'
                              : isHovered
                              ? 'translateZ(38px) translateY(-14px) scale(1.08)'
                              : isSelected
                              ? 'translateZ(24px) translateY(-8px) scale(1.04)'
                              : 'translateZ(8px) translateY(0px) scale(1.0)'
                            : isPressed
                            ? 'translateY(3px) scale(0.96)'
                            : isHovered
                            ? 'translateY(-10px) scale(1.06)'
                            : isSelected
                            ? 'translateY(-5px) scale(1.03)'
                            : 'translateY(0px)',
                          background: `linear-gradient(180deg, ${skill.color.light} 0%, ${skill.color.base} 55%, ${skill.color.dark} 100%)`,
                          boxShadow: isPressed
                            ? `
                              0 1px 0 ${skill.color.sideDark},
                              0 2px 4px rgba(0, 0, 0, 0.4)
                            `
                            : isHovered
                            ? `
                              0 2px 0 ${skill.color.sideDark},
                              0 5px 0 ${skill.color.sideDarker},
                              0 10px 0 ${skill.color.sideDeep},
                              0 18px 24px rgba(0, 0, 0, 0.75),
                              0 0 28px ${skill.color.glow}
                            `
                            : isSelected
                            ? `
                              0 2px 0 ${skill.color.sideDark},
                              0 4px 0 ${skill.color.sideDarker},
                              0 7px 0 ${skill.color.sideDeep},
                              0 12px 16px rgba(0, 0, 0, 0.65),
                              0 0 18px ${skill.color.glow}
                            `
                            : `
                              0 1.5px 0 ${skill.color.sideDark},
                              0 3px 0 ${skill.color.sideDarker},
                              0 5px 0 ${skill.color.sideDeep},
                              0 8px 10px rgba(0, 0, 0, 0.5)
                            `,
                          zIndex: isHovered ? 50 : isSelected ? 30 : 10
                        }}
                      >
                        {/* Concave Dish with Specular Sheen */}
                        <div
                          className="absolute inset-[2.5px] sm:inset-[3.5px] rounded-[5px] sm:rounded-[7px] flex flex-col items-center justify-center p-0.5 overflow-hidden pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 50% 25%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 65%), linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.22) 100%)`,
                            boxShadow: `
                              inset 0 1.5px 2px rgba(255,255,255,0.4),
                              inset 0 -1.5px 2px rgba(0,0,0,0.4)
                            `
                          }}
                        >
                          {/* Monogram / Icon Symbol */}
                          <div
                            className="font-black leading-none tracking-tight flex items-center justify-center text-center select-none"
                            style={{
                              color: skill.color.text,
                              fontSize:
                                skill.label.length >= 4
                                  ? '9px'
                                  : skill.label.length === 3
                                  ? '11px'
                                  : skill.label.length === 2
                                  ? '14px'
                                  : '17px',
                              textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                            }}
                          >
                            {skill.label}
                          </div>

                          {/* Subtle Sub-label */}
                          {skill.subLabel && (
                            <span
                              className="text-[7px] sm:text-[8px] font-mono font-bold leading-none tracking-tight mt-0.5 opacity-85"
                              style={{ color: skill.color.text }}
                            >
                              {skill.subLabel}
                            </span>
                          )}
                        </div>

                        {/* Top specular highlight rim */}
                        <div className="absolute top-1 inset-x-2 h-[1px] bg-white/40 rounded-full pointer-events-none" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Keyboard Lip / Custom Callsign */}
            <div className="mt-3.5 sm:mt-4 flex items-center justify-between px-1 text-[10px] font-mono text-ash/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
                <span className="uppercase tracking-widest text-[9px] text-ash/80">
                  TACTILE STACK // 28 SWITCHES
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-ember font-bold text-[9px]">
                  DEV JANGID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Interactive Legend Hint */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-ash/70 text-center">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ember" />
          <span>Interactive 3D elevation active on hover and click</span>
        </span>
      </div>
    </div>
  )
}

export default InteractiveSkillsKeyboard
