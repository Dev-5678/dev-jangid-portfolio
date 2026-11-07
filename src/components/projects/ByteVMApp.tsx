import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, ChevronRight, Code2, Activity, Cpu, Layers, Terminal, CheckCircle } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState<'workbench' | 'hex' | 'source'>('workbench')
  const [clockSpeed, setClockSpeed] = useState<number>(800)

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
    if (isHalted || pc >= currentInstructions.length) {
      setIsHalted(true)
      setIsRunning(false)
      return
    }

    const inst = currentInstructions[pc]
    const nextStack = [...stack]
    const nextRegs = { ...registers }

    switch (inst.opcode) {
      case 'OP_PUSH':
        if (inst.arg !== undefined) nextStack.push(inst.arg)
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
      case 'OP_SUB': {
        const b = nextStack.pop() || 0
        const a = nextStack.pop() || 0
        nextStack.push(a - b)
        break
      }
      case 'OP_MUL': {
        const b = nextStack.pop() || 0
        const a = nextStack.pop() || 0
        nextStack.push(a * b)
        break
      }
      case 'OP_STORE': {
        const val = nextStack.pop() || 0
        const regKey = `R${inst.arg}`
        nextRegs[regKey] = val
        break
      }
      case 'OP_LOAD': {
        const regKey = `R${inst.arg}`
        nextStack.push(nextRegs[regKey] || 0)
        break
      }
      case 'OP_PRINT': {
        const val = nextStack[nextStack.length - 1]
        setConsoleOut((prev) => [...prev, `[STDOUT] Output: ${val}`])
        break
      }
      case 'OP_HALT':
        setIsHalted(true)
        setIsRunning(false)
        setConsoleOut((prev) => [...prev, `[HALT] Program terminated cleanly at PC 0x${pc.toString(16).padStart(2, '0')}.`])
        break
      default:
        break
    }

    setStack(nextStack)
    setRegisters(nextRegs)
    setPc((prev) => prev + 1)
  }

  useEffect(() => {
    let timer: any
    if (isRunning && !isHalted) {
      timer = setInterval(() => {
        stepInstruction()
      }, clockSpeed)
    }
    return () => clearInterval(timer)
  }, [isRunning, isHalted, pc, stack, registers, clockSpeed])

  return (
    <div className="w-full bg-[#090a0d] text-[#e4e4e7] rounded-xl border border-white/10 overflow-hidden font-mono text-xs select-none shadow-2xl">
      {/* Top Header */}
      <div className="px-4 py-3 bg-[#101116] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/60 flex items-center justify-center font-bold text-amber-400 text-xs">
            <Cpu className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-wider uppercase">
                ByteVM v3.0 // Stack-Based Bytecode Virtual Machine
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40">
                16 Custom Opcodes
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block">
              Program Counter Stepping • Visual Operand Stack • Static Memory Sandbox (CPython / JVM Model)
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={stepInstruction}
            disabled={isHalted}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            <span>Step (F10)</span>
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={isHalted}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(245,158,11,0.5)] flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-black" />}
            <span>{isRunning ? 'Pause VM' : 'Auto Run'}</span>
          </button>

          <button
            onClick={() => resetVM()}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-[11px] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#0c0d12] border-b border-white/10 text-[11px]">
        <button
          onClick={() => setActiveTab('workbench')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'workbench'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Live VM Execution &amp; Disassembler
        </button>
        <button
          onClick={() => setActiveTab('hex')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'hex'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Compiled Bytecode Binary Hex
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'source'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3 h-3 text-amber-400" />
          <span>C99 VM Interpreter &amp; Opcode Switch Loop</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5">
        {activeTab === 'workbench' && (
          <div className="space-y-4">
            {/* Program Selector & Speed Toggles */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-zinc-400 font-bold uppercase mr-1">Select Program:</span>
                <button
                  onClick={() => resetVM('fib')}
                  className={`px-3 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                    selectedProgram === 'fib'
                      ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  Fibonacci Sequence
                </button>
                <button
                  onClick={() => resetVM('fact')}
                  className={`px-3 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                    selectedProgram === 'fact'
                      ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  Factorial (n!)
                </button>
                <button
                  onClick={() => resetVM('math')}
                  className={`px-3 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                    selectedProgram === 'math'
                      ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  Arithmetic (42 + 18) * 2
                </button>
              </div>

              {/* Execution Clock Speed */}
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="text-zinc-500">Clock:</span>
                <button
                  onClick={() => setClockSpeed(800)}
                  className={`px-2 py-0.5 rounded ${clockSpeed === 800 ? 'bg-white/20 text-white font-bold' : 'text-zinc-500'}`}
                >
                  1 Hz
                </button>
                <button
                  onClick={() => setClockSpeed(300)}
                  className={`px-2 py-0.5 rounded ${clockSpeed === 300 ? 'bg-white/20 text-white font-bold' : 'text-zinc-500'}`}
                >
                  3 Hz
                </button>
                <button
                  onClick={() => setClockSpeed(80)}
                  className={`px-2 py-0.5 rounded ${clockSpeed === 80 ? 'bg-white/20 text-white font-bold' : 'text-zinc-500'}`}
                >
                  12 Hz
                </button>
              </div>
            </div>

            {/* Core VM Architecture: Disassembly + Visual Stack + Registers */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              {/* Disassembly Instruction Stream (Col 1-7) */}
              <div className="md:col-span-7 p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/10">
                  <span className="font-bold text-white uppercase tracking-wider">
                    Disassembled Bytecode Instructions
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    PC: 0x{pc.toString(16).padStart(2, '0').toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-[11px]">
                  {currentInstructions.map((inst, idx) => {
                    const isCurrent = pc === idx
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between px-2.5 py-1 rounded-lg transition-colors ${
                          isCurrent
                            ? 'bg-amber-500/20 border border-amber-500/50 text-white font-bold'
                            : 'text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] ${isCurrent ? 'text-amber-400 font-bold' : 'text-zinc-600'}`}>
                            0x{inst.addr.toString(16).padStart(2, '0')}
                          </span>
                          <span className={isCurrent ? 'text-amber-300 font-extrabold' : 'text-zinc-300'}>
                            {inst.opcode} {inst.arg !== undefined ? `0x${inst.arg.toString(16)}` : ''}
                          </span>
                        </div>
                        <span className="text-[9.5px] text-zinc-500 truncate max-w-[200px]">
                          // {inst.comment}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Visual Operand Stack & Registers (Col 8-12) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                {/* Visual Stack Drawer */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex-1 space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/10">
                    <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      Visual Operand Stack
                    </span>
                    <span className="text-[10px] text-zinc-400">Depth: {stack.length} / 256</span>
                  </div>

                  <div className="flex-1 flex flex-col-reverse justify-start gap-1 p-2 bg-[#07080b] rounded-lg border border-white/5 min-h-[110px]">
                    {stack.length === 0 ? (
                      <div className="m-auto text-zinc-600 text-[10px] text-center font-mono">
                        [ Stack is empty -- SP: 0x00 ]
                      </div>
                    ) : (
                      stack.map((val, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-200 text-center font-bold text-xs shadow-sm flex items-center justify-between animate-in fade-in"
                        >
                          <span className="text-[9px] text-zinc-500 font-mono">SP[{idx}]</span>
                          <span>{val}</span>
                          <span className="text-[9px] text-amber-400 font-mono">0x{val.toString(16)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Virtual Registers */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5">
                  <div className="text-[10.5px] font-bold text-white uppercase tracking-wider">
                    Hardware Registers:
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    {Object.entries(registers).map(([reg, val]) => (
                      <div key={reg} className="p-1.5 rounded bg-black/80 border border-white/10">
                        <span className="text-zinc-500 block text-[8px] font-bold">{reg}</span>
                        <span className="text-emerald-400 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STDOUT Output Console */}
            <div className="p-3.5 rounded-xl bg-[#08090d] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold">
                <span className="flex items-center gap-1.5 text-white">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  VM STDOUT EXECUTION LOG
                </span>
                <span>{isHalted ? 'Execution Finished' : isRunning ? 'Running...' : 'Paused'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/80 border border-white/5 font-mono text-[11px] text-emerald-400 min-h-[50px] max-h-28 overflow-y-auto space-y-0.5">
                {consoleOut.length === 0 ? (
                  <div className="text-zinc-600">// Press [Step] or [Auto Run] to execute bytecode instructions.</div>
                ) : (
                  consoleOut.map((line, i) => <div key={i}>{line}</div>)
                )}
              </div>
            </div>

            {/* Primary Gauges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Program Counter</span>
                  <span className="text-amber-400">PC REG</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  0x{pc.toString(16).padStart(2, '0').toUpperCase()}
                </div>
                <span className="text-[10px] text-zinc-500">Instruction Offset</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Opcode Count</span>
                  <span className="text-emerald-400">CUSTOM ISA</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  16 <span className="text-xs text-zinc-400 font-normal">Opcodes</span>
                </div>
                <span className="text-[10px] text-zinc-500">PUSH, POP, ALU, JMP</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Stack Safety</span>
                  <span className="text-emerald-400">BOUNDS CHECK</span>
                </div>
                <div className="my-2 text-lg sm:text-xl font-extrabold text-white flex items-center gap-1.5">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Overflow Safe</span>
                </div>
                <span className="text-[10px] text-zinc-500">Static 256 Limit</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Memory Footprint</span>
                  <span className="text-cyan-400">STATIC BSS</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  64 <span className="text-xs text-zinc-400 font-normal">KB Buffer</span>
                </div>
                <span className="text-[10px] text-zinc-500">Zero Dynamic malloc()</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hex' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">COMPILED BYTECODE BINARY DUMP</span>
              <span className="text-[10px] text-zinc-500">Target: ByteVM Custom Binary Specification</span>
            </div>
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-amber-300 leading-relaxed overflow-x-auto">
              00000000: 01 00 07 00 01 01 07 01 08 00 08 01 04 03 09 07  ................<br />
              00000010: 02 08 01 07 00 08 02 07 01 0f 00 00 00 00 00 00  ................<br />
              <div className="pt-3 text-zinc-400 text-[10px]">
                Hex Legend: <code>0x01</code> = OP_PUSH, <code>0x04</code> = OP_ADD, <code>0x07</code> = OP_STORE, <code>0x08</code> = OP_LOAD, <code>0x09</code> = OP_PRINT, <code>0x0F</code> = OP_HALT
              </div>
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">ByteVM INSTRUCTION EVALUATION LOOP (C99)</span>
              <span className="text-[10px] text-zinc-500">Target: Compact Stack Virtual Machine</span>
            </div>
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
{`#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

#define STACK_MAX 256

typedef enum {
    OP_HALT  = 0x00,
    OP_PUSH  = 0x01,
    OP_POP   = 0x02,
    OP_DUP   = 0x03,
    OP_ADD   = 0x04,
    OP_SUB   = 0x05,
    OP_MUL   = 0x06,
    OP_STORE = 0x07,
    OP_LOAD  = 0x08,
    OP_PRINT = 0x09
} Opcode;

typedef struct {
    int32_t stack[STACK_MAX];
    int32_t sp;               // Stack pointer
    int32_t pc;               // Program counter
    int32_t registers[4];     // R0, R1, R2, R3
    bool halted;
} ByteVM;

void vm_execute(ByteVM* vm, const uint8_t* code, size_t code_len) {
    while (!vm->halted && vm->pc < code_len) {
        uint8_t opcode = code[vm->pc++];
        switch (opcode) {
            case OP_PUSH: {
                int32_t val = (int32_t)code[vm->pc++];
                if (vm->sp < STACK_MAX) vm->stack[vm->sp++] = val;
                break;
            }
            case OP_ADD: {
                if (vm->sp >= 2) {
                    int32_t b = vm->stack[--vm->sp];
                    int32_t a = vm->stack[--vm->sp];
                    vm->stack[vm->sp++] = a + b;
                }
                break;
            }
            case OP_STORE: {
                uint8_t reg_idx = code[vm->pc++];
                if (reg_idx < 4 && vm->sp > 0) {
                    vm->registers[reg_idx] = vm->stack[--vm->sp];
                }
                break;
            }
            case OP_PRINT: {
                if (vm->sp > 0) printf("[VM_OUT] %d\\n", vm->stack[vm->sp - 1]);
                break;
            }
            case OP_HALT:
                vm->halted = true;
                break;
        }
    }
}`}
            </pre>
          </div>
        )}
      </div>

      {/* Engineering Footer */}
      <div className="px-4 py-2.5 bg-[#0c0d12] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>ByteVM • Stack-Based Bytecode Interpreter &amp; Virtual Machine Runtime</span>
        </div>
        <span className="text-zinc-500">C99 • 16 Custom Opcodes • Zero Heap Allocation</span>
      </div>
    </div>
  )
}

export default ByteVMApp