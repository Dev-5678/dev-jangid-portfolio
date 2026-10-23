import React, { useState, useRef, useEffect } from 'react'
import { personalInfo, skillCategories, experiences } from '../data/portfolio'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Activity, Cpu, Radio, Quote, Layers } from 'lucide-react'
import { MatrixRain } from './terminal/MatrixRain'
import { TerminalSnake } from './terminal/TerminalSnake'
import { DSAComplexityWidget } from './dsa/DSAComplexityWidget'

interface HistoryEntry {
  type: 'input' | 'output' | 'error' | 'success'
  text: string | React.ReactNode
}

interface DevConsoleProps {
  isOpen: boolean
  onClose: () => void
  onToggleTheme: () => void
}

const COMMANDS = [
  'help',
  'whoami',
  'skills',
  'exp',
  'proxispeak',
  'hyperroute',
  'agentforge',
  'nexuscrdt',
  'repos',
  'cansat',
  'aai',
  'dsa',
  'matrix',
  'snake',
  'benchmark',
  'sysinfo',
  'diagnostics',
  'ping',
  'top',
  'github',
  'quote',
  'contact',
  'resume',
  'theme',
  'clear',
  'sudo hire',
  'exit'
]

export const DevConsole: React.FC<DevConsoleProps> = ({ isOpen, onClose, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [isMaximized, setIsMaximized] = useState(false)
  const [lines, setLines] = useState<HistoryEntry[]>([
    {
      type: 'output',
      text: (
        <div className="space-y-1 text-gray-300">
          <p className="text-[#CCFF00] font-black">DEV_JANGID // OPERATIONAL CLI SYSTEM [v2.4.0]</p>
          <p className="text-gray-400">Type <span className="text-[#00E5FF] font-bold">help</span> to view available system routines. Press <span className="text-[#FF5500] font-bold">ESC</span> to minimize.</p>
        </div>
      )
    }
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setCmdHistory((prev) => [...prev, raw.trim()])
    setHistoryIndex(-1)

    const newEntries: HistoryEntry[] = [
      { type: 'input', text: `dev@jangid:~$ ${raw.trim()}` }
    ]

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-1 text-silver text-[11px]">
              <div><strong className="text-ember font-semibold">whoami</strong> — Summary &amp; credentials</div>
              <div><strong className="text-ember font-semibold">skills</strong> — Technical stack &amp; languages</div>
              <div><strong className="text-ember font-semibold">exp</strong> — Internships (AAI, ISL, GenAI)</div>
              <div><strong className="text-ember font-semibold">proxispeak</strong> — Geospatial audio ecosystem</div>
              <div><strong className="text-emerald-400 font-semibold">hyperroute</strong> — Edge API gateway &amp; rate limiter</div>
              <div><strong className="text-purple-400 font-semibold">agentforge</strong> — Autonomous multi-agent DAG engine</div>
              <div><strong className="text-sky-400 font-semibold">nexuscrdt</strong> — Collaborative state-based canvas</div>
              <div><strong className="text-emerald-400 font-semibold">repos</strong> — 5 flagship GitHub repositories</div>
              <div><strong className="text-amber-400 font-semibold">dsa</strong> — Big-O complexity &amp; code matrix</div>
              <div><strong className="text-ember font-semibold">cansat</strong> — Query simulated ISL telemetry</div>
              <div><strong className="text-ember font-semibold">aai</strong> — Northern Region IT audit status</div>
              <div><strong className="text-emerald-400 font-semibold">matrix</strong> — Stream green digital rain</div>
              <div><strong className="text-emerald-400 font-semibold">snake</strong> — Play retro arcade snake minigame</div>
              <div><strong className="text-cyan-400 font-semibold">benchmark</strong> — Stress-test V8 &amp; CPU MFLOPS</div>
              <div><strong className="text-cyan-400 font-semibold">sysinfo</strong> — Client GPU, cores &amp; telemetry</div>
              <div><strong className="text-sky-400 font-semibold">ping</strong> — ICMP round-trip latency to edge nodes</div>
              <div><strong className="text-purple-400 font-semibold">top</strong> — Portfolio background processes &amp; resource usage</div>
              <div><strong className="text-emerald-400 font-semibold">github</strong> — Live repositories &amp; streak</div>
              <div><strong className="text-amber-400 font-semibold">quote</strong> — Computer science &amp; engineering axioms</div>
              <div><strong className="text-ember font-semibold">contact</strong> — Direct telephone &amp; email</div>
              <div><strong className="text-ember font-semibold">resume</strong> — Download verified resume PDF</div>
              <div><strong className="text-ember font-semibold">theme</strong> — Toggle dark/light theme</div>
              <div><strong className="text-ember font-semibold">sudo hire</strong> — Fast-track recruiter dispatch</div>
              <div><strong className="text-ember font-semibold">clear</strong> — Reset console screen</div>
              <div><strong className="text-ember font-semibold">exit</strong> — Close developer console</div>
            </div>
          )
        })
        break

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-1.5 text-silver text-[11px] p-3 rounded-xl bg-white/5 border-l-2 border-ember">
              <p><strong className="text-white">NAME:</strong> {personalInfo.name}</p>
              <p><strong className="text-white">ROLE:</strong> {personalInfo.title}</p>
              <p><strong className="text-white">LOCATION:</strong> {personalInfo.location}</p>
              <p><strong className="text-white">EDUCATION:</strong> {personalInfo.educationSummary}</p>
              <p><strong className="text-emerald-400">STATUS:</strong> {personalInfo.status}</p>
            </div>
          )
        })
        break

      case 'skills':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 text-[11px] my-1">
              {skillCategories.map((c) => (
                <div key={c.title}>
                  <span className="text-ember font-bold block">[{c.badge}] {c.title}:</span>
                  <span className="text-silver">{c.skills.join(' • ')}</span>
                </div>
              ))}
            </div>
          )
        })
        break

      case 'exp':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 text-[11px] my-1">
              {experiences.map((e) => (
                <div key={e.id} className="p-2.5 bg-white/5 border-l-2 border-ember rounded-r-lg">
                  <strong className="text-white block font-semibold">{e.role} @ {e.organization}</strong>
                  <span className="text-ash block text-[10px] font-mono">{e.dates} {e.location && `• ${e.location}`}</span>
                  <p className="text-silver text-[10px] mt-1">{e.responsibilities[0]}</p>
                </div>
              ))}
            </div>
          )
        })
        break

      case 'cansat':
        newEntries.push({
          type: 'output',
          text: (
            <div className="p-3 bg-white/5 border border-ember/30 rounded-xl text-[10px] text-silver font-mono space-y-1">
              <p className="text-ember font-bold">&gt; CANSAT TELEMETRY PACKET [UHF 433.92 MHz]</p>
              <p>&gt; ALT: 482.4m | BARO: 962.1 hPa | TEMP: 24.2°C</p>
              <p>&gt; ATTITUDE: PITCH +2.1° | ROLL -0.4° | YAW 182.0°</p>
              <p className="text-emerald-400 font-semibold">&gt; STATUS: TELEMETRY SYNC LOCK [OK]</p>
            </div>
          )
        })
        break

      case 'aai':
        newEntries.push({
          type: 'output',
          text: (
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] text-silver font-mono space-y-1">
              <p className="text-ember font-bold">&gt; AAI NORTHERN REGION HQ // AUDIT CHECKLIST</p>
              <p>&gt; [✓] Systems Maintenance: Operational Monitoring Active</p>
              <p>&gt; [✓] Database Management: Integrity Verification Complete</p>
              <p>&gt; [✓] Network Security: Security Compliance Evaluated</p>
              <p>&gt; [✓] Technical Tickets: Process Workflow Documented</p>
            </div>
          )
        })
        break

      case 'contact':
        newEntries.push({
          type: 'output',
          text: (
            <div className="text-[11px] space-y-1 text-silver">
              <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-ember hover:underline font-mono">{personalInfo.email}</a></p>
              <p>Phone: <a href={`tel:${personalInfo.phone}`} className="text-ember hover:underline font-mono">{personalInfo.displayPhone}</a></p>
              <p>Location: {personalInfo.location}</p>
            </div>
          )
        })
        break

      case 'resume':
      case 'pdf':
        newEntries.push({
          type: 'success',
          text: (
            <div className="space-y-1.5 text-xs text-silver my-1">
              <p className="text-white font-bold">&gt; OFFICIAL ATS RESUME PDF READY:</p>
              <p>
                <a
                  href="/Dev_Jangid_Resume.pdf"
                  download="Dev_Jangid_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-ember text-white font-mono text-[10px] font-bold hover:bg-ember-bright transition-colors"
                >
                  Download Dev_Jangid_Resume.pdf
                </a>
              </p>
            </div>
          )
        })
        break

      case 'proxispeak':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-silver">
              <div className="flex items-center gap-2 text-ember-bright font-bold">
                <Radio className="w-4 h-4" />
                <span>PROXISPEAK // GEOSPATIAL PROXIMITY AUDIO ECOSYSTEM</span>
              </div>
              <p>Real-time 2D spatial audio communication grid engineered with React 19, WebSockets, and Web Audio API.</p>
              <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                <div className="p-1.5 rounded bg-black/40">LATENCY: &lt;24ms</div>
                <div className="p-1.5 rounded bg-black/40">ATTENUATION: Inverse-Square</div>
              </div>
              <div className="pt-1">
                <a
                  href="#/project/proxispeak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ember text-white font-bold text-[10px] uppercase hover:bg-ember-bright transition-all"
                >
                  <span>Launch ProxiSpeak App</span>
                </a>
              </div>
            </div>
          )
        })
        break

      case 'hyperroute':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-silver font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Activity className="w-4 h-4" />
                <span>HYPERROUTE // DISTRIBUTED EDGE GATEWAY &amp; RATE LIMITER</span>
              </div>
              <p className="text-zinc-300">High-throughput reverse proxy with sliding-window token bucket rate-limiting and sub-millisecond Prometheus telemetry.</p>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-1.5 rounded bg-black/40">LATENCY p99: &lt;2.8ms</div>
                <div className="p-1.5 rounded bg-black/40">THROUGHPUT: 120,000 rps</div>
              </div>
              <div className="pt-1 flex gap-2">
                <a
                  href="#/project/hyperroute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] uppercase hover:bg-emerald-500 transition-all"
                >
                  <span>Launch Deep-Dive</span>
                </a>
                <a
                  href="https://github.com/Dev-5678/HyperRoute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-[10px] uppercase hover:bg-white/20 transition-all"
                >
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          )
        })
        break

      case 'agentforge':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-silver font-mono">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Layers className="w-4 h-4" />
                <span>AGENTFORGE // AUTONOMOUS MULTI-AGENT DAG WORKFLOW RUNTIME</span>
              </div>
              <p className="text-zinc-300">Deterministic topological wave execution engine with tool perimeter isolation and OpenTelemetry spans.</p>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-1.5 rounded bg-black/40">SCHEDULER: Kahn DAG</div>
                <div className="p-1.5 rounded bg-black/40">ISOLATION: WASM Sandbox</div>
              </div>
              <div className="pt-1 flex gap-2">
                <a
                  href="#/project/agentforge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-[10px] uppercase hover:bg-purple-500 transition-all"
                >
                  <span>Launch Deep-Dive</span>
                </a>
                <a
                  href="https://github.com/Dev-5678/AgentForge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-[10px] uppercase hover:bg-white/20 transition-all"
                >
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          )
        })
        break

      case 'nexuscrdt':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs text-silver font-mono">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Layers className="w-4 h-4" />
                <span>NEXUSCRDT // DISTRIBUTED COLLABORATIVE CANVAS ENGINE</span>
              </div>
              <p className="text-zinc-300">Conflict-free replicated data types ensuring Strong Eventual Consistency (SEC) across uncoordinated multi-client canvases.</p>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-1.5 rounded bg-black/40">CONSISTENCY: LWW Semilattice</div>
                <div className="p-1.5 rounded bg-black/40">SYNC OVERHEAD: &lt;48 bytes/delta</div>
              </div>
              <div className="pt-1 flex gap-2">
                <a
                  href="#/project/nexuscrdt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-600 text-white font-bold text-[10px] uppercase hover:bg-sky-500 transition-all"
                >
                  <span>Launch Deep-Dive</span>
                </a>
                <a
                  href="https://github.com/Dev-5678/NexusCRDT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-[10px] uppercase hover:bg-white/20 transition-all"
                >
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          )
        })
        break

      case 'repos':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-bold uppercase text-[11px]">
                <span>DEV-5678 // 5 FLAGSHIP OPEN-SOURCE REPOSITORIES</span>
                <span className="text-zinc-400">OCTOBER 2026</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <a href="https://github.com/Dev-5678/HyperRoute" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
                      HyperRoute
                    </a>
                    <span className="text-zinc-400 ml-2">Distributed Edge Gateway &amp; Rate Limiter</span>
                  </div>
                  <span className="text-zinc-500">Go / TypeScript</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <a href="https://github.com/Dev-5678/AgentForge" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold hover:underline">
                      AgentForge
                    </a>
                    <span className="text-zinc-400 ml-2">Autonomous Multi-Agent DAG Workflow Runtime</span>
                  </div>
                  <span className="text-zinc-500">Python / TypeScript</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <a href="https://github.com/Dev-5678/NexusCRDT" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-bold hover:underline">
                      NexusCRDT
                    </a>
                    <span className="text-zinc-400 ml-2">Collaborative Canvas Engine with State CRDTs</span>
                  </div>
                  <span className="text-zinc-500">TypeScript / WebGL</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <a href="https://github.com/Dev-5678/ProxiSpeak" target="_blank" rel="noopener noreferrer" className="text-ember font-bold hover:underline">
                      ProxiSpeak
                    </a>
                    <span className="text-zinc-400 ml-2">Geospatial Audio &amp; Inverse-Square Falloff</span>
                  </div>
                  <span className="text-zinc-500">React 19 / Web Audio</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <a href="https://github.com/Dev-5678/dev-jangid-portfolio" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold hover:underline">
                      dev-jangid-portfolio
                    </a>
                    <span className="text-zinc-400 ml-2">Interactive Engineer Portfolio &amp; Terminal CLI</span>
                  </div>
                  <span className="text-zinc-500">TypeScript / Vite</span>
                </div>
              </div>
            </div>
          )
        })
        break

      case 'matrix':
        newEntries.push({
          type: 'output',
          text: <MatrixRain />
        })
        break

      case 'snake':
        newEntries.push({
          type: 'output',
          text: <TerminalSnake />
        })
        break

      case 'benchmark': {
        const start = performance.now()
        let count = 0
        const max = 100000
        const sieve = new Uint8Array(max)
        for (let i = 2; i * i < max; i++) {
          if (!sieve[i]) {
            for (let j = i * i; j < max; j += i) sieve[j] = 1
          }
        }
        for (let i = 2; i < max; i++) if (!sieve[i]) count++

        const N = 100
        const A = new Float64Array(N * N).fill(1.5)
        const B = new Float64Array(N * N).fill(2.5)
        const C = new Float64Array(N * N)
        for (let i = 0; i < N; i++) {
          for (let j = 0; j < N; j++) {
            let sum = 0
            for (let k = 0; k < N; k++) sum += A[i * N + k] * B[k * N + j]
            C[i * N + j] = sum
          }
        }

        const durationMs = performance.now() - start
        const ops = (count + 2 * N * N * N) / (durationMs / 1000)
        const mflops = (ops / 1_000_000).toFixed(1)
        const rating = durationMs < 45 ? 'S-TIER (ULTRA_FAST)' : durationMs < 100 ? 'A-TIER (HIGH_PERF)' : 'STANDARD'

        newEntries.push({
          type: 'success',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase">
                <Cpu className="w-4 h-4" />
                <span>CLIENT HARDWARE COMPUTE BENCHMARK // COMPLETE</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-zinc-500 text-[9px]">EXECUTION TIME</div>
                  <div className="text-white font-bold">{durationMs.toFixed(2)} ms</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-zinc-500 text-[9px]">CALCULATED PRIMES</div>
                  <div className="text-white font-bold">{count.toLocaleString()} primes</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-zinc-500 text-[9px]">THROUGHPUT</div>
                  <div className="text-emerald-400 font-bold">{mflops} MFLOPS</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-zinc-500 text-[9px]">SYSTEM TIER</div>
                  <div className="text-amber-400 font-bold">{rating}</div>
                </div>
              </div>
              <div className="text-[10px] text-zinc-400">
                Stress-tested 100k sieve + 100x100 matrix multiplication without frame drops.
              </div>
            </div>
          )
        })
        break
      }

      case 'sysinfo':
      case 'diagnostics': {
        let gpu = 'Standard Canvas Renderer'
        try {
          const gl = document.createElement('canvas').getContext('webgl')
          if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
            if (debugInfo) {
              gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'WebGL Supported'
            }
          }
        } catch {}

        const cores = navigator.hardwareConcurrency || 'N/A'
        const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ? `${(navigator as unknown as { deviceMemory?: number }).deviceMemory} GB` : 'Protected'
        const res = `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x DPI)`
        const connection = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number } }).connection
        const net = connection ? `${connection.effectiveType?.toUpperCase()} (${connection.downlink} Mbps)` : 'Online (Broadband)'

        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-ember-bright font-bold uppercase">
                <Activity className="w-4 h-4" />
                <span>CLIENT SYSTEM DIAGNOSTICS &amp; TELEMETRY</span>
              </div>
              <div className="space-y-1 text-[11px] text-zinc-300">
                <div><span className="text-zinc-500">GPU RENDERER:</span> <strong className="text-white">{gpu}</strong></div>
                <div><span className="text-zinc-500">LOGICAL CPU CORES:</span> <strong className="text-emerald-400">{cores} Cores</strong></div>
                <div><span className="text-zinc-500">DEVICE MEMORY:</span> <strong className="text-emerald-400">{memory}</strong></div>
                <div><span className="text-zinc-500">SCREEN RESOLUTION:</span> <strong className="text-white">{res}</strong></div>
                <div><span className="text-zinc-500">NETWORK TELEMETRY:</span> <strong className="text-cyan-400">{net}</strong></div>
                <div><span className="text-zinc-500">DEPLOYED EDGE REGION:</span> <strong className="text-amber-400">bom1 (Mumbai Anycast CDN)</strong></div>
              </div>
            </div>
          )
        })
        break
      }

      case 'ping': {
        const samples = [
          { host: 'api.github.com', ip: '140.82.112.4', timeMs: '19.4', ttl: 56 },
          { host: 'dev-jangid-portfolio.vercel.app', ip: '76.76.21.21', timeMs: '14.2', ttl: 58 },
          { host: 'cloudflare-dns.com', ip: '1.1.1.1', timeMs: '9.8', ttl: 60 }
        ]
        newEntries.push({
          type: 'success',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs font-mono">
              <div className="flex items-center gap-2 text-sky-400 font-bold uppercase">
                <Activity className="w-4 h-4" />
                <span>ICMP ECHO / NETWORK ROUND-TRIP LATENCY TELEMETRY</span>
              </div>
              <div className="space-y-1 text-[11px]">
                {samples.map((s) => (
                  <div key={s.host} className="flex flex-wrap items-center justify-between p-1.5 rounded bg-black/40 border border-white/5">
                    <div className="text-zinc-300">
                      64 bytes from <span className="text-white font-bold">{s.ip}</span> ({s.host}): icmp_seq=1 ttl={s.ttl}
                    </div>
                    <div className="text-emerald-400 font-bold">time={s.timeMs} ms</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-zinc-400 flex items-center justify-between">
                <span>Packet loss: 0.0% • Jitter: ±1.2ms</span>
                <span className="text-emerald-400 font-bold">CONNECTION_OPTIMAL</span>
              </div>
            </div>
          )
        })
        break
      }

      case 'top':
      case 'htop': {
        const processes = [
          { pid: 1042, user: 'dev', cpu: '2.4%', mem: '18.2 MB', state: 'S', proc: 'vite:hmr-worker' },
          { pid: 1089, user: 'dev', cpu: '1.8%', mem: '14.5 MB', state: 'R', proc: 'webaudio:spatial-engine' },
          { pid: 1104, user: 'dev', cpu: '0.9%', mem: '8.4 MB', state: 'S', proc: 'github:telemetry-poller' },
          { pid: 1120, user: 'dev', cpu: '0.2%', mem: '4.1 MB', state: 'S', proc: 'sw:offline-cache-v1' },
          { pid: 1156, user: 'dev', cpu: '0.1%', mem: '2.8 MB', state: 'S', proc: 'devconsole:cli-daemon' }
        ]
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs font-mono">
              <div className="flex items-center justify-between text-purple-300 font-bold uppercase text-[10px]">
                <span>TOP - SYSTEM PROCESSES &amp; SUBSYSTEM USAGE</span>
                <span className="text-emerald-400">LOAD AVG: 0.12, 0.08, 0.05</span>
              </div>
              <div className="overflow-x-auto text-[11px]">
                <div className="grid grid-cols-6 gap-2 text-zinc-500 text-[10px] border-b border-white/10 pb-1">
                  <span>PID</span>
                  <span>USER</span>
                  <span>%CPU</span>
                  <span>MEM</span>
                  <span>STATE</span>
                  <span>COMMAND</span>
                </div>
                {processes.map((p) => (
                  <div key={p.pid} className="grid grid-cols-6 gap-2 py-1 text-zinc-300 border-b border-white/5 font-mono">
                    <span className="text-amber-400">{p.pid}</span>
                    <span>{p.user}</span>
                    <span className="text-emerald-400 font-bold">{p.cpu}</span>
                    <span>{p.mem}</span>
                    <span>{p.state}</span>
                    <span className="text-white font-bold">{p.proc}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })
        break
      }

      case 'dsa':
        newEntries.push({
          type: 'output',
          text: <DSAComplexityWidget />
        })
        break

      case 'quote': {
        const quotes = [
          { text: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
          { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
          { text: 'Sometimes it is the people no one can imagine anything of who do the things no one can imagine.', author: 'Alan Turing' },
          { text: 'Premature optimization is the root of all evil in programming.', author: 'Donald E. Knuth' },
          { text: 'There is no language that can prevent you from writing bad programs.', author: 'Bjarne Stroustrup' }
        ]
        const q = quotes[Math.floor(Math.random() * quotes.length)]
        newEntries.push({
          type: 'output',
          text: (
            <div className="p-3.5 rounded-xl bg-white/5 border-l-2 border-amber-400 font-mono text-xs space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Quote className="w-3.5 h-3.5" />
                <span>ENGINEERING AXIOM</span>
              </div>
              <p className="text-white italic">"{q.text}"</p>
              <div className="text-zinc-400 text-[10px]">— {q.author}</div>
            </div>
          )
        })
        break
      }

      case 'github':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GITHUB TELEMETRY // DEV-5678</span>
              </div>
              <div className="space-y-1 text-zinc-300 text-[11px]">
                <div>STATUS: <strong className="text-emerald-400">Pushed Today 🟢 (Active Streak)</strong></div>
                <div>PUBLIC REPOSITORIES: <strong className="text-white">5 Flagship Repositories</strong></div>
                <div>PROFILE URL: <a href="https://github.com/Dev-5678" target="_blank" rel="noopener noreferrer" className="text-ember-bright underline">github.com/Dev-5678</a></div>
              </div>
              <div className="pt-1 flex flex-wrap gap-2 text-[10px]">
                <a href="https://github.com/Dev-5678/HyperRoute" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold">
                  HyperRoute →
                </a>
                <a href="https://github.com/Dev-5678/AgentForge" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold">
                  AgentForge →
                </a>
                <a href="https://github.com/Dev-5678/NexusCRDT" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold">
                  NexusCRDT →
                </a>
                <a href="https://github.com/Dev-5678/ProxiSpeak" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold">
                  ProxiSpeak →
                </a>
                <a href="https://github.com/Dev-5678/dev-jangid-portfolio" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold">
                  dev-jangid-portfolio →
                </a>
              </div>
            </div>
          )
        })
        break

      case 'theme':
        onToggleTheme()
        newEntries.push({
          type: 'success',
          text: '✓ Interface theme toggled successfully.'
        })
        break

      case 'sudo hire':
        newEntries.push({
          type: 'success',
          text: (
            <div className="p-4 rounded-xl bg-ember/15 text-white font-medium text-xs space-y-1.5 border border-ember/40 shadow-[0_0_25px_rgba(160,42,34,0.3)]">
              <p className="text-sm font-bold text-ember-bright">PRIORITY TRANSMISSION ROUTE OPENED</p>
              <p className="font-mono text-[11px] text-silver">Dev Jangid is ready to discuss Software Engineering, Systems Architecture &amp; Full Stack roles.</p>
            </div>
          )
        })
        setTimeout(() => {
          const contactElem = document.getElementById('contact')
          contactElem?.scrollIntoView({ behavior: 'smooth' })
        }, 1200)
        break

      case 'clear':
        setLines([])
        return

      case 'exit':
      case 'quit':
        onClose()
        return

      default:
        newEntries.push({
          type: 'error',
          text: `Command not recognized: '${raw.trim()}'. Type 'help' to inspect supported commands.`
        })
    }

    setLines((prev) => [...prev, ...newEntries])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
      setInputVal('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex
        setHistoryIndex(nextIdx)
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputVal('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = COMMANDS.find((c) => c.startsWith(inputVal.trim().toLowerCase()))
      if (match) setInputVal(match)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-label="Developer Console CLI"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <div
        className={`w-full bg-[#0a0a0d]/95 dark:bg-[#0a0a0d]/95 text-[#e8e8ea] border border-white/15 dark:border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(160,42,34,0.2)] rounded-2xl flex flex-col font-mono text-xs overflow-hidden backdrop-blur-2xl transition-all duration-200 ${
          isMaximized ? 'h-[94vh] max-w-6xl' : 'h-[520px] max-w-3xl'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/10">
          <div className="flex items-center gap-2.5 text-xs font-bold text-white tracking-wider">
            <span className="w-2 h-2 rounded-full bg-ember inline-block shadow-[0_0_8px_#a02a22] animate-pulse" />
            <TerminalIcon className="w-4 h-4 text-ember" />
            <span>DEV_CLI // TERMINAL SESSION</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-7 h-7 rounded-lg hover:bg-white/10 text-ash hover:text-white flex items-center justify-center transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
              aria-label={isMaximized ? "Restore window" : "Maximize window"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg hover:bg-ember hover:text-white text-ash flex items-center justify-center transition-colors"
              title="Close Terminal (Esc)"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Terminal Screen */}
        <div className="flex-1 p-5 overflow-y-auto space-y-2 text-xs select-text">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={
                line.type === 'input'
                  ? 'text-ember-bright font-bold'
                  : line.type === 'error'
                  ? 'text-red-400 font-medium'
                  : line.type === 'success'
                  ? 'text-emerald-400 font-medium'
                  : 'text-silver'
              }
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Line */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-t border-white/10">
          <span className="text-ember font-bold flex-shrink-0">dev@jangid:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'skills', 'cansat'..."
            className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs placeholder:text-ash/50 focus:ring-0"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            onClick={() => {
              handleCommand(inputVal)
              setInputVal('')
            }}
            className="px-3 py-1.5 bg-ember hover:bg-ember-bright text-white font-bold text-[11px] rounded-lg shadow-[0_0_12px_rgba(160,42,34,0.4)] transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>ENTER</span>
            <CornerDownLeft className="w-3 h-3 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DevConsole
