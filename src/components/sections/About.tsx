
import { Box, Container, Typography } from '@mui/material';
import { AnimatedSection } from '../animations/AnimatedSection';

const About: React.FC = () => {
  return (
    <Box
      id="about"
      sx={{
        py: 8,
        background: 'var(--color-neutral-50)',
      }}
    >
      <Container maxWidth="lg">
        <AnimatedSection>
          <Typography variant="h2" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            About Me
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            This section will contain information about Rahul Raj and his approach to solving problems.
          </Typography>
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default About;
