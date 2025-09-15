import { Box } from '@mui/material';
import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';

interface AuroraProps {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}

export function Aurora({ nx, ny }: AuroraProps) {
  const ax = useSpring(useTransform(nx, (n: number) => n * 20), { stiffness: 90, damping: 16 });
  const ay = useSpring(useTransform(ny, (n: number) => n * 16), { stiffness: 90, damping: 16 });

  return (
    <motion.div style={{ x: ax, y: ay }} aria-hidden>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            `
            radial-gradient(1200px 420px at 8% 12%, rgba(245,158,11,0.16), transparent 60%),
            radial-gradient(1000px 360px at 88% 18%, rgba(20,184,166,0.14), transparent 62%),
            radial-gradient(800px 300px at 50% 90%, rgba(59,130,246,0.10), transparent 65%),
            radial-gradient(1200px 600px at 50% -10%, rgba(250,204,21,0.06), transparent 70%)
            `,
          backgroundRepeat: 'no-repeat',
          filter: 'blur(32px) saturate(1.05)',
        }}
      />
    </motion.div>
  );
}
