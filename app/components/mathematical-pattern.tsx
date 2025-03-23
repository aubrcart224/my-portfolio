// components/BackgroundAnimation.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';  

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  let myP5: p5;

  useEffect(() => {
    let t = 0;

    const sketch = (p : p5) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(6, 36);
        p.stroke(255, 36);
      };

      // This function mirrors your one-liner "a" function
      function a(x: number, y:number) {
        const k = x / 8 - 25;
        const e = y / 8 - 25;
        const d = p.cos(p.mag(k, e) / 3) * e / 5;
        const q = x / 4 + (k / p.cos(y / 9)) * p.sin(d * 9 - t) + 25;
        const c = d - t / 8;
        // Center the pattern by using half of the canvas width and height
        const xCoord = q * p.sin(c) + p.width / 2;
        const yCoord = ((q * 2 + x + y / 2 + d * 90) / 4) * p.cos(c) + p.height / 2;
        return [xCoord, yCoord];
      }

      p.draw = () => {
        t += p.PI / 60;
        p.background(6, 36);
        p.stroke(255, 36);
        // Loop over the full canvas dimensions
        for (let y = 0; y < p.height; y += 3) {
          for (let x = 0; x < p.width; x += 3) {
            const [px, py] = a(x, y);
            p.point(px, py);
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
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
        overflow: 'hidden'
      }} 
    />
  );
};

export default BackgroundAnimation;
