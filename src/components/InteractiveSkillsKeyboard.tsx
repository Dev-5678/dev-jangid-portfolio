import React, { useState, useRef, useMemo, useCallback } from 'react'
import { Volume2, VolumeX, Eye, Sparkles, Terminal, Layers } from 'lucide-react'

export interface KeySkill {
  id: string
  label: string
  subLabel?: string
  name: string
  category: 'LANGUAGES' | 'FULL_STACK' | 'AI_CLOUD' | 'CORE_CS' | 'TELEMETRY' | 'DEVOPS'
  categoryLabel: string
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
  proficiency: string
  experience: string
  highlight: string
  iconType:
    | 'ts'
    | 'js'
    | 'py'
    | 'cpp'
    | 'c'
    | 'java'
    | 'html5'
    | 'next'
    | 'tailwind'
    | 'node'
    | 'express'
    | 'react'
    | 'postgres'
    | 'mongo'
    | 'git'
    | 'github'
    | 'gemini'
    | 'rag'
    | 'vertex'
    | 'docker'
    | 'linux'
    | 'cansat'
    | 'uhf'
    | 'esp32'
    | 'sec'
    | 'wireshark'
    | 'dsa'
    | 'vite'
}

// 28 Mechanical Switches across 4 rows of 7 keys
export const KEYBOARD_SKILLS: KeySkill[] = [
  // --- ROW 1: Programming Languages ---
  {
    id: 'ts',
    label: 'TS',
    subLabel: '5.x',
    name: 'TypeScript',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
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
    proficiency: '98% // Master',
    experience: 'Production & Full-Stack',
    highlight: 'Strict compile-time type safety, interfaces, generic constraints, zero runtime type errors.',
    iconType: 'ts'
  },
  {
    id: 'js',
    label: 'JS',
    subLabel: 'ES24',
    name: 'JavaScript',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
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
    proficiency: '96% // Expert',
    experience: 'Asynchronous Core',
    highlight: 'Event loop mastery, non-blocking I/O, V8 microtask scheduling, closures & prototypes.',
    iconType: 'js'
  },
  {
    id: 'py',
    label: 'PY',
    subLabel: '3.12',
    name: 'Python 3',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    color: {
      base: '#3776ab',
      light: '#4d8fc4',
      dark: '#275780',
      sideDark: '#1e4463',
      sideDarker: '#16334a',
      sideDeep: '#0d2030',
      glow: 'rgba(55, 118, 171, 0.75)',
      text: '#ffd43b'
    },
    proficiency: '95% // Expert',
    experience: 'AI & Data Pipelines',
    highlight: 'Multimodal RAG backends, NumPy vector calculations, Streamlit engines, high-speed scripting.',
    iconType: 'py'
  },
  {
    id: 'cpp',
    label: 'C++',
    subLabel: 'C++20',
    name: 'Modern C++',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
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
    proficiency: '90% // Advanced',
    experience: 'Low-Latency & Firmware',
    highlight: 'Deterministic manual memory management, RAII, STL algorithms, embedded aerospace controllers.',
    iconType: 'cpp'
  },
  {
    id: 'c',
    label: 'C',
    subLabel: 'POSIX',
    name: 'C Language',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
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
    proficiency: '88% // Systems Ready',
    experience: 'Bare-Metal Systems',
    highlight: 'Direct memory pointers, register-level manipulation, hardware interrupts, bitwise packet masking.',
    iconType: 'c'
  },
  {
    id: 'java',
    label: 'JAVA',
    subLabel: '21',
    name: 'Java LTS',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
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
    proficiency: '86% // Proficient',
    experience: 'OOP & Algorithms',
    highlight: 'Object-oriented class structures, JVM garbage collection internals, threading concurrency.',
    iconType: 'java'
  },
  {
    id: 'html5',
    label: '5',
    subLabel: 'CSS3',
    name: 'HTML5 & CSS3',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
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
    proficiency: '98% // Expert',
    experience: 'Semantic Web & 3D UI',
    highlight: 'Semantic DOM accessibility, CSS 3D matrix transforms, responsive fluid layouts, OKLCH color science.',
    iconType: 'html5'
  },

  // --- ROW 2: Full Stack Web Engineering ---
  {
    id: 'next',
    label: 'N',
    subLabel: '15',
    name: 'Next.js 15',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '95% // Production Master',
    experience: 'App Router & Edge',
    highlight: 'React Server Components (RSC), dynamic streaming SSR, incremental static regeneration (ISR).',
    iconType: 'next'
  },
  {
    id: 'tailwind',
    label: '≈',
    subLabel: 'v4',
    name: 'Tailwind CSS 4',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '98% // Expert',
    experience: 'Modern UI Architecture',
    highlight: 'Zero-runtime utility styling, custom theme tokens, glassmorphism filters, sub-millisecond Vite build time.',
    iconType: 'tailwind'
  },
  {
    id: 'node',
    label: '⬢',
    subLabel: 'Node',
    name: 'Node.js',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '94% // Expert',
    experience: 'High-Concurrency Runtime',
    highlight: 'Asynchronous event stream processing, microservice orchestrations, worker threads, native buffer I/O.',
    iconType: 'node'
  },
  {
    id: 'express',
    label: 'ex',
    subLabel: 'API',
    name: 'Express.js',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '92% // Advanced',
    experience: 'RESTful Middleware',
    highlight: 'JWT authentication pipelines, rate-limiting middleware, CORS policies, modular routing architectures.',
    iconType: 'express'
  },
  {
    id: 'react',
    label: '⚛',
    subLabel: '19',
    name: 'React 19',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '98% // Core Specialist',
    experience: 'State & Motion Physics',
    highlight: 'Concurrent hooks, compiler optimization, custom state machines, virtual DOM reconciliation.',
    iconType: 'react'
  },
  {
    id: 'postgres',
    label: 'PG',
    subLabel: 'SQL',
    name: 'PostgreSQL',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '90% // Proficient',
    experience: 'Relational Database',
    highlight: 'ACID transactional integrity, B-Tree indexes, JSONB semi-structured storage, connection pooling.',
    iconType: 'postgres'
  },
  {
    id: 'mongo',
    label: '🍃',
    subLabel: 'NoSQL',
    name: 'MongoDB',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '89% // Proficient',
    experience: 'Document Modeling',
    highlight: 'BSON document modeling, aggregation pipelines, replica set failover, dynamic horizontal sharding.',
    iconType: 'mongo'
  },

  // --- ROW 3: AI, Cloud & DevOps ---
  {
    id: 'git',
    label: '⑂',
    subLabel: 'Git',
    name: 'Git VCS',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
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
    proficiency: '96% // Expert',
    experience: 'Source Control & Hygiene',
    highlight: 'Feature branching, interactive rebasing, bisecting regressions, atomic commits, submodule management.',
    iconType: 'git'
  },
  {
    id: 'github',
    label: '🐙',
    subLabel: 'CI/CD',
    name: 'GitHub Actions',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
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
    proficiency: '94% // Expert',
    experience: 'Automated CI/CD',
    highlight: 'Automated test matrices, Docker multi-platform builds, semantic versioning, secret injection.',
    iconType: 'github'
  },
  {
    id: 'gemini',
    label: '✦',
    subLabel: 'Pro',
    name: 'Gemini 1.5 Pro',
    category: 'AI_CLOUD',
    categoryLabel: 'AI & Cloud',
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
    proficiency: '95% // AI Scholar',
    experience: 'Multimodal Intelligence',
    highlight: '2,000,000-token context processing, structured schema generation, tool-calling agents, vision analysis.',
    iconType: 'gemini'
  },
  {
    id: 'rag',
    label: 'RAG',
    subLabel: 'Embed',
    name: 'Multimodal RAG',
    category: 'AI_CLOUD',
    categoryLabel: 'AI & Cloud',
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
    proficiency: '93% // Production Grade',
    experience: 'Vector Semantic Search',
    highlight: 'High-dimensional embeddings, ChromaDB vector indexing, cosine ranking, hallucination suppression.',
    iconType: 'rag'
  },
  {
    id: 'vertex',
    label: '☁',
    subLabel: 'GCP',
    name: 'Vertex AI & Cloud',
    category: 'AI_CLOUD',
    categoryLabel: 'AI & Cloud',
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
    proficiency: '90% // Certified',
    experience: 'Managed Cloud ML',
    highlight: 'Model deployment endpoints, Cloud Storage buckets, serverless Cloud Functions, IAM least-privilege.',
    iconType: 'vertex'
  },
  {
    id: 'docker',
    label: '🐳',
    subLabel: 'Box',
    name: 'Docker Containers',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
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
    proficiency: '92% // Advanced',
    experience: 'Container Orchestration',
    highlight: 'Multi-stage lean Dockerfiles, Compose network bridges, alpine base images, container isolation.',
    iconType: 'docker'
  },
  {
    id: 'linux',
    label: '🐧',
    subLabel: 'POSIX',
    name: 'Linux System Admin',
    category: 'DEVOPS',
    categoryLabel: 'DevOps & Tooling',
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
    proficiency: '94% // Advanced',
    experience: 'POSIX & Shell Internals',
    highlight: 'Systemd service daemons, SSH hardened tunnels, process signals, bash automation, permission models.',
    iconType: 'linux'
  },

  // --- ROW 4: Aerospace, Telemetry & Core Systems ---
  {
    id: 'cansat',
    label: '🛰',
    subLabel: '1U',
    name: '1U CanSat Payload',
    category: 'TELEMETRY',
    categoryLabel: 'Aerospace & Telemetry',
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
    proficiency: '95% // Flight Proven',
    experience: 'Aerospace Payload Eng.',
    highlight: '1U CubeSat payload architecture, barometric pressure calibration, parachute descent recovery.',
    iconType: 'cansat'
  },
  {
    id: 'uhf',
    label: '📡',
    subLabel: '433M',
    name: '433 MHz RF Telemetry',
    category: 'TELEMETRY',
    categoryLabel: 'Aerospace & Telemetry',
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
    proficiency: '92% // Field Tested',
    experience: 'Radio Frequency Downlink',
    highlight: 'FSK radio packet decoding, ground station live telemetry streams, RF antenna matching & link budget.',
    iconType: 'uhf'
  },
  {
    id: 'esp32',
    label: '⚡',
    subLabel: 'MCU',
    name: 'ESP32 Embedded C++',
    category: 'TELEMETRY',
    categoryLabel: 'Aerospace & Telemetry',
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
    proficiency: '93% // Embedded Grade',
    experience: 'Sensor Fusion & Hardware',
    highlight: 'I2C/SPI sensor fusion buses, hardware timer ISR interrupts, UART serial decoding, low-power modes.',
    iconType: 'esp32'
  },
  {
    id: 'sec',
    label: '🛡',
    subLabel: 'VLAN',
    name: 'Network Security (AAI)',
    category: 'CORE_CS',
    categoryLabel: 'Core CS & Systems',
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
    proficiency: '91% // Airport Standard',
    experience: 'Civil Aviation Cybersec',
    highlight: 'Airports Authority of India (AAI) network defense, VLAN isolation, firewall ACLs, zero-trust policies.',
    iconType: 'sec'
  },
  {
    id: 'wireshark',
    label: '🦈',
    subLabel: 'PCAP',
    name: 'Wireshark Analysis',
    category: 'CORE_CS',
    categoryLabel: 'Core CS & Systems',
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
    proficiency: '89% // Advanced',
    experience: 'Deep Packet Inspection',
    highlight: 'TCP/IP packet frame capture, protocol dissection, anomalous beacon detection, latency bottleneck diagnostics.',
    iconType: 'wireshark'
  },
  {
    id: 'dsa',
    label: '∿',
    subLabel: 'BigO',
    name: 'Data Structures & Algorithms',
    category: 'CORE_CS',
    categoryLabel: 'Core CS & Systems',
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
    proficiency: '96% // Foundational',
    experience: 'Algorithmic Optimization',
    highlight: 'Asymptotic complexity minimization, cache line locality, trees, graphs, dynamic programming.',
    iconType: 'dsa'
  },
  {
    id: 'vite',
    label: '⚡V',
    subLabel: 'HMR',
    name: 'Vite & Build Tooling',
    category: 'FULL_STACK',
    categoryLabel: 'Full Stack Web',
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
    proficiency: '95% // Production Master',
    experience: 'High-Speed Bundler',
    highlight: 'ESM hot module replacement (HMR), Rollup tree-shaking plugins, sub-second deployment bundles.',
    iconType: 'vite'
  }
]

