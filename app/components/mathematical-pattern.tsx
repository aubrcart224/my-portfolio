"use client"

import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';  

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const [fps, setFps] = useState<number>(0); // Add FPS counter
  let myP5: p5;

  useEffect(() => {
    let t = 0;
    
    const sketch = (p : p5) => {
      // Performance monitoring variables
      let frameCount = 0;
      let lastTime = p.millis();
      const fpsUpdateInterval = 500; // Update FPS every 500ms
      let lastFpsUpdate = lastTime;
      
      // Declare variables at sketch scope
      let centerX: number;
      let centerY: number;
      let pointCache = new Map<string, [number, number]>();
      
      p.setup = () => {
        // Use pixelDensity for retina displays
        p.pixelDensity(window.devicePixelRatio || 1);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(6, 36);
        p.stroke(255, 36);
        // Cache constant values
        centerX = p.width / 2;
        centerY = p.height / 2;
      };

      // Optimized point calculation function
      function a(x: number, y:number) {
        try {
          const k = x / 8 - 25;
          const e = y / 8 - 25;
          const magKE = p.mag(k, e);
          const d = p.cos(magKE / 3) * e / 5;
          const sinD9MinusT = p.sin(d * 9 - t);
          const cosYDiv9 = p.cos(y / 9);
          
          // Prevent division by very small numbers
          const safeCosFactor = Math.abs(cosYDiv9) < 0.001 ? 0.001 * Math.sign(cosYDiv9) : cosYDiv9;
          
          const q = x / 4 + (k / safeCosFactor) * sinD9MinusT + 25;
          const c = d - t / 8;
          const sinC = p.sin(c);
          const cosC = p.cos(c);
          
          // Center the pattern by using half of the canvas width and height
          const xCoord = q * sinC + centerX;
          const yCoord = ((q * 2 + x + y / 2 + d * 90) / 4) * cosC + centerY;
          return [xCoord, yCoord];
        } catch (err) {
          // Handle potential division by zero
          return [0, 0];
        }
      }

      p.draw = () => {
        // Calculate delta time for smooth animation
        const currentTime = p.millis();
        const elapsed = currentTime - lastTime;
        lastTime = currentTime;
        
        // Update FPS counter
        frameCount++;
        if (currentTime - lastFpsUpdate >= fpsUpdateInterval) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate));
          setFps(fps);
          frameCount = 0;
          lastFpsUpdate = currentTime;
        }
        
        // Slower animation speed - reduce this value to slow down the animation
        t += (p.PI / 240) * (elapsed / 16.67); // Changed from 120 to 240 for half the speed
        
        // Semi-transparent background for trail effect
        p.background(6, 36);
        p.stroke(255, 36);
        
        // Fixed step size of 8 for significant performance gain
        const step = 5;
        
        // Only draw points within viewport for performance
        const buffer = 50; // Extra buffer to prevent popping
        
        // Loop over the visible canvas with a constant step size
        for (let y = -buffer; y < p.height + buffer; y += step) {
          for (let x = -buffer; x < p.width + buffer; x += step) {
            // Cache key includes time (rounded to reduce cache size)
            const cacheKey = `${Math.round(x)},${Math.round(y)},${Math.round(t * 10) / 10}`;
            
            let px, py;
            
            // Use cached point if available
            if (pointCache.has(cacheKey)) {
              [px, py] = pointCache.get(cacheKey)!;
            } else {
              [px, py] = a(x, y);
              
              // Only cache a reasonable number of points
              if (pointCache.size < 20000) {
                pointCache.set(cacheKey, [px, py]);
              }
            }
            
            // Only draw if point is within canvas bounds
            if (px >= 0 && px < p.width && py >= 0 && py < p.height) {
              p.point(px, py);
            }
          }
        }
        
        // Limit cache size by removing oldest entries
        if (pointCache.size > 15000) {
          const keys = Array.from(pointCache.keys()).slice(0, 5000);
          keys.forEach(k => pointCache.delete(k));
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        centerX = p.width / 2;
        centerY = p.height / 2;
        
        // Clear the cache when window is resized
        pointCache.clear();
      };
    };

    // Instantiate the p5 sketch and attach it to the container ref.
    if (canvasRef.current) {
      myP5 = new p5(sketch, canvasRef.current);
    }

    // Cleanup p5 instance on component unmount
    return () => {
      if (myP5) {
        myP5.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw', 
        height: '100vh',
        overflow: 'hidden',
        zIndex: -10
      }} 
    >
      {/* Performance monitor */}
      <div style={{ 
        position: 'absolute', 
        bottom: '8px', 
        left: '8px', 
        color: 'red', 
        fontSize: '12px', 
        opacity: 0.5,
        pointerEvents: 'none'
      }}>
        FPS: {fps}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
