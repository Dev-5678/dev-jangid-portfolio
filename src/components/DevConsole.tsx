import React, { useState, useRef, useEffect } from 'react'
import { personalInfo, skillCategories, experiences } from '../data/portfolio'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react'

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
  'cansat',
  'aai',
  'contact',
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-1 text-gray-300 text-[11px]">
              <div><strong className="text-[#CCFF00]">whoami</strong> — Summary &amp; credentials</div>
              <div><strong className="text-[#CCFF00]">skills</strong> — Technical stack &amp; languages</div>
              <div><strong className="text-[#CCFF00]">exp</strong> — Internships (AAI, ISL, GenAI)</div>
              <div><strong className="text-[#CCFF00]">cansat</strong> — Query simulated ISL telemetry</div>
              <div><strong className="text-[#CCFF00]">aai</strong> — Northern Region IT audit status</div>
              <div><strong className="text-[#CCFF00]">contact</strong> — Direct telephone &amp; email</div>
              <div><strong className="text-[#CCFF00]">theme</strong> — Toggle dark/light theme</div>
              <div><strong className="text-[#CCFF00]">sudo hire</strong> — Fast-track recruiter dispatch</div>
              <div><strong className="text-[#CCFF00]">clear</strong> — Reset console screen</div>
              <div><strong className="text-[#CCFF00]">exit</strong> — Close developer console</div>
            </div>
          )
        })
        break

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-gray-300 text-[11px] p-2 bg-[#1A202C] border-l-2 border-[#CCFF00]">
              <p><strong className="text-white">NAME:</strong> {personalInfo.name}</p>
              <p><strong className="text-white">ROLE:</strong> {personalInfo.title}</p>
              <p><strong className="text-white">LOCATION:</strong> {personalInfo.location}</p>
              <p><strong className="text-white">EDUCATION:</strong> {personalInfo.educationSummary}</p>
              <p><strong className="text-[#CCFF00]">STATUS:</strong> {personalInfo.status}</p>
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
                  <span className="text-[#00E5FF] font-bold block">[{c.badge}] {c.title}:</span>
                  <span className="text-gray-300">{c.skills.join(' • ')}</span>
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
                <div key={e.id} className="p-2 bg-[#1A202C] border-l-2 border-[#FF5500]">
                  <strong className="text-[#CCFF00] block">{e.role} @ {e.organization}</strong>
                  <span className="text-gray-400 block text-[10px]">{e.dates} {e.location && `• ${e.location}`}</span>
                  <p className="text-gray-300 text-[10px] mt-1">{e.responsibilities[0]}</p>
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
            <div className="p-2 bg-[#0F172A] border border-[#00E5FF] text-[10px] text-[#00E5FF] font-mono space-y-0.5">
              <p>&gt; CANSAT TELEMETRY PACKET [UHF 433.92 MHz]</p>
              <p>&gt; ALT: 482.4m | BARO: 962.1 hPa | TEMP: 24.2°C</p>
              <p>&gt; ATTITUDE: PITCH +2.1° | ROLL -0.4° | YAW 182.0°</p>
              <p className="text-[#CCFF00]">&gt; STATUS: TELEMETRY SYNC LOCK [OK]</p>
            </div>
          )
        })
        break

      case 'aai':
        newEntries.push({
          type: 'output',
          text: (
            <div className="p-2 bg-[#1E293B] border border-[#CCFF00] text-[10px] text-gray-200 font-mono space-y-0.5">
              <p className="text-[#CCFF00] font-bold">&gt; AAI NORTHERN REGION HQ // AUDIT CHECKLIST</p>
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
            <div className="text-[11px] space-y-1 text-gray-300">
              <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-[#00E5FF] underline">{personalInfo.email}</a></p>
              <p>Phone: <a href={`tel:${personalInfo.phone}`} className="text-[#CCFF00] underline">{personalInfo.displayPhone}</a></p>
              <p>Location: {personalInfo.location}</p>
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
            <div className="p-3 bg-[#CCFF00] text-[#111317] font-black text-xs space-y-1 border-2 border-[#111317]">
              <p className="text-sm">🎉 ACCESS GRANTED! PRIORITY TRANSMISSION ROUTE OPENED.</p>
              <p className="font-mono text-[10px]">Dev Jangid is ready to discuss Software Engineering &amp; IT infrastructure internships/full-time roles.</p>
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-md"
    >
      <div
        className={`w-full bg-[#0A0D12] text-[#F4F7FB] border-3 border-[#CCFF00] shadow-[8px_8px_0px_#111317] dark:shadow-[8px_8px_0px_#CCFF00] flex flex-col font-mono text-xs overflow-hidden transition-all duration-200 ${
          isMaximized ? 'h-[94vh] max-w-6xl' : 'h-[500px] max-w-3xl'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141820] border-b-2 border-gray-800">
          <div className="flex items-center gap-2 text-xs font-bold text-[#CCFF00]">
            <TerminalIcon className="w-4 h-4 text-[#CCFF00]" />
            <span>DEV_CLI // TERMINAL SESSION</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
              aria-label={isMaximized ? "Restore window" : "Maximize window"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-500 hover:text-white text-gray-400 transition-colors"
              title="Close Terminal (Esc)"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Terminal Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs select-text">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={
                line.type === 'input'
                  ? 'text-[#00E5FF] font-bold'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : line.type === 'success'
                  ? 'text-[#CCFF00]'
                  : 'text-gray-300'
              }
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Line */}
        <div className="flex items-center gap-2 p-3 bg-[#111317] border-t-2 border-gray-800">
          <span className="text-[#CCFF00] font-bold flex-shrink-0">dev@jangid:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'skills', 'cansat'..."
            className="flex-1 bg-transparent border-0 outline-none text-[#F4F7FB] font-mono text-xs focus:ring-0"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            onClick={() => {
              handleCommand(inputVal)
              setInputVal('')
            }}
            className="px-2 py-1 bg-[#CCFF00] text-[#111317] font-bold text-[10px] hover:bg-[#b8e600] flex items-center gap-1"
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
