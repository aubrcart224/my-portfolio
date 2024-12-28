'use client'

import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  color: string
  index: number
  active: boolean
  total: number
  onClick: () => void
  onSelect: () => void
}

export function ProjectCard({ 
  title, 
  description, 
  color, 
  index, 
  active, 
  total, 
  onClick,
  onSelect
}: ProjectCardProps) {
  const centerIndex = Math.floor(total / 2)
  const offset = (index - centerIndex) * 80
  const yOffset = Math.abs(index - centerIndex) * 10

  return (
    <motion.div
      className="absolute rounded-2xl overflow-hidden border border-white/40 cursor-pointer w-80 h-[500px]"
      style={{
        zIndex: active ? 50 : total - Math.abs(index - centerIndex),
      }}
      animate={{
        x: offset,
        y: yOffset,
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
          onSelect()
        }
      }}
    >
      <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10">
        <div className="absolute w-full h-full bg-zinc-900">
          <div className="p-8 h-full flex flex-col">
            <h3 className="text-2xl font-medium-bold text-white mb-8">{title}</h3>
            <div className="w-full aspect-square bg-gradient-to-br from-black via-purple-500 to-white-600 rounded-2xl mb-8 flex items-center justify-center text-gray-600">
              image
            </div>
            <div className="mt-auto text-white/90 text-sm">
              {description}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

