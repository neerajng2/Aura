# ⚡ AURA 2k26 – Registration App

> Futuristic college fest registration portal built with React + Vite

---

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## 🌐 Deploy to Vercel (Recommended — Free)

### Option A: CLI (fastest)
```bash
npm install -g vercel
npm run build
vercel deploy --prod
```

### Option B: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** — done in ~60 seconds ✅

---

## 🌐 Deploy to Netlify (Also Free)

### Option A: Drag & Drop
```bash
npm run build
# Drag the `dist/` folder to https://app.netlify.com/drop
```

### Option B: CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 🌐 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
# "predeploy": "npm run build"

# Add homepage to package.json:
# "homepage": "https://YOUR_USERNAME.github.io/aura2k26"

npm run deploy
```

---

## 🔐 Admin Panel

Type `AURA2026` into the small padlock field (bottom-right corner) and press **Enter** to open the admin dashboard showing all registrations.

---

## 📁 Project Structure

```
aura2k26/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx          ← Main app + form logic
    ├── constants.js     ← Events, fees, colors
    ├── index.css        ← Global styles + animations
    └── components/
        ├── ParticleCanvas.jsx
        ├── CountdownTimer.jsx
        ├── StepBar.jsx
        ├── NeonInput.jsx
        ├── EventCard.jsx
        ├── QRPlaceholder.jsx
        ├── FileUpload.jsx
        ├── Confetti.jsx
        ├── SuccessScreen.jsx
        └── AdminPanel.jsx
```

---

## ⚙️ Customisation

| What | Where |
|------|-------|
| Event list & fees | `src/constants.js` |
| Base fee / extra fee | `src/constants.js` |
| UPI ID | `src/components/QRPlaceholder.jsx` |
| WhatsApp link | `src/components/SuccessScreen.jsx` |
| Event date | `src/components/CountdownTimer.jsx` |
| Admin password | `src/App.jsx` (search `AURA2026`) |

---

Built with ❤️ for AURA 2k26
