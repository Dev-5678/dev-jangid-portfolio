import React from 'react'
import { FolderGit2, ExternalLink } from 'lucide-react'
import { personalInfo } from '../../data/portfolio'

export const GitHubStatsCard: React.FC = () => {
  const languages = [
    { name: 'C++', percentage: 38, color: '#00599C' },
    { name: 'Java', percentage: 26, color: '#B07219' },
    { name: 'TypeScript / React', percentage: 20, color: '#3178C6' },
    { name: 'Python (GenAI)', percentage: 16, color: '#3572A5' }
  ]

  return (
    <div className="brutal-card p-6 sm:p-8 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#CCFF00] font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#111317] dark:border-[#334155] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500] dark:text-[#CCFF00] uppercase tracking-wider">
            <FolderGit2 className="w-4 h-4 text-[#CCFF00]" />
            <span>DEVELOPER_PROFILE // GITHUB_TELEMETRY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#111317] dark:text-[#F4F7FB] mt-1">
            Verified Codebase Distribution
          </h3>
        </div>

        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-btn px-4 py-2 bg-[#111317] text-[#CCFF00] font-mono font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#CCFF00] hover:text-[#111317]"
        >
          <span>@devjangid911</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Language Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-2 text-[#111317] dark:text-[#F4F7FB]">
          <span>Primary Language Breakdown</span>
          <span className="text-[10px] text-gray-400">VERIFIED STACK METRICS</span>
        </div>

        {/* Visual Stacked Bar */}
        <div className="w-full h-4 flex overflow-hidden border-2 border-[#111317] dark:border-[#334155]">
          {languages.map((lang) => (
            <div
              key={lang.name}
              style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
              title={`${lang.name}: ${lang.percentage}%`}
              className="h-full"
            />
          ))}
        </div>

        {/* Language Badges */}
        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border border-[#111317]" style={{ backgroundColor: lang.color }} />
              <span className="font-bold text-[#111317] dark:text-[#F4F7FB]">{lang.name}</span>
              <span className="text-gray-500 text-[11px]">({lang.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Developer Stats Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Focus Areas</span>
          <span className="text-sm font-black text-[#FF5500] dark:text-[#CCFF00]">DSA & Systems</span>
        </div>
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Environment</span>
          <span className="text-sm font-black text-[#111317] dark:text-[#F4F7FB]">Linux / Windows</span>
        </div>
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Architecture</span>
          <span className="text-sm font-black text-[#00E5FF]">Client-Server</span>
        </div>
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] text-center">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Security Status</span>
          <span className="text-sm font-black text-[#CCFF00]">Compliant</span>
        </div>
      </div>
    </div>
  )
}
