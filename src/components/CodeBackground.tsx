'use client'

import { useEffect, useState } from 'react'

const keywords = ['const','let','function','return','async','await','if','while','for']
const vars = ['system','engine','matrix','api','model','stack','future','agent']
const methods = ['build','scale','optimize','deploy','generate','train','compile']

function randomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateRandomLine() {
  const pattern = Math.floor(Math.random() * 3)

  if (pattern === 0) {
    return `${randomItem(keywords)} ${randomItem(vars)} = ${randomItem(methods)}();`
  }

  if (pattern === 1) {
    return `${randomItem(vars)}.${randomItem(methods)}(${randomItem(vars)});`
  }

  return `if (${randomItem(vars)}) { ${randomItem(methods)}(); }`
}

type Line = {
  id: number
  text: string
  top: number
  left: number
}

export default function CodeBackground() {
  const [linesState, setLinesState] = useState<Line[]>([])

  useEffect(() => {
    let id = 0

    const spawnLine = () => {
      const newLine: Line = {
        id: id++,
        text: generateRandomLine(),
        top: Math.random() * 90,
        left: Math.random() * 90,
      }

      setLinesState(prev => [...prev.slice(-40), newLine])
    }

    const interval = setInterval(spawnLine, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        fontFamily: 'monospace',
        fontSize: '15px',
        color: '#00ff99',
      }}
    >
      {linesState.map(line => (
        <AnimatedLine key={line.id} line={line} />
      ))}
    </div>
  )
}

function AnimatedLine({ line }: { line: Line }) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')

  useEffect(() => {
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (phase === 'typing') {
        if (charIndex < line.text.length) {
          setDisplayed(prev => prev + line.text[charIndex])
          charIndex++
        } else {
          clearInterval(typeInterval)
          setPhase('pause')
        }
      }
    }, 25)

    return () => clearInterval(typeInterval)
  }, [line.text, phase])

  useEffect(() => {
    if (phase !== 'pause') return

    const pauseTimeout = setTimeout(() => {
      setPhase('deleting')
    }, 600)

    return () => clearTimeout(pauseTimeout)
  }, [phase])

  useEffect(() => {
    if (phase !== 'deleting') return

    const deleteInterval = setInterval(() => {
      setDisplayed(prev => {
        if (prev.length <= 1) {
          clearInterval(deleteInterval)
          return ''
        }
        return prev.slice(0, -1)
      })
    }, 15)

    return () => clearInterval(deleteInterval)
  }, [phase])

  return (
    <div
      style={{
        position: 'absolute',
        top: `${line.top}%`,
        left: `${line.left}%`,
        opacity: 0.7,
        whiteSpace: 'nowrap',
        animation: 'fade 4s ease-in-out forwards',
      }}
    >
      {displayed}
      <span style={{ opacity: 0.8 }}>|</span>

      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
