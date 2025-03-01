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
}

export function RainBorder({
  children,
  borderWidth = 3,
  className = '',
  duration = 15,
  pathLength = 0.3,
  isActive = true,
}: RainBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-0 rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 0,0 L 100,0 L 100,100 L 0,100 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={borderWidth}
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, pathLength],
                //pathOffset: [0, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            />
            
            <motion.path
              d="M 0,0 L 100,0 L 100,100 L 0,100 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={borderWidth}
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, pathLength],
                pathOffset: [0, -1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            />
          </svg>
        </motion.div>
      )}
      {children}
    </div>
  );
}