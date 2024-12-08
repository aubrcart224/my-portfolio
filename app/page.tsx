import ThreeScene from './components/ThreeScene'

// app/page.jsx
import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import Image from 'next/image';

export default function Page() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <ParticleBackground />
      <div 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          textAlign: 'center', 
          color: '#fff', 
          maxWidth: '600px'
        }}
      >
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>Aubrey Carter</h1>
        <p style={{ fontSize: '1rem', lineHeight: '1.5em', marginBottom: '2rem' }}>
          Welcome to my Portfolio.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.5em', marginBottom: '2rem' }}>
          Filler for now.
        </p>
        <p style={{ fontSize: '0.875rem', letterSpacing: '0.1em', marginTop: '3rem' }}>
          Hold the space bar to explore
        </p>
      </div>
    </div>
  );
}
