import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface MarkdownContentProps {
  content: string
}

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
type ParagraphProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }
type PreProps = DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none font-mono">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children, ...props }: HeadingProps) => (
            <h1 className="text-2xl font-mono mb-6 text-gray-200" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }: HeadingProps) => (
            <h2 className="text-xl font-mono mb-4 text-gray-200" {...props}>
              {children}
            </h2>
          ),
          p: ({ children, ...props }: ParagraphProps) => (
            <p className="mb-4 text-gray-400 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          code: ({ inline, className, children, ...props }: CodeProps) => (
            <code className={`bg-black/30 rounded px-1 py-0.5 text-gray-300 ${className || ''}`} {...props}>
              {children}
            </code>
          ),
          pre: ({ children, ...props }: PreProps) => (
            <pre className="bg-black/30 rounded p-4 my-4 overflow-x-auto" {...props}>
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
