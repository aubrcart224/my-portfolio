'use client'

import { useState } from "react"
import { Layout } from "@/app/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface BlogPost {
  id: number
  title: string
  date: string
  content: string
}

const blogPosts: BlogPost[] = [
  { id: 1, title: "Motivating Adam Optimizer", date: "Sept 16, 2024", content: "Our first type of optimization, the standard one size fits all solution..." },
  { id: 2, title: "Post 2", date: "Sept 15, 2024", content: "Content for Post 2..." },
  { id: 3, title: "Post 3", date: "Sept 14, 2024", content: "Content for Post 3..." },
  { id: 4, title: "Post 4", date: "Sept 13, 2024", content: "Content for Post 4..." },
  { id: 5, title: "Post 5", date: "Sept 12, 2024", content: "Content for Post 5..." },
]

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <Card className="w-full max-w-2xl bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Blog posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {blogPosts.map((post) => (
              <li key={post.id} className="flex justify-between items-center">
                <button
                  className="text-left hover:underline"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </button>
                <span className="text-gray-400 text-sm">{post.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-4">{selectedPost?.date}</p>
            <div className="font-mono text-sm whitespace-pre-wrap">
              {selectedPost?.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

