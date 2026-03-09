export default function QRPlaceholder() {
  const pattern = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ]

  const cells = []
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (pattern[r][c]) {
        cells.push(<rect key={`tl${r}${c}`} x={c * 5} y={r * 5} width={5} height={5} fill="#000" />)
        cells.push(<rect key={`tr${r}${c}`} x={65 + c * 5} y={r * 5} width={5} height={5} fill="#000" />)
        cells.push(<rect key={`bl${r}${c}`} x={c * 5} y={65 + r * 5} width={5} height={5} fill="#000" />)
      }
    }
  }

  const rand = [15, 20, 25, 30, 35, 40, 45, 50, 55]
  rand.forEach((x) =>
    rand.forEach((y) => {
      if (Math.sin(x * y) > 0)
        cells.push(<rect key={`r${x}${y}`} x={x} y={y} width={4} height={4} fill="#000" />)
    })
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,245,255,0.2)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          width: '160px',
          height: '160px',
          background: '#fff',
          borderRadius: '12px',
          padding: '10px',
          marginBottom: '14px',
          boxShadow: '0 0 30px rgba(0,245,255,0.3)',
        }}
      >
        <svg viewBox="0 0 100 100" width="140" height="140">
          {cells}
          <text x="50" y="97" textAnchor="middle" fontSize="5.5" fill="#333" fontFamily="monospace">
            aura2k26@ybl
          </text>
        </svg>
      </div>
      <div
        style={{
          color: '#00f5ff',
          fontFamily: "'Orbitron', monospace",
          fontSize: '0.75rem',
          letterSpacing: '2px',
          marginBottom: '4px',
        }}
      >
        SCAN & PAY UPI
      </div>
      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
        aura2k26@ybl | AURA Fest Committee
      </div>
    </div>
  )
}
