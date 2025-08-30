import { useCallback } from 'react';
import { AppBar, Toolbar, Typography, useTheme, useMediaQuery, Box } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';

const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { scrollY } = useScroll();

  // Subtle scroll transforms
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']
  );

  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.1)']
  );

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        backgroundColor: headerBackground,
        borderBottom: `1px solid ${headerBorder}`,
        backdropFilter: 'blur(20px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          py: 1,
          px: { xs: 2, md: 3 }
        }}>
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ cursor: 'pointer' }}
            onClick={handleLogoClick}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                variant="h5"
                component="span"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}
              >
                Rahul Raj
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  mt: 0.5,
                }}
              >
                Full-Stack Developer
              </Typography>
            </Box>
          </motion.div>

          {/* Navigation */}
          {isMobile ? (
            <MobileMenu items={navigationItems} />
          ) : (
            <NavigationMenu items={navigationItems} />
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
