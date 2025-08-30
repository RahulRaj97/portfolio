import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { createAppTheme } from '../../styles/theme';

import Hero from '../sections/Hero';
import Scene from '../visuals/Scene';

export const Layout: React.FC = () => {
  const theme = createAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Scene />
        <Box component="main" sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <Hero />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
