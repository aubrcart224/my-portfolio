'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Optional: If you have a FadeText component, keep using it. Otherwise, you can remove it.
import { FadeText } from '@/app/components/fade-text'

// Example project data
const projects = [
  { 
    id: 1, 
    title: "Live pricing", 
    description: "Experience truly live pricing. Unlike other tools, there are no delays—get instant, real-time quotes every time.",
  },
  { 
    id: 2, 
    title: "Analyst estimates", 
    description: "No more guesswork. Quickly access analyst predictions and insights to stay ahead of the curve.",
  },
  { 
    id: 3, 
    title: "Company financials", 
    description: "Dive deep into financial data to make informed decisions for your next big move.",
  },
  { 
    id: 4, 
    title: "Peer analysis", 
    description: "Compare performance across multiple peers and benchmarks at a glance.",
  },
  { 
    id: 5, 
    title: "Historical earnings", 
    description: "Analyze trends over time to forecast future results and mitigate risk.",
  },
  { 
    id: 6, 
    title: "Insider transactions", 
    description: "Get insights on significant insider buys and sells that could shape market movements.",
  },
  // Add more as needed
]

export default function ProjectsPage() {
  return (
    <div 
      className="
        relative 
        w-full 
        min-h-screen 
        
        text-white 
        flex 
        flex-col 
        items-center 
        justify-center
        overflow-hidden
      "
    >
      {/* Title & Subtitle */}
      <div className="mb-8 text-center max-w-2xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-2"
        >
          {/* If you still want your FadeText effect, wrap it. Otherwise just use text. */}
          <FadeText>One a few more things.</FadeText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-lg"
        >
          There&apos;s even more to discover. Fey brings you a collection of advanced tools designed 
          to refine and elevate your workflow.
        </motion.p>
      </div>

      {/* Horizontally Scrolling Cards */}
      <div className="w-full overflow-x-auto px-4 pb-10">
        <div className="flex space-x-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="
                flex-shrink-0 
                w-72 
                h-96 
                rounded-xl 
                p-6 
                bg-white/10 
                backdrop-blur-sm 
                flex 
                flex-col 
                justify-between
              "
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Link to the project detail page */}
              <Link href={`/projects/${project.id}`}>
                <button
                  className="
                    text-sm 
                    text-white 
                    border 
                    border-white/20 
                    px-4 
                    py-2 
                    rounded 
                    hover:bg-white/20
                    transition
                  "
                >
                  View project
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
