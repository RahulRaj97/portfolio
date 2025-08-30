
import { Box, Container, Typography } from '@mui/material';
import { AnimatedSection } from '../animations/AnimatedSection';

const Projects: React.FC = () => {
  return (
    <Box
      id="projects"
      sx={{
        py: 8,
        background: 'var(--color-neutral-50)',
      }}
    >
      <Container maxWidth="lg">
        <AnimatedSection>
          <Typography variant="h2" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Projects
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            This section will showcase Rahul's portfolio of projects and solutions.
          </Typography>
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default Projects;
