import { describe, it, expect } from 'vitest'
import { portfolioJsonLd, repositorySchemas } from '../utils/seo'

describe('SEO & Structured Data JSON-LD Schemas', () => {
  it('includes verified author portfolio identity with all 5 flagship repositories', () => {
    expect(portfolioJsonLd.name).toBe('Dev Jangid')
    expect(portfolioJsonLd.sameAs).toContain('https://github.com/Dev-5678/NexusCRDT')
    expect(portfolioJsonLd.sameAs).toContain('https://github.com/Dev-5678/AgentForge')
    expect(portfolioJsonLd.sameAs).toContain('https://github.com/Dev-5678/HyperRoute')
    expect(portfolioJsonLd.sameAs).toContain('https://github.com/Dev-5678/ProxiSpeak')
    expect(portfolioJsonLd.sameAs).toContain('https://github.com/Dev-5678/dev-jangid-portfolio')
  })

  it('provides complete SoftwareApplication schema records for open-source repositories', () => {
    expect(repositorySchemas.length).toBe(4)
    const names = repositorySchemas.map((s) => s.name)
    expect(names).toContain('HyperRoute')
    expect(names).toContain('AgentForge')
    expect(names).toContain('NexusCRDT')
    expect(names).toContain('ProxiSpeak')

    for (const schema of repositorySchemas) {
      expect(schema['@type']).toBe('SoftwareApplication')
      expect(schema.author.name).toBe('Dev Jangid')
      expect(schema.url.startsWith('https://github.com/Dev-5678/')).toBe(true)
    }
  })
})
