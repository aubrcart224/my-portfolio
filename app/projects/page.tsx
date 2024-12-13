'use client'

import { useState } from "react"
//import { Layout } from "@/app/components/layout"
import { ProjectCard } from "@/app/components/project-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog"

interface Project {
  id: number
  title: string
  description: string
  details: string
}

const projects: Project[] = [
  { id: 1, title: "Project 1", description: "Re-usable components built using Radix UI and Tailwind CSS.", details: "Long description for Project 1..." },
  { id: 2, title: "Project 2", description: "How to build a text editor and a markdown blog.", details: "Long description for Project 2..." },
  { id: 3, title: "Project 3", description: "Styles for headings, paragraphs, lists...etc", details: "Long description for Project 3..." },
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedProject?.details}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </>
  )
}

