// pages/index.js
'use client'
import React from 'react';
import BackgroundAnimation from '@/app/components/mathematical-pattern';
import OptimizedPattern from './components/optimized-pattern';
import ThreeBackground from '@/app/components/three-bg'
import WebGLPattern from '@/app/components/webgl-pattern';
import { FadeText } from './components/fade-text';
import { Source_Code_Pro } from 'next/font/google';
import MatrixText from '@/app/components/matrix-text'

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

const Home = () => (
  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <WebGLPattern></WebGLPattern>
    </div>
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1, 
      textAlign: 'center', 
      padding: '2rem 1rem'
    }}>
      <div className={sourceCodePro.className} style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        fontSize: '1.2rem',
        lineHeight: '2.5rem',
        fontWeight: 500
      }}>
        <MatrixText>Every system has patterns.</MatrixText>
        <br />
        <MatrixText>Some we write, some we reveal.</MatrixText>
        <br />
        <MatrixText>I'm here to find both.</MatrixText>
      </div>
    </div>
  </div>
);

export default Home;
