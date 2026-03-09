export default function StepBar({ step }) {
  const steps = ['Identity', 'Events', 'Payment']

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
      }}
    >
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background:
                  i + 1 <= step
                    ? 'linear-gradient(135deg,#00f5ff,#ff00e4)'
                    : 'rgba(255,255,255,0.05)',
                border:
                  i + 1 === step
                    ? '2px solid #00f5ff'
                    : '2px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: i + 1 <= step ? '#000' : 'rgba(255,255,255,0.3)',
                fontWeight: 900,
                fontSize: '0.9rem',
                fontFamily: "'Orbitron', monospace",
                boxShadow:
                  i + 1 === step ? '0 0 20px rgba(0,245,255,0.5)' : 'none',
                transition: 'all 0.4s',
              }}
            >
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color:
                  i + 1 === step ? '#00f5ff' : 'rgba(255,255,255,0.3)',
                fontFamily: "'Orbitron', monospace",
              }}
            >
              {s}
            </span>
          </div>
          {i < 2 && (
            <div
              style={{
                width: '50px',
                height: '2px',
                marginBottom: '22px',
                background:
                  i + 1 < step
                    ? 'linear-gradient(90deg,#00f5ff,#ff00e4)'
                    : 'rgba(255,255,255,0.1)',
                transition: 'all 0.4s',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
