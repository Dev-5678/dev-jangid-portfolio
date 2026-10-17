import React, { useState, useEffect } from 'react'
import { Radio, Satellite, Compass, Activity, Play, Pause, RefreshCw } from 'lucide-react'

export const CanSatTelemetryWidget: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true)
  const [packetCount, setPacketCount] = useState(418)
  const [altitude, setAltitude] = useState(482.4)
  const [temp, setTemp] = useState(24.2)
  const [pressure, setPressure] = useState(962.1)
  const [pitch, setPitch] = useState(2.1)
  const [lastPing, setLastPing] = useState<string>('JUST NOW')
  const [pingBurst, setPingBurst] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setPacketCount((p) => p + 1)
      setAltitude((a) => Number((a + (Math.random() * 2 - 1)).toFixed(1)))
      setTemp(Number((24 + Math.sin(Date.now() / 5000) * 1.5).toFixed(1)))
      setPressure(Number((960 + Math.random() * 4).toFixed(1)))
      setPitch(Number((Math.sin(Date.now() / 2000) * 8).toFixed(1)))
    }, 1200)

    return () => clearInterval(interval)
  }, [isRunning])

  const handleTransmitPing = () => {
    setPingBurst(true)
    setPacketCount((p) => p + 5)
    setLastPing('ACK RECEIVED')
    setTimeout(() => {
      setPingBurst(false)
      setLastPing('JUST NOW')
    }, 1500)
  }

  return (
    <div className="w-full bg-[#111317] text-[#F4F7FB] border-3 border-[#111317] dark:border-[#334155] shadow-[6px_6px_0px_#111317] dark:shadow-[6px_6px_0px_#00E5FF] p-5 sm:p-6 font-mono text-xs select-none">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-gray-800">
        <div className="flex items-center gap-2.5">
          <Satellite className={`w-5 h-5 text-[#00E5FF] ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '12s' }} />
          <div>
            <span className="font-black text-sm text-[#00E5FF] uppercase tracking-wider block">
              CANSAT_PAYLOAD // TELEMETRY_SIMULATOR
            </span>
            <span className="text-[10px] text-gray-400 font-bold">
              INDIA SPACE LAB • CANSAT &amp; CUBESAT TELEMETRY INTERFACE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#334155] text-gray-200 border border-gray-700 flex items-center gap-1 font-bold text-[10px] transition-colors"
          >
            {isRunning ? <Pause className="w-3 h-3 text-[#FF5500]" /> : <Play className="w-3 h-3 text-[#CCFF00]" />}
            <span>{isRunning ? 'FREEZE' : 'STREAM'}</span>
          </button>
          <button
            onClick={handleTransmitPing}
            className={`px-3 py-1 font-bold text-[10px] uppercase border transition-all ${
              pingBurst
                ? 'bg-[#00E5FF] text-[#111317] border-[#00E5FF]'
                : 'bg-[#CCFF00] hover:bg-[#b8e600] text-[#111317] border-[#111317]'
            }`}
          >
            <span className="flex items-center gap-1">
              <Radio className={`w-3 h-3 ${pingBurst ? 'animate-ping' : ''}`} />
              <span>{pingBurst ? 'UPLINK...' : 'TX PING'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Sensor Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {/* Metric 1 */}
        <div className="p-3 bg-[#1A202C] border border-gray-800 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 font-bold block mb-1">ALTITUDE (AGL)</span>
          <div className="text-lg sm:text-xl font-black text-[#00E5FF] flex items-baseline gap-1">
            <span>{altitude}</span>
            <span className="text-[10px] text-gray-400">m</span>
          </div>
          <span className="text-[9px] text-gray-500 mt-1">SONIC / BARO COMPOSITE</span>
        </div>

        {/* Metric 2 */}
        <div className="p-3 bg-[#1A202C] border border-gray-800 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 font-bold block mb-1">PRESSURE</span>
          <div className="text-lg sm:text-xl font-black text-[#CCFF00] flex items-baseline gap-1">
            <span>{pressure}</span>
            <span className="text-[10px] text-gray-400">hPa</span>
          </div>
          <span className="text-[9px] text-gray-500 mt-1">ATMOSPHERIC GRADIENT</span>
        </div>

        {/* Metric 3 */}
        <div className="p-3 bg-[#1A202C] border border-gray-800 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 font-bold block mb-1">PAYLOAD TEMP</span>
          <div className="text-lg sm:text-xl font-black text-[#FF5500] flex items-baseline gap-1">
            <span>{temp}</span>
            <span className="text-[10px] text-gray-400">°C</span>
          </div>
          <span className="text-[9px] text-gray-500 mt-1">THERMISTOR SENSOR</span>
        </div>

        {/* Metric 4 */}
        <div className="p-3 bg-[#1A202C] border border-gray-800 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 font-bold block mb-1">PACKET COUNT</span>
          <div className="text-lg sm:text-xl font-black text-[#F4F7FB] flex items-baseline gap-1">
            <span>#{packetCount}</span>
          </div>
          <span className="text-[9px] text-gray-500 mt-1">433 MHz UHF LINK</span>
        </div>
      </div>

      {/* Feature 7: 2D Descent Flight Trajectory Radar */}
      <div className="mb-4 p-3 bg-[#141820] border border-gray-800">
        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-2">
          <span className="text-[#00E5FF] uppercase">Flight Profile // Descent Trajectory Radar</span>
          <span>APOGEE: 1000m • CHUTE: 500m</span>
        </div>
        <div className="relative w-full h-20 bg-[#0A0D12] border border-gray-800 overflow-hidden flex items-end">
          <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="40" x2="400" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="400" y2="60" stroke="#1E293B" strokeDasharray="3 3" />

            {/* Descent Path Curve */}
            <path
              d="M 10 10 Q 80 15, 160 40 T 390 75"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2.5"
            />

            {/* Parachute Deployment Indicator at ~500m (x: 160, y: 40) */}
            <circle cx="160" cy="40" r="4" fill="#FF5500" />
            <text x="170" y="38" fill="#FF5500" fontSize="8" fontFamily="monospace" fontWeight="bold">CHUTE_DEPLOY (500m)</text>

            {/* Live Payload Position Marker mapped to current altitude */}
            <circle
              cx={Math.max(20, Math.min(380, 400 - (altitude / 1000) * 360))}
              cy={Math.max(10, Math.min(75, 80 - (altitude / 1000) * 70))}
              r="5"
              fill="#CCFF00"
              stroke="#111317"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Attitude & Link Status Bar */}
      <div className="p-3 bg-[#141820] border border-gray-800 flex flex-wrap items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-300">
            <Compass className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>PITCH TILT: <strong className="text-[#CCFF00]">{pitch}°</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-300">
            <Activity className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>RSSI: <strong className="text-gray-200">-76 dBm (EXCELLENT)</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <RefreshCw className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          <span>STATUS: <strong className="text-[#00E5FF]">{lastPing}</strong></span>
        </div>
      </div>
    </div>
  )
}

export default CanSatTelemetryWidget
