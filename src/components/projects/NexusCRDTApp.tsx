import React from 'react'

export const NexusCRDTApp: React.FC = () => {
  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <h3 className="font-mono text-lg font-bold text-sky-400">NexusCRDT // Architecture Preview</h3>
        <span className="px-2 py-0.5 text-xs font-mono bg-sky-950 text-sky-300 rounded border border-sky-800">SEC LWW</span>
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        State-based join-semilattice ensuring Strong Eventual Consistency across uncoordinated client topologies.
      </p>
    </div>
  )
}
export default NexusCRDTApp