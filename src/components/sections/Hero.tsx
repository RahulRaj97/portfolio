import { Box, Container, Typography, Button, Stack, IconButton } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Linkedin, Mail, Github, Globe, Code, Cloud } from 'lucide-react';

const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimized mouse tracking
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

  // Simple, working transforms
  const cursorX = useTransform(mouseX, [0, 800], [-20, 20]);
  const cursorY = useTransform(mouseY, [0, 600], [-20, 20]);

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
        background: 'var(--color-neutral-50)',
      }}
    >
      {/* Optimized Background - Only 8 elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* 4 Floating journey icons - Optimized */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`journey-${i}`}
            style={{
              position: 'absolute',
              left: `${25 + i * 25}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Box
              sx={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: i % 2 === 0 ? 'var(--color-primary-200)' : 'var(--color-secondary-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.6,
              }}
            >
              {i === 0 ? (
                <Globe size={16} color="var(--color-primary-600)" />
              ) : i === 1 ? (
                <Code size={16} color="var(--color-secondary-600)" />
              ) : i === 2 ? (
                <Cloud size={16} color="var(--color-accent-emerald)" />
              ) : (
                <Globe size={16} color="var(--color-primary-600)" />
              )}
            </Box>
          </motion.div>
        ))}

        {/* 4 Parallax shapes - Optimized */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`shape-${i}`}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              background: i % 2 === 0 ? 'var(--color-primary-100)' : 'var(--color-secondary-100)',
              borderRadius: i % 2 === 0 ? '50%' : '8px',
              left: `${15 + i * 30}%`,
              top: `${60 + i * 10}%`,
              opacity: 0.4,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </Box>

      {/* Working Cursor Follower */}
      <motion.div
        style={{
          position: 'absolute',
          x: cursorX,
          y: cursorY,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid var(--color-primary-200)',
            opacity: 0.3,
            position: 'absolute',
            top: '-60px',
            left: '-60px',
          }}
        />
      </motion.div>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 4, lg: 8 },
            alignItems: 'center',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {/* Left Side - Your Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              delay: 0.3
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/* Simple glow effect */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '360px',
                  height: '360px',
                  background: 'radial-gradient(circle, var(--color-primary-100) 0%, transparent 70%)',
                  borderRadius: '16px',
                  zIndex: 0,
                  opacity: 0.3,
                }}
              />
              
              {/* Main profile photo */}
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
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Box>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.5
            }}
          >
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.7
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 3,
                  color: 'text.primary',
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  lineHeight: 1.1,
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                }}
              >
                From <span style={{ color: 'var(--color-primary-600)' }}>Ideas</span> to <span style={{ color: 'var(--color-secondary-600)' }}>Reality</span>
              </Typography>
            </motion.div>
            
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.9
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 5,
                  color: 'text.secondary',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}
              >
                I'm a developer who believes in the power of clean code and creative solutions. 
                With international experience and a passion for building things that matter, 
                I turn complex challenges into elegant, scalable solutions.
              </Typography>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 1.1
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                sx={{ mb: 6 }}
              >
                <motion.div 
                  whileHover={{ y: -3 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    href="#contact"
                    sx={{
                      px: 5,
                      py: 2,
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      minWidth: 180,
                      borderRadius: 2,
                    }}
                  >
                    Let's Work Together
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -3 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    href="#projects"
                    sx={{
                      px: 5,
                      py: 2,
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      minWidth: 180,
                      borderRadius: 2,
                      borderWidth: 1.5,
                    }}
                  >
                    View My Work
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 1.3
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1rem',
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                Connect with me
              </Typography>
              
              <Stack direction="row" spacing={2}>
                {[
                  {
                    icon: Linkedin,
                    href: 'https://linkedin.com/in/rahulraj97',
                    label: 'LinkedIn',
                    color: '#0077B5'
                  },
                  {
                    icon: Github,
                    href: 'https://github.com/yourusername',
                    label: 'GitHub',
                    color: '#333'
                  },
                  {
                    icon: Mail,
                    href: 'mailto:rahule.lohana97@gmail.com',
                    label: 'Email',
                    color: '#EA4335'
                  }
                ].map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        component="a"
                        href={social.href}
                        target={social.label !== 'Email' ? '_blank' : undefined}
                        rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        sx={{
                          color: social.color,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid var(--color-neutral-200)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <social.icon size={24} />
                      </IconButton>
                    </motion.div>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
