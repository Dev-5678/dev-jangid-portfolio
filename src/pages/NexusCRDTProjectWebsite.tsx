import React from 'react'
import { NexusCRDTApp } from '../components/projects/NexusCRDTApp'

export const NexusCRDTProjectWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold font-mono text-sky-400">NexusCRDT Deep-Dive</h1>
      <p className="text-zinc-400 mt-2">Distributed Real-Time Collaborative Canvas Engine</p>
      <div className="mt-8 max-w-4xl">
        <NexusCRDTApp />
      </div>
    </div>
  )
}
export default NexusCRDTProjectWebsite