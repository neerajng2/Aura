import { useState } from 'react'

export default function NeonInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required,
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ marginBottom: '18px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '0.65rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: focused ? '#00f5ff' : 'rgba(255,255,255,0.45)',
          marginBottom: '7px',
          fontFamily: "'Orbitron', monospace",
          transition: 'color 0.3s',
        }}
      >
        {label}
        {required && <span style={{ color: '#ff00e4' }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${
            error ? '#ff4444' : focused ? '#00f5ff' : 'rgba(255,255,255,0.1)'
          }`,
          borderRadius: '10px',
          padding: '12px 16px',
          color: '#fff',
          fontSize: '0.95rem',
          outline: 'none',
          boxSizing: 'border-box',
          boxShadow: focused ? '0 0 14px rgba(0,245,255,0.18)' : 'none',
          transition: 'all 0.3s',
          fontFamily: 'inherit',
        }}
      />
      {error && (
        <p style={{ color: '#ff4444', fontSize: '0.72rem', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  )
}
