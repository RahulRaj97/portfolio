
import { Box, Container, Typography } from '@mui/material';
import { AnimatedSection } from '../animations/AnimatedSection';

const Contact: React.FC = () => {
  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        background: 'var(--color-primary-50)',
      }}
    >
      <Container maxWidth="lg">
        <AnimatedSection>
          <Typography variant="h2" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Contact
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            This section will contain contact information and a contact form.
          </Typography>
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default Contact;
