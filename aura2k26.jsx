import { useState, useEffect, useRef, useCallback } from "react";

const EVENTS = {
  Technical: [
    { id: "paper", name: "Paper Presentation", icon: "📄", fee: 50 },
    { id: "debug", name: "Code Debugging", icon: "🐛", fee: 50 },
    { id: "robo", name: "Robo Race", icon: "🤖", fee: 80 },
    { id: "ideathon", name: "Ideathon", icon: "💡", fee: 60 },
  ],
  Cultural: [
    { id: "dance", name: "Solo/Group Dance", icon: "💃", fee: 70 },
    { id: "bands", name: "Battle of Bands", icon: "🎸", fee: 100 },
    { id: "fashion", name: "Fashion Show", icon: "👗", fee: 80 },
    { id: "photo", name: "Photography", icon: "📸", fee: 50 },
  ],
  "Non-Technical": [
    { id: "bgmi", name: "E-Sports (BGMI/FF)", icon: "🎮", fee: 60 },
    { id: "treasure", name: "Treasure Hunt", icon: "🗺️", fee: 40 },
    { id: "facepainting", name: "Face Painting", icon: "🎨", fee: 30 },
  ],
};

const BASE_FEE = 100;
const ADDITIONAL_FEE = 50;

const CATEGORY_COLORS = {
  Technical: { neon: "#00c8ff", glow: "rgba(0,200,255,0.25)", bg: "rgba(0,200,255,0.06)" },
  Cultural: { neon: "#e040fb", glow: "rgba(224,64,251,0.25)", bg: "rgba(224,64,251,0.06)" },
  "Non-Technical": { neon: "#b39ddb", glow: "rgba(179,157,219,0.25)", bg: "rgba(179,157,219,0.06)" },
};

/* ─── Confetti ─── */
function ConfettiPiece({ x, color, delay, size, rotation }) {
  return (
    <div style={{
      position: "fixed", left: `${x}%`, top: "-20px",
      width: `${size}px`, height: `${size * 0.6}px`,
      backgroundColor: color, borderRadius: "2px",
      animation: `confettiFall ${2 + Math.random()}s ease-in ${delay}s forwards`,
      transform: `rotate(${rotation}deg)`, zIndex: 9999, pointerEvents: "none",
    }} />
  );
}

function Confetti() {
  const colors = ["#00c8ff", "#e040fb", "#ffe600", "#00e676", "#ff6b35", "#b39ddb"];
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2, size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));
  return (
    <>
      <style>{`@keyframes confettiFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }`}</style>
      {pieces.map(p => <ConfettiPiece key={p.id} {...p} />)}
    </>
  );
}

