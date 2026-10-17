import React, { useState, useEffect, useRef, useCallback } from 'react'

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  className?: string
  encryptedClassName?: string
  characters?: string
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/[]{}+='

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  className = '',
  encryptedClassName = 'text-[#FF5500] dark:text-[#CCFF00]',
  characters = DEFAULT_CHARS
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isDecrypting, setIsDecrypting] = useState(false)
  const isReduced = useRef(false)

  const decrypt = useCallback(() => {
    if (isDecrypting || isReduced.current) return
    setIsDecrypting(true)

    let iteration = 0
    const totalLength = text.length

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < (iteration / maxIterations) * totalLength) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      iteration++

      if (iteration > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsDecrypting(false)
      }
    }, speed)
  }, [characters, isDecrypting, maxIterations, speed, text])

  useEffect(() => {
    isReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isReduced.current) {
      decrypt()
    } else {
      setDisplayText(text)
    }
  }, [text, decrypt])

  return (
    <span
      onMouseEnter={decrypt}
      className={`inline-block cursor-default font-mono transition-colors ${className} ${
        isDecrypting ? encryptedClassName : ''
      }`}
    >
      {displayText}
    </span>
  )
}
