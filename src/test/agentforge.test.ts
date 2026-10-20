import { describe, it, expect } from 'vitest'
import { standaloneProjects } from '../data/portfolio'

describe('AgentForge Project Contract', () => {
  it('contains valid metadata and live repository link', () => {
    const proj = standaloneProjects.find(p => p.id === 'agent-forge')
    expect(proj).toBeDefined()
    expect(proj?.githubUrl).toContain('AgentForge')
    expect(proj?.tags).toContain('DAG Topological Scheduler')
  })
})