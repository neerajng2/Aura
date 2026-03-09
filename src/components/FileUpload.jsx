import { useState, useRef, useCallback } from 'react'

export default function FileUpload({ value, onChange, error }) {
  const [drag, setDrag] = useState(false)
  const ref = useRef()

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDrag(false)
      const f = e.dataTransfer.files[0]
      if (f) onChange(f)
    },
    [onChange]
  )

  return (
    <div style={{ marginBottom: '18px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '0.65rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '7px',
          fontFamily: "'Orbitron', monospace",
        }}
      >
        Payment Screenshot <span style={{ color: '#ff00e4' }}>*</span>
      </label>

      <div
        onClick={() => ref.current.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${
            drag ? '#00f5ff' : value ? '#00ff88' : error ? '#ff4444' : 'rgba(255,255,255,0.14)'
          }`,
          borderRadius: '14px',
          padding: '28px 16px',
          textAlign: 'center',
          cursor: 'pointer',
          background: drag
            ? 'rgba(0,245,255,0.05)'
            : value
            ? 'rgba(0,255,136,0.04)'
            : 'rgba(255,255,255,0.02)',
          transition: 'all 0.3s',
          boxShadow: drag ? '0 0 18px rgba(0,245,255,0.2)' : 'none',
        }}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => onChange(e.target.files[0])}
        />
        {value ? (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
            <div style={{ color: '#00ff88', fontSize: '0.85rem' }}>{value.name}</div>
            <div
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.72rem',
                marginTop: '4px',
              }}
            >
              Click to change
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>📎</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>
              Drag & drop or{' '}
              <span style={{ color: '#00f5ff' }}>click to upload</span>
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.28)',
                fontSize: '0.72rem',
                marginTop: '6px',
              }}
            >
              PNG, JPG up to 5MB
            </div>
          </div>
        )}
      </div>
      {error && (
        <p style={{ color: '#ff4444', fontSize: '0.72rem', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  )
}
