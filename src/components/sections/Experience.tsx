
import { Box, Container, Typography } from '@mui/material';
import { AnimatedSection } from '../animations/AnimatedSection';

const Experience: React.FC = () => {
  return (
    <Box
      id="experience"
      sx={{
        py: 8,
        background: 'var(--color-primary-50)',
      }}
    >
      <Container maxWidth="lg">
        <AnimatedSection>
          <Typography variant="h2" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Experience
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            This section will showcase Rahul's work experience and achievements.
          </Typography>
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default Experience;
