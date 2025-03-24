"use client"

import { useEffect, useRef, useState } from "react"

export default function OptimizedPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fps, setFps] = useState<number>(0)
  const [quality, setQuality] = useState<number>(0.5) // Even higher density with quality 0.5

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Performance monitoring variables
    let frameCount = 0
    let lastTime = performance.now()
    const fpsUpdateInterval = 500 // Update FPS display every 500ms
    let lastFpsUpdate = lastTime
    let animationId: number

    // Set canvas dimensions with device pixel ratio
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    window.addEventListener("resize", resize)
    resize()

    // Animation variables
    let t = 0
    const sin = Math.sin
    const cos = Math.cos
    const PI = Math.PI
    const mag = (x: number, y: number) => Math.sqrt(x * x + y * y)

    // Optimized point calculation function - matching mathematical-pattern.tsx
    function calculatePoint(x: number, y: number, t: number, width: number, height: number) {
      try {
        const k = x / 8 - 25
        const e = y / 8 - 25
        const d = (cos(mag(k, e) / 3) * e) / 5
        const q = x / 4 + (k / cos(y / 9)) * sin(d * 9 - t) + 25
        const c = d - t / 8

        // Center the pattern
        return {
          x: q * sin(c) + width / 2,
          y: ((q * 2 + x + y / 2 + d * 90) / 4) * cos(c) + height / 2,
        }
      } catch (e) {
        // Handle potential division by zero or other math errors
        return { x: 0, y: 0 }
      }
    }

    // Pre-calculate points for optimization
    const pointCache = new Map<string, { x: number; y: number }>()

    // Draw function with adaptive quality
    function draw() {
      if (!ctx || !canvas) return // Early return if ctx or canvas is null

      const currentTime = performance.now()
      const elapsed = currentTime - lastTime
      lastTime = currentTime

      // Update FPS counter
      frameCount++
      if (currentTime - lastFpsUpdate >= fpsUpdateInterval) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate))
        setFps(fps)

        // Adaptive quality based on performance
        if (fps < 25 && quality < 6) {
          setQuality((q) => q + 1) // Decrease quality if FPS is low
        } else if (fps > 40 && quality > 1) {
          setQuality((q) => q - 1) // Increase quality if FPS is high
        }

        frameCount = 0
        lastFpsUpdate = currentTime
      }

      // Increment time with consistent speed regardless of frame rate
      t += (PI / 180) * (elapsed / 16.67) // Slowed down by factor of 3 (from 60 to 180)

      // Clear with solid background (like mathematical-pattern)
      ctx.fillStyle = "rgba(6, 6, 6, 1)" 
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      // Set drawing style - match mathematical-pattern's stroke style
      ctx.strokeStyle = "rgba(255, 255, 255, 0.36)"
      
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const step = quality * 2 // Improved density with factor of 2 instead of 3

      // Draw points with spatial optimization
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          // Check if point is already in cache
          const cacheKey = `${Math.round(x)},${Math.round(y)},${Math.round(t * 100) / 100}`
          let point

          if (pointCache.has(cacheKey)) {
            point = pointCache.get(cacheKey)!
          } else {
            point = calculatePoint(x, y, t, width, height)

            // Only cache a limited number of points to avoid memory issues
            if (pointCache.size < 10000) {
              pointCache.set(cacheKey, point)
            }
          }

          // Only draw if point is within canvas bounds
          if (point.x >= 0 && point.x < width && point.y >= 0 && point.y < height) {
            // Draw points instead of rectangles to match mathematical-pattern
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(point.x + 1, point.y)
            ctx.stroke()
          }
        }
      }

      // Limit cache size by removing oldest entries
      if (pointCache.size > 8000) {
        const keysToDelete = Array.from(pointCache.keys()).slice(0, 2000)
        keysToDelete.forEach((key) => pointCache.delete(key))
      }

      animationId = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [quality])

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Performance monitor (hidden in production) */}
      <div className="absolute bottom-2 left-2 text-white text-xs opacity-50 pointer-events-none">
        FPS: {fps} | Quality: {quality}
      </div>
    </div>
  )
}

