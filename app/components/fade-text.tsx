'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, ReactNode } from 'react'

interface FadeTextProps {
  children: ReactNode
}

export function FadeText({ children }: FadeTextProps) {
  const [letterOpacities, setLetterOpacities] = useState<number[]>([])
  const text = typeof children === 'string' ? children : ''

  useEffect(() => {
    // Initialize letter opacities
    setLetterOpacities(new Array(text.length).fill(1))

    // Initialize individual intervals for each letter
    const intervals = text.split('').map((_, index) => 
      setInterval(() => {
        setLetterOpacities(prev => {
          const newOpacities = [...prev]
          newOpacities[index] = Math.random() * 0.8 + 0.4
          return newOpacities
        })
      }, 650 + index * 100) // Stagger intervals by 100ms per letter
    )

    return () => {
      intervals.forEach(clearInterval) // Clear all intervals on cleanup
    }
  }, [text])

  return (
    <span className="inline-block">
      {text.split('').map((letter, index) => (
        <motion.span
          key={`${index}-${letter}`}
          animate={{ opacity: letterOpacities[index] }}
          transition={{ duration: 0.5 }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}

