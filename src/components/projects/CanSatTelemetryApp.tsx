import React, { useState, useEffect } from 'react'
import { Satellite, Radio, Compass, Activity, Play, Pause, Code2, ArrowDown, Send } from 'lucide-react'

type FlightPhase = 'PRE_LAUNCH' | 'ASCENT' | 'APOGEE' | 'FREEFALL' | 'PARACHUTE_DEPLOYED' | 'TOUCHDOWN'

interface PacketFrame {
  id: number
  timestamp: string
  rawHex: string
  altitude: number
  pressure: number
  temp: number
  crc: string
}

export const CanSatTelemetryApp: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true)
  const [phase, setPhase] = useState<FlightPhase>('FREEFALL')
  const [altitude, setAltitude] = useState(482.4)
  const [pressure, setPressure] = useState(962.1)
  const [temp, setTemp] = useState(24.2)
  const [pitch, setPitch] = useState(2.4)
  const [roll, setRoll] = useState(-1.1)
  const [packetCount, setPacketCount] = useState(418)
  const [rssi, setRssi] = useState(-74) // dBm
  const snr = 11.8 // dB
  const [packets, setPackets] = useState<PacketFrame[]>([])
  const [activeTab, setActiveTab] = useState<'flight' | 'packets' | 'firmware'>('flight')
  const [parachuteTriggered, setParachuteTriggered] = useState(false)
  const [uplinkAck, setUplinkAck] = useState(false)

  // Simulation timer loop
  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setPacketCount((c) => c + 1)

      // Altitude progression logic
      setAltitude((alt) => {
        let newAlt = alt
        if (phase === 'ASCENT') {
          newAlt = alt + 18.5
          if (newAlt >= 980) setPhase('APOGEE')
        } else if (phase === 'APOGEE') {
          setPhase('FREEFALL')
        } else if (phase === 'FREEFALL') {
          newAlt = alt - 14.2
          if (newAlt <= 500 && !parachuteTriggered) {
            setPhase('PARACHUTE_DEPLOYED')
            setParachuteTriggered(true)
          }
        } else if (phase === 'PARACHUTE_DEPLOYED') {
          newAlt = alt - 3.8
          if (newAlt <= 2.0) {
            newAlt = 0.0
            setPhase('TOUCHDOWN')
            setIsRunning(false)
          }
        } else if (phase === 'PRE_LAUNCH') {
          newAlt = 0.0
        }
        return Number(Math.max(0, newAlt).toFixed(1))
      })

      // Pressure calculation from barometric equation
      setPressure(() => {
        const calculated = 1013.25 * Math.pow(1 - (altitude / 44330), 5.255)
        return Number(calculated.toFixed(1))
      })

      // Temperature variation
      setTemp(() => Number((24.0 - (altitude * 0.0065)).toFixed(1)))

      // Gyro orientation oscillation
      setPitch(Number((Math.sin(Date.now() / 1500) * 6.5).toFixed(1)))
      setRoll(Number((Math.cos(Date.now() / 1800) * 4.2).toFixed(1)))

      // RSSI fluctuations
      setRssi(-70 + Math.floor(Math.sin(Date.now() / 3000) * 8))

      // Generate raw hex packet frame
      const now = new Date()
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${Math.floor(now.getMilliseconds() / 100)}`
      const hexAlt = Math.floor(altitude * 10).toString(16).toUpperCase().padStart(4, '0')
      const hexPrs = Math.floor(pressure * 10).toString(16).toUpperCase().padStart(4, '0')
      const newFrame: PacketFrame = {
        id: packetCount + 1,
        timestamp: timeStr,
        rawHex: `AA 55 01 ${hexAlt} ${hexPrs} 18 2F 4B CRC_OK`,
        altitude: Number(altitude.toFixed(1)),
        pressure: Number(pressure.toFixed(1)),
        temp: Number(temp.toFixed(1)),
        crc: 'VALID (0x4E91)'
      }

      setPackets((prev) => [newFrame, ...prev.slice(0, 19)])
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, phase, altitude, pressure, temp, packetCount, parachuteTriggered])

  const handleManualUplink = () => {
    setUplinkAck(true)
    setPacketCount((c) => c + 5)
    setTimeout(() => setUplinkAck(false), 2000)
  }

  const handleResetFlight = () => {
    setAltitude(1000.0)
    setPhase('FREEFALL')
    setParachuteTriggered(false)
    setIsRunning(true)
  }

  const handleManualDeployParachute = () => {
    setPhase('PARACHUTE_DEPLOYED')
    setParachuteTriggered(true)
  }

  return (
    <div className="w-full bg-[#090a0d] text-[#e4e4e7] rounded-xl border border-white/10 overflow-hidden font-mono text-xs select-none shadow-2xl">
      {/* Top Telemetry Header */}
      <div className="px-4 py-3 bg-[#101116] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ember/20 border border-ember/60 flex items-center justify-center font-bold text-ember text-xs">
            <Satellite className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs tracking-wider uppercase">
                India Space Lab // 1U CanSat Telemetry Downlink
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-ember/15 text-ember-bright border border-ember/40">
                433.92 MHz UHF FSK
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block">
              Embedded Microcontroller Sensor Array • Real-time Ground Station Demodulation
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isRunning ? 'Freeze Stream' : 'Resume Telemetry'}</span>
          </button>

          <button
            onClick={handleManualUplink}
            className="px-3 py-1.5 rounded-lg bg-ember hover:bg-ember-bright text-white font-semibold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(160,42,34,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <Send className={`w-3.5 h-3.5 ${uplinkAck ? 'animate-ping' : ''}`} />
            <span>{uplinkAck ? 'ACK Received' : 'TX Uplink Ping'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#0c0d12] border-b border-white/10 text-[11px]">
        <button
          onClick={() => setActiveTab('flight')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'flight'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Live Avionics Instruments
        </button>
        <button
          onClick={() => setActiveTab('packets')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'packets'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Raw UHF Packet Frame Buffer ({packets.length})
        </button>
        <button
          onClick={() => setActiveTab('firmware')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'firmware'
              ? 'bg-white/10 text-white font-semibold border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3 h-3 text-ember" />
          <span>Embedded C++ Telemetry Firmware</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5">
        {activeTab === 'flight' && (
          <div className="space-y-4">
            {/* Mission Phase Banner */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span className="text-[11px] text-zinc-400 font-bold">FLIGHT STAGE:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-ember/15 text-ember-bright font-bold border border-ember/30 text-xs">
                  {phase.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-zinc-400">
                  UHF Link Quality: <strong className="text-white">{rssi} dBm</strong> (SNR: {snr} dB)
                </span>
                {phase === 'FREEFALL' && (
                  <button
                    onClick={handleManualDeployParachute}
                    className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-[10px] transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ArrowDown className="w-3 h-3" />
                    <span>Deploy Chute</span>
                  </button>
                )}
                <button
                  onClick={handleResetFlight}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-[10px] transition-all cursor-pointer"
                >
                  Restart Drop Simulation
                </button>
              </div>
            </div>

            {/* Primary Gauges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Altitude */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Altitude (AGL)</span>
                  <span className="text-ember">BARO/BMP280</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  {altitude} <span className="text-xs text-zinc-400 font-normal">m</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-ember h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (altitude / 1000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Barometric Pressure */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Atm Pressure</span>
                  <span className="text-emerald-400">1013.25 BASE</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  {pressure} <span className="text-xs text-zinc-400 font-normal">hPa</span>
                </div>
                <span className="text-[10px] text-zinc-500">I2C Precision Sensor</span>
              </div>

              {/* Temperature */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Payload Temp</span>
                  <span className="text-amber-400">NOMINAL</span>
                </div>
                <div className="my-2 text-2xl sm:text-3xl font-extrabold text-white">
                  {temp} <span className="text-xs text-zinc-400 font-normal">°C</span>
                </div>
                <span className="text-[10px] text-zinc-500">Lapse Rate: -6.5°C/km</span>
              </div>

              {/* IMU Orientation */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>IMU Pitch / Roll</span>
                  <span className="text-cyan-400">MPU6050</span>
                </div>
                <div className="my-2 text-lg sm:text-xl font-extrabold text-white">
                  {pitch}° / {roll}°
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                  <Compass className="w-3 h-3 text-cyan-400" />
                  <span>Dual Axis Stabilization</span>
                </div>
              </div>
            </div>

            {/* Downlink Signal Integrity */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Radio className="w-5 h-5 text-ember" />
                <div>
                  <div className="font-bold text-white text-xs uppercase">
                    Ground Station Demodulator // FSK 9600 Baud
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Carrier: 433.920 MHz • Total Frames Received: <span className="text-white font-bold">{packetCount}</span> • CRC Errors: 0
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  CRC16 CHECKSUM VERIFIED
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'packets' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">DEMODULATED SERIAL FRAME STREAM</span>
              <span className="text-[10px] text-zinc-500">Packet Format: SYNC_BYTE | ALT_HEX | PRS_HEX | CRC16</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5 max-h-72 overflow-y-auto">
              {packets.map((pkt) => (
                <div key={pkt.id} className="flex flex-wrap items-center justify-between gap-2 text-zinc-300 py-0.5 border-b border-white/5">
                  <span className="text-zinc-500">#{pkt.id} [{pkt.timestamp}]</span>
                  <span className="font-bold text-ember">{pkt.rawHex}</span>
                  <span className="text-zinc-400">{pkt.altitude}m // {pkt.pressure}hPa</span>
                  <span className="text-emerald-400 font-semibold">{pkt.crc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'firmware' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-zinc-400 text-[11px] font-bold">1U CANSAT ARDUINO / C++ FIRMWARE</span>
              <span className="text-[10px] text-zinc-500">Target: ATmega328P / ESP32 • UART 9600 to 433MHz Transceiver</span>
            </div>
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
{`#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <SoftwareSerial.h>

