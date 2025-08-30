import { Box, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ABOUT } from '../../data/resume';

export default function About() {
  return (
    <Box id="about" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Typography variant="h2" align="center" sx={{ mb: 3 }}>
            About Me
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            {ABOUT.intro}
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: theme => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5" sx={{ mb: 2 }}>What I’m great at</Typography>
              <List dense>
                {ABOUT.highlights.map((h) => (
                  <ListItem key={h} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircle2 size={18} color="var(--color-secondary-600)" /></ListItemIcon>
                    <ListItemText primary={h} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: theme => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5" sx={{ mb: 2 }}>How I work</Typography>
              <Typography variant="body2" color="text.secondary">
                Pragmatic, product-minded, and obsessed with developer experience. I ship in small iterations, keep scope honest, and invest in strong foundations (tests, accessibility, CI/CD).
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
