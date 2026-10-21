import React, { useState } from 'react';
import { productionBenchmarks } from '../../data/telemetryData';

export const LiveMetricsConsole: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const current = productionBenchmarks[selected];

  return (
    <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <span className="text-zinc-400 font-bold uppercase tracking-wider">Systems Telemetry</span>
        <span className="text-emerald-400 font-bold">100% SLA COMPLIANT</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {productionBenchmarks.map((b, i) => (
          <button
            key={b.system}
            onClick={() => setSelected(i)}
            className={p-3 rounded text-left border transition-all }
          >
            <div className="font-bold truncate">{b.system.split(' // ')[0]}</div>
            <div className="text-[10px] text-zinc-400 mt-1">{b.throughputOpsSec.toLocaleString()} ops/s</div>
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 bg-zinc-900/60 rounded border border-zinc-800/80">
        <div className="text-sky-400 font-bold mb-2">{current.system}</div>
        <div className="grid grid-cols-4 gap-2 text-zinc-300">
          <div>p50: <span className="text-white font-bold">{current.p50LatencyMs}ms</span></div>
          <div>p95: <span className="text-white font-bold">{current.p95LatencyMs}ms</span></div>
          <div>p99: <span className="text-white font-bold">{current.p99LatencyMs}ms</span></div>
          <div>Memory: <span className="text-white font-bold">{current.memoryFootprintMb}MB</span></div>
        </div>
      </div>
    </div>
  );
};
export default LiveMetricsConsole;