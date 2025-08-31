import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
}

export function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.3 });
  const dy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.2);
    y.set(my * 0.2);
  };
  
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref} 
      style={{ display: 'inline-block', x: dx, y: dy }} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
