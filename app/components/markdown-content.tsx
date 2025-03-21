import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

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
          h1: ({ node, children, ...props }) => (
            <h1 className="text-2xl font-mono mb-6 text-gray-200" {...props}>
              {children}
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2 className="text-xl font-mono mb-4 text-gray-200" {...props}>
              {children}
            </h2>
          ),
          p: ({ node, children, ...props }) => (
            <p className="mb-4 text-gray-400 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          code: ({ node,className, children, ...props }) => (
            <code
              className={`bg-black/30 rounded px-1 py-0.5 text-gray-300 ${className || ''}`}
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ node, children, ...props }) => (
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
