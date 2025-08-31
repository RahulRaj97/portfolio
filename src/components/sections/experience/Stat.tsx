import { Stack, Typography } from '@mui/material';

interface StatProps {
  label: string;
  value: string;
}

export function Stat({ label, value }: StatProps) {
  return (
    <Stack spacing={0} sx={{ minWidth: 140, textAlign: 'center' }}>
      <Typography variant="overline" sx={{ letterSpacing: '0.06em', color: 'text.secondary', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 900 }}>{value}</Typography>
    </Stack>
  );
}
