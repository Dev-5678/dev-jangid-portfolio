import React, { useState } from 'react'

interface BalloonThemeToggleProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  className?: string
}

export const BalloonThemeToggle: React.FC<BalloonThemeToggleProps> = ({
  theme,
  onToggleTheme,
  className = ''
}) => {
  const [isPulling, setIsPulling] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isDark = theme === 'dark'

  const handlePull = () => {
    onToggleTheme()
    setIsPulling(true)

    // Realistic elastic recoil release
    setTimeout(() => {
      setIsPulling(false)
    }, 320)
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ touchAction: 'manipulation' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Realistic Balloon Toggle Button */}
      <button
        onClick={handlePull}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handlePull()
          }
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-pressed={isDark}
        title={`Pull string to switch to ${isDark ? 'light' : 'dark'} mode`}
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-full flex flex-col items-center"
        style={{
          transform: isPulling
            ? 'translateY(10px) scale(0.96, 1.08)'
            : 'translateY(0px) scale(1, 1)',
          transition: isPulling
            ? 'transform 0.12s cubic-bezier(0.2, 0, 0.4, 1)'
            : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Photorealistic 3D Vector Balloon */}
        <div
          className="relative transition-transform duration-300"
          style={{
            animation: isPulling ? 'none' : 'floatBuoyancy 4.5s ease-in-out infinite',
            transformOrigin: 'center bottom'
          }}
        >
          <svg
            width="38"
            height="96"
            viewBox="0 0 48 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Studio Specular Softbox Blur */}
              <filter id="studioGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
              <filter id="softRim" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.8" />
              </filter>

              {/* Dark Mode: Deep Obsidian Onyx with Warm Ember Rim Gradient */}
              <radialGradient id="balloonDarkBody" cx="32%" cy="26%" r="72%" fx="26%" fy="20%">
                <stop offset="0%" stopColor="#554d4a" />
                <stop offset="28%" stopColor="#2e2624" />
                <stop offset="62%" stopColor="#171211" />
                <stop offset="88%" stopColor="#0a0807" />
                <stop offset="100%" stopColor="#1a120e" />
              </radialGradient>

              {/* Dark Mode Ember Ambient Rim Reflection */}
              <radialGradient id="balloonDarkEmberRim" cx="72%" cy="75%" r="58%">
                <stop offset="0%" stopColor="#fc6b2f" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#a02a22" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Light Mode: Lustrous Champagne Titanium Pearl Gradient */}
              <radialGradient id="balloonLightBody" cx="30%" cy="24%" r="74%" fx="24%" fy="18%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="26%" stopColor="#fff7ed" />
                <stop offset="55%" stopColor="#fed7aa" />
                <stop offset="82%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#9a3412" />
              </radialGradient>

              {/* Light Mode Golden Amber Rim Reflection */}
              <radialGradient id="balloonLightRim" cx="72%" cy="75%" r="55%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                <stop offset="42%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
              </radialGradient>

              {/* Specular Softbox Highlight Gradient */}
              <linearGradient id="specularSoftbox" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Weighted Pull-Bead Metallic Gradient */}
              <linearGradient id="beadGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              <linearGradient id="beadCharcoal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* 1. Ambient Volumetric Glow Halo */}
            <circle
              cx="24"
              cy="28"
              r="22"
              fill={isDark ? '#fc6b2f' : '#f59e0b'}
              opacity={isDark ? (isHovered ? '0.28' : '0.14') : (isHovered ? '0.22' : '0.10')}
              filter="url(#softRim)"
              className="transition-opacity duration-300"
            />

            {/* 2. Realistic 3D Balloon Body (Authentic teardrop curvature with bottom neck) */}
            <path
              d="M 24,4 C 36,4 43.5,14 43.5,27 C 43.5,39.5 32,49 26.5,53.2 L 26,54.5 L 28,57.5 L 20,57.5 L 22,54.5 L 21.5,53.2 C 16,49 4.5,39.5 4.5,27 C 4.5,14 12,4 24,4 Z"
              fill={isDark ? 'url(#balloonDarkBody)' : 'url(#balloonLightBody)'}
              stroke={isDark ? 'rgba(255,255,255,0.18)' : 'rgba(249,115,22,0.35)'}
              strokeWidth="0.75"
            />

            {/* 3. Rim Lighting Overlay (Simulates spherical light bounce) */}
            <path
              d="M 24,4 C 36,4 43.5,14 43.5,27 C 43.5,39.5 32,49 26.5,53.2 L 26,54.5 L 28,57.5 L 20,57.5 L 22,54.5 L 21.5,53.2 C 16,49 4.5,39.5 4.5,27 C 4.5,14 12,4 24,4 Z"
              fill={isDark ? 'url(#balloonDarkEmberRim)' : 'url(#balloonLightRim)'}
              style={{ mixBlendMode: 'screen' }}
            />

            {/* 4. Realistic Curved Studio Specular Reflection Sheen */}
            <ellipse
              cx="16"
              cy="16"
              rx="5.5"
              ry="9.5"
              transform="rotate(-30 16 16)"
              fill="url(#specularSoftbox)"
              filter="url(#studioGlow)"
              opacity={isDark ? '0.85' : '0.95'}
            />

            {/* 5. Precision Crisp Glint Dot */}
            <circle cx="15.5" cy="13.5" r="1.3" fill="#ffffff" opacity="0.95" />

            {/* 6. Subtle Lower-Right Rim Sheen */}
            <path
              d="M 34,36 C 39,30 40,24 40,20"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity={isDark ? '0.25' : '0.45'}
              filter="url(#studioGlow)"
            />

            {/* 7. Realistic Tied Rubber Latex Knot at the Bottom */}
            <ellipse
              cx="24"
              cy="55.2"
              rx="3.6"
              ry="1.8"
              fill={isDark ? '#e05318' : '#ea580c'}
            />
            {/* Knot wrap shadow ring */}
            <ellipse
              cx="24"
              cy="55.8"
              rx="2.6"
              ry="1.1"
              fill="#000000"
              opacity="0.45"
            />
            {/* Flared nozzle lip hanging below knot */}
            <path
              d="M 21.5,55.8 L 19.5,58.8 L 28.5,58.8 L 26.5,55.8 Z"
              fill={isDark ? '#992d0c' : '#c2410c'}
            />

            {/* 8. Hanging Silk Balloon Cord (Delicately curved catenary wave) */}
            <g
              style={{
                animation: isPulling ? 'none' : 'cordWave 4.5s ease-in-out infinite',
                transformOrigin: '24px 58px'
              }}
            >
              {/* String Core Line: High Contrast in Both Dark & Light Modes */}
              <path
                d="M 24,58.5 C 23.2,68 25.4,78 23.4,89 C 22.2,97 24.6,105 24,111"
                fill="none"
                stroke={isDark ? '#fbbf24' : '#1e293b'}
                strokeWidth={isDark ? '1.5' : '1.75'}
                strokeLinecap="round"
                filter={isDark ? 'drop-shadow(0 0 2px rgba(251,191,36,0.8))' : 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))'}
              />

              {/* 9. Weighted Precision Pull-Bead at the Cord End */}
              <circle
                cx="24"
                cy="111.5"
                r="3.2"
                fill={isDark ? 'url(#beadGold)' : 'url(#beadCharcoal)'}
                stroke={isDark ? '#fef08a' : '#64748b'}
                strokeWidth="0.8"
                filter="drop-shadow(0 1px 3px rgba(0,0,0,0.4))"
              />
              {/* Bead Micro-Highlight */}
              <circle
                cx="23"
                cy="110.5"
                r="0.8"
                fill="#ffffff"
                opacity="0.9"
              />
            </g>
          </svg>
        </div>

        {/* Floating Minimalist Tooltip on Hover */}
        <div
          className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase pointer-events-none transition-all duration-200 z-50 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-1'
          } ${
            isDark
              ? 'bg-[#18181e] text-amber-300 border border-amber-400/30 shadow-[0_4px_12px_rgba(0,0,0,0.6)]'
              : 'bg-white text-zinc-800 border border-zinc-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
          }`}
          aria-hidden="true"
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </div>
      </button>

      {/* Physics-driven CSS Keyframes for Natural Floating & Cord Sway */}
      <style>{`
        @keyframes floatBuoyancy {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          35% {
            transform: translateY(-4.5px) rotate(1.2deg);
          }
          70% {
            transform: translateY(-1.5px) rotate(-1.0deg);
          }
        }

        @keyframes cordWave {
          0%, 100% {
            transform: rotate(0deg);
          }
          35% {
            transform: rotate(2deg);
          }
          70% {
            transform: rotate(-1.8deg);
          }
        }
      `}</style>
    </div>
  )
}

export default BalloonThemeToggle
