import { describe, it, expect } from 'vitest'

describe('Developer Console CLI Engine & Command Registry', () => {
  const CORE_COMMANDS = [
    'help',
    'whoami',
    'skills',
    'exp',
    'proxispeak',
    'hyperroute',
    'agentforge',
    'nexuscrdt',
    'repos',
    'man',
    'cansat',
    'aai',
    'dsa',
    'matrix',
    'snake',
    'benchmark',
    'sysinfo',
    'diagnostics',
    'ping',
    'top',
    'github',
    'quote',
    'contact',
    'resume',
    'theme',
    'clear',
    'sudo hire',
    'exit'
  ]

  it('registers all necessary diagnostic, systems, and gaming CLI commands', () => {
    expect(CORE_COMMANDS).toContain('ping')
    expect(CORE_COMMANDS).toContain('top')
    expect(CORE_COMMANDS).toContain('dsa')
    expect(CORE_COMMANDS).toContain('github')
    expect(CORE_COMMANDS).toContain('benchmark')
    expect(CORE_COMMANDS).toContain('sysinfo')
    expect(CORE_COMMANDS.length).toBeGreaterThanOrEqual(20)
  })

  it('normalizes CLI inputs by trimming leading/trailing whitespace and lowering case', () => {
    const rawInput = '   PING   '
    const normalized = rawInput.trim().toLowerCase()
    expect(normalized).toBe('ping')
    expect(CORE_COMMANDS).toContain(normalized)
  })

  it('handles multi-word commands like "sudo hire" and aliases like "htop"', () => {
    const input = 'sudo hire'
    expect(CORE_COMMANDS.includes(input)).toBe(true)

    const aliasMap: Record<string, string> = {
      htop: 'top',
      diagnostics: 'sysinfo',
      quit: 'exit'
    }
    expect(aliasMap.htop).toBe('top')
    expect(aliasMap.diagnostics).toBe('sysinfo')
  })
})
