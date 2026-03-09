export const EVENTS = {
  Technical: [
    { id: 'paper', name: 'Paper Presentation', icon: '📄', fee: 50 },
    { id: 'debug', name: 'Code Debugging', icon: '🐛', fee: 50 },
    { id: 'robo', name: 'Robo Race', icon: '🤖', fee: 80 },
    { id: 'ideathon', name: 'Ideathon', icon: '💡', fee: 60 },
  ],
  Cultural: [
    { id: 'dance', name: 'Solo/Group Dance', icon: '💃', fee: 70 },
    { id: 'bands', name: 'Battle of Bands', icon: '🎸', fee: 100 },
    { id: 'fashion', name: 'Fashion Show', icon: '👗', fee: 80 },
    { id: 'photo', name: 'Photography', icon: '📸', fee: 50 },
  ],
  'Non-Technical': [
    { id: 'bgmi', name: 'E-Sports (BGMI/FF)', icon: '🎮', fee: 60 },
    { id: 'treasure', name: 'Treasure Hunt', icon: '🗺️', fee: 40 },
    { id: 'facepainting', name: 'Face Painting', icon: '🎨', fee: 30 },
  ],
}

export const BASE_FEE = 100
export const ADDITIONAL_FEE = 50

export const CATEGORY_COLORS = {
  Technical: { neon: '#00f5ff', glow: 'rgba(0,245,255,0.3)' },
  Cultural: { neon: '#ff00e4', glow: 'rgba(255,0,228,0.3)' },
  'Non-Technical': { neon: '#a855f7', glow: 'rgba(168,85,247,0.3)' },
}

export const CARD_STYLE = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '24px',
  padding: 'clamp(20px, 5vw, 36px)',
}
