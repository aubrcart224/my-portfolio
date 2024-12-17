'use client'

import { useState } from "react"
import { Card } from "@/app/components/ui/card"
import { ProjectCard } from "@/app/components/project-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"


const projects = [
  { 
    id: 1, 
    title: "Project 1", 
    description: "Re-usable components built using Radix UI and Tailwind CSS",
    details: "Long description for Project 1..."
  },
  { 
    id: 2, 
    title: "Project 2", 
    description: "How to install dependencies and structure your app.",
    details: "Long description for Project 2..."
  },
  { 
    id: 3, 
    title: "Project 3", 
    description: "Styles for headings, paragraphs, lists...etc",
    details: "Long description for Project 3..."
  },
]

export default function ProjectsPage() {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-medium text-center mb-8">Aubrey Carter</h1>
        <Card className="bg-white p-6">
          <div className="flex gap-6">
            <div className="w-64 shrink-0">
              <div className="w-full aspect-square bg-gradient-to-b from-gray-900 via-purple-600 to-purple-400 rounded-lg flex flex-col items-center justify-center mb-4">
                <div className="w-4 h-4 bg-white rounded-full mb-4" />
                <h2 className="text-white font-medium">Projects</h2>
                <p className="text-white/80">Text</p>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
      </>
  )
}
