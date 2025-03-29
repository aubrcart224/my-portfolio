"use client"

import { useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { usePatternStore } from "@/lib/store"

export default function WebGLPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const { density, setDensity } = usePatternStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Initialize WebGL context
    const gl = canvas.getContext("webgl", {
      antialias: true,
      preserveDrawingBuffer: true,
    })

    if (!gl) {
      console.error("WebGL not supported")
      return
    }

    // Set canvas dimensions with device pixel ratio
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const displayWidth = Math.floor(window.innerWidth * dpr)
      const displayHeight = Math.floor(window.innerHeight * dpr)

      // Update canvas size
      canvas.width = displayWidth
      canvas.height = displayHeight
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      // Update WebGL viewport
      gl.viewport(0, 0, displayWidth, displayHeight)
    }

    window.addEventListener("resize", resize)
    resize()

    // Vertex shader - positions the points
    const vertexShaderSource = `
      attribute vec2 a_position;
      uniform float u_time;
      uniform vec2 u_resolution;
      
      // Helper functions
      float sin_t(float v) { return sin(v); }
      float cos_t(float v) { return cos(v); }
      float mag(float x, float y) { return sqrt(x*x + y*y); }
      
      void main() {
        // Get the input coordinates
        float x = a_position.x;
        float y = a_position.y;
        
        // Apply the mathematical formula from the original code
        float k = x / 8.0 - 25.0;
        float e = y / 8.0 - 25.0;
        float d = cos_t(mag(k, e) / 3.0) * e / 5.0;
        // Slow down the edge animation by reducing the time factor based on distance from center
        float distanceFromCenter = mag(k, e) / 50.0;
        float timeScale = 1.0 / (1.0 + distanceFromCenter * distanceFromCenter);
        float q = x / 4.0 + (k / cos_t(y / 9.0)) * sin_t(d * 9.0 - u_time * timeScale) + 25.0;
        float c = d - (u_time * timeScale) / 8.0;
        
        // Calculate the output position
        float outX = q * sin_t(c) + u_resolution.x / 2.0;
        float outY = ((q * 2.0 + x + y / 2.0 + d * 90.0) / 4.0) * cos_t(c) + u_resolution.y / 2.0;
        
        // Convert to clip space coordinates
        vec2 clipSpace = vec2(
          outX / u_resolution.x * 2.0 - 1.0,
          outY / u_resolution.y * 2.0 - 1.0
        );
        
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        gl_PointSize = 1.0;
      }
    `

    // Fragment shader - colors the points
    const fragmentShaderSource = `
      precision mediump float;
      
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.36);
      }
    `

    // Create and compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) {
        throw new Error("Failed to create shader")
      }

      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        throw new Error("Shader compilation failed")
      }

      return shader
    }

    // Create shader program
    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram()
      if (!program) {
        throw new Error("Failed to create program")
      }

      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program linking error:", gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        throw new Error("Program linking failed")
      }

      return program
    }

    // Compile shaders and create program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    const program = createProgram(gl, vertexShader, fragmentShader)

    programRef.current = program

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    const timeUniformLocation = gl.getUniformLocation(program, "u_time")
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")

    // Create a buffer for the positions
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // Generate grid of points
    function generatePoints(currentDensity: number) {
      const safeCanvas = canvas! // We know canvas is not null since we checked at effect start
      const width = safeCanvas.width / (window.devicePixelRatio || 1)
      const height = safeCanvas.height / (window.devicePixelRatio || 1)
      const points = []

      // Determine point density based on screen size
      const screenSize = width * height
      let adjustedDensity = currentDensity

      if (screenSize > 1920 * 1080) {
        adjustedDensity = Math.max(1.3, currentDensity)
      } else if (screenSize < 768 * 1024) {
        adjustedDensity = Math.max(2, currentDensity)
      }

      // Create a grid of points using the density from state
      for (let y = 0; y < height; y += adjustedDensity) {
        for (let x = 0; x < width; x += adjustedDensity) {
          points.push(x, y)
        }
      }

      return new Float32Array(points)
    }

    let positions = generatePoints(density)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    // Set up blending for transparency
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Set clear color
    gl.clearColor(6 / 255, 6 / 255, 6 / 255, 1.0)
    

    // Animation variables
    let time = 0
    let lastFrameTime = 0
    const PI = Math.PI
    let currentDensity = density

    // Animation loop
    function render(now: number) {
      // Convert time to seconds
      now *= 0.001
      const deltaTime = now - lastFrameTime
      lastFrameTime = now

      // Update time with consistent speed regardless of frame rate
      time += (PI / 60) * (deltaTime / (1 / 60))

      // Assert gl and canvas are non-null since we checked at effect start
      const safeGl = gl!
      const safeCanvas = canvas!

      // Check if density changed
      if (currentDensity !== density) {
        currentDensity = density
        positions = generatePoints(currentDensity)
        safeGl.bufferData(safeGl.ARRAY_BUFFER, positions, safeGl.STATIC_DRAW)
      }

      // Clear with semi-transparent background for trail effect
      safeGl.clear(safeGl.COLOR_BUFFER_BIT)

      // Use the program
      safeGl.useProgram(program)

      // Set the uniforms
      safeGl.uniform1f(timeUniformLocation, time)
      safeGl.uniform2f(
        resolutionUniformLocation,
        safeCanvas.width / (window.devicePixelRatio || 1),
        safeCanvas.height / (window.devicePixelRatio || 1),
      )

      // Set up the position attribute
      safeGl.enableVertexAttribArray(positionAttributeLocation)
      safeGl.bindBuffer(safeGl.ARRAY_BUFFER, positionBuffer)
      safeGl.vertexAttribPointer(
        positionAttributeLocation,
        2, // 2 components per vertex
        safeGl.FLOAT, // data type
        false, // don't normalize
        0, // stride (0 = auto)
        0, // offset
      )

      // Draw the points
      safeGl.drawArrays(safeGl.POINTS, 0, positions.length / 2)

      // Request next frame
      requestAnimationFrame(render)
    }

    // Start animation
    requestAnimationFrame(render)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize)

      // Clean up WebGL resources
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(positionBuffer)
    }
  }, [density])

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <div className="absolute top-4 left-4 w-48 bg-black/20 backdrop-blur-sm rounded-lg p-4">
        <label className="text-xs text-white/70 block mb-2">Pattern Density</label>
        <Slider
          value={[density]}
          onValueChange={([value]) => setDensity(value)}
          min={0.5}
          max={4}
          step={0.1}
          className="w-full"
        />
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}