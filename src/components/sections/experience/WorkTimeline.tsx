import { Box, Paper, Stack, Typography, Avatar, Button, Divider, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

import { WORK } from '@/data/resume';
import { formatMonthRange, getTechFromBullets, summarizeBullets } from '@/components/sections/experience/utils';

interface WorkTimelineProps {
  filteredWork: typeof WORK;
  expanded: Record<string, boolean>;
  onToggleExpanded: (id: string) => void;
}

export function WorkTimeline({ filteredWork, expanded, onToggleExpanded }: WorkTimelineProps) {
  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        {/* spine */}
        <Box sx={{
          position: 'absolute',
          left: 18,
          top: 0,
          bottom: 0,
          width: 4,
          background: 'linear-gradient(180deg, var(--color-primary-500), var(--color-secondary-500))',
          borderRadius: 2,
          opacity: 0.9
        }} />
        {filteredWork.map((work, index) => {
          const id = `${work.company}-${work.start}`;
          const isOpen = !!expanded[id];
          const summary = summarizeBullets(work.bullets);
          const rest = work.bullets.slice(summary.length);
          const tech = getTechFromBullets(work.bullets);
          
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Box sx={{ display: 'flex', position: 'relative', mb: 4 }}>
                {/* node */}
                <Box sx={{
                  position: 'absolute',
                  left: 18,
                  top: 28,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                  border: '4px solid white',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.12), 0 0 0 6px rgba(245,158,11,0.08)',
                  zIndex: 2
                }} />
                <Box sx={{ ml: '48px', width: '100%' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.94)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 18px 36px rgba(0,0,0,0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0, height: 3,
                        background: 'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))'
                      }
                    }}
                  >
                    {/* header */}
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                      <Avatar sx={{ bgcolor: 'var(--color-primary-500)', width: 44, height: 44 }}>
                        <Building2 size={20} color="white" />
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                          {work.role}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--color-primary-700)', fontWeight: 700 }}>
                          {work.company}
                        </Typography>
                      </Box>
                      <Stack spacing={0.5} alignItems="flex-end">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Calendar size={14} color="var(--color-neutral-500)" />
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            {formatMonthRange(work.start, work.end)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MapPin size={14} color="var(--color-neutral-500)" />
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            {work.location}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>

                    {/* summary bullets */}
                    <Box sx={{ mb: rest.length ? 1.25 : 0 }}>
                      {summary.map((s, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            lineHeight: 1.6,
                            pl: 2,
                            position: 'relative',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              top: '10px',
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: 'var(--color-primary-400)',
                            }
                          }}
                        >
                          {s}
                        </Typography>
                      ))}
                    </Box>

                    {/* expand */}
                    {rest.length > 0 && (
                      <Box sx={{ mb: 1.25 }}>
                        <Button
                          size="small"
                          onClick={() => onToggleExpanded(id)}
                          endIcon={isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          sx={{ borderRadius: 2, fontWeight: 700 }}
                        >
                          {isOpen ? 'Hide details' : `Show ${rest.length} more`}
                        </Button>
                        {isOpen && (
                          <Box sx={{ mt: 1 }}>
                            {rest.map((s, i) => (
                              <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.75, pl: 2 }}>
                                • {s}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                    )}

                    {/* tech */}
                    {tech.length > 0 && (
                      <>
                        <Divider sx={{ my: 1.5 }} />
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {tech.map(t => (
                            <Chip
                              key={t}
                              label={t}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: 'var(--color-primary-300)',
                                color: 'var(--color-primary-700)',
                                height: 24,
                                fontWeight: 600,
                              }}
                            />
                          ))}
                        </Stack>
                      </>
                    )}
                  </Paper>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
