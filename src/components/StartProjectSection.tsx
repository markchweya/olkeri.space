'use client'

import Link from 'next/link'

export default function StartProjectSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000000 0%, #021a12 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '700px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 500,
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #ffffff 0%, #00ff9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Start Your Project
        </h2>

        <p
          style={{
            fontSize: '18px',
            opacity: 0.8,
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          Let’s build something exceptional. Tell us about your vision, and we’ll turn it into a scalable digital system.
        </p>

        <Link href="/contact">
          <button
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 500,
              borderRadius: '6px',
              border: '1px solid #00ff9d',
              background: 'transparent',
              color: '#00ff9d',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#00ff9d'
              e.currentTarget.style.color = '#000'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#00ff9d'
            }}
          >
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  )
}
