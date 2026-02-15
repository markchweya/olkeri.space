'use client'

import CodeBackground from './CodeBackground'

export default function Hero() {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <CodeBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: '72px',
          fontWeight: 600,
          letterSpacing: '2px',
        }}
      >
        olkeri.space
      </div>
    </div>
  )
}
