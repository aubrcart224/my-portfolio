'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MatrixTextProps {
    children: string;
    delay?: number;
    className?: string;
}

const MatrixText = ({ children, delay = 0, className = '' }: MatrixTextProps) => {
    const [displayText, setDisplayText] = useState('');
    const [letterOpacities, setLetterOpacities] = useState<number[]>([]);
    const matrixChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~あいうえおかきくけこ';
    const textStyle = {
        color: '#ffffff',
        textShadow: '0 0 5pxrgb(255, 255, 255)',
        fontFamily: 'monospace',
    };

    useEffect(() => {
        let currentIndex = 0;
        let scrambleInterval: ReturnType<typeof setInterval>;
        
        // Initialize letter opacities
        setLetterOpacities(new Array(children.length).fill(1));

        const startAnimation = () => {
            setTimeout(() => {
                let iterations = 0;
                scrambleInterval = setInterval(() => {
                    setDisplayText(current => {
                        const scrambled = children.split('').map((char, index) => {
                            if (index < currentIndex) {
                                return char;
                            }
                            if (index === currentIndex && iterations > 5) {
                                return char;
                            }
                            return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                        }).join('');
                        
                        iterations++;
                        if (iterations > 8) {
                            iterations = 0;
                            currentIndex++;
                            if (currentIndex >= children.length) {
                                clearInterval(scrambleInterval);
                            }
                        }
                        return scrambled;
                    });
                }, 50);
            }, delay);
        };

        startAnimation();

        // Setup fade effect
        const fadeIntervals = children.split('').map((_, index) => 
            setInterval(() => {
                setLetterOpacities(prev => {
                    const newOpacities = [...prev];
                    newOpacities[index] = Math.random() * 0.4 + 0.6; // Keep opacity between 0.6 and 1.0
                    return newOpacities;
                });
            }, 650 + index * 100)
        );
        
        return () => {
            clearInterval(scrambleInterval);
            fadeIntervals.forEach(clearInterval);
        };
    }, [children, delay]);

    return (
        <span className={`inline-block ${className}`}>
            {displayText.split('').map((letter, index) => (
                <motion.span
                    key={`${index}-${letter}`}
                    style={textStyle}
                    animate={{ opacity: letterOpacities[index] }}
                    transition={{ duration: 0.5 }}
                >
                    {letter}
                </motion.span>
            ))}
        </span>
    );
};

export default MatrixText; 