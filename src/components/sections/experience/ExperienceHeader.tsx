import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export function ExperienceHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '2.8rem' },
            lineHeight: 1.1,
          }}
        >
          Experience &{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Impact
          </span>
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 760, mx: 'auto' }}>
          From Karachi to Munich, I've shipped production software across frontend, platforms, and data—always with a product mindset.
        </Typography>
      </Box>
    </motion.div>
  );
}
