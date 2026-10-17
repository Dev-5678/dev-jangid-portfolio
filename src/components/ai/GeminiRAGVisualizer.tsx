import React, { useState } from 'react'
import { Sparkles, Database, Cpu, FileText, CheckCircle2, Play } from 'lucide-react'

interface Stage {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  detail: {
    input: string
    operation: string
    output: string
    latency: string
    techStack: string[]
  }
}

const STAGES: Stage[] = [
  {
    id: 'input',
    title: '1. Multimodal Ingestion',
    subtitle: 'User Query & Telemetry / Image Data',
    icon: FileText,
    badge: 'PAYLOAD',
    detail: {
      input: '{ "prompt": "Analyze network compliance log and satellite payload anomalies", "type": "multimodal" }',
      operation: 'Tokenizes user prompt and validates security parameters before embedding.',
      output: 'Validated Input Stream [768-dim Vector Candidate]',
      latency: '~12ms',
      techStack: ['Python', 'Streamlit UI', 'Pydantic']
    }
  },
  {
    id: 'embedding',
    title: '2. Embedding Pipeline',
    subtitle: 'Dense Vector Representation',
    icon: Cpu,
    badge: 'VECTORIZE',
    detail: {
      input: 'Cleaned text & image metadata chunks',
      operation: 'Generates high-dimensional vector embeddings with semantic preservation.',
      output: 'Dense Float32 Vector Array [dim: 768]',
      latency: '~45ms',
      techStack: ['Gemini Embeddings', 'NumPy']
    }
  },
  {
    id: 'retrieval',
    title: '3. Vector DB & RAG Retrieval',
    subtitle: 'Cosine Similarity Context Match',
    icon: Database,
    badge: 'RAG_MATCH',
    detail: {
      input: 'Query vector matched against compliance & telemetry knowledge base',
      operation: 'K-Nearest Neighbors (k=4) cosine distance search over verified documents.',
      output: 'Top-4 Semantic Chunks: [AAI Security Guidelines, CanSat Telemetry Specs]',
      latency: '~28ms',
      techStack: ['Vector DB', 'RAG Framework', 'Cloud Storage']
    }
  },
  {
    id: 'gemini',
    title: '4. Gemini 1.5 Inference',
    subtitle: 'Context-Augmented Reasoning',
    icon: Sparkles,
    badge: 'INFERENCE',
    detail: {
      input: 'System Instruction + Grounded RAG Chunks + User Multimodal Query',
      operation: 'Gemini Multimodal reasoning model synthesizes structured response with zero hallucinations.',
      output: 'Structured Markdown synthesis with compliance status and mitigation steps.',
      latency: '~180ms',
      techStack: ['Google Gemini API', 'Python SDK', 'Prompt Engineering']
    }
  },
  {
    id: 'streamlit',
    title: '5. Streamlit Deployment',
    subtitle: 'Real-Time Streaming UI Delivery',
    icon: CheckCircle2,
    badge: 'DELIVER',
    detail: {
      input: 'Streaming token buffer from Gemini engine',
      operation: 'Hydrates interactive charts, metric indicators, and downloadable audit logs.',
      output: 'Rendered Web Application for enterprise operators.',
      latency: '~15ms rendering',
      techStack: ['Streamlit', 'Cloud Hosting', 'FastAPI']
    }
  }
]

export const GeminiRAGVisualizer: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('gemini')
  const [isSimulating, setIsSimulating] = useState(false)

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0]

  const handleSimulatePipeline = () => {
    setIsSimulating(true)
    let idx = 0
    const interval = setInterval(() => {
      setActiveStageId(STAGES[idx].id)
      idx++
      if (idx >= STAGES.length) {
        clearInterval(interval)
        setIsSimulating(false)
      }
    }, 700)
  }

  return (
    <div className="brutal-card p-6 sm:p-8 bg-white dark:bg-[#131720] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#CCFF00]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#111317] dark:border-[#334155] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF5500] dark:text-[#CCFF00] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#CCFF00]" />
            <span>ARCHITECTURE // GENERATIVE_AI_TRAINEESHIP</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#111317] dark:text-[#F4F7FB] mt-1">
            Multimodal RAG & Gemini Pipeline
          </h3>
        </div>

        <button
          onClick={handleSimulatePipeline}
          disabled={isSimulating}
          className="brutal-btn px-4 py-2 bg-[#CCFF00] text-[#111317] font-mono font-bold text-xs uppercase flex items-center gap-2 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isSimulating ? 'SIMULATING FLOW...' : 'RUN PIPELINE TRACE'}</span>
        </button>
      </div>

      {/* Pipeline Stages Step Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-6">
        {STAGES.map((stage) => {
          const Icon = stage.icon
          const isActive = stage.id === activeStageId

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-3 text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'bg-[#111317] text-[#CCFF00] border-[#111317] dark:border-[#CCFF00] shadow-[3px_3px_0px_#CCFF00]'
                  : 'bg-[#FAF8F5] dark:bg-[#1A202C] text-[#111317] dark:text-[#F4F7FB] border-[#111317] dark:border-[#334155] hover:border-[#CCFF00]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-mono font-bold uppercase px-1 py-0.5 bg-black/10 dark:bg-white/10">
                  {stage.badge}
                </span>
              </div>
              <div className="font-mono text-xs font-bold truncate">{stage.title}</div>
            </button>
          )
        })}
      </div>

      {/* Stage Detail Inspector Panel */}
      <div className="p-5 bg-[#FAF8F5] dark:bg-[#0A0D12] border-2 border-[#111317] dark:border-[#334155] font-mono text-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 dark:border-gray-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[var(--accent,#CCFF00)] text-[#111317] font-black text-[10px] uppercase">
              NODE INSPECTOR
            </span>
            <span className="font-bold text-[#111317] dark:text-[#F4F7FB]">{activeStage.title}</span>
          </div>
          <div className="text-gray-500 text-[11px]">
            Avg Step Latency: <span className="text-[#FF5500] dark:text-[#CCFF00] font-bold">{activeStage.detail.latency}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">Incoming Input:</span>
            <div className="p-2.5 bg-white dark:bg-[#141820] border border-gray-300 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-[11px] overflow-x-auto">
              {activeStage.detail.input}
            </div>
          </div>

          <div>
            <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">Synthesized Output:</span>
            <div className="p-2.5 bg-white dark:bg-[#141820] border border-gray-300 dark:border-gray-800 text-[#00E5FF] dark:text-[#00E5FF] text-[11px] overflow-x-auto">
              {activeStage.detail.output}
            </div>
          </div>
        </div>

        <div>
          <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">Underlying Operation:</span>
          <p className="text-gray-700 dark:text-gray-300 font-sans text-xs">
            {activeStage.detail.operation}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-300 dark:border-gray-800">
          <span className="text-gray-400 uppercase text-[10px] font-bold">Tech Stack:</span>
          {activeStage.detail.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-white dark:bg-[#1E293B] border border-[#111317] dark:border-[#334155] text-[10px] font-bold text-[#111317] dark:text-[#F4F7FB]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
