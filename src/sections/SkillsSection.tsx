import React from 'react'
import { skillCategories } from '../data/portfolio'
import { Code, Cpu, Sparkles, Layers, Radio, ShieldCheck } from 'lucide-react'

const ICONS = [Code, Cpu, Sparkles, Layers, Radio, ShieldCheck]

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="relative py-16 sm:py-24 md:py-36 overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {/* Top Hairline Separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" aria-hidden="true" />

      {/* Ambient Ember Glow Pool */}
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[300px] rounded-full pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(ellipse, rgba(160, 42, 34, 0.10) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Technical Skills
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ash max-w-xl leading-relaxed font-normal">
            Categorized technical proficiencies across systems, security, programming, and generative intelligence.
          </p>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((cat, idx) => {
            const IconComp = ICONS[idx % ICONS.length]

            return (
                <div
                key={cat.title}
                className="skill-block glass-card p-5 sm:p-7 hover:border-ember/40 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3.5 mb-3.5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-ember group-hover:scale-110 group-hover:rotate-3 group-hover:bg-ember/15 group-hover:border-ember/30 transition-all duration-300 shrink-0">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-white tracking-tight group-hover:text-cloud transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-ember/10 border border-ember/25 text-ember text-[11px] sm:text-xs font-mono font-medium shrink-0">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ash leading-relaxed mb-4 font-normal">
                    {cat.description}
                  </p>
                </div>

                {/* Skills Badges (Wraps cleanly without empty canyons) */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3.5 border-t border-white/10">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[11px] sm:text-xs font-medium leading-normal hover:bg-white/10 hover:border-ember/40 hover:scale-105 active:scale-95 transition-all cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ember shrink-0 shadow-[0_0_6px_#fc6b2f]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
