'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FlipCardProps {
  title: string
  description: string
  color: string
  index: number
  active: boolean
  total: number
  onClick: () => void
}

export function FlipCard({ 
  title, 
  description, 
  color, 
  index, 
  active, 
  total, 
  onClick 
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Calculate position and transform based on distance from active index
  const distanceFromCenter = index - Math.floor(total / 2)
  const xOffset = distanceFromCenter * 110
  const zOffset = Math.abs(distanceFromCenter) * -100
  const opacity = Math.max(1 - Math.abs(distanceFromCenter) * 0.2, 0.4)
  const scale = Math.max(1 - Math.abs(distanceFromCenter) * 0.1, 0.8)

  return (
    <motion.div
      className="absolute w-64 h-96 cursor-pointer preserve-3d"
      style={{
        perspective: 1000,
        zIndex: total - Math.abs(distanceFromCenter),
      }}
      animate={{
        x: xOffset,
        z: zOffset,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      onClick={() => {
        if (active) {
          setIsFlipped(!isFlipped)
        } else {
          onClick()
        }
      }}
    >
      <motion.div
        className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div className="p-4">
          <h3 className="text-xl font-medium text-white mb-4">{title}</h3>
          <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Project preview"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className="p-4 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${color}88, ${color})`,
            }}
          >
            <p className="text-sm text-white/90 line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
        animate={{
          rotateY: isFlipped ? 0 : -180,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div className="p-6">
          <h3 className="text-xl font-medium text-white mb-4">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

