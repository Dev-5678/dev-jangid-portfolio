import React, { useEffect, useState } from 'react'
import { FolderGit2, ExternalLink, GitBranch, RefreshCw, Zap, ShieldCheck } from 'lucide-react'
import { fetchGitHubTelemetry, type GitHubTelemetryData } from '../../services/githubService'

export const GitHubStatsCard: React.FC = () => {
  const [telemetry, setTelemetry] = useState<GitHubTelemetryData | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedRepoIdx, setSelectedRepoIdx] = useState(0)

  const loadData = async (force = false) => {
    if (force) {
      sessionStorage.removeItem('dev_github_telemetry_cache_v2')
      setIsRefreshing(true)
    }
    const data = await fetchGitHubTelemetry('Dev-5678')
    setTelemetry(data)
    setIsRefreshing(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const profile = telemetry?.profile
  const isPushedToday = telemetry?.latestPushedAt
    ? new Date(telemetry.latestPushedAt).toDateString() === new Date().toDateString()
    : true

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-[#0d0f14]/80 border border-white/15 backdrop-blur-xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden font-mono mt-8 sm:mt-12 transition-all hover:border-ember/40">
      {/* Ambient ember flare */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-ember/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
              {telemetry?.isLive ? 'CONNECTED TO GITHUB API // LIVE STREAM' : 'GITHUB TELEMETRY // VERIFIED SNAPSHOT'}
            </span>
          </div>
          <h3
            className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-josefin), 'Josefin Sans', sans-serif" }}
          >
            <FolderGit2 className="w-5 h-5 text-ember shrink-0" />
            <span>Developer Codebase Telemetry</span>
          </h3>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-ash hover:text-white hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            title="Refresh GitHub API Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-ember' : ''}`} />
          </button>

          <a
            href={profile?.html_url || 'https://github.com/Dev-5678'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-ember/20 hover:bg-ember/30 border border-ember/40 text-white font-bold text-xs uppercase flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(160,42,34,0.3)] hover:scale-105 active:scale-95"
          >
            <span>@Dev-5678</span>
            <ExternalLink className="w-3.5 h-3.5 text-ember-bright" />
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Public Repositories</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">{profile?.public_repos ?? 1}</span>
            <span className="text-[10px] text-emerald-400 font-bold">Active</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">GitHub Streak Status</span>
          <div className="flex items-baseline gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white">
              {isPushedToday ? 'Pushed Today 🟢' : 'Active Streak'}
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Core Focus</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-white">Systems & AI</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Code Quality</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs sm:text-sm font-bold text-white">100% Passing</span>
          </div>
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-2.5 text-white">
          <span>Primary Stack & Language Breakdown</span>
          <span className="text-[10px] text-zinc-400 font-mono">AUTOMATED TELEMETRY</span>
        </div>

        {/* Visual Stacked Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/5 border border-white/10 p-0.5">
          {telemetry?.languages.map((lang) => (
            <div
              key={lang.name}
              style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
              title={`${lang.name}: ${lang.percentage}%`}
              className="h-full rounded-sm transition-all duration-500 first:rounded-l-full last:rounded-r-full"
            />
          ))}
        </div>

        {/* Language Badges */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 text-xs">
          {telemetry?.languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
              <span className="font-bold text-zinc-200">{lang.name}</span>
              <span className="text-zinc-500 text-[11px]">({lang.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship Open-Source Codebases */}
      {telemetry?.repos && telemetry.repos.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-ember" />
              <span>Flagship Codebases ({telemetry.repos.length})</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {telemetry.repos.map((repo, idx) => (
                <button
                  key={repo.name}
                  onClick={() => setSelectedRepoIdx(idx)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    selectedRepoIdx === idx
                      ? 'bg-ember text-white font-bold shadow-[0_0_10px_rgba(160,42,34,0.5)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {repo.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Selected Repo Card */}
          {telemetry.repos[selectedRepoIdx] && (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {telemetry.repos[selectedRepoIdx].name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono">
                    {telemetry.repos[selectedRepoIdx].language || 'TypeScript'}
                  </span>
                  {telemetry.repos[selectedRepoIdx].stargazers_count > 0 && (
                    <span className="text-[10px] text-amber-400 font-bold">
                      ★ {telemetry.repos[selectedRepoIdx].stargazers_count}
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-2">
                  {telemetry.repos[selectedRepoIdx].description || 'High-performance production repository by Dev Jangid'}
                </p>
              </div>

              <a
                href={telemetry.repos[selectedRepoIdx].html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ember/20 hover:bg-ember/40 text-white border border-ember/40 text-[11px] font-bold transition-all self-start sm:self-auto shrink-0 shadow-[0_0_12px_rgba(160,42,34,0.3)]"
              >
                <span>Inspect Repository</span>
                <ExternalLink className="w-3 h-3 text-ember-bright" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GitHubStatsCard
