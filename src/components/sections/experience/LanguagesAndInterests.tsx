import { Box, Paper, Stack, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Heart, Languages } from 'lucide-react';

import { LANGUAGES, INTERESTS } from '@/data/resume';

export function LanguagesAndInterests() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1 }}
    >
      {/* Languages Section */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Languages size={18} color="var(--color-primary-600)" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-primary-700)' }}>
            Languages
          </Typography>
        </Stack>
        
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.94)',
            border: '1px solid rgba(255,255,255,0.4)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <Stack spacing={1.5}>
            {LANGUAGES.map((lang, idx) => (
              <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {lang.language}
                </Typography>
                <Chip
                  label={lang.level}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: lang.level === 'Native' ? 'var(--color-primary-300)' : 'var(--color-secondary-300)',
                    color: lang.level === 'Native' ? 'var(--color-primary-700)' : 'var(--color-secondary-700)',
                    backgroundColor: lang.level === 'Native' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(99, 102, 241, 0.08)',
                    height: 22,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Box>

      {/* Interests Section */}
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Heart size={18} color="var(--color-secondary-600)" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-secondary-700)' }}>
            Interests
          </Typography>
        </Stack>
        
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.94)',
            border: '1px solid rgba(255,255,255,0.4)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {INTERESTS.map((interest, idx) => (
              <Chip
                key={idx}
                label={interest}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'var(--color-secondary-300)',
                  color: 'var(--color-secondary-700)',
                  backgroundColor: 'rgba(99, 102, 241, 0.08)',
                  height: 26,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    borderColor: 'var(--color-secondary-400)'
                  }
                }}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
    </motion.div>
  );
}
