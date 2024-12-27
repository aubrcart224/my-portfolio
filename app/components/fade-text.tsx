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

    // Randomly adjust letter opacities
    const opacityInterval = setInterval(() => {
      setLetterOpacities(prev => 
        prev.map(() => Math.random() * 0.8 + 0.4) // use this to change how bright it can get 
      )
    }, 650) // Adjust timing as needed

    return () => clearInterval(opacityInterval)
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

