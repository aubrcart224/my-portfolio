import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { HTMLProps } from 'react'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none font-mono">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: (props: HTMLProps<HTMLHeadingElement>) => (
            <h1 className="text-2xl font-mono mb-6 text-gray-200" {...props} />
          ),
          h2: (props: HTMLProps<HTMLHeadingElement>) => (
            <h2 className="text-xl font-mono mb-4 text-gray-200" {...props} />
          ),
          p: (props: HTMLProps<HTMLParagraphElement>) => (
            <p className="mb-4 text-gray-400 leading-relaxed" {...props} />
          ),
          code: (props: HTMLProps<HTMLElement>) => (
            <code className="bg-black/30 rounded px-1 py-0.5 text-gray-300" {...props} />
          ),
          pre: (props: HTMLProps<HTMLPreElement>) => (
            <pre className="bg-black/30 rounded p-4 my-4 overflow-x-auto" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

