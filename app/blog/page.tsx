
import Link from "next/link"
import { cn } from "@/lib/utils"

const blogPosts = [
  { 
    id: 1, 
    title: "motivating adam optimizer",
    date: "sept 16, 2024",
    slug: "motivating-adam-optimizer"
  },
  { 
    id: 2, 
    title: "parser theory",
    date: "sept 2, 2024",
    slug: "parser-theory"
  },
  { 
    id: 3, 
    title: "Writing a Lexer",
    date: "aug 25, 2024",
    slug: "writing-a-lexer"
  },
  { 
    id: 4, 
    title: "motivating ppo algo",
    date: "june 24, 2024",
    slug: "motivating-ppo-algo"
  },
]

export default function BlogPage() {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-medium text-center mb-8">Aubrey Carter</h1>
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex justify-between items-center group">
              <Link 
                href={`/blog/${post.slug}`}
                className={cn(
                  "text-purple-400 hover:text-purple-400 transition-colors",
                  "font-mono text-sm underline underline-offset-4"
                )}
              >
                {post.title}
              </Link>
              <span className="text-white font-mono text-sm">
                {post.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

