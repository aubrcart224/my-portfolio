"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create Particle Geometry
    const particleCount = 50000;
    
    // Torus parameters
    const R = 50;    // Main radius
    const r = 20;    // Tube radius
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;  // Angle around main ring
      const phi = Math.random() * Math.PI * 2;    // Angle around tube
      
      const x = (R + r * Math.cos(phi)) * Math.cos(theta);
      const y = (R + r * Math.cos(phi)) * Math.sin(theta);
      const z = r * Math.sin(phi);

      // Optional: Adjust to create a subtle band or diagonal
      // Example: Uncomment to skew the torus
      // const skew = 0.3;
      // z += theta * skew;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.01, 
      opacity: 0.8, 
      transparent: true, 
      blending: THREE.AdditiveBlending 
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Rotate so that it appears as a line at an angle
    points.rotation.x = Math.PI / 2; // Adjust as needed
    points.rotation.z = 0.3; // Slight tilt for diagonal composition

    

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0002; 
      points.rotation.z += 0.0010;
      points.rotation.x += 0.0002;
      renderer.render(scene, camera);
    }
    animate();
    

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default ParticleBackground;
