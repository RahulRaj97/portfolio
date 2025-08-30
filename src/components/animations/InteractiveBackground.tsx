import { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCursorPosition } from '../../hooks/useCursorPosition';

interface InteractiveBackgroundProps {
  children: React.ReactNode;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ children }) => {
  const { x: cursorX, y: cursorY, isMoving } = useCursorPosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  // Create cursor-following particles
  const createParticle = useCallback(() => {
    if (!particlesRef.current) return;

    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--color-primary-400);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.6;
    `;

    // Position particle near cursor
    particle.style.left = `${cursorX + (Math.random() - 0.5) * 20}px`;
    particle.style.top = `${cursorY + (Math.random() - 0.5) * 20}px`;

    particlesRef.current.appendChild(particle);

    // Animate particle
    const animation = particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)',
        opacity: 0.6
      },
      { 
        transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`,
        opacity: 0
      }
    ], {
      duration: 2000 + Math.random() * 1000,
      easing: 'ease-out'
    });

    animation.onfinish = () => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    };
  }, [cursorX, cursorY]);

  // Create click ripple effect
  const createRipple = useCallback((event: MouseEvent) => {
    if (!containerRef.current) return;

    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border: 2px solid var(--color-primary-300);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
      left: ${event.clientX}px;
      top: ${event.clientY}px;
      transform: translate(-50%, -50%);
    `;

    containerRef.current.appendChild(ripple);

    const animation = ripple.animate([
      { 
        width: '0px',
        height: '0px',
        opacity: 1
      },
      { 
        width: '200px',
        height: '200px',
        opacity: 0
      }
    ], {
      duration: 1000,
      easing: 'ease-out'
    });

    animation.onfinish = () => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    };
  }, []);

  // Create morphing shapes
  const createMorphingShape = useCallback(() => {
    if (!shapesRef.current) return;

    const shape = document.createElement('div');
    const shapeType = Math.random() > 0.5 ? 'circle' : 'square';
    
    shape.className = 'morphing-shape';
    shape.style.cssText = `
      position: absolute;
      width: ${20 + Math.random() * 40}px;
      height: ${20 + Math.random() * 40}px;
      background: var(--color-secondary-200);
      border-radius: ${shapeType === 'circle' ? '50%' : '0'};
      pointer-events: none;
      z-index: 0;
      opacity: 0.3;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;

    shapesRef.current.appendChild(shape);

    // Morph the shape
    const morphAnimation = shape.animate([
      { 
        borderRadius: shapeType === 'circle' ? '50%' : '0',
        transform: 'rotate(0deg) scale(1)'
      },
      { 
        borderRadius: shapeType === 'circle' ? '0' : '50%',
        transform: 'rotate(180deg) scale(1.2)'
      },
      { 
        borderRadius: shapeType === 'circle' ? '50%' : '0',
        transform: 'rotate(360deg) scale(1)'
      }
    ], {
      duration: 8000 + Math.random() * 4000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });

    // Fade in/out
    const fadeAnimation = shape.animate([
      { opacity: 0 },
      { opacity: 0.3 },
      { opacity: 0 }
    ], {
      duration: 12000 + Math.random() * 8000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });

    // Clean up after a while
    setTimeout(() => {
      if (shape.parentNode) {
        shape.parentNode.removeChild(shape);
      }
    }, 20000);
  }, []);

  // Effects
  useEffect(() => {
    if (isMoving) {
      createParticle();
    }
  }, [isMoving, createParticle]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => createRipple(event);
    document.addEventListener('click', handleClick);
    
    return () => document.removeEventListener('click', handleClick);
  }, [createRipple]);

  useEffect(() => {
    // Create initial shapes
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createMorphingShape(), i * 1000);
    }

    // Continue creating shapes
    const interval = setInterval(createMorphingShape, 3000);
    
    return () => clearInterval(interval);
  }, [createMorphingShape]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Morphing shapes layer */}
      <div ref={shapesRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      
      {/* Cursor particles layer */}
      <div ref={particlesRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      
      {/* Dynamic gradient background */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 50%, var(--color-secondary-50) 100%)',
          zIndex: -1,
        }}
        animate={{
          background: [
            'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 50%, var(--color-secondary-50) 100%)',
            'linear-gradient(135deg, var(--color-secondary-50) 0%, var(--color-primary-50) 50%, var(--color-primary-100) 100%)',
            'linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-secondary-50) 50%, var(--color-primary-50) 100%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      {children}
    </div>
  );
};
