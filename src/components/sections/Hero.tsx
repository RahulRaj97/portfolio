import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Globe, Code } from 'lucide-react';

import SocialIcons from '../common/SocialIcons';

const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const cx = useTransform(mouseX, (v) => (containerRef.current ? (v - containerRef.current.clientWidth / 2) / (containerRef.current.clientWidth / 2) : 0));
  const cy = useTransform(mouseY, (v) => (containerRef.current ? (v - containerRef.current.clientHeight / 2) / (containerRef.current.clientHeight / 2) : 0));

  const layer = (factor: number) => ({
    x: useSpring(useTransform(cx, (n) => n * factor), { stiffness: 120, damping: 18 }),
    y: useSpring(useTransform(cy, (n) => n * factor), { stiffness: 120, damping: 18 }),
  });

  const l1 = layer(12);
  const l2 = layer(20);
  const l3 = layer(32);

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
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div style={{ position: 'absolute', left: '15%', top: '20%', ...l1 }}>
          <Dot icon={<Globe size={16} color="var(--color-primary-600)" />} bg="var(--color-primary-200)" />
        </motion.div>
        <motion.div style={{ position: 'absolute', left: '70%', top: '28%', ...l2 }}>
          <Dot icon={<Code size={16} color="var(--color-secondary-700)" />} bg="var(--color-secondary-200)" />
        </motion.div>
        <motion.div style={{ position: 'absolute', left: '30%', top: '70%', ...l3 }}>
          <Square bg="var(--color-secondary-100)" />
        </motion.div>
        <motion.div style={{ position: 'absolute', left: '80%', top: '65%', ...l2 }}>
          <Square bg="var(--color-primary-100)" />
        </motion.div>
      </Box>

      <motion.div style={{ position: 'absolute', x: useSpring(useTransform(cx, n => n * 40)), y: useSpring(useTransform(cy, n => n * 40)), zIndex: 1, pointerEvents: 'none' }}>
        <Box sx={{ width: 100, height: 100, borderRadius: '50%', border: '1.5px solid rgba(245,158,11,0.35)', opacity: 0.6, position: 'absolute', top: -50, left: -50 }} />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 4, lg: 8 }, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <Box sx={{ position: 'absolute', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', borderRadius: '16px', zIndex: 0, opacity: 0.4 }} />
              <Box
                component="img"
                src="/profile_picture.jpeg"
                alt="Rahul Raj - Full Stack Developer"
                sx={{
                  width: { xs: '280px', sm: '320px', md: '360px' },
                  height: { xs: '280px', sm: '320px', md: '360px' },
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '4px solid white',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Box>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}>
            <Typography variant="h1" component="h1" sx={{ mb: 3, color: 'text.primary', fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }, lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.025em' }}>
              From <span style={{ color: 'var(--color-primary-600)' }}>Ideas</span> to <span style={{ color: 'var(--color-secondary-600)' }}>Reality</span>
            </Typography>

            <Typography variant="h2" component="h2" sx={{ mb: 5, color: 'text.secondary', fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, fontWeight: 400, lineHeight: 1.4 }}>
              I build clean, scalable products—fast. Frontend, APIs, and DevOps that turn complex challenges into elegant solutions.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 6 }}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button variant="contained" size="large" href="#contact" sx={{ px: 5, py: 2, fontSize: '1.125rem', fontWeight: 600, minWidth: 180, borderRadius: 2 }}>
                  Let's Work Together
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outlined" size="large" href="#projects" sx={{ px: 5, py: 2, fontSize: '1.125rem', fontWeight: 600, minWidth: 180, borderRadius: 2, borderWidth: 1.5 }}>
                  View My Work
                </Button>
              </motion.div>
            </Stack>

            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem', mb: 2, fontWeight: 500 }}>
              Connect with me
            </Typography>
            <SocialIcons />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

function Dot({ icon, bg }: { icon: React.ReactNode; bg: string }) {
  return (
    <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.65, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {icon}
    </Box>
  );
}

function Square({ bg }: { bg: string }) {
  return <Box sx={{ width: 36, height: 36, borderRadius: '8px', background: bg, opacity: 0.55, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />;
}

export default Hero;
