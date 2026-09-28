import React, { useEffect, useRef } from 'react'

export const MatrixRain: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 640
    canvas.height = 280

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'
    const fontSize = 13
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    let animationId: number

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 13, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        
        // Lead character glowing white, trail green
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#ffffff'
        } else {
          ctx.fillStyle = '#00FF66'
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative my-2 rounded-xl overflow-hidden border border-emerald-500/30 bg-[#0a0a0d] shadow-[0_0_30px_rgba(0,255,102,0.15)]">
      <div className="px-3 py-1.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-[10px] font-mono text-emerald-400">
        <span className="font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          MATRIX PROTOCOL SIMULATOR // RUNNING
        </span>
        {onClose && (
          <button onClick={onClose} className="hover:text-white px-2 py-0.5 rounded bg-white/5 border border-white/10">
            DISMISS
          </button>
        )}
      </div>
      <canvas ref={canvasRef} className="w-full block" />
    </div>
  )
}

export default MatrixRain
