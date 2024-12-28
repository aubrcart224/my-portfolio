'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MarkdownContent } from './markdown-content'
import { X } from "lucide-react"

interface ProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  date: string
  content: string
}

export function ProjectDialog({
  isOpen,
  onClose,
  title,
  date,
  content
}: ProjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] p-0 bg-[#1a1a1a] border-zinc-800 overflow-x-hidden">
      <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </button>
        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="p-8">
            <div className="text-sm text-gray-400 font-mono mb-4">{date}</div>
            <h1 className="text-2xl font-mono text-white mb-8">{title}</h1>
            <div className="font-mono break-words w-full max-w-full">
              <MarkdownContent content={content} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

