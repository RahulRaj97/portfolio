import { Box } from '@mui/material';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AuroraProps {
  nx: any;
  ny: any;
}

export function Aurora({ nx, ny }: AuroraProps) {
  const ax = useSpring(useTransform(nx, (n: number) => n * 20), { stiffness: 90, damping: 16 });
  const ay = useSpring(useTransform(ny, (n: number) => n * 16), { stiffness: 90, damping: 16 });

  return (
    <motion.div
      style={{ x: ax, y: ay }}
      aria-hidden
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            `
            radial-gradient(900px 320px at 10% 10%, rgba(245,158,11,0.12), transparent 60%),
            radial-gradient(900px 320px at 90% 18%, rgba(20,184,166,0.10), transparent 60%)
            `,
          backgroundRepeat: 'no-repeat',
          filter: 'blur(30px)',
        }}
      />
    </motion.div>
  );
}
