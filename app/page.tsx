// pages/index.js
'use client'
import React from 'react';
import BackgroundAnimation from '@/app/components/mathematical-pattern';
import OptimizedPattern from './components/optimized-pattern';
import ThreeBackground from '@/app/components/three-bg'
import WebGLPattern from '@/app/components/webgl-pattern';
import { FadeText } from './components/fade-text';
import { Source_Code_Pro } from 'next/font/google';

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
        <FadeText>Every system has patterns.</FadeText>
        <br />
        <FadeText>Some we write, some we reveal.</FadeText>
        <br />
        <FadeText>I'm here to find both.</FadeText>
      </div>
    </div>
  </div>
);

export default Home;
