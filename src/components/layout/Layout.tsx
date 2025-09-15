import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Suspense, lazy, useMemo } from 'react';

import { createAppTheme } from '@/styles/theme';
import Scene from '@/components/visuals/Scene';
import Hero from '@/components/sections/Hero';

const Experience = lazy(() => import('@/components/sections/Experience'));
const Papers = lazy(() => import('@/components/sections/Papers'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Contact = lazy(() => import('@/components/sections/Contact'));

function SectionSkeleton() {
  return (
    <Box
      sx={{
        height: { xs: 320, md: 480 },
        opacity: 0.35,
        bgcolor: 'rgba(0,0,0,.04)',
        borderRadius: 2,
        m: 2,
      }}
    />
  );
}

export const Layout: React.FC = () => {
  const theme = useMemo(() => createAppTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Scene />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box component="main" sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <Hero />
          <Suspense fallback={<SectionSkeleton />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Papers />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
