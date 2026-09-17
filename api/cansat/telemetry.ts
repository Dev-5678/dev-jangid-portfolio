import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const issRes = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
    const issData = await issRes.json()

    return res.status(200).json({
      success: true,
      source: 'INDIA_SPACE_LAB_GROUND_STATION_UPLINK',
      carrier: '433.920 MHz UHF FSK',
      orbitalTelemetry: {
        satelliteName: 'ISS / CanSat Relay',
        latitude: issData.latitude,
        longitude: issData.longitude,
        altitudeKm: issData.altitude,
        velocityKmh: issData.velocity,
        visibility: issData.visibility,
        timestamp: issData.timestamp
      }
    })
  } catch {
    return res.status(200).json({
      success: true,
      source: 'INDIA_SPACE_LAB_SIMULATED_BEACON',
      carrier: '433.920 MHz UHF FSK',
      orbitalTelemetry: {
        satelliteName: 'CanSat 1U Primary',
        latitude: 28.4089,
        longitude: 77.3178,
        altitudeKm: 422.5,
        velocityKmh: 27580,
        visibility: 'daylight',
        timestamp: Date.now()
      }
    })
  }
}
