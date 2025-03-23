import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

/**
 * Helper: Create a rectangle as a line loop.
 * We'll randomly size it, but you can pass any width/height you want.
 */
function createRectangleGeometry(width, height) {
  const shapePoints = [
    new THREE.Vector3(-width / 2, -height / 2, 0),
    new THREE.Vector3(width / 2, -height / 2, 0),
    new THREE.Vector3(width / 2, height / 2, 0),
    new THREE.Vector3(-width / 2, height / 2, 0),
    new THREE.Vector3(-width / 2, -height / 2, 0)
  ]
  const geometry = new THREE.BufferGeometry().setFromPoints(shapePoints)
  return geometry
}

/**
 * Helper: Create a single straight line segment geometry.
 */
function createLineSegmentGeometry(length) {
  const points = [
    new THREE.Vector3(-length / 2, 0, 0),
    new THREE.Vector3(length / 2, 0, 0)
  ]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  return geometry
}

const Dune = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    let renderer, scene, camera, composer
    let shapes = [] // store our lines/rectangles for flicker & animation
    let animationId

    const init = () => {
      // Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color('#000000')

      // Camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      // Pull camera back so we see everything
      camera.position.set(0, 0, 40)

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }

      // Postprocessing: Bloom
      composer = new EffectComposer(renderer)
      const renderPass = new RenderPass(scene, camera)
      composer.addPass(renderPass)

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.25,  // bloom strength (increase for stronger glow)
        0.4,   // bloom radius
        0.85   // bloom threshold
      )
      composer.addPass(bloomPass)

      // Add lines and rectangles
      const baseMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.7 // we’ll flicker this in animate
      })

      // We'll create some random straight lines
      const lineCount = 30
      for (let i = 0; i < lineCount; i++) {
        const length = THREE.MathUtils.randFloat(2, 8)
        const geometry = createLineSegmentGeometry(length)
        const material = baseMaterial.clone()

        const line = new THREE.Line(geometry, material)
        // random position
        line.position.x = THREE.MathUtils.randFloatSpread(30) // -15..15
        line.position.y = THREE.MathUtils.randFloatSpread(15)  // -7.5..7.5
        // random slight rotation for diagonal lines
        line.rotation.z = THREE.MathUtils.degToRad(THREE.MathUtils.randInt(-45, 45))
        // random small z offset for layering
        line.position.z = THREE.MathUtils.randFloat(-5, 5)

        scene.add(line)
        shapes.push(line)
      }

      // We'll create some random rectangles (like circuit boxes)
      const rectCount = 10
      for (let i = 0; i < rectCount; i++) {
        const w = THREE.MathUtils.randFloat(1, 5)
        const h = THREE.MathUtils.randFloat(0.5, 2)
        const geometry = createRectangleGeometry(w, h)
        const material = baseMaterial.clone()

        const rectLine = new THREE.Line(geometry, material)
        // random position
        rectLine.position.x = THREE.MathUtils.randFloatSpread(30)
        rectLine.position.y = THREE.MathUtils.randFloatSpread(15)
        // random slight rotation
        rectLine.rotation.z = THREE.MathUtils.degToRad(THREE.MathUtils.randInt(-30, 30))
        rectLine.position.z = THREE.MathUtils.randFloat(-5, 5)

        scene.add(rectLine)
        shapes.push(rectLine)
      }

      // Handle window resize
      window.addEventListener('resize', onWindowResize, false)
    }

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    // Subtle flicker function
    const flicker = (obj) => {
      if (!obj.material) return
      // random flicker around 0.5 - 1.0
      obj.material.opacity = 0.5 + Math.random() * 0.5
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Flicker every ~1 second or so, but not for every line at once
      // We'll randomly pick a few lines each frame to flicker
      if (Math.floor(time) % 2 === 0) {
        for (let i = 0; i < 3; i++) {
          const randomIndex = THREE.MathUtils.randInt(0, shapes.length - 1)
          flicker(shapes[randomIndex])
        }
      }

      // Subtle drifting in Z to create parallax
      shapes.forEach((shape) => {
        shape.position.z += 0.005
        if (shape.position.z > 5) {
          shape.position.z = -5
        }
      })

      composer.render()
    }

    init()
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onWindowResize)
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        background: '#000'
      }}
    />
  )
}


export default Dune;