import React from 'react';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/rahulraj97',
      label: 'LinkedIn',
      color: '#0077B5'
    },
    {
      icon: Mail,
      href: 'mailto:rahule.lohana97@gmail.com',
      label: 'Email',
      color: '#EA4335'
    },
    {
      icon: Github,
      href: 'https://github.com/yourusername',
      label: 'GitHub',
      color: '#333'
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-primary-300) 100%)',
          py: 6,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 0 },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ cursor: 'pointer' }}
            >
              <Typography
                variant="h5"
                component="span"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  fontFamily: 'Poppins, sans-serif',
                  display: 'block',
                }}
              >
                Rahul Raj
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Bringing your ideas to life
              </Typography>
            </motion.div>

            <Stack direction="row" spacing={2}>
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      component="a"
                      href={social.href}
                      target={social.label !== 'Email' ? '_blank' : undefined}
                      rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      sx={{
                        color: social.color,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <social.icon size={24} />
                    </IconButton>
                  </motion.div>
                </motion.div>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              pt: 3,
              borderTop: (theme) => `1px solid ${theme.palette.primary.main}20`,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              &copy; {new Date().getFullYear()} Rahul Raj. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </motion.footer>
  );
};

export default Footer;
