import { Box, Paper, Stack, Typography, Chip, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

interface SkillPulseProps {
  techTop: [string, number][];
}

export function SkillPulse({ techTop }: SkillPulseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.15 }}
    >
      <Typography variant="h3" sx={{ mt: 5, mb: 2, fontWeight: 800 }}>
        Skill Pulse
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.94)',
          border: '1px solid rgba(255,255,255,0.4)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
          Most frequent technologies across roles:
        </Typography>
        <Stack spacing={1.25}>
          {techTop.map(([tech, count]) => (
            <Stack key={tech} direction="row" spacing={1} alignItems="center">
              <Tooltip title={`${count} appearance${count > 1 ? 's' : ''} across roles`}>
                <Box
                  aria-hidden
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 999,
                    background:
                      'linear-gradient(90deg, var(--color-primary-200), var(--color-secondary-200))',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: `${Math.min(100, count * 40)}%`,
                      background:
                        'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))',
                    }}
                  />
                </Box>
              </Tooltip>
              <Chip
                label={`${tech}`}
                size="small"
                sx={{ fontWeight: 700, height: 24 }}
                variant="outlined"
              />
            </Stack>
          ))}
        </Stack>
      </Paper>
    </motion.div>
  );
}
