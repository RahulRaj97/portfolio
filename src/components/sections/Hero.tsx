import { Box } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { Aurora } from '@/components/sections/hero';
import { HeroContent } from '@/components/sections/hero';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const nx = useTransform(mx, (v) => {
    const w = containerRef.current?.clientWidth ?? 1;
    return (v - w / 2) / (w / 2);
  });
  const ny = useTransform(my, (v) => {
    const h = containerRef.current?.clientHeight ?? 1;
    return (v - h / 2) / (h / 2);
  });

  const spring = (val: any, fac: number) =>
    useSpring(useTransform(val, (n: number) => n * fac), { stiffness: 120, damping: 18 });

  return (
    <Box
      ref={containerRef}
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Aurora nx={nx} ny={ny} />

      <motion.div style={{ position: 'absolute', x: spring(nx, 40), y: spring(ny, 40), zIndex: 1, pointerEvents: 'none' }}>
        <Box sx={{ width: 110, height: 110, borderRadius: '50%', border: '1.5px solid rgba(245,158,11,0.35)', opacity: 0.55, position: 'absolute', top: -55, left: -55 }} />
      </motion.div>

      <HeroContent />
    </Box>
  );
}


