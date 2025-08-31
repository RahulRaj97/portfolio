import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { Typewriter } from './Typewriter';
import { Magnetic } from './Magnetic';
import { StatCard } from './StatCard';
import { TechStack } from './TechStack';
import { KeyStrengths } from './KeyStrengths';
import SocialIcons from '@/components/common/SocialIcons';

const WORDS = ['Ideas', 'Products', 'Revenue', 'Reality'];

const STAT_ITEMS = [
  { k: 'Full-Stack', v: 'React • Node • Python' },
  { k: 'Cloud Native', v: 'Kubernetes • Docker • GCP' },
  { k: 'Data & AI', v: 'Analytics • ML • Automation' },
];

export function HeroContent() {
  return (
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '0.95fr 1.1fr' },
          gap: { xs: 6, lg: 10 },
          alignItems: 'center',
        }}
      >
        {/* Left: photo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <PhotoCard />
        </motion.div>

        {/* Right: headline + CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: 24 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
            <Sparkles size={18} color="var(--color-accent-amber)" />
            <Chip label="Available for new projects" color="primary" variant="outlined" size="small" sx={{ borderRadius: 999 }} />
          </Stack>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 1.5,
              fontSize: { xs: '2.6rem', sm: '3.1rem', md: '3.6rem' },
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: '-0.025em',
            }}
          >
            Build <Typewriter words={WORDS} /> with a{' '}
            <span style={{ color: 'var(--color-secondary-600)' }}>Full-Stack Engineer</span>
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 4, color: 'text.secondary', fontSize: { xs: '1.18rem', sm: '1.35rem', md: '1.55rem' }, maxWidth: 720 }}
          >
            I ship clean, scalable products—fast. From concept to launch, I turn complex challenges into elegant, human-friendly solutions.
          </Typography>

          {/* Magnetic CTAs */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mb: 5 }}>
            <Magnetic>
              <Button variant="contained" size="large" href="#contact" sx={{ px: 5, py: 2, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2 }}>
                Let's Work Together
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outlined" size="large" href="#projects" sx={{ px: 5, py: 2, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, borderWidth: 1.5 }}>
                View My Work
              </Button>
            </Magnetic>
          </Stack>

          {/* Stats */}
          <StatCard items={STAT_ITEMS} />

          {/* Tech stack showcase */}
          <TechStack />

          {/* Key strengths */}
          <KeyStrengths />

          {/* Social icons centered */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <SocialIcons />
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}

// Import PhotoCard here to avoid circular dependency
import { PhotoCard } from './PhotoCard';
