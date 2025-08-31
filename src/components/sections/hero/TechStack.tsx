import { Box, Chip, Stack, Typography } from '@mui/material';

const TECH_STACK = ['TypeScript', 'React', 'Angular', 'Node.js', 'Python', 'Kubernetes', 'Docker', 'GCP'];

export function TechStack() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
        Tech Stack
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {TECH_STACK.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'var(--color-secondary-300)',
              color: 'var(--color-secondary-700)',
              '&:hover': {
                borderColor: 'var(--color-secondary-500)',
                backgroundColor: 'var(--color-secondary-50)',
                transform: 'translateY(-1px)',
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
