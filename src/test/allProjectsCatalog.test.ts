import { describe, it, expect } from 'vitest'
import { ALL_PROJECTS, STACK_CATEGORIES, type StackKey } from '../data/allProjectsData'
import { standaloneProjects } from '../data/portfolio'

describe('Master 40-Project Catalog Integrity & Anti-Plagiarism Guarantees', () => {
  it('contains exactly 40 verified bespoke projects across 8 technical stacks', () => {
    expect(ALL_PROJECTS).toHaveLength(40)
    expect(standaloneProjects).toHaveLength(40)
  })

  it('guarantees unique IDs across all 40 projects', () => {
    const ids = ALL_PROJECTS.map((p) => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(40)
  })

  it('ensures each of the 8 technical stacks has exactly 5 high-caliber implementations', () => {
    const stacks: StackKey[] = [
      'c-systems',
      'cpp-performance',
      'python-core',
      'python-fullstack',
      'java-core',
      'java-enterprise',
      'web-protocols',
      'devops-infra'
    ]

    for (const stack of stacks) {
      const count = ALL_PROJECTS.filter((p) => p.stackKey === stack).length
      expect(count, `Expected 5 projects for stack ${stack}`).toBe(5)
    }
  })

  it('guarantees every project has authentic devNotes explaining engineering trade-offs (anti-plagiarism)', () => {
    for (const project of ALL_PROJECTS) {
      expect(project.devNotes, `devNotes missing for ${project.id}`).toBeDefined()
      expect(project.devNotes.length, `devNotes too short for ${project.id}`).toBeGreaterThanOrEqual(40)
      expect(project.description.length, `description too short for ${project.id}`).toBeGreaterThanOrEqual(40)
      expect(project.architecture.overview.length).toBeGreaterThanOrEqual(40)
      expect(project.architecture.subsystems.length).toBeGreaterThanOrEqual(3)
      expect(project.architecture.securityAndIntegrity.length).toBeGreaterThanOrEqual(2)
      expect(project.architecture.keyEngineeringAchievements.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('ensures each project has verified live metrics and valid GitHub URL', () => {
    for (const project of ALL_PROJECTS) {
      expect(project.liveMetrics.length).toBeGreaterThanOrEqual(3)
      for (const metric of project.liveMetrics) {
        expect(metric.label).toBeTruthy()
        expect(metric.value).toBeTruthy()
      }
      expect(project.githubUrl).toContain('https://github.com/Dev-5678/')
    }
  })

  it('validates that STACK_CATEGORIES properly tallies 40 projects', () => {
    const allCat = STACK_CATEGORIES.find((c) => c.key === 'all')
    expect(allCat?.count).toBe(40)

    const subCats = STACK_CATEGORIES.filter((c) => c.key !== 'all')
    expect(subCats).toHaveLength(8)
    for (const cat of subCats) {
      expect(cat.count).toBe(5)
    }
  })
})
