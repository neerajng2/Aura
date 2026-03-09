import { useState } from 'react'

export default function EventCard({ event, selected, onToggle, cc }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="event-card"
      onClick={() => onToggle(event.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '14px',
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
        background: selected
          ? `${cc.neon}14`
          : hovered
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${
          selected
            ? cc.neon
            : hovered
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(255,255,255,0.06)'
        }`,
        boxShadow: selected ? `0 0 18px ${cc.glow}` : 'none',
      }}
    >
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: cc.neon,
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            color: '#000',
            fontWeight: 900,
          }}
        >
          ✓
        </div>
      )}
      <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{event.icon}</div>
      <div
        style={{
          fontSize: '0.83rem',
          fontWeight: 700,
          color: selected ? cc.neon : 'rgba(255,255,255,0.85)',
          marginBottom: '4px',
          lineHeight: 1.3,
        }}
      >
        {event.name}
      </div>
      <div
        style={{
          fontSize: '0.72rem',
          color: selected ? cc.neon : 'rgba(255,255,255,0.4)',
          fontFamily: "'Orbitron', monospace",
        }}
      >
        ₹{event.fee}
      </div>
    </div>
  )
}
