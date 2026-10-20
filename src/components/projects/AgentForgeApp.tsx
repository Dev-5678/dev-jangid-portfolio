import React from 'react'

export const AgentForgeApp: React.FC = () => {
  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <h3 className="font-mono text-lg font-bold text-purple-400">AgentForge // DAG Runtime Preview</h3>
        <span className="px-2 py-0.5 text-xs font-mono bg-purple-950 text-purple-300 rounded border border-purple-800">Kahn DAG</span>
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        Topological wave scheduling engine with sandboxed tool perimeter and OpenTelemetry distributed spans.
      </p>
    </div>
  )
}
export default AgentForgeApp