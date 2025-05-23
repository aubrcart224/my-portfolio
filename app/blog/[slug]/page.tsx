import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// Make sure this is a Server Component
export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'app/content/blogs')
  const files = await fs.readdir(postsDirectory)
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
    }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'app/content/blogs', `${params.slug}.mdx`) //check file path for errors 
  
  try {
    const source = await fs.readFile(filePath, 'utf8')

    return (
      <div className="w-full max-w-3xl mx-auto px-4">
        <article className="prose prose-invert prose-pre:bg-gray-900 max-w-none">
          <div className="font-mono">
            <MDXRemote 
              source={source}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  //rehypePlugins: [rehypeKatex],
                }
              }}
            />
          </div>
        </article>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

