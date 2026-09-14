import { describe, it, expect } from 'vitest'
import {
  personalInfo,
  experiences,
  skillCategories,
  educationHistory,
  navItems,
  experienceHighlights,
  standaloneProjects
} from '../data/portfolio'

describe('Portfolio Resume Data Truth & Integrity', () => {
  it('contains verified personal details without fabrication', () => {
    expect(personalInfo.name).toBe('Dev Jangid')
    expect(personalInfo.title).toBe('Computer Science Engineer')
    expect(personalInfo.location).toBe('Faridabad, India 121005')
    expect(personalInfo.email).toBe('jangid.dev20@gmail.com')
    expect(personalInfo.phone).toBe('9212553300')
    expect(personalInfo.bio).toContain('Airports Authority of India')
    expect(personalInfo.bio).toContain('network security compliance')
  })

  it('contains the 3 verified experience records with accurate dates', () => {
    expect(experiences).toHaveLength(3)

    const aai = experiences.find((e) => e.id === 'aai-it-intern')
    expect(aai).toBeDefined()
    expect(aai?.role).toBe('IT Intern')
    expect(aai?.organization).toBe('Airports Authority of India (AAI)')
    expect(aai?.dates).toBe('July 2026 – August 2026')
    expect(aai?.location).toBe('New Delhi, India')
    expect(aai?.responsibilities).toHaveLength(4)

    const isl = experiences.find((e) => e.id === 'isl-space-tech-intern')
    expect(isl).toBeDefined()
    expect(isl?.role).toBe('Space Technology Intern')
    expect(isl?.organization).toBe('India Space Lab (ISL)')
    expect(isl?.dates).toBe('June 2025 – July 2025')
    expect(isl?.location).toBe('Haryana, India')
    expect(isl?.responsibilities).toHaveLength(4)

    const genai = experiences.find((e) => e.id === 'genai-trainee')
    expect(genai).toBeDefined()
    expect(genai?.role).toBe('Generative AI Trainee')
    expect(genai?.dates).toBe('April 2025 – June 2025')
    expect(genai?.responsibilities).toHaveLength(4)
  })

  it('organizes verified skills into 4 distinct groups', () => {
    expect(skillCategories).toHaveLength(4)
    const titles = skillCategories.map((c) => c.title)
    expect(titles).toContain('Programming Languages')
    expect(titles).toContain('Core Computer Science')
    expect(titles).toContain('Web and AI Development')
    expect(titles).toContain('Tools and Systems')

    const languages = skillCategories.find((c) => c.title === 'Programming Languages')?.skills
    expect(languages).toEqual(['C', 'C++', 'Java', 'SQL'])

    const core = skillCategories.find((c) => c.title === 'Core Computer Science')?.skills
    expect(core).toEqual(['Data Structures and Algorithms (DSA)', 'Object-Oriented Programming (OOP)'])
  })

  it('contains accurate education records', () => {
    expect(educationHistory).toHaveLength(2)

    const bachelor = educationHistory.find((e) => e.id === 'degree-bachelor')
    expect(bachelor?.degree).toBe('Bachelor’s Degree — Computer Science and Engineering')
    expect(bachelor?.institution).toBe('Jagannath University')
    expect(bachelor?.location).toBe('Bahadurgarh, Haryana')
    expect(bachelor?.date).toBe('Expected June 2027')
    expect(bachelor?.isExpected).toBe(true)

    const highSchool = educationHistory.find((e) => e.id === 'degree-school')
    expect(highSchool?.degree).toBe('High School Diploma')
    expect(highSchool?.institution).toBe('Jiva Public School')
    expect(highSchool?.location).toBe('Faridabad, Haryana')
    expect(highSchool?.date).toBe('April 2022')
  })

  it('provides honest experience highlights and unpopulated standalone projects list', () => {
    expect(experienceHighlights).toHaveLength(3)
    // No fabricated projects should be present
    expect(standaloneProjects).toEqual([])
  })

  it('has consistent navigation anchors', () => {
    expect(navItems).toHaveLength(6)
    const hrefs = navItems.map((n) => n.href)
    expect(hrefs).toEqual(['#about', '#experience', '#skills', '#projects', '#education', '#contact'])
  })
})