/* ─── Countdown ─── */
function CountdownTimer() {
  const target = new Date("2026-03-15T09:00:00").getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  const Box = ({ val, label }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{
        background: "rgba(0,200,255,0.07)", border: "1px solid rgba(0,200,255,0.2)",
        borderRadius: "14px", padding: "14px 18px",
        fontSize: "clamp(1.6rem,5vw,2.4rem)", fontFamily: "'Orbitron',monospace",
        fontWeight: 900, color: "#00c8ff", textShadow: "0 0 16px rgba(0,200,255,0.6)",
        minWidth: "68px", letterSpacing: "2px",
      }}>
        {String(val).padStart(2, "0")}
      </div>
      <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.35)", marginTop: "8px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Inter',sans-serif" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
      <Box val={t.d} label="Days" />
      <span style={{ color: "rgba(0,200,255,0.5)", fontSize: "2rem", fontWeight: 900, marginBottom: "26px" }}>:</span>
      <Box val={t.h} label="Hours" />
      <span style={{ color: "rgba(0,200,255,0.5)", fontSize: "2rem", fontWeight: 900, marginBottom: "26px" }}>:</span>
      <Box val={t.m} label="Mins" />
      <span style={{ color: "rgba(0,200,255,0.5)", fontSize: "2rem", fontWeight: 900, marginBottom: "26px" }}>:</span>
      <Box val={t.s} label="Secs" />
    </div>
  );
}

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.2 + 0.4, c: Math.random() > 0.5 ? "#00c8ff" : "#e040fb",
      o: Math.random() * 0.35 + 0.08,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + Math.floor(p.o * 255).toString(16).padStart(2, "0"); ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(0,200,255,${0.04 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ─── Step Progress Bar ─── */
function StepBar({ step }) {
  const steps = ["Identity", "Events", "Payment"];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: i + 1 < step ? "linear-gradient(135deg,#00c8ff,#e040fb)" : i + 1 === step ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.04)",
              border: i + 1 === step ? "2px solid #00c8ff" : i + 1 < step ? "2px solid transparent" : "2px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: i + 1 <= step ? (i + 1 < step ? "#000" : "#00c8ff") : "rgba(255,255,255,0.25)",
              fontWeight: 700, fontSize: "0.85rem", fontFamily: "'Orbitron',monospace",
              boxShadow: i + 1 === step ? "0 0 18px rgba(0,200,255,0.4)" : "none",
              transition: "all 0.4s",
            }}>{i + 1 < step ? "✓" : i + 1}</div>
            <span style={{ fontSize: "0.55rem", letterSpacing: "2px", textTransform: "uppercase", color: i + 1 === step ? "#00c8ff" : "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{s}</span>
          </div>
          {i < 2 && <div style={{ width: "52px", height: "1px", marginBottom: "26px", background: i + 1 < step ? "linear-gradient(90deg,#00c8ff,#e040fb)" : "rgba(255,255,255,0.08)", transition: "all 0.4s" }} />}
        </div>
      ))}
    </div>
  );
}

/* ─── Form Input ─── */
function Input({ label, type = "text", value, onChange, placeholder, error, required }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.5px", color: f ? "#00c8ff" : "rgba(255,255,255,0.5)", marginBottom: "7px", fontFamily: "'Inter',sans-serif", transition: "color 0.2s" }}>
        {label}{required && <span style={{ color: "#e040fb", marginLeft: "3px" }}>*</span>}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", background: f ? "rgba(0,200,255,0.04)" : "rgba(255,255,255,0.03)", border: `1px solid ${error ? "#ef5350" : f ? "rgba(0,200,255,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", padding: "11px 14px", color: "#fff", fontSize: "0.92rem", outline: "none", boxSizing: "border-box", boxShadow: f ? "0 0 12px rgba(0,200,255,0.1)" : "none", transition: "all 0.25s", fontFamily: "'Inter',sans-serif" }} />
      {error && <p style={{ color: "#ef5350", fontSize: "0.72rem", marginTop: "5px", fontFamily: "'Inter',sans-serif" }}>{error}</p>}
    </div>
  );
}

/* ─── Event Card ─── */
function EventCard({ event, selected, onToggle, cc }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={() => onToggle(event.id)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        cursor: "pointer", borderRadius: "12px", padding: "14px 12px", position: "relative",
        userSelect: "none", transition: "all 0.2s",
        background: selected ? cc.bg : h ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${selected ? cc.neon + "60" : h ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: selected ? `0 0 16px ${cc.glow}` : "none",
      }}>
      {selected && <div style={{ position: "absolute", top: "8px", right: "8px", background: cc.neon, borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#000", fontWeight: 900 }}>✓</div>}
      <div style={{ fontSize: "1.6rem", marginBottom: "7px" }}>{event.icon}</div>
      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: selected ? cc.neon : "rgba(255,255,255,0.8)", marginBottom: "4px", lineHeight: 1.35, fontFamily: "'Inter',sans-serif" }}>{event.name}</div>
      <div style={{ fontSize: "0.7rem", color: selected ? cc.neon : "rgba(255,255,255,0.35)", fontFamily: "'Orbitron',monospace", fontWeight: 700 }}>₹{event.fee}</div>
    </div>
  );
}

