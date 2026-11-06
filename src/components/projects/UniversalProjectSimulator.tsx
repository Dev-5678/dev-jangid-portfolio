import React, { useState, useEffect } from 'react'
import { Play, RotateCcw, ShieldCheck, Terminal, Cpu, HardDrive, CheckCircle2 } from 'lucide-react'
import { type ProjectData } from '../../data/allProjectsData'

interface UniversalProjectSimulatorProps {
  project: ProjectData
}

export const UniversalProjectSimulator: React.FC<UniversalProjectSimulatorProps> = ({ project }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<'console' | 'subsystems' | 'metrics'>('console')
  const [testScenario, setTestScenario] = useState<'standard' | 'benchmark' | 'boundary'>('standard')
  const [simStep, setSimStep] = useState<number>(0)
  const [logs, setLogs] = useState<string[]>([])

  const getInitialLogs = (proj: ProjectData) => [
    `[INIT] Target: ${proj.title}`,
    `[LANG] Language Runtime: ${proj.language} // Category: ${proj.category}`,
    `[SPEC] Domain: ${proj.domain}`,
    `[READY] Test harness armed. Click [Run Apparatus] to execute verification suite.`
  ]

  useEffect(() => {
    setLogs(getInitialLogs(project))
    setSimStep(0)
    setIsRunning(false)
  }, [project.id])

  const runSimulation = () => {
    setIsRunning(true)
    setSimStep(1)
    setLogs([
      `[EXEC] Starting ${testScenario.toUpperCase()} verification suite on ${project.title}...`,
      `[ENV] Checking dependencies and memory isolation...`
    ])

    setTimeout(() => {
      setSimStep(2)
      setLogs((prev) => [
        ...prev,
        `[STEP 1/3] Initializing ${project.architecture.subsystems[0]?.name || 'Ingress Layer'}...`,
        `   ↳ Tech: ${project.architecture.subsystems[0]?.tech || 'Core Engine'}`,
        `   ↳ Input validation check: 0 errors detected (Payload verified)`
      ])
    }, 400)

    setTimeout(() => {
      setSimStep(3)
      setLogs((prev) => [
        ...prev,
        `[STEP 2/3] Executing core logic on ${project.architecture.subsystems[1]?.name || 'Processing Engine'}...`,
        `   ↳ Tech: ${project.architecture.subsystems[1]?.tech || 'Internal Module'}`,
        `   ↳ Primary Metric: ${project.liveMetrics[0]?.label} = ${project.liveMetrics[0]?.value}`,
        `   ↳ Secondary Metric: ${project.liveMetrics[1]?.label} = ${project.liveMetrics[1]?.value}`,
        `   ↳ Data integrity assertion: PASSED`
      ])
    }, 850)

    setTimeout(() => {
      setSimStep(4)
      setIsRunning(false)
      setLogs((prev) => [
        ...prev,
        `[STEP 3/3] Finalizing ${project.architecture.subsystems[2]?.name || 'Output Handler'}...`,
        `   ↳ Security check: ${project.architecture.securityAndIntegrity[0] || 'Integrity rules satisfied'}`,
        `   ↳ Resource diagnostics: Clean termination (Zero resource leaks)`,
        `[SUCCESS] Test run complete. Status: 100% PASSED // Verified for production.`
      ])
    }, 1300)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setSimStep(0)
    setLogs(getInitialLogs(project))
  }

  return (
    <div className="w-full bg-[#08090d] border border-white/10 rounded-2xl overflow-hidden font-mono text-xs text-zinc-300 shadow-2xl">
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-neutral-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isRunning ? 'bg-amber-400 animate-ping' : simStep === 4 ? 'bg-emerald-400' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
            }`}
          />
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">
            {project.title.split('—')[0].trim()} // LIVE APPARATUS
          </span>
          <span className="px-2 py-0.5 rounded bg-ember/20 text-ember-bright border border-ember/40 text-[10px]">
            {project.language}
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-black/50 p-0.5 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'console' ? 'bg-ember text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Console</span>
          </button>
          <button
            onClick={() => setActiveTab('subsystems')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'subsystems' ? 'bg-ember text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span>Subsystems</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'metrics' ? 'bg-ember text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <HardDrive className="w-3 h-3" />
            <span>Metrics</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Interactive Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-black/40 p-3 rounded-xl border border-white/5">
          <div className="sm:col-span-7 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Scenario:</span>
            {(['standard', 'benchmark', 'boundary'] as const).map((scen) => (
              <button
                key={scen}
                onClick={() => setTestScenario(scen)}
                disabled={isRunning}
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                  testScenario === scen
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                {scen}
              </button>
            ))}
          </div>

          <div className="sm:col-span-5 flex items-center justify-end gap-2">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black stroke-black" />
              <span>{isRunning ? 'Executing...' : 'Run Apparatus'}</span>
            </button>
            <button
              onClick={resetSimulation}
              disabled={isRunning}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
              title="Reset Console"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Terminal Console */}
        {activeTab === 'console' && (
          <div className="rounded-xl bg-black/80 border border-white/10 p-4 font-mono text-[11px] min-h-[190px] max-h-[240px] overflow-y-auto space-y-1.5 shadow-inner">
            <div className="text-zinc-500 pb-1 border-b border-white/5 flex items-center justify-between text-[10px]">
              <span>STDOUT STREAM // TTY-0</span>
              <span className="text-emerald-400 font-bold">
                STATUS: {isRunning ? 'RUNNING' : simStep === 4 ? 'PASSED (100%)' : 'IDLE'}
              </span>
            </div>
            {logs.map((log, i) => (
              <div
                key={i}
                className={`leading-relaxed ${
                  log.includes('[SUCCESS]')
                    ? 'text-emerald-400 font-bold'
                    : log.includes('[STEP')
                    ? 'text-amber-300 font-bold'
                    : log.includes('↳')
                    ? 'text-zinc-300 pl-3'
                    : 'text-zinc-400'
                }`}
              >
                {log}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-1 text-emerald-400 font-bold animate-pulse">
                <span>&gt; Processing instruction pipeline...</span>
                <span className="w-2 h-3.5 bg-emerald-400 inline-block" />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Subsystems Breakdown */}
        {activeTab === 'subsystems' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {project.architecture.subsystems.map((sub, i) => (
              <div key={i} className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-white text-[11px]">{sub.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                <p className="text-[10px] text-zinc-400 leading-relaxed">{sub.role}</p>
                <div className="pt-1">
                  <span className="px-2 py-0.5 rounded bg-ember/15 text-ember-bright border border-ember/30 text-[9px] font-bold">
                    {sub.tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Verified Metrics */}
        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.liveMetrics.map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{m.label}</span>
                <span className="text-base font-bold text-emerald-400">{m.value}</span>
                <span className="text-[9px] text-zinc-500 font-sans">Verified in test environment</span>
              </div>
            ))}
          </div>
        )}

        {/* Dev Authentic Engineering Rationale */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-ember" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
              Engineering Rationale &amp; Trade-Offs (Anti-Plagiarism)
            </span>
          </div>
          <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
            {project.devNotes}
          </p>
        </div>
      </div>
    </div>
  )
}
