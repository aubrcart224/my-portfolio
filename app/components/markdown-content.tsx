'use client'

import React from 'react'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown">
      {/* Render markdown content here */}
      {content}
    </div>
  )
}

