import { describe, it, expect } from 'vitest'
import { standaloneProjects } from '../data/portfolio'

describe('NexusCRDT Project Contract', () => {
  it('contains valid metadata and live repository link', () => {
    const proj = standaloneProjects.find(p => p.id === 'nexus-crdt')
    expect(proj).toBeDefined()
    expect(proj?.githubUrl).toContain('NexusCRDT')
    expect(proj?.tags).toContain('CRDT (LWW-Element-Set)')
  })
})