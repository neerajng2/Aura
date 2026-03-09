import { useState, useEffect } from 'react'

const Box = ({ val, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        background: 'rgba(0,245,255,0.08)',
        border: '1px solid rgba(0,245,255,0.35)',
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: 'clamp(1.5rem,5vw,2.2rem)',
        fontFamily: "'Orbitron', monospace",
        fontWeight: 900,
        color: '#00f5ff',
        textShadow: '0 0 20px #00f5ff',
        minWidth: '64px',
        letterSpacing: '2px',
      }}
    >
      {String(val).padStart(2, '0')}
    </div>
    <div
      style={{
        fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.4)',
        marginTop: '6px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
  </div>
)

const Sep = () => (
  <span
    style={{
      color: '#00f5ff',
      fontSize: '1.8rem',
      fontWeight: 900,
      marginBottom: '22px',
      textShadow: '0 0 10px #00f5ff',
    }}
  >
    :
  </span>
)

export default function CountdownTimer() {
  const target = new Date('2026-03-15T09:00:00').getTime()
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) return
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Box val={t.d} label="Days" />
      <Sep />
      <Box val={t.h} label="Hours" />
      <Sep />
      <Box val={t.m} label="Mins" />
      <Sep />
      <Box val={t.s} label="Secs" />
    </div>
  )
}
