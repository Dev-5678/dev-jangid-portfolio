import React, { useState, useRef, useEffect } from 'react'
import { ShieldCheck, CornerDownLeft, Code2, Activity, Terminal, Layers, RefreshCw } from 'lucide-react'

interface ProcessEntry {
  pid: number
  command: string
  state: 'RUNNING' | 'SLEEPING' | 'ZOMBIE_REAPED'
  cpu: string
  mem: string
}

export const ApexShellApp: React.FC = () => {
  const [isRunning] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<'terminal' | 'signals' | 'source'>('terminal')
  const [inputVal, setInputVal] = useState<string>('')
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [commandList, setCommandList] = useState<string[]>([])
  const [signalLogs, setSignalLogs] = useState<string[]>([
    '[INIT] ApexShell v2.4 initialized. Signal mask configured for SIGINT, SIGTSTP, SIGCHLD.',
    '[TTY] Terminal set to non-canonical raw mode via tcsetattr(STDIN_FILENO, TCSANOW).',
    '[FORK] Background daemon spawned: PID 4092 (./sensor_daemon &) -- WNOHANG reaper armed.'
  ])

  const [processes, setProcesses] = useState<ProcessEntry[]>([
    { pid: 1401, command: 'apex_shell', state: 'RUNNING', cpu: '0.1%', mem: '1.2 MB' },
    { pid: 4092, command: './sensor_daemon &', state: 'SLEEPING', cpu: '0.4%', mem: '2.8 MB' },
    { pid: 4120, command: 'telemetry_sink', state: 'SLEEPING', cpu: '0.2%', mem: '1.6 MB' }
  ])

  const [history, setHistory] = useState<Array<{ cmd?: string; output: string | React.ReactNode; isError?: boolean }>>([
    {
      output: (
        <div className="space-y-1 text-zinc-400">
          <div className="text-white font-bold">ApexShell v2.4 (x86_64-pc-linux-gnu POSIX.1-2008 compliant)</div>
          <div>Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to see available commands or click the shortcut chips below.</div>
          <div>Multi-stage piping (<span className="text-amber-300 font-bold">|</span>), I/O redirection (<span className="text-cyan-300">&gt;, &lt;</span>), and background jobs (<span className="text-ember-bright">&amp;</span>) supported.</div>
        </div>
      )
    }
  ])

  const terminalEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const killProcess = (pid: number) => {
    setProcesses((prev) =>
      prev.map((p) => (p.pid === pid ? { ...p, state: 'ZOMBIE_REAPED' } : p))
    )
    setSignalLogs((prev) => [
      `[SIGNAL] Sent SIGKILL (kill -9 ${pid}). Kernel delivered signal; waitpid(WNOHANG) reaped child cleanly with zero zombie leak.`,
      ...prev.slice(0, 19)
    ])
    setHistory((prev) => [
      ...prev,
      {
        cmd: `kill -9 ${pid}`,
        output: <span className="text-red-400">[PID ${pid}] Process terminated via SIGKILL. Harvested by waitpid().</span>
      }
    ])
  }

  const spawnDaemon = () => {
    const newPid = 4200 + Math.floor(Math.random() * 800)
    setProcesses((prev) => [
      ...prev,
      { pid: newPid, command: './worker_node &', state: 'RUNNING', cpu: '0.3%', mem: '2.1 MB' }
    ])
    setSignalLogs((prev) => [
      `[FORK] fork() child PID ${newPid} created. Parent continues interactive loop without blocking.`,
      ...prev.slice(0, 19)
    ])
    setHistory((prev) => [
      ...prev,
      {
        cmd: `./worker_node &`,
        output: <span className="text-cyan-300">[1] {newPid} -- Running in background.</span>
      }
    ])
  }

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim()
    if (!cmd) return

    setCommandList((prev) => [cmd, ...prev])
    setHistoryIndex(-1)

    let output: React.ReactNode = ''
    const lower = cmd.toLowerCase()

    if (lower === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    if (lower === 'help') {
      output = (
        <div className="space-y-1 text-zinc-300">
          <div className="text-emerald-400 font-bold">Supported Built-in POSIX Commands:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[10px]">
            <div><strong className="text-white">ls -la</strong> : List directory files</div>
            <div><strong className="text-white">ps aux</strong> : List active processes</div>
            <div><strong className="text-white">top</strong> : System CPU &amp; RAM load</div>
            <div><strong className="text-white">uname -srm</strong> : Linux kernel specs</div>
            <div><strong className="text-white">cat &lt;file&gt;</strong> : Print file contents</div>
            <div><strong className="text-white">free -m</strong> : View memory pool</div>
            <div><strong className="text-white">clear</strong> : Clear screen</div>
          </div>
          <div className="pt-2 text-zinc-400 text-[10px]">
            Try complex pipes: <span className="text-amber-300">cat telemetry.log | grep ERR | wc -l</span> or <span className="text-cyan-300">./sensor_daemon &amp;</span>
          </div>
        </div>
      )
    } else if (lower === 'ls' || lower === 'ls -la' || lower === 'ls -l') {
      output = (
        <div className="space-y-0.5 text-zinc-300">
          <div className="text-zinc-500">total 148</div>
          <div>drwxr-xr-x  6 dev staff  4096 Nov 06 14:20 .</div>
          <div>drwxr-xr-x 12 dev staff  4096 Nov 06 14:10 ..</div>
          <div>-rwxr-xr-x  1 dev staff 38912 Nov 06 14:22 <span className="text-emerald-400 font-bold">apex_shell*</span></div>
          <div>-rw-r--r--  1 dev staff 18450 Nov 06 14:18 main.c</div>
          <div>-rw-r--r--  1 dev staff  8920 Nov 06 14:15 parser.c</div>
          <div>-rw-r--r--  1 dev staff  4310 Nov 06 14:12 signals.c</div>
          <div>-rw-r--r--  1 dev staff 64200 Nov 06 14:25 telemetry.log</div>
          <div>-rw-r--r--  1 dev staff  1024 Nov 06 14:00 Makefile</div>
        </div>
      )
    } else if (lower.includes('|')) {
      output = (
        <div className="space-y-1 text-zinc-300">
          <div className="text-cyan-300 font-bold">[PIPE CHAIN EVALUATED]</div>
          <div className="text-[10px] text-zinc-400">
            Pipeline: <code className="text-amber-300">cat telemetry.log</code> → <code className="text-amber-300">grep ERR</code> → <code className="text-amber-300">wc -l</code>
          </div>
          <div className="p-2 rounded bg-black/60 border border-white/10 text-emerald-400 font-mono text-sm">
            0 errors found across 4,200 telemetry frames (100% integrity)
          </div>
        </div>
      )
      setSignalLogs((prev) => [
        `[PIPE] pipe(p1) -> dup2(p1[1], STDOUT); pipe(p2) -> dup2(p2[0], STDIN). Clean IPC file descriptor handoff.`,
        ...prev.slice(0, 19)
      ])
    } else if (lower === 'ps' || lower === 'ps aux') {
      output = (
        <div className="space-y-0.5 text-zinc-300">
          <div className="text-zinc-500 font-mono">USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND</div>
          <div>dev       1401  0.1  0.1  24128  4120 pts/0    Ss   14:20   0:01 ./apex_shell</div>
          <div>dev       4092  0.4  0.2  18456  2840 pts/0    S    14:22   0:04 ./sensor_daemon &amp;</div>
          <div>dev       4120  0.2  0.1  12300  1640 pts/0    S    14:23   0:00 telemetry_sink</div>
          <div>dev       4190  0.0  0.0   8200   980 pts/0    R+   14:26   0:00 ps aux</div>
        </div>
      )
    } else if (lower === 'top') {
      output = (
        <div className="space-y-1 text-zinc-300">
          <div className="text-emerald-400 font-bold">top - 14:26:01 up 4 days, 1 user, load average: 0.08, 0.04, 0.01</div>
          <div>Tasks: 148 total, 1 running, 147 sleeping, 0 stopped, 0 zombie</div>
          <div>%Cpu(s): 1.4 us, 0.8 sy, 0.0 ni, 97.8 id, 0.0 wa, 0.0 hi, 0.0 si</div>
          <div>MiB Mem : 15820.4 total, 9420.2 free, 3420.1 used, 2980.1 buff/cache</div>
        </div>
      )
    } else if (lower === 'uname' || lower === 'uname -a' || lower === 'uname -srm') {
      output = <div className="text-emerald-400 font-mono">Linux 6.8.0-40-generic x86_64 GNU/Linux</div>
    } else if (lower.includes('cat')) {
      output = (
        <div className="space-y-0.5 text-zinc-300">
          <div className="text-zinc-500"># --- SENSOR TELEMETRY LOG [SAMPLE] ---</div>
          <div>[14:20:01] SENSOR_BMP280: 1013.25 hPa | ALT: 0.0m | CRC: 0x4E91 [OK]</div>
          <div>[14:20:02] SENSOR_MPU6050: PITCH: +1.2 | ROLL: -0.4 | STABLE</div>
          <div>[14:20:03] SENSOR_BMP280: 980.12 hPa | ALT: 280.4m | CRC: 0x1A2F [OK]</div>
          <div>[14:20:04] STATUS: NOMINAL FLIGHT SEQUENCE RUNNING</div>
        </div>
      )
    } else {
      output = (
        <div className="text-zinc-400">
          <span className="text-emerald-400">apex:</span> command not found: <code className="text-red-400">{cmd}</code>. Type <span className="text-white font-bold">&apos;help&apos;</span> to see available commands.
        </div>
      )
    }

    setHistory((prev) => [...prev, { cmd, output }])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      if (commandList.length > 0 && historyIndex < commandList.length - 1) {
        const nextIdx = historyIndex + 1
        setHistoryIndex(nextIdx)
        setInputVal(commandList[nextIdx])
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInputVal(commandList[nextIdx])
      } else {
        setHistoryIndex(-1)
        setInputVal('')
      }
    }
  }

  return (
    <div className="w-full bg-[#090a0d] text-[#e4e4e7] rounded-xl border border-white/10 overflow-hidden font-mono text-xs select-none shadow-2xl">
      {/* Top Header */}
      <div className="px-4 py-3 bg-[#101116] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/60 flex items-center justify-center font-bold text-cyan-400 text-xs">
            <Terminal className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-wider uppercase">
                ApexShell v2.4 // POSIX Unix Command Shell
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40">
                POSIX.1-2008 Compliant
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block">
              Multi-Stage Chained Pipelines • waitpid(WNOHANG) Zombie Reaper • Signals Trapped
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={spawnDaemon}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-extrabold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Spawn Daemon (&amp;)</span>
          </button>

          <button
            onClick={() => setHistory([])}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Screen</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#0c0d12] border-b border-white/10 text-[11px]">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'terminal'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Live Interactive POSIX Terminal
        </button>
        <button
          onClick={() => setActiveTab('signals')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'signals'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Kernel Signal &amp; Fork Log ({signalLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'source'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3 h-3 text-cyan-400" />
          <span>C99 Pipeline &amp; Fork Source Code</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5">
        {activeTab === 'terminal' && (
          <div className="space-y-4">
            {/* Quick Command Playground Chips */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-zinc-400 font-bold uppercase mr-1">One-Click Commands:</span>
              <button
                onClick={() => executeCommand('help')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold border border-white/10 cursor-pointer"
              >
                help
              </button>
              <button
                onClick={() => executeCommand('ls -la')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold border border-white/10 cursor-pointer"
              >
                ls -la
              </button>
              <button
                onClick={() => executeCommand('ps aux')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold border border-white/10 cursor-pointer"
              >
                ps aux
              </button>
              <button
                onClick={() => executeCommand('cat telemetry.log | grep ERR | wc -l')}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold border border-amber-500/40 cursor-pointer"
              >
                cat | grep | wc -l
              </button>
              <button
                onClick={() => executeCommand('top')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold border border-white/10 cursor-pointer"
              >
                top
              </button>
              <button
                onClick={() => executeCommand('uname -srm')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold border border-white/10 cursor-pointer"
              >
                uname -srm
              </button>
            </div>

            {/* Interactive Terminal Window */}
            <div className="p-4 rounded-xl bg-[#08090d] border border-white/15 shadow-inner space-y-2.5 max-h-80 overflow-y-auto">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  {item.cmd && (
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <span className="text-emerald-400 font-bold">dev@workstation:~/c-systems/apex$</span>
                      <span className="text-white font-bold">{item.cmd}</span>
                    </div>
                  )}
                  <div className="pl-2 leading-relaxed text-[11px]">{item.output}</div>
                </div>
              ))}

              {/* Active Command Input Line */}
              <div className="flex items-center gap-1.5 text-zinc-400 pt-2 border-t border-white/10">
                <span className="text-emerald-400 font-bold">dev@workstation:~/c-systems/apex$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type POSIX command here (or click chips above)..."
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[11px] placeholder-zinc-600 focus:ring-0"
                  autoFocus
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold cursor-pointer"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
              <div ref={terminalEndRef} />
            </div>

            {/* Live Process Table */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-white uppercase tracking-wider">
                  Active Unix Process Table (Kernel PID Supervision):
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">waitpid(WNOHANG) Active</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {processes.map((p) => (
                  <div
                    key={p.pid}
                    className="p-2.5 rounded-lg bg-black/80 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-white font-bold text-[10px]">
                        PID {p.pid} <span className="text-zinc-500">({p.command})</span>
                      </div>
                      <div className="text-[9px] text-zinc-400">
                        CPU: {p.cpu} • RAM: {p.mem}
                      </div>
                    </div>
                    {p.state !== 'ZOMBIE_REAPED' ? (
                      <button
                        onClick={() => killProcess(p.pid)}
                        className="px-2 py-0.5 rounded bg-red-500/20 hover:bg-red-500/40 text-red-400 text-[9px] font-bold border border-red-500/30 cursor-pointer"
                      >
                        kill -9
                      </button>
                    ) : (
                      <span className="text-[9px] text-zinc-500">REAPED</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Gauges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Piping Depth</span>
                  <span className="text-cyan-400">MULTI-STAGE</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  5 <span className="text-xs text-zinc-400 font-normal">Chained Stages</span>
                </div>
                <span className="text-[10px] text-zinc-500">pipe() / dup2() Syscalls</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Signals Trapped</span>
                  <span className="text-emerald-400">SIGACTION</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  3 <span className="text-xs text-zinc-400 font-normal">Core Signals</span>
                </div>
                <span className="text-[10px] text-zinc-500">SIGINT, SIGTSTP, SIGCHLD</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Zombie Leaks</span>
                  <span className="text-emerald-400">ZERO</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  0 <span className="text-xs text-zinc-400 font-normal">Zombies</span>
                </div>
                <span className="text-[10px] text-zinc-500">Clean waitpid() Harvest</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Terminal State</span>
                  <span className="text-amber-400">CANONICAL</span>
                </div>
                <div className="my-2 text-lg sm:text-xl font-extrabold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Preserved</span>
                </div>
                <span className="text-[10px] text-zinc-500">Ctrl+C / Ctrl+Z Safe</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">KERNEL SIGNAL DISPATCH &amp; FORK STREAM</span>
              <span className="text-[10px] text-zinc-500">sigaction(SIGCHLD) • Non-blocking loop active</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5 max-h-72 overflow-y-auto">
              {signalLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-zinc-300 py-0.5 border-b border-white/5">
                  <span className="text-zinc-500 select-none">[{i + 1}]</span>
                  <span
                    className={`leading-relaxed ${
                      log.includes('[SIGNAL]')
                        ? 'text-amber-300 font-bold'
                        : log.includes('[PIPE]')
                        ? 'text-cyan-300'
                        : log.includes('[FORK]')
                        ? 'text-emerald-400'
                        : 'text-zinc-400'
                    }`}
                  >
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">ApexShell PIPELINE &amp; SIGNAL SOURCE CODE (C99)</span>
              <span className="text-[10px] text-zinc-500">Target: POSIX.1-2008 Linux • Inter-process Pipes</span>
            </div>
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
{`#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <signal.h>

void sigchld_handler(int sig) {
    // Non-blocking waitpid prevents zombie accumulation while preserving interactive responsiveness
    int status;
    pid_t pid;
    while ((pid = waitpid(-1, &status, WNOHANG)) > 0) {
        // Harvested terminated child process without blocking the user's terminal
    }
}

void execute_pipeline(char*** commands, int num_cmds) {
    int pipefds[2 * (num_cmds - 1)];
    for (int i = 0; i < num_cmds - 1; i++) {
        if (pipe(pipefds + i * 2) < 0) {
            perror("pipe failure");
            return;
        }
    }

    for (int i = 0; i < num_cmds; i++) {
        pid_t pid = fork();
        if (pid == 0) {
            // Child: Redirect STDIN from previous pipe if not first command
            if (i != 0) {
                dup2(pipefds[(i - 1) * 2], STDIN_FILENO);
            }
            // Child: Redirect STDOUT to next pipe if not last command
            if (i != num_cmds - 1) {
                dup2(pipefds[i * 2 + 1], STDOUT_FILENO);
            }
            // Close all inherited pipe descriptors in child
            for (int j = 0; j < 2 * (num_cmds - 1); j++) {
                close(pipefds[j]);
            }
            execvp(commands[i][0], commands[i]);
            perror("execvp failed");
            exit(EXIT_FAILURE);
        }
    }

    // Parent closes all pipe ends and awaits foreground job completion
    for (int i = 0; i < 2 * (num_cmds - 1); i++) {
        close(pipefds[i]);
    }
    for (int i = 0; i < num_cmds; i++) {
        wait(NULL);
    }
}`}
            </pre>
          </div>
        )}
      </div>

      {/* Engineering Footer */}
      <div className="px-4 py-2.5 bg-[#0c0d12] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>ApexShell • POSIX Command Interpreter &amp; Process Pipeline Supervisor</span>
        </div>
        <span className="text-zinc-500">C99 • fork() / execvp() • Zero Zombie Leaks</span>
      </div>
    </div>
  )
}

export default ApexShellApp