'use client'

import { useState, useRef, useEffect } from 'react'
import { ProjectCard } from './project-card'
import { ProjectDialog } from './project-dialog'

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
    title: "Tetris AI",
    date: "sept 16, 2024",
    description: "Tetris that plays itself with the power of ML",
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
    title: "Kernel Driver",
    description: "Shared memory kernel dirver built in C.",
    color: "#18181B",
    date: "Oct 26, 2024",
    markdownContent: 
    `Shared Memory Kernel Driver
This project implements a Windows kernel driver that creates and manages a section of shared memory. This allows kernel-mode processes to share data efficiently with each other or with user-mode processes. The driver demonstrates fundamental operations such as creating a device, mapping shared memory, and handling I/O requests.

THIS IS DEAD CODE
Since this driving is getting put to use I cant have it chilling on git unfortunatly,
the driver will be finished in a pirvate repo, if you are wanting to see the full code please reach out via email
 and I will be happy to send it to you if possible. 
Features
Device Creation: Setup a character device to interact with user-mode applications.
Shared Memory: Allocate and manage shared memory accessible by both kernel and user-mode.
Driver Communication: Use IOCTLs to facilitate user-mode to kernel-mode communication.
Security Handling: Template functions to handle security attributes of shared resources.
Prerequisites
To build and run this kernel driver, you will need:

Windows 10 or higher
Windows Driver Kit (WDK)
Visual Studio 2019 or newer
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
    `,
  },
  {
    id: 3,
    title: "This portfolio website",
    description: "Description ",
    color: "#18181B",
    date: "Nov 15, 2024",
    markdownContent: `A portfolio website using three.js
Focused on learning and experimenting with three.js but keeping things clean and simple for the time being 
Using Next.js 
`,
    
  },
  {
    id: 4,
    title: "Flash-Flow",
    description: "AI Flashcard SaaS app for med students",
    color: "#18181B",
    date: "Dec 12, 2024",
    markdownContent: `
saas app for med students 
Med students spend a lot of time building out their flashcards that they then use in anki (popular memorization / study app). 
Flash flow will generate the flashcards for the students based on either interfacing with the chatbot or via sending it content. This saves students hours and hours of time that could otherwise be spent studying
Built in Next.js with react. Made use of lots of Shadcn components. 
Work in progress. `,
    
  },
  {
    id: 5,
    title: "Pear Exchange",
    description: "Decentcralized AI model network",
    color: "#18181B",
    date: "Jan 5, 2025",
    markdownContent: `# Pear Exchange

Pear Exchange is an all-in-one digital marketplace, where you can post your own ML models and be paid for their use. Once can also purchase a wide variety of AI tokens using our proprietary currency, Juice Pear. 

Users can also purchase stakes in other ML model builders on our platform. This would provide crucial funding for the top creators on our platform, while allowing everyday people to enjoy the financial benefits of the booming AI market. Users would be paid dividends based on the revenue of the individuals or organizations which they invest in.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [How we built it](#Howwebuiltit)
- [Whats next?](#whatsnext)
- [License](#license)
- [Contact](#contact)

## Introduction

Pear Chain is designed to provide a decentralized solution for [brief description of the problem your project addresses]. By utilizing the NEAR Protocol, Pear Chain ensures fast, secure, and scalable transactions.

## Features

- **Decentralized**: Built on the NEAR Protocol for enhanced security and transparency.
- **Efficient**: Optimized for fast transaction processing.
- **User-Friendly**: Easy-to-use interface for seamless user experience.
- **Real-Time data** See prices fluxate in real time to keep you in the loop.
- **Personal Portfolio** Store all your favorite models on your watch list as well as tracking your current assests.

## How we built it

We built the blockchain backbone and the cryptocurrency for our project using NEAR Protocol, which helped us improve the efficiency and security of our platform. We first designed our frontend on Figma, before building it using HTML, CSS, Javascript, Typescript, React, and Chart.JS. We took advantage of the abundance of Financial Information available on the internet to inform the financial aspects of our project.

## What's Next?

We wanted a feature for users to be able to pay Juicy Pears to use our platform to create or personalize AI models. However, we realized quickly that this idea wasn't feasible for the scope of the hackathon. This could be something we look into implementing in the future. 

`,
    
  }
]

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2))
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedProject) return
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
  }, [activeIndex, selectedProject])

  return (
    <>
      <div 
        className="relative w-full h-[600px] flex items-center justify-center perspective-1000 isolate" 
        ref={containerRef}
      >
        <div className="relative w-80 h-[500px]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              color={project.color}
              index={index}
              active={index === activeIndex}
              total={projects.length}
              onClick={() => setActiveIndex(index)}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectDialog
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? ''}
        date={selectedProject?.date ?? ''}
        content={selectedProject?.markdownContent ?? ''}
      />
    </>
  )
}

