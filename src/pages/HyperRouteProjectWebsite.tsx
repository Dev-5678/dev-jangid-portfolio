import React from 'react'
import { HyperRouteApp } from '../components/projects/HyperRouteApp'

export const HyperRouteProjectWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold font-mono text-emerald-400">HyperRoute Deep-Dive</h1>
      <p className="text-zinc-400 mt-2">High-Throughput Edge API Gateway & Rate Limiter</p>
      <div className="mt-8 max-w-4xl">
        <HyperRouteApp />
      </div>
    </div>
  )
}
export default HyperRouteProjectWebsite