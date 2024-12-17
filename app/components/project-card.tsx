import Link from "next/link"
import { Card } from "@/app/components/ui/card"

interface ProjectCardProps {
  id: number
  title: string;
  description: string;
  //onClick: () => void;
}

export function ProjectCard({ id, title, description }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block w-full">
      <Card className="bg-white hover:bg-gray-50 transition-colors p-4">
        <h3 className="text-gray-900 font-medium mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </Card>
    </Link>
  )
}

