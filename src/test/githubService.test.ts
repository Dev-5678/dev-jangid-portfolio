import { describe, it, expect, beforeEach } from 'vitest'
import { fetchGitHubTelemetry } from '../services/githubService'

describe('GitHub Telemetry Service & Fallback Resilience', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('provides verified fallback profile structure when network or rate-limits occur', async () => {
    const data = await fetchGitHubTelemetry('Dev-5678')
    expect(data.profile.login).toBe('Dev-5678')
    expect(data.languages.length).toBeGreaterThan(0)
    expect(data.repos.length).toBeGreaterThan(0)
  })

  it('guarantees language percentage weights sum up approximately to 100%', async () => {
    const data = await fetchGitHubTelemetry('Dev-5678')
    const sum = data.languages.reduce((acc, l) => acc + l.percentage, 0)
    expect(sum).toBeGreaterThanOrEqual(95)
    expect(sum).toBeLessThanOrEqual(105)
  })

  it('caches telemetry in sessionStorage to conserve rate limits', async () => {
    const data1 = await fetchGitHubTelemetry('Dev-5678')
    expect(sessionStorage.getItem('dev_github_telemetry_cache_v2')).not.toBeNull()

    const data2 = await fetchGitHubTelemetry('Dev-5678')
    expect(data2.profile.login).toBe(data1.profile.login)
  })
})
