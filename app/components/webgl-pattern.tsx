"use client"

import { useEffect, useRef } from "react"

export default function WebGLPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const programRef = useRef<WebGLProgram | null>(null)

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
    function generatePoints() {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const points = []

      // Determine point density based on screen size
      const screenSize = width * height
      let density = 4 // Default density increased from 2 to 4

      if (screenSize > 1920 * 1080) {
        density = 1.5 // Lower density for larger screens (increased from 3 to 6)
      } else if (screenSize < 768 * 1024) {
        density = 2 // Higher density for smaller screens (increased from 1 to 2)
      }

      // Create a grid of points
      for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
          points.push(x, y)
        }
      }

      return new Float32Array(points)
    }

    const positions = generatePoints()
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

    // Animation loop
    function render(now: number) {
      // Convert time to seconds
      now *= 0.001
      const deltaTime = now - lastFrameTime
      lastFrameTime = now

      // Update time with consistent speed regardless of frame rate
      time += (PI / 60) * (deltaTime / (1 / 60))

      // Clear with semi-transparent background for trail effect
      gl.clear(gl.COLOR_BUFFER_BIT)

      // Use the program
      gl.useProgram(programRef.current as WebGLProgram)

      // Set the uniforms
      gl.uniform1f(timeUniformLocation, time)
      gl.uniform2f(
        resolutionUniformLocation,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1),
      )

      // Set up the position attribute
      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2, // 2 components per vertex
        gl.FLOAT, // data type
        false, // don't normalize
        0, // stride (0 = auto)
        0, // offset
      )

      // Draw the points
      gl.drawArrays(gl.POINTS, 0, positions.length / 2)

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
  }, [])

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

