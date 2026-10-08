import React from 'react'
import { AgentForgeApp } from '../components/projects/AgentForgeApp'

export const AgentForgeProjectWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold font-mono text-purple-400">AgentForge Deep-Dive</h1>
      <p className="text-zinc-400 mt-2">Autonomous Multi-Agent DAG Workflow Runtime</p>
      <div className="mt-8 max-w-4xl">
        <AgentForgeApp />
      </div>
    </div>
  )
}
export default AgentForgeProjectWebsite