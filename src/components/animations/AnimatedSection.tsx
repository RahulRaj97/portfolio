import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Box, type BoxProps } from '@mui/material';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedSectionProps extends Omit<BoxProps, 'component'> {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

const defaultVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  variants = defaultVariants,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  rootMargin = '-50px',
  ...boxProps
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin
  });

  const customVariants: Variants = {
    hidden: variants.hidden || defaultVariants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <Box
      ref={ref}
      {...boxProps}
    >
      <motion.div
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={customVariants}
      >
        {children}
      </motion.div>
    </Box>
  );
};