export const CATEGORY_FILTERS = [
  { id: 'ALL', label: 'All Keys (28)' },
  { id: 'LANGUAGES', label: 'Languages' },
  { id: 'FULL_STACK', label: 'Full Stack' },
  { id: 'AI_CLOUD', label: 'AI & Cloud' },
  { id: 'CORE_CS', label: 'Systems & Security' },
  { id: 'TELEMETRY', label: 'Aerospace & IoT' },
  { id: 'DEVOPS', label: 'DevOps' }
] as const

// --- Mechanical Audio Synthesizer (Web Audio API) ---
class MechanicalAudioEngine {
  private ctx: AudioContext | null = null

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  playSwitchSound(pitch: number = 1.0, isHover: boolean = false) {
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      if (isHover) {
        // Soft tactile blip on key hover elevation
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        const baseFreq = 340 * pitch
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.035)

        gain.gain.setValueAtTime(0.035, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.045)
      } else {
        // Deep tactile mechanical "thock" + switch clack on press
        // 1. Bottom-out thock oscillator
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(175 * pitch, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(55 * pitch, ctx.currentTime + 0.07)

        gain.gain.setValueAtTime(0.18, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.085)

        // 2. High-frequency tactile switch clack burst
        const bufferSize = Math.floor(ctx.sampleRate * 0.025)
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.18))
        }

        const noise = ctx.createBufferSource()
        noise.buffer = buffer

        const filter = ctx.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(1450 * pitch, ctx.currentTime)
        filter.Q.setValueAtTime(2.8, ctx.currentTime)

        const noiseGain = ctx.createGain()
        noiseGain.gain.setValueAtTime(0.12, ctx.currentTime)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

        noise.connect(filter)
        filter.connect(noiseGain)
        noiseGain.connect(ctx.destination)

        noise.start()
        noise.stop(ctx.currentTime + 0.035)
      }
    } catch {
      // AudioContext unavailable or autoplay prevented
    }
  }
}

