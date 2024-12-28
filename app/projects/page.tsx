'use client'

import { ProjectCarousel } from "@/app/components/project-carousel"
import { FadeText } from "@/app/components/fade-text"

export default function ProjectsPage() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          <FadeText>
            Projects
          </FadeText>
          </h1>
        <ProjectCarousel />
      </div>
    </>
  )
}