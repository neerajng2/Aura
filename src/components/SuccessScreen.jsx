import Confetti from './Confetti'
import { BASE_FEE, ADDITIONAL_FEE } from '../constants'

export default function SuccessScreen({ data }) {
  const rid = `AURA-${Date.now().toString(36).toUpperCase()}`
  const count = Object.values(data.selectedEvents).flat().length
  const fee = count === 0 ? BASE_FEE : BASE_FEE + (count - 1) * ADDITIONAL_FEE

  const rows = [
    ['Name', data.step1.fullName],
    ['Email', data.step1.email],
    ['College', data.step1.college],
    ['Department', data.step1.department],
    ['Events Selected', `${count} event${count !== 1 ? 's' : ''}`],
    ['Total Fee', `₹${fee}`],
    ['UTR / Txn ID', data.step3.utrNumber],
  ]

  const handleDownload = () => {
    const content = [
      '╔══════════════════════════════════════╗',
      '║     AURA 2K26 – REGISTRATION RECEIPT    ║',
      '╚══════════════════════════════════════╝',
      '',
      `Receipt ID : ${rid}`,
      `Date       : ${new Date().toLocaleString('en-IN')}`,
      '',
      '─────────────────────────────────────',
      'PARTICIPANT DETAILS',
      '─────────────────────────────────────',
      `Name       : ${data.step1.fullName}`,
      `Email      : ${data.step1.email}`,
      `WhatsApp   : ${data.step1.whatsapp}`,
      `College    : ${data.step1.college}`,
      `Department : ${data.step1.department}`,
      `Roll No.   : ${data.step1.rollNumber}`,
      '',
      '─────────────────────────────────────',
      'EVENTS REGISTERED',
      '─────────────────────────────────────',
      ...Object.values(data.selectedEvents).flat().map((e) => `  • ${e}`),
      '',
      '─────────────────────────────────────',
      'PAYMENT',
      '─────────────────────────────────────',
      `Total Fee  : ₹${fee}`,
      `UTR / TxnID: ${data.step3.utrNumber}`,
      '',
      '─────────────────────────────────────',
      'Thank you for registering!',
      'AURA 2k26 – Ignite the Aura Within ⚡',
      '─────────────────────────────────────',
    ].join('\n')

    const a = document.createElement('a')
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
    a.download = `AURA2k26_${rid}.txt`
    a.click()
  }

  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <Confetti />

      <div
        style={{
          fontSize: '3.5rem',
          marginBottom: '14px',
          animation: 'bounceIn 0.6s ease',
        }}
      >
        🎉
      </div>

      <h2
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 'clamp(1.2rem,5vw,1.8rem)',
          background: 'linear-gradient(135deg,#00f5ff,#ff00e4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '8px',
        }}
      >
        Registration Confirmed!
      </h2>

      <p
        style={{
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '24px',
          fontSize: '0.88rem',
        }}
      >
        Welcome to AURA 2k26, {data.step1.fullName}! ⚡
      </p>

      {/* Receipt Card */}
      <div
        style={{
          background: 'rgba(0,245,255,0.05)',
          border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '22px',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '14px',
            paddingBottom: '14px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.7rem',
              fontFamily: "'Orbitron', monospace",
              letterSpacing: '2px',
            }}
          >
            RECEIPT ID
          </span>
          <span
            style={{
              color: '#00f5ff',
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            {rid}
          </span>
        </div>

        {rows.map(([k, v]) => (
          <div
            key={k}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '9px',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem' }}>
              {k}
            </span>
            <span
              style={{
                color: '#fff',
                fontSize: '0.83rem',
                fontWeight: 600,
                maxWidth: '60%',
                textAlign: 'right',
                wordBreak: 'break-all',
              }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        <a
          href="https://chat.whatsapp.com/aura2k26"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          style={{
            display: 'block',
            padding: '14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg,#25D366,#128C7E)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.88rem',
            textDecoration: 'none',
            letterSpacing: '1px',
            boxShadow: '0 4px 18px rgba(37,211,102,0.35)',
            transition: 'all 0.3s',
          }}
        >
          📱 Join AURA 2k26 WhatsApp Community
        </a>

        <button
          onClick={handleDownload}
          className="download-btn"
          style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'transparent',
            border: '1px solid rgba(0,245,255,0.35)',
            color: '#00f5ff',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            letterSpacing: '1px',
            fontFamily: 'inherit',
            transition: 'all 0.3s',
          }}
        >
          📄 Download Receipt
        </button>
      </div>
    </div>
  )
}
