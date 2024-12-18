'use client'

import { useState, useRef, useEffect } from 'react'
import { FlipCard } from '@/app/components/flip-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  id: number
  title: string
  description: string
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "A modern web application built with Next.js and TypeScript, featuring real-time updates and responsive design",
    color: "#8B5CF6" // Purple
  },
  {
    id: 2,
    title: "Project Two",
    description: "An AI-powered analytics dashboard that helps visualize and understand complex data patterns",
    color: "#7C3AED" // Darker purple
  },
  {
    id: 3,
    title: "Project Three",
    description: "A machine learning model that predicts user behavior based on historical data and interactions",
    color: "#6D28D9" // Even darker purple
  },
  {
    id: 4,
    title: "Project Four",
    description: "A real-time collaboration tool that enables teams to work together seamlessly across different time zones",
    color: "#5B21B6" // Deepest purple
  },
  {
    id: 5,
    title: "Project Five",
    description: "An e-commerce platform with advanced recommendation systems and personalized shopping experiences",
    color: "#4C1D95" // Darkest purple
  }
]

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(2) // Start with middle card
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 && activeIndex < projects.length - 1) {
        setActiveIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeIndex]);

  const handlePrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? projects.length - 1 : current - 1
    )
  }

  const handleNext = () => {
    setActiveIndex((current) => 
      current === projects.length - 1 ? 0 : current + 1
    )
  }

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center perspective-1000" 
      ref={containerRef}
    >
      <div className="relative w-64 h-96">
        {projects.map((project, index) => (
          <FlipCard
            key={project.id}
            title={project.title}
            description={project.description}
            color={project.color}
            index={index}
            active={index === activeIndex}
            total={projects.length}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 text-white hover:text-gray-300"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 text-white hover:text-gray-300"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

