import { Box, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/resume';

export default function Projects() {
  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Typography variant="h2" align="center" sx={{ mb: 6 }}>Projects</Typography>
        </motion.div>

        <Grid container spacing={3}>
          {PROJECTS.map((p, idx) => (
            <Grid item xs={12} md={4} key={p.title}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: idx * 0.05 }}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 2, border: theme => `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{p.blurb}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {p.tags.map(t => <Chip key={t} label={t} size="small" variant="outlined" />)}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
