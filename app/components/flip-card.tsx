'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
//import { MarkdownContent } from './markdown-content'

interface FlipCardProps {
  title: string
  description: string
  color: string
  index: number
  active: boolean
  total: number
  onClick: () => void
  onFlip: () => void
  isFlipped: boolean
  markdownContent: string
  date?: string
}

export function FlipCard({ 
  title, 
  description, 
  color, 
  index, 
  active, 
  total, 
  onClick,
  onFlip,
  isFlipped,
  markdownContent,
  date
}: FlipCardProps) {
  const centerIndex = Math.floor(total / 2)
  const offset = (index - centerIndex) * 80
  const yOffset = Math.abs(index - centerIndex) * 10

  return (
    <motion.div
      className={`absolute cursor-pointer ${isFlipped ? 'w-[800px] h-[600px] z-50' : 'w-80 h-[500px]'}`}
      style={{
        zIndex: active ? total : total - Math.abs(index - centerIndex),
      }}
      animate={{
        x: isFlipped ? 0 : offset,
        y: isFlipped ? 0 : yOffset,
        scale: active ? 1 : 0.9,
        opacity: active ? 1 : 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      onClick={() => {
        if (!active) {
          onClick()
        } else {
          onFlip()
        }
      }}
    >
      <motion.div
        className="w-full h-full rounded-3xl overflow-hidden border border-white/10"
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front of the card */}
        <motion.div
          className="absolute w-full h-full bg-zinc-900"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="p-8 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-white mb-8">{title}</h3>
            <div className="w-full aspect-square bg-gray-300 rounded-2xl mb-8 flex items-center justify-center text-gray-600">
              image
            </div>
            <div className="mt-auto text-white/90 text-sm">
              {description}
            </div>
          </div>
        </motion.div>

        {/* Back of the card */}
        <motion.div
          className="absolute w-full h-full bg-[#1a1a1a] p-8 overflow-y-auto font-mono"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-sm text-gray-400 mb-4">{date}</div>
          
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

