'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MarkdownContent } from './markdown-content'

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
      <DialogContent className="max-w-[800px] p-0 bg-[#1a1a1a] border-zinc-800">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-8">
            <div className="text-sm text-gray-400 font-mono mb-4">{date}</div>
            <h1 className="text-2xl font-mono text-white mb-8">{title}</h1>
            <div className="font-mono">
              <MarkdownContent content={content} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

