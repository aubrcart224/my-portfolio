'use client'

import Link from "next/link"
import { cn } from "@/lib/utils"
import { FadeText } from "../components/fade-text"


const blogPosts = [
  { 
    id: 1, 
    title: "Soon to be blog post",
    date: "sept 16, 2024",
    slug: "motivating-adam-optimizer"
  },
  { 
    id: 2, 
    title: "Soon to be blog post",
    date: "sept 2, 2024",
    slug: "parser-theory"
  },
  { 
    id: 3, 
    title: "Soon to be blog post",
    date: "aug 25, 2024",
    slug: "writing-a-lexer"
  },
  { 
    id: 4, 
    title: "Soon to be blog post",
    date: "june 24, 2024",
    slug: "motivating-ppo-algo"
  },
]

export default function BlogPage() {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">
          <FadeText>
            Blog posts
          </FadeText>
        </h1>
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex justify-between items-center group">
             
              <Link 
                //href={`/blog/${post.slug}`}
                href={`/blog/`}
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

