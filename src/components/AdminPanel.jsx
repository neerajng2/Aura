import { BASE_FEE, ADDITIONAL_FEE } from '../constants'

export default function AdminPanel({ regs, onClose }) {
  const cols = ['#', 'Name', 'Email', 'WhatsApp', 'College', 'Dept', 'Events', 'Fee', 'UTR', 'Time']

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.97)',
        zIndex: 10000,
        overflowY: 'auto',
        padding: '32px 16px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '28px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 'clamp(1.2rem,4vw,1.8rem)',
                color: '#00f5ff',
                textShadow: '0 0 18px rgba(0,245,255,0.4)',
              }}
            >
              AURA 2k26 — Admin Panel
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.8rem',
                marginTop: '4px',
              }}
            >
              {regs.length} registration{regs.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,0,0,0.1)',
              border: '1px solid rgba(255,0,0,0.3)',
              color: '#ff4444',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            ✕ Close
          </button>
        </div>

        {regs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: 'rgba(255,255,255,0.25)',
              fontSize: '1rem',
            }}
          >
            No registrations yet. Be the first! 🚀
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,245,255,0.25)' }}>
                  {cols.map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '11px 14px',
                        textAlign: 'left',
                        color: '#00f5ff',
                        fontFamily: "'Orbitron', monospace",
                        fontSize: '0.6rem',
                        letterSpacing: '2px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {regs.map((r, i) => {
                  const evts = Object.values(r.selectedEvents).flat()
                  const fee =
                    evts.length === 0
                      ? BASE_FEE
                      : BASE_FEE + (evts.length - 1) * ADDITIONAL_FEE
                  return (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        background: i % 2 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '11px 14px', color: 'rgba(255,255,255,0.35)' }}>{i + 1}</td>
                      <td style={{ padding: '11px 14px', color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.step1.fullName}</td>
                      <td style={{ padding: '11px 14px', color: 'rgba(255,255,255,0.65)' }}>{r.step1.email}</td>
                      <td style={{ padding: '11px 14px', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap' }}>{r.step1.whatsapp}</td>
                      <td style={{ padding: '11px 14px', color: 'rgba(255,255,255,0.65)', maxWidth: '140px' }}>{r.step1.college}</td>
                      <td style={{ padding: '11px 14px', color: 'rgba(255,255,255,0.65)' }}>{r.step1.department}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                          {evts.map((e) => (
                            <span
                              key={e}
                              style={{
                                background: 'rgba(0,245,255,0.1)',
                                border: '1px solid rgba(0,245,255,0.25)',
                                borderRadius: '5px',
                                padding: '1px 5px',
                                fontSize: '0.68rem',
                                color: '#00f5ff',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {e}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: '11px 14px',
                          color: '#00ff88',
                          fontFamily: "'Orbitron', monospace",
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        ₹{fee}
                      </td>
                      <td
                        style={{
                          padding: '11px 14px',
                          color: 'rgba(255,255,255,0.5)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {r.step3.utrNumber}
                      </td>
                      <td
                        style={{
                          padding: '11px 14px',
                          color: 'rgba(255,255,255,0.35)',
                          fontSize: '0.72rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {new Date(r.ts).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
