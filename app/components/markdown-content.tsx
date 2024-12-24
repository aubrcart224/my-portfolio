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
          h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-2xl font-mono mb-6 text-gray-200">{children}</h1>
          ),
          h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-xl font-mono mb-4 text-gray-200">{children}</h2>
          ),
          p: ({ children }: { children: React.ReactNode }) => (
            <p className="mb-4 text-gray-400 leading-relaxed">{children}</p>
          ),
          code: ({ children }: { children: React.ReactNode }) => (
            <code className="bg-black/30 rounded px-1 py-0.5 text-gray-300">{children}</code>
          ),
          pre: ({ children }: { children: React.ReactNode }) => (
            <pre className="bg-black/30 rounded p-4 my-4 overflow-x-auto">{children}</pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

