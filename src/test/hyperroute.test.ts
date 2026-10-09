import { describe, it, expect } from 'vitest'
import { standaloneProjects } from '../data/portfolio'

describe('HyperRoute Project Contract', () => {
  it('contains valid metadata and live repository link', () => {
    const proj = standaloneProjects.find(p => p.id === 'hyper-route')
    expect(proj).toBeDefined()
    expect(proj?.githubUrl).toContain('HyperRoute')
    expect(proj?.tags).toContain('Sliding-Window')
  })
})