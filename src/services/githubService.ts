export interface GitHubProfile {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  bio: string | null
}

export interface GitHubRepoItem {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  pushed_at: string
}

export interface LanguageStat {
  name: string
  percentage: number
  color: string
}

export interface GitHubTelemetryData {
  profile: GitHubProfile
  repos: GitHubRepoItem[]
  languages: LanguageStat[]
  totalStars: number
  latestPushedAt: string | null
  isLive: boolean
}

const FALLBACK_PROFILE: GitHubProfile = {
  login: 'Dev-5678',
  name: 'Dev Jangid',
  avatar_url: 'https://avatars.githubusercontent.com/u/150650961?v=4',
  html_url: 'https://github.com/Dev-5678',
  public_repos: 5,
  followers: 1,
  following: 2,
  created_at: '2023-11-12T00:00:00Z',
  updated_at: new Date().toISOString(),
  bio: 'Computer Science Engineer | Systems, AI, & Mission-Critical Software'
}

const FALLBACK_LANGUAGES: LanguageStat[] = [
  { name: 'TypeScript / React', percentage: 38, color: '#3178C6' },
  { name: 'Modern C++', percentage: 28, color: '#00599C' },
  { name: 'Python (GenAI)', percentage: 20, color: '#3572A5' },
  { name: 'Java', percentage: 14, color: '#B07219' }
]

const CACHE_KEY = 'dev_github_telemetry_cache_v2'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export async function fetchGitHubTelemetry(username = 'Dev-5678'): Promise<GitHubTelemetryData> {
  // Check sessionStorage cache
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return parsed.data
      }
    }
  } catch {
    // ignore sessionStorage errors
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      })
    ])

    if (!userRes.ok) {
      throw new Error(`GitHub user fetch status: ${userRes.status}`)
    }

    const profile: GitHubProfile = await userRes.json()
    const repos: GitHubRepoItem[] = reposRes.ok ? await reposRes.json() : []

    // Calculate language frequencies
    const langCounts: Record<string, number> = {}
    let totalLangPoints = 0
    let totalStars = 0
    let latestPushedAt: string | null = null

    repos.forEach((repo) => {
      totalStars += repo.stargazers_count || 0
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
        totalLangPoints += 1
      }
      if (repo.pushed_at) {
        if (!latestPushedAt || new Date(repo.pushed_at) > new Date(latestPushedAt)) {
          latestPushedAt = repo.pushed_at
        }
      }
    })

    const langColors: Record<string, string> = {
      TypeScript: '#3178C6',
      JavaScript: '#F7DF1E',
      'C++': '#00599C',
      C: '#555555',
      Java: '#B07219',
      Python: '#3572A5',
      HTML: '#E34F26',
      CSS: '#563D7C'
    }

    let calculatedLanguages: LanguageStat[] = []
    if (totalLangPoints > 0) {
      calculatedLanguages = Object.entries(langCounts)
        .map(([name, count]) => ({
          name,
          percentage: Math.round((count / totalLangPoints) * 100),
          color: langColors[name] || '#fc6b2f'
        }))
        .sort((a, b) => b.percentage - a.percentage)
    } else {
      calculatedLanguages = FALLBACK_LANGUAGES
    }

    const result: GitHubTelemetryData = {
      profile,
      repos,
      languages: calculatedLanguages.length > 0 ? calculatedLanguages : FALLBACK_LANGUAGES,
      totalStars,
      latestPushedAt,
      isLive: true
    }

    // Save to cache
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: result }))
    } catch {
      // ignore cache save errors
    }

    return result
  } catch (error) {
    console.warn('Using fallback GitHub telemetry due to API rate limit or network status:', error)
    const fallbackResult: GitHubTelemetryData = {
      profile: FALLBACK_PROFILE,
      repos: [
        {
          id: 1,
          name: 'HyperRoute',
          full_name: 'Dev-5678/HyperRoute',
          html_url: 'https://github.com/Dev-5678/HyperRoute',
          description: 'High-Throughput Distributed Edge API Gateway & Sliding-Window Rate Limiter',
          language: 'TypeScript',
          stargazers_count: 1,
          forks_count: 0,
          updated_at: new Date().toISOString(),
          pushed_at: new Date().toISOString()
        },
        {
          id: 2,
          name: 'AgentForge',
          full_name: 'Dev-5678/AgentForge',
          html_url: 'https://github.com/Dev-5678/AgentForge',
          description: 'High-Throughput Autonomous AI Agent DAG Workflow Runtime & Sandboxed Execution Engine',
          language: 'TypeScript',
          stargazers_count: 1,
          forks_count: 0,
          updated_at: new Date().toISOString(),
          pushed_at: new Date().toISOString()
        },
        {
          id: 3,
          name: 'NexusCRDT',
          full_name: 'Dev-5678/NexusCRDT',
          html_url: 'https://github.com/Dev-5678/NexusCRDT',
          description: 'High-Performance Distributed Real-Time Collaborative Canvas Engine using CRDTs',
          language: 'TypeScript',
          stargazers_count: 1,
          forks_count: 0,
          updated_at: new Date().toISOString(),
          pushed_at: new Date().toISOString()
        },
        {
          id: 4,
          name: 'ProxiSpeak',
          full_name: 'Dev-5678/ProxiSpeak',
          html_url: 'https://github.com/Dev-5678/ProxiSpeak',
          description: 'Geospatial Proximity Audio Ecosystem | React 19, WebSockets, Web Audio API & Inverse-Square Spatial Attenuation',
          language: 'JavaScript',
          stargazers_count: 1,
          forks_count: 0,
          updated_at: new Date().toISOString(),
          pushed_at: new Date().toISOString()
        },
        {
          id: 5,
          name: 'dev-jangid-portfolio',
          full_name: 'Dev-5678/dev-jangid-portfolio',
          html_url: 'https://github.com/Dev-5678/dev-jangid-portfolio',
          description: 'Dev Jangid - S-Tier Interactive 3D Mechanical Terminal & Portfolio',
          language: 'TypeScript',
          stargazers_count: 1,
          forks_count: 0,
          updated_at: new Date().toISOString(),
          pushed_at: new Date().toISOString()
        }
      ],
      languages: FALLBACK_LANGUAGES,
      totalStars: 1,
      latestPushedAt: new Date().toISOString(),
      isLive: false
    }

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: fallbackResult }))
    } catch {
      // ignore cache save errors
    }

    return fallbackResult
  }
}

export const TRIFECTA_REPOS = ['NexusCRDT', 'AgentForge', 'HyperRoute', 'ProxiSpeak', 'dev-jangid-portfolio'];
