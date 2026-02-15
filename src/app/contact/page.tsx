'use client'

import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #021a12 0%, #000000 70%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          transform: mounted ? 'translateY(0px)' : 'translateY(40px)',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(40px, 5vw, 60px)',
            fontWeight: 500,
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #ffffff 0%, #00ff9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Let’s Build Something
        </h1>

        <p
          style={{
            fontSize: '16px',
            opacity: 0.75,
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          Tell us about your idea. We’ll respond within 24 hours with a clear next step.
        </p>

        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
          }}
        >
          {['name', 'email'].map((field, i) => (
            <input
              key={field}
              placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
              type={field === 'email' ? 'email' : 'text'}
              value={(form as any)[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(0,255,157,0.3)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={e => (e.currentTarget.style.border = '1px solid #00ff9d')}
              onBlur={e => (e.currentTarget.style.border = '1px solid rgba(0,255,157,0.3)')}
            />
          ))}

          <textarea
            placeholder="Tell us about your project"
            rows={5}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid rgba(0,255,157,0.3)',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              fontSize: '14px',
              resize: 'none',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
            onFocus={e => (e.currentTarget.style.border = '1px solid #00ff9d')}
            onBlur={e => (e.currentTarget.style.border = '1px solid rgba(0,255,157,0.3)')}
          />

          <button
            type="button"
            style={{
              marginTop: '10px',
              padding: '16px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(90deg, #00ff9d 0%, #00cc7a 100%)',
              color: '#000',
              fontWeight: 600,
              cursor: 'pointer',
              transform: 'scale(1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
