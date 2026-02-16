'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          textAlign: 'center',
          maxWidth: '700px',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
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
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontSize: '18px',
            opacity: 0.8,
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          Let’s build something exceptional. Tell us about your vision, and we’ll turn it into a scalable digital system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 120 }}
        >
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
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#00ff9d'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Contact Us
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
