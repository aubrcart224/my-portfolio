'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FadeText } from '@/app/components/fade-text'
import { useState, useEffect } from 'react'
import { RainBorder } from '@/app/components/RainBorder'  

// Project data 
const projects = [
  { 
    id: 1, 
    title: "Kernel Driver", 
    description: "Experience truly live pricing. Unlike other tools, there are no delays—get instant, real-time quotes every time.",
  },
  { 
    id: 2, 
    title: "Tetris AI", 
    description: "No more guesswork. Quickly access analyst predictions and insights to stay ahead of the curve.",
  },
  { 
    id: 3, 
    title: "Personal website", 
    description: "Dive deep into financial data to make informed decisions for your next big move.",
  },
  { 
    id: 4, 
    title: "Flash Flow", 
    description: "Compare performance across multiple peers and benchmarks at a glance.",
  },
  { 
    id: 5, 
    title: "Mobile app demo", 
    description: "Analyze trends over time to forecast future results and mitigate risk.",
  },
  { 
    id: 6, 
    title: "Pear Exchange", 
    description: "Get insights on significant insider buys and sells that could shape market movements.",
  },
  { 
    id: 7, 
    title: "Ai ressearch agent", 
    description: "Stay in the loop with timely alerts and daily summaries delivered right to your inbox.",
  },
]

export default function ProjectsPage() {
  // Keep both states but now focused will update with hover
  const [focusedProject, setFocusedProject] = useState<number>(1) // Start with first project focused
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  
  // Set initial focus when component mounts
  useEffect(() => {
    setFocusedProject(1)
  }, [])

  // Handler for mouse enter - update both hovered and focused state
  const handleMouseEnter = (projectId: number) => {
    setHoveredProject(projectId)
    setFocusedProject(projectId) // Update focused project when hovering
  }

  // Handler for mouse leave - only clear hovered state, keep focused state
  const handleMouseLeave = () => {
    setHoveredProject(null)
    // Don't reset focusedProject, so the last hovered card stays focused
  }

  // OnWheel handler to scroll horizontally with mouse wheel
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent the default vertical scroll
    e.preventDefault()
    // Scroll 1orizontally instead
    e.currentTarget.scrollLeft += e.deltaY
  }

  return (
    <div 
      className="
        relative 
        w-full        
        text-white 
        flex 
        flex-col 
        items-center 
        justify-start
        pb-4
        bg-no-repeat 
        bg-cover
      "
    >
      {/* Title & Subtitle */}
      <div className="mb-8 text-center max-w-2xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          <FadeText>Projects are important</FadeText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-lg"
        >
          Ive worked on a wide varity of projects, heres a distilled list of some of my best, take a look around.
        </motion.p>
      </div>

      {/* Horizontal-scrolling container (hide scrollbar, scroll on wheel) */}
      <div
        onWheel={handleWheel}
        className="
          w-full
          flex
          overflow-x-scroll
          overflow-y-hidden
          px-2
          pb-
          space-x-2
          justify-center
          scrollbar-hide
          mt-2
        "
        style={{ 
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none'    /* Firefox */
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {projects.map((project, index) => {
          // Calculate if this card should be expanded (either it's focused or hovered)
          const isExpanded = hoveredProject === project.id || 
                            (hoveredProject === null && focusedProject === project.id);
                            
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                group
                relative
                flex-shrink-0 
                h-[425px]
                ${isExpanded ? 'w-[300px]' : 'w-[80px]'}
                bg-red/10
                backdrop-blur-[8px]
                border-2.5 border-black/20
                rounded-xl
                cursor-pointer
                transition-all
                duration-500
                flex
                flex-col
                items-start
                justify-center
              `}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Add RainBorder as an overlay inside the motion.div */}
              <div className="absolute inset-0 pointer-events-none ">
                <RainBorder 
                  borderWidth={1.5}
                  className={`
                    rounded-xl
                    w-full h-full
                  `}
                  duration={20}
                  pathLength={0.3}
                  isActive={true}
                >
                  <div></div>
                </RainBorder>
              </div>

              {/* Vertical Title (always visible)*/}
              <div
                className={`
                  absolute 
                  top-1/2
                  -translate-y-40
                  left-6
                  text-lg
                  text-gray-100
                  font-semibold
                  tracking-wider
                  whitespace-nowrap
                  transition-opacity
                  duration-300
                  [writing-mode:vertical-lr]
                  rotate-360
                `}
              >
                {project.title}
              </div>

              {/* Expanded content -*/}
              <div
                className={`
                  ${isExpanded ? 'opacity-100' : 'opacity-0'}
                  transition-opacity
                  duration-300
                  p-6
                  w-full
                  h-full
                  flex
                  flex-col
                  justify-end
                  
                `}
              >
                <p className="text-sm text-gray-200 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Button with circle icon */}
                <div className="flex items-center">
                  <Link href={`/projects/${project.id}`} className="flex items-center">
                    <div className="
                      w-6 
                      h-6 
                      rounded-full 
                      border 
                      border-white/50 
                      flex 
                      items-center 
                      justify-center 
                      mr-2
                    ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                    <span className="text-sm text-white">Preview {project.title.toLowerCase()}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}