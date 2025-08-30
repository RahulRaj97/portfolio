import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createAppTheme } from '../../styles/theme';

import Scene from '../visuals/Scene';
import Hero from '../sections/Hero';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import CommandPalette from '../common/CommandPalette';

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

      {/* Spotlight / Command Palette */}
      <CommandPalette />
    </ThemeProvider>
  );
};

export default Layout;
