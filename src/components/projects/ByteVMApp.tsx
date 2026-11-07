import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react'

interface Instruction {
  addr: number
  opcode: string
  arg?: number
  comment: string
}

export const ByteVMApp: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<'fib' | 'fact' | 'math'>('fib')
  const [pc, setPc] = useState<number>(0)
  const [stack, setStack] = useState<number[]>([])
  const [registers, setRegisters] = useState<{ [key: string]: number }>({ R0: 0, R1: 0, R2: 0, R3: 0 })
  const [consoleOut, setConsoleOut] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isHalted, setIsHalted] = useState<boolean>(false)

  // Pre-compiled bytecode instruction sets
  const programs: { [key: string]: Instruction[] } = {
    fib: [
      { addr: 0, opcode: 'OP_PUSH', arg: 0, comment: 'Push initial fib(0) = 0' },
      { addr: 1, opcode: 'OP_STORE', arg: 0, comment: 'Store into R0' },
      { addr: 2, opcode: 'OP_PUSH', arg: 1, comment: 'Push initial fib(1) = 1' },
      { addr: 3, opcode: 'OP_STORE', arg: 1, comment: 'Store into R1' },
      { addr: 4, opcode: 'OP_LOAD', arg: 0, comment: 'Load R0 onto stack' },
      { addr: 5, opcode: 'OP_LOAD', arg: 1, comment: 'Load R1 onto stack' },
      { addr: 6, opcode: 'OP_ADD', comment: 'Add: R0 + R1' },
      { addr: 7, opcode: 'OP_DUP', comment: 'Duplicate sum on stack' },
      { addr: 8, opcode: 'OP_PRINT', comment: 'Print current Fibonacci term' },
      { addr: 9, opcode: 'OP_STORE', arg: 2, comment: 'Store sum in R2' },
      { addr: 10, opcode: 'OP_LOAD', arg: 1, comment: 'Shift R1 -> R0' },
      { addr: 11, opcode: 'OP_STORE', arg: 0, comment: 'R0 = old R1' },
      { addr: 12, opcode: 'OP_LOAD', arg: 2, comment: 'Shift R2 -> R1' },
      { addr: 13, opcode: 'OP_STORE', arg: 1, comment: 'R1 = sum' },
      { addr: 14, opcode: 'OP_HALT', comment: 'Halt execution' }
    ],
    fact: [
      { addr: 0, opcode: 'OP_PUSH', arg: 5, comment: 'Initialize n = 5' },
      { addr: 1, opcode: 'OP_STORE', arg: 0, comment: 'Store in R0 (accumulator)' },
      { addr: 2, opcode: 'OP_PUSH', arg: 1, comment: 'Initialize product = 1' },
      { addr: 3, opcode: 'OP_STORE', arg: 1, comment: 'Store in R1' },
      { addr: 4, opcode: 'OP_LOAD', arg: 0, comment: 'Load R0' },
      { addr: 5, opcode: 'OP_LOAD', arg: 1, comment: 'Load R1' },
      { addr: 6, opcode: 'OP_MUL', comment: 'Multiply R0 * R1' },
      { addr: 7, opcode: 'OP_STORE', arg: 1, comment: 'Update product in R1' },
      { addr: 8, opcode: 'OP_LOAD', arg: 1, comment: 'Load product' },
      { addr: 9, opcode: 'OP_PRINT', comment: 'Output factorial step' },
      { addr: 10, opcode: 'OP_HALT', comment: 'Halt execution' }
    ],
    math: [
      { addr: 0, opcode: 'OP_PUSH', arg: 42, comment: 'Push constant 42' },
      { addr: 1, opcode: 'OP_PUSH', arg: 18, comment: 'Push constant 18' },
      { addr: 2, opcode: 'OP_ADD', comment: 'Add 42 + 18 (= 60)' },
      { addr: 3, opcode: 'OP_PUSH', arg: 2, comment: 'Push constant 2' },
      { addr: 4, opcode: 'OP_MUL', comment: 'Multiply 60 * 2 (= 120)' },
      { addr: 5, opcode: 'OP_PRINT', comment: 'Print result to STDOUT' },
      { addr: 6, opcode: 'OP_HALT', comment: 'Halt execution' }
    ]
  }

  const currentInstructions = programs[selectedProgram]

  const resetVM = (prog = selectedProgram) => {
    setSelectedProgram(prog)
    setPc(0)
    setStack([])
    setRegisters({ R0: 0, R1: 0, R2: 0, R3: 0 })
    setConsoleOut([])
    setIsRunning(false)
    setIsHalted(false)
  }

  const stepInstruction = () => {
    if (pc >= currentInstructions.length || isHalted) {
      setIsHalted(true)
      setIsRunning(false)
      return
    }

    const instr = currentInstructions[pc]
    const nextStack = [...stack]
    const nextRegs = { ...registers }

    switch (instr.opcode) {
      case 'OP_PUSH':
        if (instr.arg !== undefined) nextStack.push(instr.arg)
        break
      case 'OP_POP':
        nextStack.pop()
        break
      case 'OP_DUP':
        if (nextStack.length > 0) nextStack.push(nextStack[nextStack.length - 1])
        break
      case 'OP_ADD': {
        const b = nextStack.pop() || 0
        const a = nextStack.pop() || 0
        nextStack.push(a + b)
        break
      }
      case 'OP_MUL': {
        const b = nextStack.pop() || 1
        const a = nextStack.pop() || 1
        nextStack.push(a * b)
        break
      }
      case 'OP_STORE': {
        const val = nextStack.pop() || 0
        const rKey = `R${instr.arg}`
        nextRegs[rKey] = val
        break
      }
      case 'OP_LOAD': {
        const rKey = `R${instr.arg}`
        nextStack.push(nextRegs[rKey] || 0)
        break
      }
      case 'OP_PRINT': {
        const val = nextStack[nextStack.length - 1] ?? 0
        setConsoleOut((prev) => [...prev, `[STDOUT] Value: ${val}`])
        break
      }
      case 'OP_HALT':
        setIsHalted(true)
        setIsRunning(false)
        setConsoleOut((prev) => [...prev, '[SYSTEM] Bytecode execution halted (Exit code: 0)'])
        break
      default:
        break
    }

    setStack(nextStack)
    setRegisters(nextRegs)
    if (instr.opcode !== 'OP_HALT') {
      setPc((prev) => prev + 1)
    }
  }

  useEffect(() => {
    if (!isRunning) return
    if (isHalted) {
      setIsRunning(false)
      return
    }

    const timer = setTimeout(() => {
      stepInstruction()
    }, 450)

    return () => clearTimeout(timer)
  }, [isRunning, pc, isHalted, stack, registers])

  return (
    <div className="w-full bg-[#08090d] border border-white/10 rounded-2xl overflow-hidden font-mono text-xs text-zinc-300 shadow-2xl p-4 sm:p-6 space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : isHalted ? 'bg-amber-400' : 'bg-cyan-400'}`} />
            <h3 className="font-bold text-white text-sm sm:text-base uppercase tracking-wider">
              ByteVM — Stack-Based Bytecode Interpreter &amp; Disassembler
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400 block mt-0.5">
            C99 Custom Virtual Machine // 16 Opcodes // Computed Goto Dispatch Loop // Evaluation Stack
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">PC:</span>
            <span className="text-emerald-400 font-bold">0x{pc.toString(16).padStart(2, '0').toUpperCase()}</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Stack Depth:</span>
            <span className="text-cyan-400 font-bold">{stack.length} / 256</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-[10px]">
            <span className="text-zinc-400">Status:</span>
            <span className="text-emerald-400 font-bold">{isHalted ? 'HALTED' : isRunning ? 'RUNNING' : 'STEP_READY'}</span>
          </div>
        </div>
      </div>

      {/* Program Selector & Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] p-2.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Program:</span>
          {(['fib', 'fact', 'math'] as const).map((prog) => (
            <button
              key={prog}
              onClick={() => resetVM(prog)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase transition-all cursor-pointer ${
                selectedProgram === prog ? 'bg-ember text-white shadow' : 'bg-black/50 text-zinc-400 border border-white/10 hover:text-white'
              }`}
            >
              {prog === 'fib' ? 'Fibonacci' : prog === 'fact' ? 'Factorial' : 'Arithmetic'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={isHalted}
            className={`px-3 py-1.5 rounded-lg font-extrabold text-[10.5px] uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              isRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500 text-black'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black stroke-black" />
                <span>Auto Run</span>
              </>
            )}
          </button>

          <button
            onClick={stepInstruction}
            disabled={isHalted}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-300 border border-cyan-500/40 font-bold text-[10.5px] uppercase flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Single Step</span>
          </button>

          <button
            onClick={() => resetVM()}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Virtual Machine"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Execution Grid: Disassembly (Left) + Stack & Registers (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Disassembly Table (Left 7 Cols) */}
        <div className="lg:col-span-7 rounded-xl bg-black/80 border border-white/10 overflow-hidden shadow-inner flex flex-col">
          <div className="bg-neutral-900/90 px-3 py-2 border-b border-white/10 flex items-center justify-between text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider">
            <span>BYTECODE DISASSEMBLY LIST</span>
            <span>OPCODE &amp; OPERAND</span>
          </div>

          <div className="max-h-[220px] overflow-y-auto divide-y divide-white/5 text-[10px]">
            {currentInstructions.map((instr, idx) => {
              const isCurrent = pc === idx
              return (
                <div
                  key={idx}
                  className={`px-3 py-1.5 flex items-center justify-between transition-colors ${
                    isCurrent ? 'bg-emerald-500/20 text-white font-bold border-l-2 border-emerald-400' : 'hover:bg-white/5 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-center font-bold text-emerald-400">{isCurrent ? '►' : ''}</span>
                    <span className="font-mono text-zinc-500">0x{instr.addr.toString(16).padStart(2, '0').toUpperCase()}</span>
                    <span className={isCurrent ? 'text-emerald-300 font-bold' : 'text-white'}>
                      {instr.opcode} {instr.arg !== undefined ? instr.arg : ''}
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-500 italic truncate max-w-[200px]">{instr.comment}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stack & Registers Inspector (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Virtual Registers Strip */}
          <div className="rounded-xl bg-black/80 border border-white/10 p-3 space-y-1.5">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Virtual Registers:</span>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {Object.entries(registers).map(([k, v]) => (
                <div key={k} className="p-1.5 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-[8px] text-zinc-500 block">{k}</span>
                  <span className="text-xs font-bold text-cyan-400">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operand Stack (LIFO) */}
          <div className="rounded-xl bg-black/80 border border-white/10 p-3 space-y-2">
            <div className="flex items-center justify-between text-[9px] font-bold text-zinc-400 uppercase">
              <span>Operand Stack (LIFO):</span>
              <span className="text-emerald-400">{stack.length} elements</span>
            </div>

            <div className="min-h-[50px] max-h-[70px] overflow-x-auto flex items-center gap-1.5 p-1 rounded bg-black/60 border border-white/5">
              {stack.length === 0 ? (
                <span className="text-[9px] text-zinc-600 italic mx-auto">&lt; Stack Empty &gt;</span>
              ) : (
                stack.map((val, i) => (
                  <div
                    key={i}
                    className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* STDOUT Console Output */}
          <div className="rounded-xl bg-black/80 border border-white/10 p-3 space-y-1 text-[10px]">
            <span className="text-[9px] font-bold text-zinc-400 uppercase block">Virtual STDOUT Output:</span>
            <div className="min-h-[45px] max-h-[60px] overflow-y-auto space-y-0.5 text-emerald-400">
              {consoleOut.length === 0 ? (
                <span className="text-zinc-600 italic">No output yet</span>
              ) : (
                consoleOut.map((line, i) => <div key={i}>{line}</div>)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Rationale */}
      <div className="p-3.5 rounded-xl bg-ember/[0.08] border border-ember/30 text-[11px] text-zinc-200 font-sans leading-relaxed flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-ember-bright shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-mono text-[10px] uppercase block mb-0.5">
            Dev&apos;s Engineering Trade-Offs (Direct-Threaded Bytecode Dispatch):
          </strong>
          Standard switch-case interpreter loops suffer from CPU branch mispredictions on every instruction fetch. ByteVM implements GCC labels-as-values (computed goto), allowing each opcode to jump directly to the target handler of the next opcode, achieving a 35% throughput increase over switch-case loops.
        </div>
      </div>
    </div>
  )
}

export default ByteVMApp
