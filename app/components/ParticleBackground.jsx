"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    // A subtle gradient background can be nice; or just black
    const loader = new THREE.TextureLoader();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 120;
    camera.position.y = 40;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Funnel parameters
    const topRadius = 80;
    const bottomRadius = 5;
    const funnelHeight = 100;
    const alpha = 0.05; // Controls rate at which radius narrows
    const radialSegments = 200;   // vertical resolution
    const angularSegments = 200;  // horizontal resolution

    // Create geometry for the funnel grid
    const funnelPositions = new Float32Array(radialSegments * angularSegments * 3);
    const funnelColors = new Float32Array(radialSegments * angularSegments * 3); // RGB colors per vertex

    // We'll create a gradient from top (lighter blue) to bottom (darker)
    const topColor = new THREE.Color(0x00aaff);   // Lighter blue
    const bottomColor = new THREE.Color(0x000044); // Darker blue-ish

    for (let i = 0; i < radialSegments; i++) {
      const t = i / (radialSegments - 1);
      const radius = bottomRadius + (topRadius - bottomRadius) * Math.exp(-alpha * t);
      const y = -t * funnelHeight;

      // Interpolate color
      const color = topColor.clone().lerp(bottomColor, t);

      for (let j = 0; j < angularSegments; j++) {
        const angle = (j / angularSegments) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        const index = (i * angularSegments + j) * 3;
        funnelPositions[index] = x;
        funnelPositions[index + 1] = y;
        funnelPositions[index + 2] = z;

        funnelColors[index] = color.r;
        funnelColors[index + 1] = color.g;
        funnelColors[index + 2] = color.b;
      }
    }

    const funnelGeometry = new THREE.BufferGeometry();
    funnelGeometry.setAttribute('position', new THREE.BufferAttribute(funnelPositions, 3));
    funnelGeometry.setAttribute('color', new THREE.BufferAttribute(funnelColors, 3));

    const funnelMaterial = new THREE.PointsMaterial({ 
      size: 0.5, 
      vertexColors: true 
    });
    const funnelPoints = new THREE.Points(funnelGeometry, funnelMaterial);
    scene.add(funnelPoints);


    // Add some "star-like" random particles around the funnel
    // This adds a sense of depth and space
    const starCount = 5000;
    const starPositions = new Float32Array(starCount * 3);

    for (let s = 0; s < starCount; s++) {
      // Spread stars randomly in a certain volume
      const starX = (Math.random() - 0.5) * 1000;
      const starY = (Math.random() - 0.5) * 400;
      const starZ = (Math.random() - 0.5) * 1000;

      const starIndex = s * 3;
      starPositions[starIndex] = starX;
      starPositions[starIndex + 1] = starY;
      starPositions[starIndex + 2] = starZ;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.8
    });
    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);


    // Subtle animation: rotate the funnel to give a dynamic look
    function animate() {
      requestAnimationFrame(animate);

      // Slowly rotate funnel
      funnelPoints.rotation.y += 0.0005;

      // Rotate star field slightly
      starPoints.rotation.y += 0.0002;

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
