import { Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

import { Stat } from '@/components/sections/experience/Stat';

interface ExperienceStatsProps {
  yearsLabel: string;
  workCount: number;
  countries: string[];
  techTop: [string, number][];
}

export function ExperienceStats({ yearsLabel, workCount, countries, techTop }: ExperienceStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 5,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.86)',
          border: '1px solid rgba(255,255,255,0.35)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" alignItems="center" justifyContent="center">
          <Stat label="Experience" value={yearsLabel} />
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          <Stat label="Companies" value={`${workCount}`} />
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          <Stat label="Regions" value={countries.join(' • ') || '—'} />
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Flame size={16} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>Top tech:</Typography>
            {techTop.map(([t]) => (
              <Chip
                key={t}
                label={t}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'var(--color-primary-300)',
                  color: 'var(--color-primary-700)',
                  height: 24,
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </motion.div>
  );
}
