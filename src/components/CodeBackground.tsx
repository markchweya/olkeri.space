'use client'

import { useEffect, useState } from 'react'

const keywords = ['const','let','function','return','async','await']
const vars = ['system','engine','matrix','api','model','stack','future','agent']
const methods = ['build','scale','optimize','deploy','generate','train','compile']

function rand(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateLine() {
  const pattern = Math.floor(Math.random() * 3)

  if (pattern === 0) return `${rand(keywords)} ${rand(vars)} = ${rand(methods)}();`
  if (pattern === 1) return `${rand(vars)}.${rand(methods)}(${rand(vars)});`
  return `if (${rand(vars)}) { ${rand(methods)}(); }`
}

type Line = {
  id: number
  text: string
  top: number
  left: number
}

export default function CodeBackground() {
  const [lines, setLines] = useState<Line[]>([])

  useEffect(() => {
    let id = 0

    const interval = setInterval(() => {
      setLines(prev => [
        ...prev.slice(-20),
        {
          id: id++,
          text: generateLine(),
          top: Math.random() * 85,
          left: Math.random() * 85,
        }
      ])
    }, 900)

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
        color: '#00ff9d',
      }}
    >
      {lines.map(line => (
        <TypingLine key={line.id} line={line} />
      ))}
    </div>
  )
}

function TypingLine({ line }: { line: Line }) {
  const [displayed, setDisplayed] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let i = 0

    setVisible(true)

    const type = setInterval(() => {
      if (i < line.text.length) {
        setDisplayed(prev => prev + line.text[i])
        i++
      } else {
        clearInterval(type)

        setTimeout(() => {
          const erase = setInterval(() => {
            setDisplayed(prev => {
              if (prev.length <= 1) {
                clearInterval(erase)
                setVisible(false)
                return ''
              }
              return prev.slice(0, -1)
            })
          }, 20)
        }, 700)
      }
    }, 30)

    return () => clearInterval(type)
  }, [line.text])

  return (
    <div
      style={{
        position: 'absolute',
        top: `${line.top}%`,
        left: `${line.left}%`,
        whiteSpace: 'nowrap',
        opacity: visible ? 0.8 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {displayed}
      <span style={{ opacity: 0.7 }}>|</span>
    </div>
  )
}
