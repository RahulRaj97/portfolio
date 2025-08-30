import { motion } from 'framer-motion';
import { Box, type BoxProps } from '@mui/material';

interface FloatingElementProps extends Omit<BoxProps, 'component'> {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  xRange?: number;
  yRange?: number;
  rotationRange?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  size = 40,
  color = 'var(--color-primary-200)',
  delay = 0,
  duration = 6,
  xRange = 20,
  yRange = 20,
  rotationRange = 10,
  ...boxProps
}) => {
  return (
    <Box
      position="absolute"
      width={size}
      height={size}
      borderRadius="50%"
      sx={{ backgroundColor: color }}
      {...boxProps}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: color,
          opacity: 0.6,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: [0, xRange, 0],
          y: [0, -yRange, 0],
          rotate: [0, rotationRange, 0],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </Box>
  );
};
