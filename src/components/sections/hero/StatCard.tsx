import { Paper, Stack, Typography, Divider } from '@mui/material';

interface StatItem {
  k: string;
  v: string;
}

interface StatCardProps {
  items: StatItem[];
}

export function StatCard({ items }: StatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 2,
        border: (t) => `1px solid ${t.palette.divider}`,
        backgroundColor: 'rgba(255,255,255,0.7)',
        display: 'flex',
        gap: { xs: 2, md: 3 },
        flexWrap: 'wrap',
        alignItems: 'stretch',
      }}
    >
      {items.map((it, i) => (
        <Stack key={it.k} spacing={0.25} sx={{ minWidth: 140 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.01em' }}>
            {it.k}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {it.v}
          </Typography>
          {i < items.length - 1 && (
            <Divider
              flexItem
              orientation="vertical"
              sx={{ display: { xs: 'none', md: 'block' }, ml: 2 }}
            />
          )}
        </Stack>
      ))}
    </Paper>
  );
}
