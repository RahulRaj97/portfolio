import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createAppTheme } from '../../styles/theme';
import { globalStyles } from '../../styles/globalStyles';
import { Global } from '@emotion/react';
import Hero from '../sections/Hero';
import Footer from './Footer';

export const Layout: React.FC = () => {
  const theme = createAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />

      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box component="main" sx={{ flex: 1 }}>
          <Hero />
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};