/* ─── QR / Payment section ─── */
function QRPlaceholder() {
  const cells = [];
  const pattern = [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1]];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
    if (pattern[r][c]) { cells.push(<rect key={`tl${r}${c}`} x={c * 5} y={r * 5} width={5} height={5} fill="#111" />); cells.push(<rect key={`tr${r}${c}`} x={65 + c * 5} y={r * 5} width={5} height={5} fill="#111" />); cells.push(<rect key={`bl${r}${c}`} x={c * 5} y={65 + r * 5} width={5} height={5} fill="#111" />); }
  }
  const rand = [15, 20, 25, 30, 35, 40, 45, 50, 55];
  rand.forEach(x => rand.forEach(y => { if (Math.sin(x * y) > 0) cells.push(<rect key={`r${x}${y}`} x={x} y={y} width={4} height={4} fill="#111" />); }));
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,200,255,0.15)", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
      <div style={{ width: "150px", height: "150px", background: "#f0f0f0", borderRadius: "10px", padding: "10px", marginBottom: "14px", boxShadow: "0 4px 24px rgba(0,200,255,0.2)" }}>
        <svg viewBox="0 0 100 100" width="130" height="130">{cells}<text x="50" y="97" textAnchor="middle" fontSize="5.5" fill="#333" fontFamily="monospace">aura2k26@ybl</text></svg>
      </div>
      <div style={{ color: "#00c8ff", fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", letterSpacing: "2px", marginBottom: "5px", fontWeight: 700 }}>SCAN &amp; PAY UPI</div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", fontFamily: "'Inter',sans-serif" }}>aura2k26@ybl · AURA Fest Committee</div>
    </div>
  );
}

/* ─── File Upload ─── */
function FileUpload({ value, onChange, error }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef();
  const onDrop = useCallback(e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onChange(f); }, [onChange]);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "7px", fontFamily: "'Inter',sans-serif" }}>Payment Screenshot <span style={{ color: "#e040fb" }}>*</span></label>
      <div onClick={() => ref.current.click()} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop}
        style={{ border: `1.5px dashed ${drag ? "#00c8ff" : value ? "#00e676" : error ? "#ef5350" : "rgba(255,255,255,0.12)"}`, borderRadius: "12px", padding: "28px 16px", textAlign: "center", cursor: "pointer", background: drag ? "rgba(0,200,255,0.04)" : value ? "rgba(0,230,118,0.04)" : "rgba(255,255,255,0.02)", transition: "all 0.25s" }}>
        <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => onChange(e.target.files[0])} />
        {value ? (
          <div><div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>✅</div><div style={{ color: "#00e676", fontSize: "0.85rem", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{value.name}</div><div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", marginTop: "4px", fontFamily: "'Inter',sans-serif" }}>Click to change</div></div>
        ) : (
          <div><div style={{ fontSize: "2rem", marginBottom: "8px" }}>📎</div><div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontFamily: "'Inter',sans-serif" }}>Drag &amp; drop or <span style={{ color: "#00c8ff", fontWeight: 600 }}>click to upload</span></div><div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", marginTop: "5px", fontFamily: "'Inter',sans-serif" }}>PNG, JPG up to 5MB</div></div>
        )}
      </div>
      {error && <p style={{ color: "#ef5350", fontSize: "0.72rem", marginTop: "5px", fontFamily: "'Inter',sans-serif" }}>{error}</p>}
    </div>
  );
}

