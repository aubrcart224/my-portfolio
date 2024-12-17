'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import ParticleBackground from '@/app/components/donut';
import './globals.css'


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  
  return (
    <html>
      <body>
    <ParticleBackground>
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-2 text-white relative z-10">
      {/* Main content area */}
      <main className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center">
        {children}
      </main>

      

      {/* Navigation */}
      <nav className="w-full max-w-4xl flex flex-col items-center gap-8 mb-6">
        <div className="flex items-center gap-6">
          <Link 
            href="/projects"
            className={cn(
              "underline underline-offset-4",
              pathname === "/projects" && "underline"
            )}
          >
            Projects
          </Link>
          <Link 
            href="/blog"
            className={cn(
              "underline underline-offset-4",
              pathname === "/blog" && "underline"
            )}
          >
            Blog
          </Link>
          <Link 
            href="/resume"
            className={cn(
              //"hover:underline underline-offset-4", old line saving for now
              "underline underline-offset-4",
              pathname === "/resume" && "underline"
            )}
          >
            Resume
          </Link>
        </div>
        
        
        {/* Footer Links */}
        <div className="flex items-center gap-4 text-sm text-white">
          <Link href="https://github.com/aubrcart224?tab=overview&from=2024-12-01&to=2024-12-16" className="hover:text-white">
            github
          </Link>
          <span>•</span>
          <Link href="https://x.com/CottonSwab001" className="hover:text-white">
            x.com
          </Link>
          <span>•</span>
          <Link href="https://www.linkedin.com/in/aubrey-carter/" className="hover:text-white">
            linkedin
          </Link>
        </div>
        
      </nav>
    </div>
    </ParticleBackground>
    </body>
    </html>
  )
}