const audioEngine = new MechanicalAudioEngine()

export const InteractiveSkillsKeyboard: React.FC = () => {
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>('ts')
  const [activeKeyId, setActiveKeyId] = useState<string>('ts')
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [view3D, setView3D] = useState<boolean>(true)

  // Subtle interactive parallax mouse tilt
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Currently inspected key
  const inspectedKey = useMemo(() => {
    const targetId = hoveredKeyId || activeKeyId
    return KEYBOARD_SKILLS.find((k) => k.id === targetId) || KEYBOARD_SKILLS[0]
  }, [hoveredKeyId, activeKeyId])

  // Mouse Parallax movement handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !view3D) return
    const rect = containerRef.current.getBoundingClientRect()
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 to +0.5
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5 // -0.5 to +0.5
    setMouseTilt({
      x: xRatio * 10, // +/- 5 deg tilt
      y: yRatio * -8
    })
  }, [view3D])

  const handleMouseLeaveContainer = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 })
  }, [])

  const handleKeyHover = useCallback(
    (key: KeySkill, idx: number) => {
      setHoveredKeyId(key.id)
      if (soundEnabled) {
        const pitch = 0.85 + (idx % 7) * 0.05
        audioEngine.playSwitchSound(pitch, true)
      }
    },
    [soundEnabled]
  )

  const handleKeyClick = useCallback(
    (key: KeySkill, idx: number) => {
      setActiveKeyId(key.id)
      setHoveredKeyId(key.id)
      if (soundEnabled) {
        const pitch = 0.85 + (idx % 7) * 0.06
        audioEngine.playSwitchSound(pitch, false)
      }
    },
    [soundEnabled]
  )

  return (
    <div className="w-full mt-14 sm:mt-20 select-none">
      {/* Header Eyebrow & Title for the Hardware Keyboard Showcase */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
            <span className="text-ember text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Tactile Hardware Macropad // Stack Visualizer
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Dev-MK64 Mechanical Core</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-ash border border-white/10 uppercase tracking-widest hidden sm:inline-block">
              28 Switches
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-ash mt-1 max-w-xl">
            Hover or click any sculpted keycap to experience tactile spring elevation, mechanical switch stems, and live architectural specs.
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

      {/* Layer / Category Filter Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <span className="text-[10px] font-mono uppercase tracking-wider text-ash/70 flex items-center gap-1 shrink-0 mr-1">
          <Layers className="w-3 h-3 text-ember" />
          <span>Layer:</span>
        </span>
        {CATEGORY_FILTERS.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide transition-all whitespace-nowrap cursor-pointer border ${
                isActive
                  ? 'bg-ember text-white font-bold border-ember shadow-[0_0_12px_rgba(252,107,47,0.4)]'
                  : 'bg-white/5 text-ash border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Active Key Telemetry LCD Display (Chassis Top HUD) */}
      <div className="mb-6 p-4 rounded-xl bg-[#0c0d12] border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Subtle dot grid & scanline texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '12px 12px'
          }}
        />
        {/* Glowing top line matching inspected key color */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${inspectedKey.color.base}, transparent)`,
            boxShadow: `0 0 16px ${inspectedKey.color.glow}`
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            {/* Miniature Keycap Preview Indicator */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base shrink-0 shadow-lg border border-white/20 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${inspectedKey.color.light}, ${inspectedKey.color.base})`,
                color: inspectedKey.color.text,
                boxShadow: `0 4px 14px ${inspectedKey.color.glow}`
              }}
            >
              {inspectedKey.label}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white font-bold text-base tracking-tight font-sans">
                  {inspectedKey.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-cloud border border-white/10">
                  {inspectedKey.categoryLabel}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold"
                  style={{
                    backgroundColor: `${inspectedKey.color.base}22`,
                    color: inspectedKey.color.light,
                    border: `1px solid ${inspectedKey.color.base}55`
                  }}
                >
                  {inspectedKey.proficiency}
                </span>
              </div>
              <p className="text-xs text-ash mt-0.5 font-normal leading-relaxed">
                {inspectedKey.highlight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-ash/80 border-t md:border-t-0 md:border-l border-white/10 pt-2 md:pt-0 md:pl-4 shrink-0">
            <div>
              <span className="text-ash/50 block text-[9px] uppercase tracking-wider">DOMAIN</span>
              <span className="text-white font-medium">{inspectedKey.experience}</span>
            </div>
            <div>
              <span className="text-ash/50 block text-[9px] uppercase tracking-wider">ACTUATION</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                POPPED UP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Hardware Keyboard Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveContainer}
        className="w-full flex items-center justify-center py-6 sm:py-10 md:py-14 overflow-x-auto overflow-y-visible"
        style={{
          perspective: view3D ? '1400px' : 'none',
          perspectiveOrigin: '50% 30%'
        }}
      >
        {/* Chassis Body */}
        <div
          className="relative transition-transform duration-300 ease-out transform-gpu shrink-0"
          style={{
            transformStyle: view3D ? 'preserve-3d' : 'flat',
            transform: view3D
              ? `rotateX(${50 + mouseTilt.y}deg) rotateZ(${-25 + mouseTilt.x * 0.6}deg) rotateY(${7 + mouseTilt.x * 0.5}deg)`
              : 'none'
          }}
        >
          {/* Top Aviator Cable Accent (Cyberpunk / Enthusiast coiled cable) */}
          <div
            className="absolute -top-12 left-10 pointer-events-none hidden sm:flex items-center gap-2 opacity-80"
            style={{ transform: view3D ? 'translateZ(-10px)' : 'none' }}
          >
            {/* USB-C braided cable heading off */}
            <div className="w-32 h-2.5 rounded-full bg-gradient-to-r from-transparent via-[#2b2d38] to-[#1e2029] shadow-inner" />
            {/* Aviator quick-disconnect silver connector */}
            <div className="w-5 h-4 rounded-sm bg-gradient-to-b from-[#94a3b8] via-[#64748b] to-[#475569] border border-white/20 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-2.5 bg-[#334155] rounded-[1px]" />
            </div>
            <div className="w-6 h-2 rounded-full bg-[#1e2029]" />
          </div>

          {/* Main Mechanical Keyboard Case (Chassis) */}
          <div
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-white/15 transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, #181922 0%, #101118 60%, #08090d 100%)',
              boxShadow: view3D
                ? `
                  0 2px 0 #282a3a,
                  0 4px 0 #1e202d,
                  0 8px 0 #14151e,
                  0 14px 0 #0d0e14,
                  0 20px 0 #07070a,
                  0 30px 45px rgba(0, 0, 0, 0.85),
                  0 0 60px rgba(252, 107, 47, 0.12)
                `
                : '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
          >
            {/* Brass Corner Hex Screws for Realistic CNC Mechanical Aesthetics */}
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

            {/* Recessed Switch Plate (Sunk bed with subtle red/brass switch accent underneath) */}
            <div
              className="relative p-2.5 sm:p-3.5 rounded-xl border border-black/80 shadow-inner"
              style={{
                background: 'linear-gradient(180deg, #090a0f 0%, #0d0e14 100%)',
                boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8)'
              }}
            >
              {/* Keyboard Grid: 4 rows of 7 keys */}
              <div className="grid grid-cols-7 gap-2.5 sm:gap-3 md:gap-3.5">
                {KEYBOARD_SKILLS.map((skill, idx) => {
                  const isHovered = hoveredKeyId === skill.id
                  const isSelected = activeKeyId === skill.id
                  const matchesFilter = activeCategory === 'ALL' || skill.category === activeCategory

                  return (
                    <div
                      key={skill.id}
                      className="relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16"
                      style={{
                        transformStyle: view3D ? 'preserve-3d' : 'flat'
                      }}
                      onMouseEnter={() => handleKeyHover(skill, idx)}
                      onMouseLeave={() => setHoveredKeyId(null)}
                      onClick={() => handleKeyClick(skill, idx)}
                    >
                      {/* 1. Underlying Switch Bed & Stem (Revealed when key pops up!) */}
                      <div
                        className="absolute inset-1 rounded-md bg-[#07080c] border border-white/5 flex items-center justify-center pointer-events-none"
                        style={{
                          transform: view3D ? 'translateZ(0px)' : 'none'
                        }}
                      >
                        {/* Cherry MX Red / Gateron style switch housing */}
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] bg-[#991b1b] border border-[#7f1d1d] flex items-center justify-center shadow-inner">
                          {/* Cross stem */}
                          <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5">
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-1 bg-[#ef4444] rounded-[0.5px]" />
                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-[#ef4444] rounded-[0.5px]" />
                          </div>
                        </div>

                        {/* Underglow RGB LED projection onto plate */}
                        <div
                          className="absolute inset-0 rounded-md transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${skill.color.glow} 0%, transparent 75%)`,
                            opacity: isHovered || isSelected ? 0.95 : matchesFilter ? 0.25 : 0.05
                          }}
                        />
                      </div>

                      {/* 2. The 3D Sculpted Mechanical Keycap Body */}
                      <div
                        className={`absolute inset-0 rounded-[7px] sm:rounded-[9px] cursor-pointer transition-all duration-200 transform-gpu flex flex-col items-center justify-center ${
                          !matchesFilter ? 'opacity-35 grayscale contrast-75' : 'opacity-100'
                        }`}
                        style={{
                          transformStyle: view3D ? 'preserve-3d' : 'flat',
                          // Dynamic 3D Pop-Up Elevation on Hover or Selected!
                          transform: view3D
                            ? isHovered
                              ? 'translateZ(38px) translateY(-14px) scale(1.08)'
                              : isSelected
                              ? 'translateZ(24px) translateY(-8px) scale(1.04)'
                              : 'translateZ(8px) translateY(0px) scale(1.0)'
                            : isHovered
                            ? 'translateY(-10px) scale(1.06)'
                            : isSelected
                            ? 'translateY(-5px) scale(1.03)'
                            : 'translateY(0px)',
                          background: `linear-gradient(180deg, ${skill.color.light} 0%, ${skill.color.base} 55%, ${skill.color.dark} 100%)`,
                          // Physical 3D keycap side bevels and dynamic shadows
                          boxShadow: isHovered
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
                        {/* Keycap Ergonomic Spherical Dish (Indentation with specular reflection) */}
                        <div
                          className="absolute inset-[2.5px] sm:inset-[3.5px] rounded-[5px] sm:rounded-[7px] flex flex-col items-center justify-center p-0.5 overflow-hidden pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%), linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.18) 100%)`,
                            boxShadow: `
                              inset 0 1.5px 2px rgba(255,255,255,0.4),
                              inset 0 -1.5px 2px rgba(0,0,0,0.4)
                            `
                          }}
                        >
                          {/* Key Monogram / Icon Symbol */}
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

                          {/* Subtle Sub-label (like key profile or framework version) */}
                          {skill.subLabel && (
                            <span
                              className="text-[7px] sm:text-[8px] font-mono font-bold leading-none tracking-tight mt-0.5 opacity-80"
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

            {/* Bottom Keyboard Lip / Callout & Brand Engraving */}
            <div className="mt-3.5 sm:mt-4 flex items-center justify-between px-1 text-[10px] font-mono text-ash/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
                <span className="uppercase tracking-widest text-[9px] text-ash/80">
                  CHOPPER-64 // CUSTOM FR4 SWITCH PLATE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block uppercase tracking-wider text-[9px] text-ash/60">
                  HOT-SWAPPABLE 5-PIN RGB
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-ember font-bold text-[9px]">
                  DEV JANGID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Interactive Legend Hint below the keyboard */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-ash/70 text-center">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ember" />
          <span>Interactive 3D elevation active on hover</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any key to lock telemetry in the HUD</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span>Move mouse across container to parallax-tilt chassis</span>
        </span>
      </div>
    </div>
  )
}

export default InteractiveSkillsKeyboard
