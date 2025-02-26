'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FadeText } from '@/app/components/fade-text' // If you still want the fade effect

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
  { 
    id: 7, 
    title: "Email updates", 
    description: "Stay in the loop with timely alerts and daily summaries delivered right to your inbox.",
  },
]

export default function ProjectsPage() {
  // OnWheel handler to scroll horizontally with mouse wheel
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent the default vertical scroll
    e.preventDefault()
    // Scroll horizontally instead
    e.currentTarget.scrollLeft += e.deltaY
  }

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
        justify-start
        pt-16
        bg-[url('/path/to/donut-bg.png')] 
        bg-no-repeat 
        bg-cover
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
          <FadeText>One a few more things.</FadeText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-lg"
        >
          There&apos;s even more to discover. Fey brings you a collection of advanced tools 
          designed to refine and elevate your workflow.
        </motion.p>
      </div>

      {/* Horizontal-scrolling container (hide scrollbar, scroll on wheel) */}
      <div
        onWheel={handleWheel}
        className="
          w-full
          flex
          overflow-x-scroll
          overflow-y-hidden
          scrollbar-none
          px-4
          pb-10
          space-x-4
        "
        style={{ scrollBehavior: 'smooth' }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            // group class so children can respond to hover
            className="
              group
              relative
              flex-shrink-0 
              h-[400px]
              w-[60px]  /* Narrow by default */
              bg-white/10
              backdrop-blur-sm
              rounded-xl
              cursor-pointer
              transition-all
              duration-300
              hover:w-[300px] /* Expand on hover */
              flex
              flex-col
              items-start
              justify-center
            "
          >
            {/* Rotated Title (visible by default, hidden on hover) */}
            <div
              className="
                absolute 
                top-1/2 
                -translate-y-1/2 
                left-3
                origin-left
                -rotate-90 
                text-lg
                text-gray-100
                font-semibold
                tracking-wider
                whitespace-nowrap
                transition-opacity
                duration-300
                group-hover:opacity-0
              "
            >
              {project.title}
            </div>

            {/* Expanded content (hidden by default, visible on hover) */}
            <div
              className="
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
                p-4
              "
            >
              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Link to project detail */}
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
