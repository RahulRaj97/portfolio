import { Box, Stack, Typography } from '@mui/material';

const STRENGTHS = [
  { title: 'Rapid Prototyping', color: 'var(--color-primary-500)' },
  { title: 'Scalable Architecture', color: 'var(--color-secondary-500)' },
  { title: 'Performance Focus', color: 'var(--color-primary-500)' },
  { title: 'Clean Code', color: 'var(--color-secondary-500)' },
];

export function KeyStrengths() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
        What I Bring
      </Typography>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            p: 2.5, 
            borderRadius: 2, 
            background: 'rgba(245,158,11,0.05)', 
            border: '1px solid rgba(245,158,11,0.1)', 
            flex: 1 
          }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: STRENGTHS[0].color }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {STRENGTHS[0].title}
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            p: 2.5, 
            borderRadius: 2, 
            background: 'rgba(20,184,166,0.05)', 
            border: '1px solid rgba(20,184,166,0.1)', 
            flex: 1 
          }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: STRENGTHS[1].color }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {STRENGTHS[1].title}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            p: 2.5, 
            borderRadius: 2, 
            background: 'rgba(245,158,11,0.05)', 
            border: '1px solid rgba(245,158,11,0.1)', 
            flex: 1 
          }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: STRENGTHS[2].color }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {STRENGTHS[2].title}
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            p: 2.5, 
            borderRadius: 2, 
            background: 'rgba(20,184,166,0.05)', 
            border: '1px solid rgba(20,184,166,0.1)', 
            flex: 1 
          }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: STRENGTHS[3].color }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {STRENGTHS[3].title}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
