'use client'

import { useRouter } from "next/navigation"

import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const projects = [
  { 
    id: 1, 
    title: "Project", 
    description: "Description text, Description text, Description text Description text, Description text, Description text, Description text, Description text, Description text, Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text Description text",
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
          <div className="flex gap-6">
            <div className="w-1/2 relative">
              <Button
                variant="link"
                className="absolute left-0 top-0 text-gray-900 hover:no-underline"
                onClick={() => router.push('/')}
              >
                Back
              </Button>
              <div className="mt-8">
                <div className="w-full aspect-square bg-gradient-to-b from-gray-900 via-purple-600 to-purple-400 rounded-lg relative">
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!prevProject}
                    onClick={() => prevProject && router.push(`/projects/${projectId - 1}`)}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!nextProject}
                    onClick={() => nextProject && router.push(`/projects/${projectId + 1}`)}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <h2 className="text-gray-900 font-medium">{project.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
            </div>
          </div>
        </Card>
      </div>
      </>
  )
}

