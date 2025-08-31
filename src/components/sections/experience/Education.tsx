import { Box, Paper, Stack, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';

import { EDUCATION } from '@/data/resume';
import { formatMonthRange } from '@/components/sections/experience/utils';

export function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.05 }}
    >
      <Typography variant="h3" sx={{ mb: 2.5, fontWeight: 800 }}>
        Education
      </Typography>

      <Stack spacing={2.5}>
        {EDUCATION.map((edu, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.94)',
              border: '1px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Avatar sx={{ bgcolor: 'var(--color-secondary-500)', width: 42, height: 42 }}>
                <GraduationCap size={18} color="white" />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  {edu.degree}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-secondary-700)', fontWeight: 700 }}>
                  {edu.institution}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ color: 'text.secondary' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Calendar size={14} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {formatMonthRange(edu.start, edu.end)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <MapPin size={14} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {edu.location}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </motion.div>
  );
}
