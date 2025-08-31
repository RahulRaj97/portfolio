import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { createAppTheme } from '@/styles/theme';

import Scene from '@/components/visuals/Scene';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import CommandPalette from '@/components/common/CommandPalette';

export const Layout: React.FC = () => {
  const theme = createAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Scene />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Box component="main" sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <Hero />
          <Experience />
          <Projects />
          <Contact />
        </Box>
      </Box>
      <CommandPalette />
    </ThemeProvider>
  );
};

export default Layout;
