import React, { useEffect, useRef } from 'react'
import { personalInfo } from '../data/portfolio'
import { SpotlightCard } from '../components/reactbits/SpotlightCard'
import { Code2, Database, Network, Sparkles, MapPin, Terminal } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STRENGTHS = [
  {
    icon: Network,
    title: "IT Systems & Network Security",
    desc: "Hands-on experience monitoring enterprise networks, diagnosing server tickets, and evaluating network security compliance at Airports Authority of India.",
    color: "#00E5FF",
    spotlight: "rgba(0, 229, 255, 0.15)"
  },
  {
    icon: Sparkles,
    title: "Generative AI & Multimodal RAG",
    desc: "Practical workflow implementation with Gemini APIs, Vertex AI, Streamlit, and retrieval-augmented generation for intelligent data processing.",
    color: "#CCFF00",
    spotlight: "rgba(204, 255, 0, 0.15)"
  },
  {
    icon: Code2,
    title: "Software Fundamentals & Algorithms",
    desc: "Strong foundation in Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), C, C++, and Java for robust computational logic.",
    color: "#FF5500",
    spotlight: "rgba(255, 85, 0, 0.15)"
  },
  {
    icon: Database,
    title: "Database Administration & SQL",
    desc: "Managing relational schemas, writing structured SQL queries, and assisting with database updates and documentation in production settings.",
    color: "#00E5FF",
    spotlight: "rgba(0, 229, 255, 0.15)"
  }
]

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Dev Jangid"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t-3 border-[#111317] dark:border-[#334155]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest text-[#FF5500] dark:text-[#CCFF00] uppercase mb-2">
            <span>[01]</span>
            <span>SYSTEM_SPECIFICATION // PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
            ABOUT DEV JANGID
          </h2>
        </div>
        <div className="font-mono text-xs text-[#111317] dark:text-gray-400 flex items-center gap-1.5 font-bold">
          <MapPin className="w-4 h-4 text-[#FF5500]" />
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Main Editorial Bio Spotlight Card */}
      <SpotlightCard
        spotlightColor="rgba(204, 255, 0, 0.14)"
        className="about-card p-6 sm:p-10 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#1E293B] mb-12 text-[#111317] dark:text-[#F4F7FB]"
      >
        <div className="flex items-center gap-2 mb-6 font-mono text-xs font-bold text-[#FF5500] dark:text-[#CCFF00]">
          <Terminal className="w-4 h-4" />
          <span>EXECUTIVE_STATEMENT.TXT</span>
        </div>

        <blockquote className="text-lg sm:text-2xl font-bold leading-relaxed text-[#111317] dark:text-[#F4F7FB] border-l-4 border-[#CCFF00] pl-4 sm:pl-6 my-4 italic">
          "{personalInfo.bio}"
        </blockquote>

        <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155]">
            <span className="text-gray-600 dark:text-gray-400 block text-[10px] font-bold">CURRENT ACADEMICS</span>
            <strong className="text-[#111317] dark:text-[#F4F7FB]">{personalInfo.educationSummary || "B.Tech CSE (Expected 2027)"}</strong>
          </div>
          <div className="p-3 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155]">
            <span className="text-gray-600 dark:text-gray-400 block text-[10px] font-bold">CORE EMPHASIS</span>
            <strong className="text-[#111317] dark:text-[#F4F7FB]">Network Security &amp; GenAI</strong>
          </div>
          <div className="p-3 bg-[#FAF8F5] dark:bg-[#1A202C] border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317] dark:shadow-[2px_2px_0px_#334155]">
            <span className="text-gray-600 dark:text-gray-400 block text-[10px] font-bold">OPERATIONAL STATUS</span>
            <strong className="text-[#111317] dark:text-[#CCFF00] font-black">{personalInfo.status}</strong>
          </div>
        </div>
      </SpotlightCard>

      {/* Technical Competencies Grid with Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STRENGTHS.map((item, idx) => {
          const IconComponent = item.icon
          return (
            <SpotlightCard
              key={idx}
              spotlightColor={item.spotlight}
              className="about-card brutal-card-hover p-6 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[4px_4px_0px_#111317] dark:shadow-[4px_4px_0px_#1E293B]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#111317] dark:border-[#334155] shadow-[2px_2px_0px_#111317]"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComponent className="w-5 h-5 text-[#111317]" />
                </div>
                <h3 className="font-sans font-black text-lg uppercase tracking-tight text-[#111317] dark:text-[#F4F7FB]">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-[#374151] dark:text-gray-300 leading-relaxed font-sans font-medium">
                {item.desc}
              </p>
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