/* ─── Success Screen ─── */
function SuccessScreen({ data }) {
  const rid = `AURA-${Date.now().toString(36).toUpperCase()}`;
  const count = Object.values(data.selectedEvents).flat().length;
  const fee = count === 0 ? BASE_FEE : BASE_FEE + (count - 1) * ADDITIONAL_FEE;
  const rows = [["Name", data.step1.fullName], ["Email", data.step1.email], ["College", data.step1.college], ["Events", count + " selected"], ["Total Fee", `₹${fee}`], ["UTR / Txn ID", data.step3.utrNumber]];
  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <Confetti />
      <div style={{ fontSize: "3rem", marginBottom: "12px", animation: "bounceIn 0.6s ease" }}>🎉</div>
      <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.1rem,5vw,1.6rem)", background: "linear-gradient(135deg,#00c8ff,#e040fb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px", fontWeight: 900 }}>Registration Confirmed!</h2>
      <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "24px", fontSize: "0.88rem", fontFamily: "'Inter',sans-serif" }}>Welcome to AURA 2k26, {data.step1.fullName}! ⚡</p>
      <div style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.15)", borderRadius: "14px", padding: "20px", marginBottom: "20px", textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", fontFamily: "'Orbitron',monospace", letterSpacing: "2px" }}>RECEIPT ID</span>
          <span style={{ color: "#00c8ff", fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", fontWeight: 700 }}>{rid}</span>
        </div>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", fontFamily: "'Inter',sans-serif" }}>{k}</span>
            <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600, maxWidth: "60%", textAlign: "right", wordBreak: "break-all", fontFamily: "'Inter',sans-serif" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <a href="https://chat.whatsapp.com/aura2k26" target="_blank" rel="noopener noreferrer"
          style={{ display: "block", padding: "13px", borderRadius: "12px", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", letterSpacing: "0.5px", fontFamily: "'Inter',sans-serif" }}>
          📱 Join AURA 2k26 WhatsApp Community
        </a>
        <button onClick={() => { const a = document.createElement("a"); a.href = `data:text/plain,AURA 2K26 RECEIPT\n\nReceipt ID: ${rid}\nName: ${data.step1.fullName}\nEmail: ${data.step1.email}\nCollege: ${data.step1.college}\nEvents: ${count}\nFee: ₹${fee}\nUTR: ${data.step3.utrNumber}\n\nThank you for registering!\nAURA 2k26 – Ignite the Aura Within.`; a.download = `AURA2k26_${rid}.txt`; a.click(); }}
          style={{ padding: "13px", borderRadius: "12px", background: "transparent", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", letterSpacing: "0.5px", fontFamily: "'Inter',sans-serif", transition: "all 0.25s" }}>
          📄 Download Receipt
        </button>
      </div>
    </div>
  );
}

/* ─── Admin Login Modal ─── */
function AdminLogin({ onSuccess, onClose }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const ADMIN_PASSWORD = "AURA@2026";

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { onSuccess(); }
    else { setErr("Incorrect password. Try again."); setPw(""); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#0d1117", border: "1px solid rgba(0,200,255,0.2)", borderRadius: "20px", padding: "36px 32px", width: "100%", maxWidth: "380px", boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,200,255,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", margin: "0 auto 16px" }}>🔐</div>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", color: "#00c8ff", fontWeight: 700, letterSpacing: "1px", marginBottom: "6px" }}>Admin Access</h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", fontFamily: "'Inter',sans-serif" }}>Enter the admin password to continue</p>
        </div>

        <div style={{ position: "relative", marginBottom: "16px" }}>
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && attempt()}
            placeholder="Admin password"
            autoFocus
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${err ? "#ef5350" : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", padding: "12px 44px 12px 14px", color: "#fff", fontSize: "0.92rem", outline: "none", boxSizing: "border-box", fontFamily: "'Inter',sans-serif" }}
          />
          <button onClick={() => setShow(s => !s)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "1rem", padding: 0 }}>{show ? "🙈" : "👁"}</button>
        </div>

        {err && <p style={{ color: "#ef5350", fontSize: "0.75rem", fontFamily: "'Inter',sans-serif", marginBottom: "14px", textAlign: "center" }}>⚠️ {err}</p>}

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.85rem", fontFamily: "'Inter',sans-serif" }}>Cancel</button>
          <button onClick={attempt} style={{ flex: 2, padding: "11px", borderRadius: "10px", background: "linear-gradient(135deg,#00c8ff,#7c3aed)", border: "none", color: "#fff", cursor: "pointer", fontSize: "0.88rem", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>Unlock →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Admin Panel ─── */
function AdminPanel({ regs, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.97)", zIndex: 10000, overflowY: "auto", padding: "32px 16px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.1rem,4vw,1.6rem)", color: "#00c8ff" }}>AURA 2k26 — Admin</h1>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", marginTop: "4px", fontFamily: "'Inter',sans-serif" }}>{regs.length} registration{regs.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(239,83,80,0.1)", border: "1px solid rgba(239,83,80,0.3)", color: "#ef5350", padding: "9px 20px", borderRadius: "10px", cursor: "pointer", fontSize: "0.85rem", fontFamily: "'Inter',sans-serif" }}>✕ Close</button>
        </div>
        {regs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.2)", fontSize: "1rem", fontFamily: "'Inter',sans-serif" }}>No registrations yet.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", fontFamily: "'Inter',sans-serif" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,200,255,0.2)" }}>
                  {["#", "Name", "Email", "WhatsApp", "College", "Dept", "Events", "Fee", "UTR"].map(h => (
                    <th key={h} style={{ padding: "11px 14px", textAlign: "left", color: "#00c8ff", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Inter',sans-serif", fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {regs.map((r, i) => {
                  const evts = Object.values(r.selectedEvents).flat();
                  const fee = evts.length === 0 ? BASE_FEE : BASE_FEE + (evts.length - 1) * ADDITIONAL_FEE;
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                      <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.3)" }}>{i + 1}</td>
                      <td style={{ padding: "10px 14px", color: "#fff", fontWeight: 600 }}>{r.step1.fullName}</td>
                      <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)" }}>{r.step1.email}</td>
                      <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)" }}>{r.step1.whatsapp}</td>
                      <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)", maxWidth: "140px" }}>{r.step1.college}</td>
                      <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)" }}>{r.step1.department}</td>
                      <td style={{ padding: "10px 14px" }}><div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>{evts.map(e => <span key={e} style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)", borderRadius: "5px", padding: "1px 6px", fontSize: "0.68rem", color: "#00c8ff" }}>{e}</span>)}</div></td>
                      <td style={{ padding: "10px 14px", color: "#00e676", fontFamily: "'Orbitron',monospace", fontWeight: 700 }}>₹{fee}</td>
                      <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.45)", fontFamily: "monospace" }}>{r.step3.utrNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main App ─── */
const LS_KEY = "aura2k26_registrations";

export default function App() {
  const formRef = useRef();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [errors, setErrors] = useState({});

  // Persist registrations in localStorage so they survive page refresh
  const [regs, setRegs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
  });
  const addReg = (entry) => setRegs(prev => {
    const next = [...prev, entry];
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch { }
    return next;
  });

  const [s1, setS1] = useState({ fullName: "", email: "", whatsapp: "", college: "", department: "", rollNumber: "" });
  const [selEvts, setSelEvts] = useState({ Technical: [], Cultural: [], "Non-Technical": [] });
  const [s3, setS3] = useState({ utrNumber: "", paymentFile: null });

  const total = Object.values(selEvts).flat().length;
  const fee = total === 0 ? BASE_FEE : BASE_FEE + (total - 1) * ADDITIONAL_FEE;

  const toggle = (cat, id) => setSelEvts(p => ({ ...p, [cat]: p[cat].includes(id) ? p[cat].filter(e => e !== id) : [...p[cat], id] }));

  const v1 = () => {
    const e = {};
    if (!s1.fullName.trim()) e.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) e.email = "Enter a valid email";
    if (!/^\d{10}$/.test(s1.whatsapp)) e.whatsapp = "Enter a valid 10-digit number";
    if (!s1.college.trim()) e.college = "Required";
    if (!s1.department.trim()) e.department = "Required";
    if (!s1.rollNumber.trim()) e.rollNumber = "Required";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const v2 = () => { if (total === 0) { setErrors({ events: "Select at least one event" }); return false; } setErrors({}); return true; };
  const v3 = () => {
    const e = {};
    if (!s3.utrNumber.trim()) e.utrNumber = "Transaction ID required";
    if (!s3.paymentFile) e.paymentFile = "Payment screenshot required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !v1()) return;
    if (step === 2 && !v2()) return;
    if (step === 3) {
      if (!v3()) return;
      addReg({ step1: s1, selectedEvents: selEvts, step3: s3, ts: new Date().toISOString() });
      setSuccess(true); return;
    }
    setStep(x => x + 1);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const card = {
    background: "rgba(255,255,255,0.025)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "clamp(20px,5vw,32px)",
  };

  const divider = { height: "1px", background: "rgba(255,255,255,0.06)", margin: "20px 0" };

  const formData = { step1: s1, selectedEvents: selEvts, step3: s3 };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#04060f 0%,#07101e 50%,#0a0518 100%)", color: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        ::placeholder{color:rgba(255,255,255,0.18)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:rgba(0,0,0,0.3)}
        ::-webkit-scrollbar-thumb{background:rgba(0,200,255,0.2);border-radius:3px}
        @keyframes bounceIn{0%{transform:scale(0.3);opacity:0}50%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 4px 28px rgba(0,200,255,0.35)}50%{box-shadow:0 4px 40px rgba(0,200,255,0.6),0 0 60px rgba(224,64,251,0.2)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .hero-title{background:linear-gradient(135deg,#fff 0%,#00c8ff 40%,#e040fb 80%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 5s linear infinite}
        .reg-btn{animation:pulseGlow 2.5s ease-in-out infinite;transition:all 0.3s ease!important}
        .reg-btn:hover{transform:translateY(-2px) scale(1.02)!important}
        .next-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
        .back-btn:hover{background:rgba(255,255,255,0.07)!important}
        .event-card:hover{transform:translateY(-1px)}
        .fade-in{animation:fadeInUp 0.5s ease forwards}
      `}</style>

      <ParticleCanvas />
      {showLogin && <AdminLogin onSuccess={() => { setShowLogin(false); setAdmin(true); }} onClose={() => setShowLogin(false)} />}
      {admin && <AdminPanel regs={regs} onClose={() => setAdmin(false)} />}

      {/* ── HERO ── */}
      {!success && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 20px 40px", position: "relative", zIndex: 1 }}>
          {/* subtle grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,200,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.02) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

          {/* Logo */}
          <div style={{ animation: "floatY 3.5s ease-in-out infinite", marginBottom: "24px" }}>
            <img
              src="public/aura-logo.png"
              alt="AURA Logo"
              style={{ height: "clamp(60px,14vw,110px)", width: "auto", filter: "drop-shadow(0 0 24px rgba(0,200,255,0.45))", objectFit: "contain" }}
            />
          </div>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(224,64,251,0.08)", border: "1px solid rgba(224,64,251,0.2)", borderRadius: "50px", padding: "6px 16px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e040fb", display: "inline-block", boxShadow: "0 0 8px #e040fb" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(224,64,251,0.85)", fontFamily: "'Inter',sans-serif", fontWeight: 700 }}>Electronic City’s Biggest Cultural & Sports Fest for Kids</span>
          </div>

          <h1 className="hero-title" style={{ fontSize: "clamp(3.2rem,13vw,8rem)", fontWeight: 900, letterSpacing: "2px", lineHeight: 1, marginBottom: "14px" }}>AURA 2k26</h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.85rem,2.5vw,1.15rem)", color: "rgba(255,255,255,0.45)", letterSpacing: "5px", marginBottom: "52px", textTransform: "uppercase", fontWeight: 500 }}>Ignite the Aura Within</p>

          {/* Countdown */}
          <div style={{ marginBottom: "52px" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "4px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontFamily: "'Inter',sans-serif", fontWeight: 600, marginBottom: "16px" }}>Event Begins In</p>
            <CountdownTimer />
          </div>

          {/* CTA */}
          <button className="reg-btn" onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "16px 44px", borderRadius: "50px", background: "linear-gradient(135deg,#00c8ff,#e040fb)", border: "none", color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Orbitron',monospace", boxShadow: "0 4px 28px rgba(0,200,255,0.35)" }}>
            Register Now →
          </button>

          {/* Stats */}
          <div style={{ marginTop: "48px", display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center" }}>
            {[["15 MAR", "Date"], ["9 AM", "Start"], ["50+", "Events"], ["∞", "Memories"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.3rem", color: "#00c8ff", fontWeight: 900, letterSpacing: "1px" }}>{v}</div>
                <div style={{ fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", fontFamily: "'Inter',sans-serif", fontWeight: 600, marginTop: "4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FORM SECTION ── */}
      <div ref={formRef} style={{ maxWidth: "640px", margin: "0 auto", padding: `${success ? "60px" : "40px"} 20px 80px`, position: "relative", zIndex: 1 }}>
        {success ? (
          <div style={card} className="fade-in"><SuccessScreen data={formData} /></div>
        ) : (
          <>
            {/* Form header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(0.95rem,4vw,1.25rem)", color: "#00c8ff", marginBottom: "8px", fontWeight: 700, letterSpacing: "1px" }}>Registration Portal</h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "'Inter',sans-serif" }}>
                Step {step} of 3 — {["Participant Identity", "Event Selection", "Payment & Verification"][step - 1]}
              </p>
            </div>

            <StepBar step={step} />

            <div style={card} className="fade-in">
              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>👤 Participant Identity</h3>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>Enter your details accurately</p>
                  </div>
                  <div style={divider} />
                  <Input label="Full Name" value={s1.fullName} required onChange={e => setS1({ ...s1, fullName: e.target.value })} placeholder="Your full legal name" error={errors.fullName} />
                  <Input label="Email Address" type="email" value={s1.email} required onChange={e => setS1({ ...s1, email: e.target.value })} placeholder="you@college.edu" error={errors.email} />
                  <Input label="WhatsApp Number" type="tel" value={s1.whatsapp} required onChange={e => setS1({ ...s1, whatsapp: e.target.value })} placeholder="10-digit mobile number" error={errors.whatsapp} />
                  <Input label="College / University" value={s1.college} required onChange={e => setS1({ ...s1, college: e.target.value })} placeholder="Your institution name" error={errors.college} />
                  <Input label="Department / Course" value={s1.department} required onChange={e => setS1({ ...s1, department: e.target.value })} placeholder="e.g. B.Tech CSE, MBA" error={errors.department} />
                  <Input label="Roll Number / ID" value={s1.rollNumber} required onChange={e => setS1({ ...s1, rollNumber: e.target.value })} placeholder="Roll no. or last 4 digits of Aadhaar" error={errors.rollNumber} />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>🎯 Choose Your Events</h3>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>Select all events you want to participate in</p>
                  </div>
                  <div style={divider} />
                  {errors.events && <div style={{ background: "rgba(239,83,80,0.07)", border: "1px solid rgba(239,83,80,0.25)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", color: "#ef5350", fontSize: "0.8rem", fontFamily: "'Inter',sans-serif" }}>⚠️ {errors.events}</div>}
                  {Object.entries(EVENTS).map(([cat, evts]) => {
                    const cc = CATEGORY_COLORS[cat];
                    return (
                      <div key={cat} style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                          <div style={{ width: "3px", height: "14px", background: cc.neon, borderRadius: "2px", boxShadow: `0 0 6px ${cc.neon}` }} />
                          <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: cc.neon, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>{cat}</h4>
                          {selEvts[cat]?.length > 0 && <span style={{ background: cc.bg, border: `1px solid ${cc.neon}40`, borderRadius: "20px", padding: "2px 9px", fontSize: "0.62rem", color: cc.neon, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{selEvts[cat].length} selected</span>}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(128px,1fr))", gap: "8px" }}>
                          {evts.map(ev => <EventCard key={ev.id} event={ev} selected={selEvts[cat]?.includes(ev.id)} onToggle={id => toggle(cat, id)} cc={cc} />)}
                        </div>
                      </div>
                    );
                  })}

                  {/* Fee summary */}
                  <div style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.18)", borderRadius: "14px", padding: "18px", marginTop: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", fontFamily: "'Inter',sans-serif" }}>Base Registration</span>
                      <span style={{ color: "#fff", fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "0.85rem" }}>₹{BASE_FEE}</span>
                    </div>
                    {total > 1 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", fontFamily: "'Inter',sans-serif" }}>+{total - 1} extra event{total > 2 ? "s" : ""} × ₹{ADDITIONAL_FEE}</span>
                      <span style={{ color: "#e040fb", fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "0.85rem" }}>₹{(total - 1) * ADDITIONAL_FEE}</span>
                    </div>}
                    <div style={{ borderTop: "1px solid rgba(0,200,255,0.12)", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>Total Payable</span>
                      <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.4rem,5vw,1.9rem)", fontWeight: 900, color: "#00c8ff", textShadow: "0 0 14px rgba(0,200,255,0.4)" }}>₹{fee}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>💳 Payment & Verification</h3>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>Total: <span style={{ color: "#00c8ff", fontFamily: "'Orbitron',monospace", fontWeight: 700 }}>₹{fee}</span></p>
                  </div>
                  <div style={divider} />
                  <QRPlaceholder />
                  <div style={{ background: "rgba(255,234,0,0.04)", border: "1px solid rgba(255,234,0,0.14)", borderRadius: "10px", padding: "12px 14px", marginBottom: "20px", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontFamily: "'Inter',sans-serif" }}>
                    💡 <strong style={{ color: "#ffe600" }}>Instructions:</strong> Pay <strong style={{ color: "#00c8ff" }}>₹{fee}</strong> to <strong style={{ color: "#00c8ff" }}>aura2k26@ybl</strong>, take a screenshot of the confirmation, then upload it below.
                  </div>
                  <Input label="Transaction ID / UTR Number" value={s3.utrNumber} required onChange={e => setS3({ ...s3, utrNumber: e.target.value })} placeholder="12-digit UTR or Transaction ID" error={errors.utrNumber} />
                  <FileUpload value={s3.paymentFile} onChange={f => setS3({ ...s3, paymentFile: f })} error={errors.paymentFile} />
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "26px" }}>
                {step > 1 && (
                  <button className="back-btn" onClick={() => setStep(x => x - 1)}
                    style={{ flex: 1, padding: "12px", borderRadius: "11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, transition: "all 0.25s", fontFamily: "'Inter',sans-serif" }}>
                    ← Back
                  </button>
                )}
                <button className="next-btn" onClick={next}
                  style={{ flex: 2, padding: "13px", borderRadius: "11px", background: "linear-gradient(135deg,#00c8ff,#7c3aed)", border: "none", color: "#fff", cursor: "pointer", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Orbitron',monospace", boxShadow: "0 4px 18px rgba(0,200,255,0.25)", transition: "all 0.25s" }}>
                  {step === 3 ? "⚡ Submit Registration" : `Continue → Step ${step + 1}`}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "36px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <span style={{ color: "rgba(255,255,255,0.08)", fontSize: "0.6rem", letterSpacing: "2px", fontFamily: "'Inter',sans-serif" }}>AURA 2k26 © 2026</span>
          <span style={{ color: "rgba(255,255,255,0.06)", fontSize: "0.6rem" }}>·</span>
          <button onClick={() => setShowLogin(true)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.1)", fontSize: "0.6rem", letterSpacing: "2px", cursor: "pointer", fontFamily: "'Inter',sans-serif", padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.3)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.1)"}>
            ADMIN
          </button>
        </div>
      </div>
    </div>
  );
}
