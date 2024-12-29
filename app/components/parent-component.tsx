'use client'

import React, { useState } from 'react'
import { ProjectDialog } from './project-dialog'

export function ParentComponent() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <ProjectDialog
        isOpen={isOpen}
        onClose={handleClose}
        title="Project Title"
        date="2023-10-01"
        content="Project description..."
      />
    </>
  )
} 