'use client'

import { ProjectCarousel } from "@/app/components/project-carousel"



export default function ProjectsPage() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
        <ProjectCarousel />
      </div>
    </>
  )
}