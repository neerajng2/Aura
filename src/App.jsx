import { useState, useRef, useEffect } from 'react'
import ParticleCanvas from './components/ParticleCanvas'
import CountdownTimer from './components/CountdownTimer'
import StepBar from './components/StepBar'
import NeonInput from './components/NeonInput'
import EventCard from './components/EventCard'
import QRPlaceholder from './components/QRPlaceholder'
import FileUpload from './components/FileUpload'
import SuccessScreen from './components/SuccessScreen'
import AdminPanel from './components/AdminPanel'
import { EVENTS, BASE_FEE, ADDITIONAL_FEE, CATEGORY_COLORS, CARD_STYLE } from './constants'

const EMPTY_EVENTS = { Technical: [], Cultural: [], 'Non-Technical': [] }

export default function App() {
  const formRef = useRef()
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [regs, setRegs] = useState([])
  const [adminKey, setAdminKey] = useState('')
  const [errors, setErrors] = useState({})

  const [s1, setS1] = useState({
    fullName: '', email: '', whatsapp: '',
    college: '', department: '', rollNumber: '',
  })
  const [selEvts, setSelEvts] = useState(EMPTY_EVENTS)
  const [s3, setS3] = useState({ utrNumber: '', paymentFile: null })

  const total = Object.values(selEvts).flat().length
  const fee = total === 0 ? BASE_FEE : BASE_FEE + (total - 1) * ADDITIONAL_FEE

  const toggle = (cat, id) =>
    setSelEvts((p) => ({
      ...p,
      [cat]: p[cat].includes(id) ? p[cat].filter((e) => e !== id) : [...p[cat], id],
    }))

  const v1 = () => {
    const e = {}
    if (!s1.fullName.trim()) e.fullName = 'Full name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) e.email = 'Enter a valid email address'
    if (!/^\d{10}$/.test(s1.whatsapp)) e.whatsapp = 'Enter a valid 10-digit mobile number'
    if (!s1.college.trim()) e.college = 'College name is required'
    if (!s1.department.trim()) e.department = 'Department is required'
    if (!s1.rollNumber.trim()) e.rollNumber = 'Roll / Aadhaar number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const v2 = () => {
    if (total === 0) {
      setErrors({ events: 'Please select at least one event' })
      return false
    }
    setErrors({})
    return true
  }

  const v3 = () => {
    const e = {}
    if (!s3.utrNumber.trim()) e.utrNumber = 'Transaction ID / UTR number is required'
    if (!s3.paymentFile) e.paymentFile = 'Payment screenshot is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && !v1()) return
    if (step === 2 && !v2()) return
    if (step === 3) {
      if (!v3()) return
      setRegs((p) => [
        ...p,
        { step1: s1, selectedEvents: selEvts, step3: s3, ts: new Date().toISOString() },
      ])
      // Mock email confirmation
      console.log(`📧 [MOCK EMAIL] Confirmation sent to ${s1.email}`)
      console.log(`   Subject: AURA 2k26 – Registration Confirmed!`)
      console.log(`   Hi ${s1.fullName}, you have registered for ${total} event(s). Total: ₹${fee}`)
      setSuccess(true)
      return
    }
    setStep((x) => x + 1)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  // Admin panel – type password in bottom-right input and press Enter
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Enter' && adminKey === 'AURA2026') {
        setAdmin(true)
        setAdminKey('')
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [adminKey])

  const formData = { step1: s1, selectedEvents: selEvts, step3: s3 }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg,#020308 0%,#060b1a 45%,#0a0520 70%,#020308 100%)',
        color: '#fff',
        fontFamily: "'Rajdhani','Segoe UI',sans-serif",
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <ParticleCanvas />
      {admin && <AdminPanel regs={regs} onClose={() => setAdmin(false)} />}

      {/* ───── HERO ───── */}
      {!success && (
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Grid overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(0,245,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.025) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
              pointerEvents: 'none',
            }}
          />

          <div style={{ animation: 'floatY 3s ease-in-out infinite', marginBottom: '18px' }}>
            <span
              style={{
                fontSize: '0.7rem',
                letterSpacing: '8px',
                textTransform: 'uppercase',
                color: '#ff00e4',
                fontFamily: "'Orbitron', monospace",
                textShadow: '0 0 18px rgba(255,0,228,0.5)',
              }}
            >
              ⚡ FLAGSHIP COLLEGE FEST 2026 ⚡
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(3rem,12vw,7.5rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              lineHeight: 1.05,
              marginBottom: '6px',
            }}
          >
            AURA 2k26
          </h1>

          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 'clamp(0.9rem,3vw,1.35rem)',
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '4px',
              marginBottom: '50px',
              textTransform: 'uppercase',
            }}
          >
            Ignite the Aura Within
          </p>

          <div style={{ marginBottom: '52px' }}>
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '4px',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                fontFamily: "'Orbitron', monospace",
                marginBottom: '18px',
              }}
            >
              Event Begins In
            </p>
            <CountdownTimer />
          </div>

          <button
            className="reg-btn"
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '17px 46px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg,#00f5ff,#ff00e4)',
              border: 'none',
              color: '#000',
              fontWeight: 900,
              fontSize: '0.95rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: "'Orbitron', monospace",
              boxShadow: '0 4px 28px rgba(0,245,255,0.4)',
            }}
          >
            Register Now →
          </button>

          <div
            style={{
              marginTop: '44px',
              display: 'flex',
              gap: '36px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              ['15 MAR', 'Date'],
              ['9 AM', 'Start'],
              ['50+', 'Events'],
              ['∞', 'Memories'],
            ].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '1.3rem',
                    color: '#00f5ff',
                    fontWeight: 900,
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '3px',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ───── FORM ───── */}
      <div
        ref={formRef}
        style={{
          maxWidth: '660px',
          margin: '0 auto',
          padding: `${success ? '60px' : '40px'} 20px 80px`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {success ? (
          <div style={CARD_STYLE}>
            <SuccessScreen data={formData} />
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 'clamp(1rem,4vw,1.4rem)',
                  color: '#00f5ff',
                  textShadow: '0 0 18px rgba(0,245,255,0.35)',
                  marginBottom: '8px',
                }}
              >
                Registration Portal
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
                Step {step} of 3 —{' '}
                {
                  ['Participant Identity', 'Event Selection', 'Payment & Verification'][
                    step - 1
                  ]
                }
              </p>
            </div>

            <StepBar step={step} />

            <div style={CARD_STYLE}>
              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div>
                  <h3
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.95rem',
                      color: '#fff',
                      marginBottom: '22px',
                      letterSpacing: '2px',
                    }}
                  >
                    👤 Participant Identity
                  </h3>
                  <NeonInput label="Full Name" value={s1.fullName} required
                    onChange={(e) => setS1({ ...s1, fullName: e.target.value })}
                    placeholder="Your full legal name" error={errors.fullName} />
                  <NeonInput label="Email Address" type="email" value={s1.email} required
                    onChange={(e) => setS1({ ...s1, email: e.target.value })}
                    placeholder="you@college.edu" error={errors.email} />
                  <NeonInput label="WhatsApp Number" type="tel" value={s1.whatsapp} required
                    onChange={(e) => setS1({ ...s1, whatsapp: e.target.value })}
                    placeholder="10-digit mobile number" error={errors.whatsapp} />
                  <NeonInput label="College / University" value={s1.college} required
                    onChange={(e) => setS1({ ...s1, college: e.target.value })}
                    placeholder="Your institution name" error={errors.college} />
                  <NeonInput label="Department / Course" value={s1.department} required
                    onChange={(e) => setS1({ ...s1, department: e.target.value })}
                    placeholder="e.g. B.Tech CSE, MBA" error={errors.department} />
                  <NeonInput label="Roll Number / Aadhaar" value={s1.rollNumber} required
                    onChange={(e) => setS1({ ...s1, rollNumber: e.target.value })}
                    placeholder="Roll no. or last 4 digits of Aadhaar" error={errors.rollNumber} />
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div>
                  <h3
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.95rem',
                      color: '#fff',
                      marginBottom: '6px',
                      letterSpacing: '2px',
                    }}
                  >
                    🎯 Choose Your Events
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: '0.78rem',
                      marginBottom: '22px',
                    }}
                  >
                    Select all events you want to participate in
                  </p>

                  {errors.events && (
                    <div
                      style={{
                        background: 'rgba(255,68,68,0.08)',
                        border: '1px solid rgba(255,68,68,0.28)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        marginBottom: '18px',
                        color: '#ff4444',
                        fontSize: '0.8rem',
                      }}
                    >
                      ⚠️ {errors.events}
                    </div>
                  )}

                  {Object.entries(EVENTS).map(([cat, evts]) => {
                    const cc = CATEGORY_COLORS[cat]
                    return (
                      <div key={cat} style={{ marginBottom: '26px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '12px',
                            paddingBottom: '9px',
                            borderBottom: `1px solid ${cc.neon}2a`,
                          }}
                        >
                          <div
                            style={{
                              width: '3px',
                              height: '16px',
                              background: cc.neon,
                              borderRadius: '2px',
                              boxShadow: `0 0 8px ${cc.neon}`,
                            }}
                          />
                          <h4
                            style={{
                              fontFamily: "'Orbitron', monospace",
                              fontSize: '0.7rem',
                              color: cc.neon,
                              letterSpacing: '3px',
                              textTransform: 'uppercase',
                            }}
                          >
                            {cat}
                          </h4>
                          {selEvts[cat]?.length > 0 && (
                            <span
                              style={{
                                background: cc.neon + '1a',
                                border: `1px solid ${cc.neon}40`,
                                borderRadius: '20px',
                                padding: '2px 8px',
                                fontSize: '0.62rem',
                                color: cc.neon,
                                fontFamily: "'Orbitron', monospace",
                              }}
                            >
                              {selEvts[cat].length} selected
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))',
                            gap: '9px',
                          }}
                        >
                          {evts.map((ev) => (
                            <EventCard
                              key={ev.id}
                              event={ev}
                              selected={selEvts[cat]?.includes(ev.id)}
                              onToggle={(id) => toggle(cat, id)}
                              cc={cc}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  {/* Fee counter */}
                  <div
                    style={{
                      background: 'rgba(0,245,255,0.05)',
                      border: '1px solid rgba(0,245,255,0.22)',
                      borderRadius: '16px',
                      padding: '18px',
                      boxShadow: '0 0 28px rgba(0,245,255,0.08)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '9px',
                      }}
                    >
                      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>
                        Base Registration
                      </span>
                      <span
                        style={{
                          color: '#fff',
                          fontFamily: "'Orbitron', monospace",
                          fontWeight: 700,
                        }}
                      >
                        ₹{BASE_FEE}
                      </span>
                    </div>
                    {total > 1 && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '9px',
                        }}
                      >
                        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>
                          +{total - 1} extra event{total > 2 ? 's' : ''} × ₹{ADDITIONAL_FEE}
                        </span>
                        <span
                          style={{
                            color: '#ff00e4',
                            fontFamily: "'Orbitron', monospace",
                            fontWeight: 700,
                          }}
                        >
                          ₹{(total - 1) * ADDITIONAL_FEE}
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        borderTop: '1px solid rgba(0,245,255,0.18)',
                        paddingTop: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Orbitron', monospace",
                          fontSize: '0.65rem',
                          color: 'rgba(255,255,255,0.4)',
                          letterSpacing: '3px',
                        }}
                      >
                        TOTAL PAYABLE
                      </span>
                      <span
                        style={{
                          fontFamily: "'Orbitron', monospace",
                          fontSize: 'clamp(1.4rem,5vw,1.9rem)',
                          fontWeight: 900,
                          color: '#00f5ff',
                          textShadow: '0 0 18px rgba(0,245,255,0.4)',
                        }}
                      >
                        ₹{fee}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <div>
                  <h3
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.95rem',
                      color: '#fff',
                      marginBottom: '6px',
                      letterSpacing: '2px',
                    }}
                  >
                    💳 Payment & Verification
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: '0.78rem',
                      marginBottom: '22px',
                    }}
                  >
                    Total Amount:{' '}
                    <span
                      style={{
                        color: '#00f5ff',
                        fontFamily: "'Orbitron', monospace",
                        fontWeight: 700,
                      }}
                    >
                      ₹{fee}
                    </span>
                  </p>

                  <QRPlaceholder />

                  <div
                    style={{
                      background: 'rgba(255,230,0,0.05)',
                      border: '1px solid rgba(255,230,0,0.18)',
                      borderRadius: '12px',
                      padding: '13px 16px',
                      marginBottom: '22px',
                      fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.6,
                    }}
                  >
                    💡{' '}
                    <strong style={{ color: '#ffe600' }}>Instructions:</strong> Pay{' '}
                    <strong style={{ color: '#00f5ff' }}>₹{fee}</strong> to{' '}
                    <strong style={{ color: '#00f5ff' }}>aura2k26@ybl</strong> via UPI. Screenshot
                    the confirmation and upload below.
                  </div>

                  <NeonInput
                    label="Transaction ID / UTR Number"
                    value={s3.utrNumber}
                    required
                    onChange={(e) => setS3({ ...s3, utrNumber: e.target.value })}
                    placeholder="12-digit UTR or Transaction ID"
                    error={errors.utrNumber}
                  />
                  <FileUpload
                    value={s3.paymentFile}
                    onChange={(f) => setS3({ ...s3, paymentFile: f })}
                    error={errors.paymentFile}
                  />
                </div>
              )}

              {/* Nav Buttons */}
              <div style={{ display: 'flex', gap: '11px', marginTop: '28px' }}>
                {step > 1 && (
                  <button
                    className="back-btn"
                    onClick={() => setStep((x) => x - 1)}
                    style={{
                      flex: 1,
                      padding: '13px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.65)',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      fontFamily: 'inherit',
                    }}
                  >
                    ← Back
                  </button>
                )}
                <button
                  className="next-btn"
                  onClick={next}
                  style={{
                    flex: 2,
                    padding: '13px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg,#00f5ff,#7c3aed)',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: "'Orbitron', monospace",
                    boxShadow: '0 4px 18px rgba(0,245,255,0.28)',
                  }}
                >
                  {step === 3 ? '⚡ Submit Registration' : `Continue → Step ${step + 1}`}
                </button>
              </div>
            </div>
          </>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: '36px',
            color: 'rgba(255,255,255,0.07)',
            fontSize: '0.62rem',
            letterSpacing: '2px',
          }}
        >
          AURA 2k26 © 2026 — ADMIN: TYPE PASSWORD + ENTER
        </div>
      </div>

      {/* Hidden admin input */}
      <input
        type="password"
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && adminKey === 'AURA2026') {
            setAdmin(true)
            setAdminKey('')
          }
        }}
        placeholder="🔐"
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          width: '72px',
          padding: '7px 10px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '0.65rem',
          outline: 'none',
          zIndex: 100,
          fontFamily: "'Orbitron', monospace",
        }}
      />
    </div>
  )
}