SoftwareSerial radioSerial(10, 11); // RX, TX to 433 MHz UHF module
Adafruit_BMP280 bmp;

struct __attribute__((packed)) TelemetryPacket {
    uint8_t syncA = 0xAA;
    uint8_t syncB = 0x55;
    uint16_t packetId;
    float altitude;
    float pressure;
    float temperature;
    uint16_t crc16;
};

void setup() {
    Serial.begin(115200);
    radioSerial.begin(9600);
    if (!bmp.begin(0x76)) {
        Serial.println(F("BMP280 Sensor Fail"));
        while (1);
    }
}

void loop() {
    TelemetryPacket pkt;
    pkt.packetId = getNextPacketId();
    pkt.altitude = bmp.readAltitude(1013.25);
    pkt.pressure = bmp.readPressure() / 100.0F;
    pkt.temperature = bmp.readTemperature();
    pkt.crc16 = calculateCRC16((uint8_t*)&pkt, sizeof(pkt) - 2);

    radioSerial.write((uint8_t*)&pkt, sizeof(pkt));
    delay(1000);
}`}
            </pre>
          </div>
        )}
      </div>

      {/* Engineering Footer */}
      <div className="px-4 py-2.5 bg-[#0c0d12] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-ember" />
          <span>India Space Lab • Verified Aerospace Telemetry &amp; CanSat Engineering</span>
        </div>
        <span className="text-zinc-500">FSK Demodulator • Faridabad, India</span>
      </div>
    </div>
  )
}

export default CanSatTelemetryApp
