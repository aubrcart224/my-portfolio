import Link from "next/link"
import { Card } from "@/app/components/ui/card"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  onClick: () => void
}

export function ProjectCard({ id, title, description, onClick }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block w-full">
      <Card className="flex items-start gap-4 bg-white p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={onClick}>
        <div className="w-24 h-24 bg-gradient-to-b from-gray-900 via-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 font-medium mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </Card>
    </Link>
  )
}

