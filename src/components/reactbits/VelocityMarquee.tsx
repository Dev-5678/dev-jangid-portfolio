import React from 'react'

const ROW1 = [
  'C++',
  'JAVA',
  'SQL',
  'DATA STRUCTURES & ALGORITHMS',
  'OBJECT-ORIENTED PROGRAMMING',
  'GEMINI & MULTIMODAL RAG',
  'STREAMLIT',
  'FULL-STACK WEB DEV',
  'PYTHON WORKFLOWS'
]

const ROW2 = [
  'AIRPORTS AUTHORITY OF INDIA',
  'CANSAT PAYLOAD DESIGN',
  'INDIA SPACE LAB',
  'SATELLITE TELEMETRY TRACKING',
  'NETWORK SECURITY COMPLIANCE',
  'SYSTEM TROUBLESHOOTING',
  'LINUX INFRASTRUCTURE',
  'CLOUD DEPLOYMENTS'
]

export const VelocityMarquee: React.FC = () => {
  return (
    <div
      aria-label="Technical competencies ticker"
      className="w-full overflow-hidden py-4 sm:py-6 my-8 sm:my-12 bg-[#CCFF00] dark:bg-[#111317] border-y-3 border-[#111317] dark:border-[#334155] shadow-[4px_4px_0px_#111317] dark:shadow-[4px_4px_0px_#CCFF00] select-none group"
    >
      {/* Row 1: Scrolling Left */}
      <div className="flex gap-4 w-max animate-marquee whitespace-nowrap mb-2.5">
        {[...ROW1, ...ROW1, ...ROW1, ...ROW1].map((tech, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111317] text-[#CCFF00] dark:bg-[#1E293B] dark:text-[#F4F7FB] border-2 border-[#111317] dark:border-[#CCFF00] font-mono text-xs sm:text-sm font-black tracking-wider uppercase shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#CCFF00]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>{tech}</span>
          </div>
        ))}
      </div>

      {/* Row 2: Scrolling Right */}
      <div className="flex gap-4 w-max animate-marquee-reverse whitespace-nowrap">
        {[...ROW2, ...ROW2, ...ROW2, ...ROW2].map((tech, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-[#111317] dark:bg-[#141820] dark:text-[#CCFF00] border-2 border-[#111317] dark:border-[#334155] font-mono text-xs sm:text-sm font-black tracking-wider uppercase shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#1E293B]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
            <span>{tech}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 34s linear infinite;
        }
        .group:hover .animate-marquee,
        .group:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-marquee-reverse {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default VelocityMarquee
