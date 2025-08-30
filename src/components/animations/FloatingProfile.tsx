import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface FloatingProfileProps {
  imageSrc: string;
  alt: string;
}

export const FloatingProfile: React.FC<FloatingProfileProps> = ({ imageSrc, alt }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        mb: 4,
      }}
    >
      {/* Glow effect behind the image */}
      <motion.div
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-primary-200) 0%, transparent 70%)',
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Main profile image */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.5
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={alt}
          sx={{
            width: { xs: '200px', sm: '240px', md: '280px' },
            height: { xs: '200px', sm: '240px', md: '280px' },
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid white',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
          }}
        />
      </motion.div>
      
      {/* Floating accent elements around the image */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'var(--color-accent-gold)',
          zIndex: 2,
        }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: 'var(--color-accent-coral)',
          zIndex: 2,
        }}
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '25%',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--color-accent-lavender)',
          zIndex: 2,
        }}
        animate={{
          x: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </Box>
  );
};
