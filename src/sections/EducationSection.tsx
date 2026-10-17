import React from 'react'
import { educationHistory } from '../data/portfolio'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      aria-label="Academic History"
      className="relative py-16 sm:py-24 md:py-36 overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {/* Top Hairline Separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" aria-hidden="true" />

      {/* Ambient Ember Glow Pool */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[300px] rounded-full opacity-10 pointer-events-none blur-[140px]"
        style={{ backgroundColor: 'var(--ember)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">Academics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Education
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ash max-w-xl leading-relaxed font-normal">
            Academic credentials and technical computer science foundations.
          </p>
        </div>

        {/* Grid of Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {educationHistory.map((edu, idx) => (
            <div
              key={edu.id}
              className="edu-card glass-card p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border font-mono ${
                      edu.isExpected
                        ? 'bg-ember/10 border-ember/30 text-ember'
                        : 'bg-white/5 border-white/10 text-white'
                    }`}
                  >
                    {edu.isExpected ? 'In Progress' : 'Completed'}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-ash font-medium">
                    <Calendar className="w-3.5 h-3.5 text-ember" />
                    <span>{edu.date}</span>
                  </span>
                </div>

                {/* Degree */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2 mb-3 group-hover:text-cloud transition-colors">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <div className="flex items-center gap-2.5 text-sm sm:text-base text-silver font-medium">
                  <GraduationCap className="w-4 h-4 text-ember shrink-0" />
                  <span>{edu.institution}</span>
                </div>
              </div>

              {/* Location footer */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-ash">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ember shrink-0" />
                  <span>{edu.location}</span>
                </span>
                <span className="font-mono text-ash/60 font-semibold tracking-wider">#{String(idx + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
