import React, { useState, useRef, useEffect } from 'react'
import { ShieldCheck, CornerDownLeft } from 'lucide-react'

export const ApexShellApp: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('')
  const [history, setHistory] = useState<Array<{ cmd?: string; output: string | React.ReactNode; isError?: boolean }>>([
    {
      output: (
        <div className="space-y-1 text-zinc-400">
          <div className="text-white font-bold">ApexShell v2.4 (x86_64-pc-linux-gnu POSIX.1-2008 compliant)</div>
          <div>Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to see available commands or click the shortcut buttons above.</div>
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

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim()
    if (!cmd) return

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
          <div className="text-emerald-400 font-bold">Supported Built-in Commands:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[10px]">
            <div><strong className="text-white">ls -la</strong> : List directory files</div>
            <div><strong className="text-white">ps aux</strong> : List active processes</div>
            <div><strong className="text-white">top</strong> : System CPU &amp; RAM load</div>
            <div><strong className="text-white">uname -a</strong> : OS kernel info</div>
            <div><strong className="text-white">cat &lt;file&gt;</strong> : Print file contents</div>
            <div><strong className="text-white">clear</strong> : Clear terminal</div>
          </div>
          <div className="pt-2 text-zinc-400 text-[10px]">
            Try piping: <span className="text-amber-300">cat telemetry.log | grep ERR</span> or <span className="text-cyan-300">./sensor_logger &amp;</span>
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
    } else if (lower === 'ps' || lower === 'ps aux') {
      output = (
        <div className="space-y-0.5 text-zinc-300">
          <div className="text-zinc-400 font-bold">USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND</div>
          <div>root         1  0.0  0.1  22560  4096 ?        Ss   09:00   0:01 /sbin/init</div>
          <div>dev        842  0.1  0.3  42100  9200 pts/0    Ss   14:10   0:00 /bin/bash</div>
          <div>dev       1204  0.4  0.5  64800 12400 pts/0    S+   14:20   0:02 <span className="text-emerald-400 font-bold">./apex_shell</span></div>
          <div>dev       1420  0.0  0.2  18200  4100 pts/0    S    14:22   0:00 [433MHz_UHF_Daemon]</div>
        </div>
      )
    } else if (lower.includes('grep')) {
      output = (
        <div className="space-y-0.5 text-zinc-300">
          <div className="text-zinc-500">[PIPE] Piped stdout of &apos;cat telemetry.log&apos; (fd: 3) into stdin of &apos;grep&apos; (fd: 4)...</div>
          <div className="text-red-400">[14:25:01.402] ERR: Radio packet checksum mismatch at byte 14 (CRC: 0x9B12 != 0xA4F2)</div>
          <div className="text-red-400">[14:25:03.884] ERR: Sensor bus I2C timeout on slave 0x68 (MPU6050 retry count: 1)</div>
          <div className="text-emerald-400">[14:25:04.002] RECOVERED: Hardware timer tick reset bus. Frame successfully synchronized.</div>
        </div>
      )
    } else if (lower === 'top') {
      output = (
        <div className="space-y-1 text-zinc-300">
          <div className="text-emerald-400 font-bold">top - 14:32:00 up 5:32,  1 user,  load average: 0.12, 0.08, 0.05</div>
          <div>Tasks: 94 total, 1 running, 93 sleeping, 0 stopped, 0 zombie (Reaped via waitpid)</div>
          <div>%Cpu(s):  1.2 us,  0.4 sy,  0.0 ni, 98.4 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st</div>
          <div>MiB Mem :  16384.0 total,   9420.0 free,   3840.0 used,   3124.0 buff/cache</div>
        </div>
      )
    } else if (lower === 'uname -a' || lower === 'uname') {
      output = 'Linux dev-workstation 6.6.0-x86_64-posix #1 SMP PREEMPT_DYNAMIC GNU/Linux'
    } else if (lower.startsWith('echo ')) {
      output = cmd.substring(5)
    } else if (lower.endsWith('&')) {
      const pid = Math.floor(Math.random() * 4000 + 1000)
      output = (
        <div className="text-zinc-300">
          <span className="text-emerald-400 font-bold">[1] {pid}</span> (Spawned in background. Monitored via non-blocking waitpid(WNOHANG))
        </div>
      )
    } else {
      output = (
        <div className="text-red-400">
          apex: command not found: {cmd}. Type &apos;help&apos; for list of commands.
        </div>
      )
    }

    setHistory((prev) => [...prev, { cmd, output }])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    }
  }

  return (
    <div className="w-full bg-[#08090d] border border-white/10 rounded-2xl overflow-hidden font-mono text-xs text-zinc-300 shadow-2xl p-4 sm:p-6 space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-bold text-white text-sm sm:text-base uppercase tracking-wider">
              ApexShell — POSIX Unix Command Shell &amp; Process Supervisor
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400 block mt-0.5">
            C99 POSIX Sockets &amp; Pipes // Multi-Stage Chaining (|) // Background Job Reaping (waitpid)
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Pipes:</span>
            <span className="text-emerald-400 font-bold">Multi-Stage (|)</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Signals:</span>
            <span className="text-cyan-400 font-bold">SIGCHLD Trapped</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Zombie Leaks:</span>
            <span className="text-emerald-400 font-bold">0 Leaks</span>
          </div>
        </div>
      </div>

      {/* One-Click Quick Command Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white/[0.02] p-2.5 rounded-xl border border-white/10">
        <span className="text-[10px] text-zinc-400 font-bold uppercase mr-1">Quick Commands:</span>
        {[
          'help',
          'ls -la',
          'ps aux',
          'cat telemetry.log | grep ERR',
          'top',
          './sensor_daemon &'
        ].map((c) => (
          <button
            key={c}
            onClick={() => executeCommand(c)}
            className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 text-[10px] font-mono transition-all cursor-pointer"
          >
            {c}
          </button>
        ))}
        <button
          onClick={() => setHistory([])}
          className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/35 text-red-300 border border-red-500/30 text-[10px] font-mono transition-all ml-auto cursor-pointer"
        >
          Clear Screen
        </button>
      </div>

      {/* Interactive Terminal Window */}
      <div className="rounded-xl bg-black/90 border border-white/15 p-4 font-mono text-[11px] min-h-[220px] max-h-[300px] overflow-y-auto space-y-3 shadow-inner">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.cmd && (
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="text-emerald-400 font-bold">dev@workstation:~/c-systems/apex$</span>
                <span className="text-white font-bold">{item.cmd}</span>
              </div>
            )}
            <div className="pl-2 leading-relaxed">{item.output}</div>
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-1.5 text-zinc-400 pt-1">
          <span className="text-emerald-400 font-bold">dev@workstation:~/c-systems/apex$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command here (e.g. ls -la, ps, help)..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[11px] placeholder-zinc-600 focus:ring-0"
            autoFocus
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1 rounded bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold cursor-pointer"
          >
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Engineering Rationale */}
      <div className="p-3.5 rounded-xl bg-ember/[0.08] border border-ember/30 text-[11px] text-zinc-200 font-sans leading-relaxed flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-ember-bright shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-mono text-[10px] uppercase block mb-0.5">
            Dev&apos;s Engineering Trade-Offs (POSIX Process &amp; Pipe Architecture):
          </strong>
          Handling child process lifecycles in Unix requires strict signal management. In ApexShell, pipes are created using pipe() and dup2() syscalls with automatic closing of unused file descriptors in child processes, preventing descriptor leaks. Background jobs trap SIGCHLD signals and harvest exited children via non-blocking waitpid(WNOHANG) loops to eliminate zombie processes.
        </div>
      </div>
    </div>
  )
}

export default ApexShellApp
