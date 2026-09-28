import React, { useState, useEffect, useRef } from 'react'
import { Trophy, RotateCcw } from 'lucide-react'

interface Point {
  x: number
  y: number
}

export const TerminalSnake: React.FC = () => {
  const COLS = 28
  const ROWS = 14

  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 7 },
    { x: 9, y: 7 },
    { x: 8, y: 7 }
  ])
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT')
  const [food, setFood] = useState<Point>({ x: 18, y: 7 })
  const [score, setScore] = useState<number>(0)
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem('terminal_snake_highscore') || 0)
  })
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  const directionRef = useRef(direction)
  directionRef.current = direction

  // Generate food avoiding snake body
  const spawnFood = (currentSnake: Point[]) => {
    let newFood: Point
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      }
      const collision = currentSnake.some((p) => p.x === newFood.x && p.y === newFood.y)
      if (!collision) break
    }
    return newFood
  }

  const restartGame = () => {
    const initialSnake: Point[] = [
      { x: 10, y: 7 },
      { x: 9, y: 7 },
      { x: 8, y: 7 }
    ]
    setSnake(initialSnake)
    setDirection('RIGHT')
    directionRef.current = 'RIGHT'
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
    setFood(spawnFood(initialSnake))
  }

  // Handle arrow key inputs
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const currentDir = directionRef.current
      if (['ArrowUp', 'w', 'W'].includes(e.key) && currentDir !== 'DOWN') {
        e.preventDefault()
        setDirection('UP')
      } else if (['ArrowDown', 's', 'S'].includes(e.key) && currentDir !== 'UP') {
        e.preventDefault()
        setDirection('DOWN')
      } else if (['ArrowLeft', 'a', 'A'].includes(e.key) && currentDir !== 'RIGHT') {
        e.preventDefault()
        setDirection('LEFT')
      } else if (['ArrowRight', 'd', 'D'].includes(e.key) && currentDir !== 'LEFT') {
        e.preventDefault()
        setDirection('RIGHT')
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused((p) => !p)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Game tick loop
  useEffect(() => {
    if (gameOver || isPaused) return

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] }
        const dir = directionRef.current

        if (dir === 'UP') head.y -= 1
        if (dir === 'DOWN') head.y += 1
        if (dir === 'LEFT') head.x -= 1
        if (dir === 'RIGHT') head.x += 1

        // Wall collisions
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setGameOver(true)
          return prevSnake
        }

        // Self collision
        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10
            if (nextScore > highScore) {
              setHighScore(nextScore)
              localStorage.setItem('terminal_snake_highscore', String(nextScore))
            }
            return nextScore
          })
          setFood(spawnFood(newSnake))
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 110)

    return () => clearInterval(interval)
  }, [food, gameOver, isPaused, highScore])

  return (
    <div className="my-2 p-3 sm:p-4 rounded-xl bg-[#080b11] border border-emerald-500/30 text-white font-mono shadow-[0_0_30px_rgba(0,255,102,0.12)]">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-2 mb-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold tracking-wider uppercase">RETRO SNAKE CLI [ARCADE_MODE]</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-zinc-500">SCORE:</span>{' '}
            <strong className="text-emerald-400 font-bold">{score}</strong>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-500">HI:</span>{' '}
            <strong className="text-amber-400 font-bold">{highScore}</strong>
          </div>

          <button
            onClick={restartGame}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESTART</span>
          </button>
        </div>
      </div>

      {/* Game Board Canvas */}
      <div className="relative mx-auto w-fit rounded-lg border-2 border-emerald-500/40 bg-[#040609] p-1 shadow-inner select-none">
        <div
          className="grid gap-[1px]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 14px)`,
            gridTemplateRows: `repeat(${ROWS}, 14px)`
          }}
        >
          {Array.from({ length: ROWS * COLS }).map((_, idx) => {
            const x = idx % COLS
            const y = Math.floor(idx / COLS)
            const isHead = snake[0]?.x === x && snake[0]?.y === y
            const isBody = snake.slice(1).some((s) => s.x === x && s.y === y)
            const isFood = food.x === x && food.y === y

            return (
              <div
                key={idx}
                className={`w-[14px] h-[14px] rounded-[2px] transition-colors ${
                  isHead
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    : isBody
                    ? 'bg-emerald-600/80'
                    : isFood
                    ? 'bg-ember animate-ping'
                    : 'bg-white/[0.02]'
                }`}
              />
            )
          })}
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 rounded-lg">
            <span className="text-sm font-bold text-red-500 tracking-widest uppercase">COLLISION DETECTED // GAME OVER</span>
            <span className="text-xs text-zinc-400">FINAL SCORE: <strong className="text-white">{score}</strong></span>
            <button
              onClick={restartGame}
              className="mt-1 px-4 py-1.5 rounded bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-400 active:scale-95 transition-all shadow-[0_0_15px_#10b981]"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      <div className="mt-2.5 text-center text-[10px] text-zinc-500">
        Controls: <strong className="text-zinc-300">Arrow Keys / WASD</strong> to steer • <strong className="text-zinc-300">Spacebar</strong> to pause
      </div>
    </div>
  )
}

export default TerminalSnake
