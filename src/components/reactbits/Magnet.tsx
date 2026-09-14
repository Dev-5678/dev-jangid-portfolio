import React, { useRef, useState } from 'react'

interface MagnetProps {
  children: React.ReactNode
  className?: string
  padding?: number
  magnetStrength?: number
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  className = '',
  padding = 40,
  magnetStrength = 0.35
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distX = e.clientX - centerX
    const distY = e.clientY - centerY

    if (
      Math.abs(distX) < rect.width / 2 + padding &&
      Math.abs(distY) < rect.height / 2 + padding
    ) {
      setPosition({ x: distX * magnetStrength, y: distY * magnetStrength })
      setIsHovered(true)
    } else {
      setPosition({ x: 0, y: 0 })
      setIsHovered(false)
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.3)'
      }}
    >
      {children}
    </div>
  )
}
