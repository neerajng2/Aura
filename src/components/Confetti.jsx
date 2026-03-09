const ConfettiPiece = ({ x, color, delay, size, rotation }) => (
  <div
    style={{
      position: 'fixed',
      left: `${x}%`,
      top: '-20px',
      width: `${size}px`,
      height: `${size * 0.6}px`,
      backgroundColor: color,
      borderRadius: '2px',
      animation: `confettiFall ${2 + Math.random()}s ease-in ${delay}s forwards`,
      transform: `rotate(${rotation}deg)`,
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  />
)

export default function Confetti() {
  const colors = ['#00f5ff', '#ff00e4', '#ffe600', '#00ff88', '#ff6b35', '#a855f7']
  const pieces = Array.from({ length: 110 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    size: 6 + Math.random() * 10,
    rotation: Math.random() * 360,
  }))

  return (
    <>
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} {...p} />
      ))}
    </>
  )
}
