// pages/index.js
'use client'
import React from 'react';
import BackgroundAnimation from '@/app/components/mathematical-pattern';
import OptimizedPattern from './components/optimized-pattern';
import ThreeBackground from '@/app/components/three-bg'


const Home = () => (
  <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      
      <BackgroundAnimation></BackgroundAnimation>
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <h1>Your Website Content</h1>
      {/* Other content */}
    </div>
  </div>
);

export default Home;
