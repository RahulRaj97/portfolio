import { Box } from '@mui/material';

export function PhotoCard() {
  return (
    <Box sx={{ position: 'relative', width: { xs: 320, sm: 360, md: 420 }, height: { xs: 320, sm: 360, md: 420 } }}>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 28px 56px rgba(0,0,0,0.16)',
          border: '4px solid white',
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box
          component="img"
          src="/profile_picture.jpeg"
          alt="Rahul Raj - Full Stack Developer"
          loading="lazy"
          decoding="async"
          fetchPriority="auto"
          sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
}
