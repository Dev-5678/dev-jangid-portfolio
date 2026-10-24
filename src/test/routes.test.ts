import { describe, it, expect } from 'vitest'

describe('Application Standalone Route Parsing & Page Resolution', () => {
  const parseRoute = (hash: string, pathname: string = '') => {
    const h = hash.toLowerCase()
    const p = pathname.toLowerCase()
    if (h.includes('project/aai') || p.includes('/project/aai')) return 'aai'
    if (h.includes('project/cansat') || p.includes('/project/cansat')) return 'cansat'
    if (h.includes('project/gemini') || h.includes('project/rag') || p.includes('/project/gemini') || p.includes('/project/rag')) return 'rag'
    if (h.includes('project/systems') || h.includes('project/high-throughput') || p.includes('/project/systems')) return 'systems'
    if (h.includes('project/proxispeak') || p.includes('/project/proxispeak')) return 'proxispeak'
    if (h.includes('project/hyperroute') || p.includes('/project/hyperroute')) return 'hyperroute'
    if (h.includes('project/agentforge') || p.includes('/project/agentforge')) return 'agentforge'
    if (h.includes('project/nexuscrdt') || p.includes('/project/nexuscrdt')) return 'nexuscrdt'
    return null
  }

  it('correctly maps all 8 standalone project hash routes', () => {
    expect(parseRoute('#/project/hyperroute')).toBe('hyperroute')
    expect(parseRoute('#/project/agentforge')).toBe('agentforge')
    expect(parseRoute('#/project/nexuscrdt')).toBe('nexuscrdt')
    expect(parseRoute('#/project/proxispeak')).toBe('proxispeak')
    expect(parseRoute('#/project/aai')).toBe('aai')
    expect(parseRoute('#/project/cansat')).toBe('cansat')
    expect(parseRoute('#/project/rag')).toBe('rag')
    expect(parseRoute('#/project/systems')).toBe('systems')
  })

  it('returns null for standard portfolio sections', () => {
    expect(parseRoute('#projects')).toBeNull()
    expect(parseRoute('#skills')).toBeNull()
    expect(parseRoute('#experience')).toBeNull()
    expect(parseRoute('')).toBeNull()
  })
})
