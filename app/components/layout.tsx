'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
//import { Donut } from "lucide-react"
//import ParticleBackground from '@/app/components/donut';
import ParticleBackground from '@/app/components/donut';


export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <ParticleBackground>
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 text-white relative z-10">
      {/* Main content area */}
      <main className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center">
        {children}
      </main>
      
      {/* Navigation */}
      <nav className="w-full max-w-4xl flex flex-col items-center gap-8 mb-12">
        <div className="flex items-center gap-6">
          <Link 
            href="/projects"
            className={cn(
              "hover:underline underline-offset-4",
              pathname === "/projects" && "underline"
            )}
          >
            Projects
          </Link>
          <Link 
            href="/blog"
            className={cn(
              "hover:underline underline-offset-4",
              pathname === "/blog" && "underline"
            )}
          >
            Blog
          </Link>
          <Link 
            href="/resume"
            className={cn(
              "hover:underline underline-offset-4",
              pathname === "/resume" && "underline"
            )}
          >
            Resume
          </Link>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <Link href="https://github.com/aubrcart224" className="hover:text-white">
            github
          </Link>
          <span>•</span>
          <Link href="https://x.com/CottonSwab001" className="hover:text-white">
            x.com
          </Link>
          <span>•</span>
          <Link href="https://www.linkedin.com/in/aubrey-carter-a5b1b9251/" className="hover:text-white">
            linkedin
          </Link>
        </div>
      </nav>
    </div>
    </ParticleBackground>
  )
}

