'use client'

import { motion } from 'framer-motion'
import { FadeText } from '@/app/components/fade-text'
import { useState, useEffect } from 'react'
import { RainBorder } from '@/app/components/RainBorder'  
import { ProjectModal } from '@/app/components/ProjectModal'
import { Project } from '@/app/utils/projectUtils'
import WebGLPattern from '../components/webgl-pattern'

// Project data 
const projects = [
  { 
    id: "kernel-driver", 
    title: "Kernel Driver", 
    description: "A shared memeory kernel driver",
  },
  { 
    id: "tetris-ai", 
    title: "Tetris AI", 
    description: "ML model trained on playing tetris",
  },
  { 
    id: "personal-website", 
    title: "Personal website", 
    description: "The very website you are on now, built with next.js + three.js",
  },
  { 
    id: "flash-flow", 
    title: "Flash Flow", 
    description: "Fullstack ai saas app",
  },
  { 
    id: "mobile-app-demo", 
    title: "Mobile app demo", 
    description: "Leanred mobile development in 3 days to make a demo app",
  },
  { 
    id: "pear-exchange", 
    title: "Pear Exchange", 
    description: "Hackathon projects, ai models on the blockchain pay per use, pay for stake",
  },
  { 
    id: "ai-research-agent", 
    title: "AI Research Agent", 
    description: "Ai ressearch agent to find oppertunities",
  },
]

export default function ProjectsPage() {
  // Keep both states but now focused will update with hover
  const [focusedProject, setFocusedProject] = useState<number>(1) // Start with first project focused
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
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
    // Scroll horizontally instead
    e.currentTarget.scrollLeft += e.deltaY
  }

  // Function to load project data and open modal
  const openProjectModal = async (projectId: string) => {
    setIsLoading(true)
    
    try {
      // Small delay for better transition experience
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await fetch(`/api/projects/${projectId}`)
      if (!response.ok) throw new Error('Failed to fetch project')
      
      const projectData = await response.json()
      setSelectedProject(projectData)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setIsLoading(false)
    }
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
      
      <WebGLPattern></WebGLPattern>
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
          I've worked on a wide variety of projects, here's a distilled list of some of my best, take a look around.
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
          const isExpanded = hoveredProject === index + 1 || 
                            (hoveredProject === null && focusedProject === index + 1);
                            
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
              onMouseEnter={() => handleMouseEnter(index + 1)}
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
                  <button 
                    onClick={() => openProjectModal(project.id)}
                    className={`
                      flex 
                      items-center
                      transition-opacity
                      ${isLoading ? 'opacity-70' : 'opacity-100 hover:opacity-90'}
                    `}
                    disabled={isLoading}
                  >
                    <div className={`
                      w-6 
                      h-6 
                      rounded-full 
                      border 
                      border-white/50 
                      flex 
                      items-center 
                      justify-center 
                      mr-2
                      ${isLoading ? 'animate-pulse' : ''}
                    `}>
                      {isLoading ? (
                        <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-white">
                      {isLoading ? 'Loading...' : `Preview ${project.title.toLowerCase()}`}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  )
}