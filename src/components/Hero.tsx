'use client'

import CodeBackground from './CodeBackground'

export default function Hero() {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <CodeBackground />

      {/* Subtle gradient overlay for blending */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 70%)',
          zIndex: 1,
        }}
      />

      {/* Brand */}
      <h1
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: 'clamp(56px, 8vw, 120px)',
          fontWeight: 500,
          letterSpacing: '0.08em',
          background: 'linear-gradient(90deg, #ffffff 0%, #00ff99 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textTransform: 'lowercase',
        }}
      >
        olkeri.space
      </h1>
    </div>
  )
}
