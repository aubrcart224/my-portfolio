'use client'

import { useRouter } from "next/navigation"

import { Card } from "@/app/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const projects = [
  { 
    id: 1, 
    title: "Project 1", 
    description: "Description text, Description text, Description text Description text, Description text, Description text, Description text, Description text, Description text, Description text, Description text, Description text Description text Description text Description text Description text Description text Description text",
  },
  { 
    id: 2, 
    title: "Project 2", 
    description: "How to install dependencies and structure your app.",
  },
  { 
    id: 3, 
    title: "Project 3", 
    description: "Styles for headings, paragraphs, lists...etc",
  },
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = parseInt(params.id)
  const project = projects.find(p => p.id === projectId)
  
  if (!project) return null

  const prevProject = projects.find(p => p.id === projectId - 1)
  const nextProject = projects.find(p => p.id === projectId + 1)

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-medium text-center mb-8">Aubrey Carter</h1>
        <Card className="bg-white p-6 relative">
          <Button
            variant="ghost"
            className="absolute right-4 top-4 text-gray-900"
            onClick={() => router.push('/')}
          >
            Back
          </Button>
          
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              disabled={!prevProject}
              onClick={() => router.push(`/projects/${projectId - 1}`)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="w-full max-w-sm mx-4">
              <div className="w-full h-48 bg-gradient-to-b from-gray-900 via-purple-600 to-purple-400 rounded-lg" />
            </div>
            
            <Button
              variant="ghost"
              disabled={!nextProject}
              onClick={() => router.push(`/projects/${projectId + 1}`)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-gray-900 font-medium">{project.title}</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{project.description}</p>
          </div>
        </Card>
      </div>
      </>
  )
}

