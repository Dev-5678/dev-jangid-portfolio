import React from 'react'

export const HyperRouteApp: React.FC = () => {
  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <h3 className="font-mono text-lg font-bold text-emerald-400">HyperRoute // Telemetry Preview</h3>
        <span className="px-2 py-0.5 text-xs font-mono bg-emerald-950 text-emerald-300 rounded border border-emerald-800">p99: 2.80ms</span>
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        Sliding-window counter rate limiting with sub-millisecond OpenMetrics Prometheus instrumentation.
      </p>
    </div>
  )
}
export default HyperRouteApp