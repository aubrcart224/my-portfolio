import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    content: string;
    date?: string;
  } | null;
}

// Custom components for markdown
const MarkdownComponents = {
  img: (props: any) => (
    <div className="my-6">
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={800}
        height={450}
        className="rounded-md"
        style={{ objectFit: 'contain' }}
      />
    </div>
  ),
  video: (props: any) => (
    <div className="my-6">
      <video 
        controls
        className="w-full rounded-md"
        src={props.src}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  ),
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-300" {...props} />,
  code: (props: any) => (
    <code className="bg-gray-800 p-1 rounded text-red-400" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto my-4 text-gray-300" {...props} />
  ),
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  // Format date if it exists
  const formattedDate = project.date 
    ? new Date(project.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).toLowerCase()
    : null;

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const checkScroll = () => {
        if (contentRef.current) {
          const { scrollHeight, clientHeight } = contentRef.current;
          setShowScrollIndicator(scrollHeight > clientHeight);
        }
      };
      
      // Check on mount
      checkScroll();
      
      // Check on resize
      window.addEventListener('resize', checkScroll);
      return () => window.removeEventListener('resize', checkScroll);
    }
  }, [isOpen, project]);

  // Handle scroll events to hide indicator when user reaches bottom
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Hide indicator when near bottom
      setShowScrollIndicator(scrollHeight - scrollTop - clientHeight > 20);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
                      w-[90%] max-w-3xl max-h-[90vh] bg-black/90 
                      border border-gray-800 rounded-xl shadow-2xl
                      flex flex-col"
            style={{ margin: 0 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              {formattedDate && <p className="text-gray-400 mb-2">{formattedDate}</p>}
              <h1 className="text-4xl font-bold">{project.title}</h1>
            </div>
            
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content */}
            <div 
              ref={contentRef} 
              className="p-6 overflow-y-auto custom-scrollbar"
              onScroll={handleScroll}
            >
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown components={MarkdownComponents}>
                  {project.content}
                </ReactMarkdown>
              </div>
            </div>
            
            {/* Scroll indicator */}
            {showScrollIndicator && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </motion.div>
            )}
          </motion.div>
          
          {/* Custom scrollbar styles */}
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.2);
              border-radius: 4px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 4px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}; 