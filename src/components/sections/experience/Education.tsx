import { Box, Paper, Stack, Typography, Avatar, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Award } from 'lucide-react';

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
              <Avatar 
                sx={{ 
                  width: 42, 
                  height: 42,
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'var(--color-secondary-500)'
                }}
              >
                <Box
                  component="img"
                  src="giki.jpeg"
                  alt="GIKI logo"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
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

            <Stack direction="row" spacing={2} sx={{ color: 'text.secondary', mb: 1.5 }}>
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
              {edu.website && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Link 
                    href={edu.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'var(--color-primary-600)', 
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      border: '1px solid var(--color-primary-300)',
                      backgroundColor: 'rgba(245, 158, 11, 0.08)',
                      '&:hover': { 
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        borderColor: 'var(--color-primary-400)'
                      }
                    }}
                  >
                    <ExternalLink size={12} />
                    Website
                  </Link>
                </Stack>
              )}
            </Stack>
            
            {edu.achievements && edu.achievements.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Award size={14} color="var(--color-secondary-600)" />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--color-secondary-700)' }}>
                    Key Achievements
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {edu.achievements.map((achievement, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        pl: 2,
                        position: 'relative',
                        lineHeight: 1.5,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '8px',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'var(--color-secondary-400)',
                        }
                      }}
                    >
                      {achievement}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
        ))}
      </Stack>
    </motion.div>
  );
}
