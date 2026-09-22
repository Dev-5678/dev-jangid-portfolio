interface ExperienceSectionProps {
  isTLDR?: boolean
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isTLDR: _isTLDR = false }) => {
  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      className="relative py-16 sm:py-24 md:py-40 overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {/* Top Hairline Separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" aria-hidden="true" />
      
      {/* Ambient Ember Glow Pool */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] rounded-full pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(ellipse, rgba(160, 42, 34, 0.12) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 px-4 sm:px-6 md:px-8">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-ember inline-block rounded-full" />
            <span className="text-ember text-xs font-bold tracking-[0.25em] uppercase">Experience</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Where I've Been
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ash max-w-xl leading-relaxed font-normal">
            My professional journey through institutional internships and mission-critical engineering environments.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12 max-w-4xl mx-auto">
          {/* Experience Item 1: AAI */}
          <div className="exp-item group pb-8 sm:pb-12 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-6 md:gap-12 transition-all duration-300">
            <div className="md:w-1/3 flex-shrink-0">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-ash tracking-wider block mb-1">
                14 August 2026 — 25 Sept 2026
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block font-mono text-ember group-hover:text-ember-bright transition-colors">
                Airports Authority of India
              </span>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-cloud transition-colors">
                Network Security &amp; IT Intern
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-ash leading-relaxed mb-3 sm:mb-5 font-normal">
                Northern Region HQ IT division. Supported enterprise network monitoring, system diagnostics, and operational compliance.
              </p>
              <ul className="space-y-2 sm:space-y-2.5">
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Supported network security protocols and verified compliance across internal administrative subnets</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Assisted with database replication and server hardware maintenance routines</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Documented technical SOPs and resolved operational IT support tickets with 99.98% adherence</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Experience Item 2: India Space Lab */}
          <div className="exp-item group pb-8 sm:pb-12 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-6 md:gap-12 transition-all duration-300">
            <div className="md:w-1/3 flex-shrink-0">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-ash tracking-wider block mb-1">
                15 July 2025 — 31 July 2025
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block font-mono text-ember group-hover:text-ember-bright transition-colors">
                India Space Lab
              </span>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-cloud transition-colors">
                Space Systems &amp; CanSat Trainee
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-ash leading-relaxed mb-3 sm:mb-5 font-normal">
                Hands-on training in miniature satellite architectures, telemetry payloads, and aerospace communications.
              </p>
              <ul className="space-y-2 sm:space-y-2.5">
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Designed and assembled 1U CanSat payload incorporating barometric pressure and temperature sensors</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Calibrated 433 MHz UHF radio frequency telemetry downlink transceiver for live packet decoding</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Formulated parachute recovery protocols and evaluated descent rates from simulated altitudes</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Experience Item 3: Generative AI */}
          <div className="exp-item group pb-8 sm:pb-12 border-b border-white/10 last:border-b-0 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-6 md:gap-12 transition-all duration-300">
            <div className="md:w-1/3 flex-shrink-0">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-ash tracking-wider block mb-1">
                June 2024 (1 Month)
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block font-mono text-ember group-hover:text-ember-bright transition-colors">
                Gen AI Academy Program
              </span>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-cloud transition-colors">
                Generative AI &amp; Multimodal RAG Scholar
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-ash leading-relaxed mb-3 sm:mb-5 font-normal">
                Specialized curriculum exploring Google Cloud GenAI SDKs, vector embeddings, and retrieval-augmented pipelines.
              </p>
              <ul className="space-y-2 sm:space-y-2.5">
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Engineered multimodal query interfaces combining technical documents and Gemini models</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Implemented vector cosine similarity semantic search reducing inference latency to under 250ms</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-silver font-normal">
                  <span className="text-ember font-bold mt-0.5 text-xs">▸</span>
                  <span className="leading-relaxed">Deployed end-to-end interactive Streamlit apps on cloud instances</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
