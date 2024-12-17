import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const files = await fs.readdir(postsDirectory)
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
    }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.mdx`)
  
  try {
    const rawSource = await fs.readFile(filePath, 'utf8')
    const mdxSource = await serialize(rawSource, {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    })
    

    return (
        <>
        <div className="w-full max-w-3xl mx-auto px-4">
          <article className="prose prose-invert prose-pre:bg-gray-900 max-w-none">
            <div className="font-mono">
              <MDXRemote {...mdxSource} />
            </div>
          </article>
        </div>
        </>
    )
  } catch (error) {
    notFound()
  }
}
