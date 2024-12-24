'use client'

import { useState, useRef, useEffect } from 'react'
import { FlipCard } from './flip-card'

interface Project {
  id: number
  title: string
  description: string
  color: string
  markdownContent: string
  date: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "motivating adam optimizer",
    date: "sept 16, 2024",
    description: "Description elikrjgnekljngkjaen lkaejnbgjlkernba akejngkjaegkneangnkeajngkae...",
    color: "#18181B",
    markdownContent: `
our first type of optimization, the standard one size fits all solution
would be to subtract the gradient from the weights multiplied by some
learning rate constant throughout training. this changes the weights all the
same amount relative to their gradients. one obvious downside of this
approach, is it does not have any memory of prior gradient descent values
prior, so in effect, this can make the descent path more sparse. basically
the noise in the movement would be larger because we are not identifying
prior redundant paths based on a moving average, so if we are jostling from
high negative to high positive gradients and going across the whole error
surface for every iteration, we wouldn't be able to use this information in
standard gradient descent with a constant learning rate.

another thing which is bad about a constant learning rate, is that during
initial training, there are large gradients, and it would be helpful and
more computationally efficient to exponentially descrease the learning rate
as the training goes on since this could help us reduce the required number
of iterations.

# stochastic gradient descent

$$W_{t+1}=W_t-\eta\frac{\partial L}{\partial W_t}$$

This is the basic gradient descent formula. The next set of weights is equal
to what they were prior, minus the gradients times the learning rate.

# stochastic gradient descent with momentum

now, we can create memory of past gradient descent gradients in order to
smooth our descent through the error surface. we can do this with something
called momentum.
    `
  },
  {
    id: 2,
    title: "Project one",
    description: "Description elikrjgnekljngkjaen lkaejnbgjlkernba akejngkjaegkneangnkeajngkae...",
    color: "#18181B",
    markdownContent: `# Project Two\n\nDetailed description here...`,
    date: "Oct 26, 2024"
  },
  {
    id: 3,
    title: "Project one",
    description: "Description elikrjgnekljngkjaen lkaejnbgjlkernba akejngkjaegkneangnkeajngkae...",
    color: "#18181B",
    markdownContent: `# Project Three\n\nDetailed description here...`,
    date: "Nov 15, 2024"
  },
  {
    id: 4,
    title: "Project one",
    description: "Description elikrjgnekljngkjaen lkaejnbgjlkernba akejngkjaegkneangnkeajngkae...",
    color: "#18181B",
    markdownContent: `# Project Four\n\nDetailed description here...`,
    date: "Dec 12, 2024"
  },
  {
    id: 5,
    title: "Project one",
    description: "Description elikrjgnekljngkjaen lkaejnbgjlkernba akejngkjaegkneangnkeajngkae...",
    color: "#18181B",
    markdownContent: `# Project Five\n\nDetailed description here...`,
    date: "Jan 5, 2025"
  }
]

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2))
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (flippedIndex !== null) return
      e.preventDefault()
      if (containerRef.current) {
        if (e.deltaY > 0 && activeIndex < projects.length - 1) {
          setActiveIndex(activeIndex + 1)
        } else if (e.deltaY < 0 && activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [activeIndex, flippedIndex])

  return (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center perspective-1000" 
      ref={containerRef}
    >
      <div className="relative w-80 h-[500px]">
        {projects.map((project, index) => (
          <FlipCard
            key={project.id}
            title={project.title}
            description={project.description}
            color={project.color}
            date={project.date}
            index={index}
            active={index === activeIndex}
            total={projects.length}
            onClick={() => setActiveIndex(index)}
            onFlip={() => setFlippedIndex(index === flippedIndex ? null : index)}
            isFlipped={index === flippedIndex}
            markdownContent={project.markdownContent}
          />
        ))}
      </div>
    </div>
  )
}

