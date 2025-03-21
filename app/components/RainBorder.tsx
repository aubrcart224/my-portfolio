'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RainBorderProps {
  children: React.ReactNode;
  borderWidth?: number;
  className?: string;
  duration?: number;
  pathLength?: number;
  isActive?: boolean;
  colorScheme?: 'default' | 'rainbow' | 'neon' | 'tech';
}

export function RainBorder({
  children,
  borderWidth = 3,
  className = '',
  duration = 15,
  pathLength = 0.3,
  isActive = true,
  colorScheme = 'default',
}: RainBorderProps) {
  const getGradientColors = () => {
    switch (colorScheme) {
      case 'rainbow':
        return 'url(#rainbow-gradient)';
      case 'neon':
        return 'url(#neon-gradient)';
      case 'tech':
        return 'url(#tech-gradient)';
      default:
        return 'url(#default-gradient)';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-0 rounded-xl overflow-hidden [filter:blur(1px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="default-gradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
              </linearGradient>
              <linearGradient id="rainbow-gradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="33%" stopColor="#00ff00" />
                <stop offset="66%" stopColor="#0000ff" />
                <stop offset="100%" stopColor="#ff0000" />
              </linearGradient>
              <linearGradient id="neon-gradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#00ffff" />
              </linearGradient>
              <linearGradient id="tech-gradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#0ea5e9" /> {/* Sky blue */}
                <stop offset="25%" stopColor="#2dd4bf" /> {/* Teal */}
                <stop offset="50%" stopColor="#0284c7" /> {/* Darker blue */}
                <stop offset="75%" stopColor="#06b6d4" /> {/* Cyan */}
                <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky blue */}
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background subtle glow */}
            <motion.rect
              x="0" y="0" width="100" height="100"
              fill="none"
              stroke={getGradientColors()}
              strokeWidth={borderWidth * 2}
              strokeOpacity="0.1"
              filter="url(#glow)"
            />

            {/* Main animated paths */}
            <motion.path
              d="M 0,0 L 100,0 L 100,100 L 0,100 Z"
              fill="none"
              stroke={getGradientColors()}
              strokeWidth={borderWidth}
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, pathLength],
                rotate: [0, 360],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            />
            
            <motion.path
              d="M 0,0 L 100,0 L 100,100 L 0,100 Z"
              fill="none"
              stroke={getGradientColors()}
              strokeWidth={borderWidth}
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, pathLength],
                pathOffset: [0, -1],
                scale: [0.95, 1.05],
              }}
              transition={{
                duration: duration * 1.3,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            />

            {/* Corner accents */}
            <motion.circle
              cx="0" cy="0" r="3"
              fill={getGradientColors()}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="100" cy="0" r="3"
              fill={getGradientColors()}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
              cx="100" cy="100" r="3"
              fill={getGradientColors()}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="0" cy="100" r="3"
              fill={getGradientColors()}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
          </svg>
        </motion.div>
      )}
      {children}
    </div>
  );
}