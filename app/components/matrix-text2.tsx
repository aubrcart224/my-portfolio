'use client'
import React, { useEffect, useRef } from 'react';

interface MatrixText2Props {
    children: React.ReactNode;
}

const MatrixText2: React.FC<MatrixText2Props> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let messageIndex = 0;
        let charIndex = 0;
        const message = children?.toString() || '';

        const typeEffect = () => {
            if (charIndex < message.length) {
                container.textContent = message.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeEffect, 50);
            }
        };

        typeEffect();

        return () => {
            container.textContent = '';
        };
    }, [children]);

    return (
        <div 
            ref={containerRef} 
            style={{
                fontFamily: 'Courier New, monospace',
                color: '#00ff00',
                whiteSpace: 'pre'
            }}
        />
    );
};

export default MatrixText2;
