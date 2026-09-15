import { useState, useEffect } from 'react'

export function useLiveTelemetry() {
  const [istTime, setIstTime] = useState('')
  const [latency, setLatency] = useState(16)

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
        setIstTime(`${formatter.format(now)} IST`)
      } catch {
        setIstTime('15:30:00 IST')
      }
    }

    update()
    const timer = setInterval(update, 1000)
    const latencyTimer = setInterval(() => {
      setLatency(14 + Math.floor(Math.random() * 9))
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(latencyTimer)
    }
  }, [])

  return { istTime, latency, status: 'SYS://NOMINAL' }
}
