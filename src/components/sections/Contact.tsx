import { Box, Button, Container, Stack, TextField, Typography, Paper, Chip, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Code, Sparkles, ArrowRight, Star, Clock, Users, Zap } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'rahule.lohana97@gmail.com',
      color: '#EA4335'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Germany',
      color: '#3B82F6'
    }
  ];

  const services = [
    { icon: Code, title: 'Full-Stack Development', description: 'End-to-end solutions' },
    { icon: Globe, title: 'Web Applications', description: 'Modern, responsive apps' },
    { icon: Zap, title: 'Performance Optimization', description: 'Lightning-fast experiences' },
    { icon: Users, title: 'Team Collaboration', description: 'Work with your existing team' }
  ];



  return (
    <Box 
      id="contact" 
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh'
      }}
    >

              
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, mb: 3, p: 2, borderRadius: 3, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Sparkles size={20} color="var(--color-primary-600)" />
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--color-primary-700)' }}>
                  Let's Create Something Amazing Together
                </Typography>
              </Box>
            </motion.div>

            <Typography 
              variant="h1" 
              sx={{ 
                mb: 3, 
                color: 'var(--color-neutral-900)', 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.1
              }}
            >
              Ready to Create Something
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Amazing Together?
              </span>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'var(--color-neutral-600)', 
                maxWidth: 700, 
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.4
              }}
            >
              I love turning ideas into reality. Whether you need a full-stack application, 
              want to optimize performance, or just want to brainstorm possibilities over coffee, 
              I'm excited to hear about your vision and help make it happen.
            </Typography>
          </Box>
        </motion.div>



        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
              What I Can Do For You
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center', 
                      borderRadius: 3, 
                      background: 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                        background: 'rgba(255,255,255,0.95)',
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, var(--color-primary-100), var(--color-secondary-100))',
                      mb: 3
                    }}>
                      <service.icon size={32} color="var(--color-primary-600)" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'var(--color-neutral-900)' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Main Contact Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6, alignItems: 'start' }}>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 5, 
                borderRadius: 3, 
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                height: 'fit-content',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
              }}
            >
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                Let's Connect
              </Typography>
              
              <Stack spacing={4}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Avatar sx={{ bgcolor: info.color, width: 56, height: 56, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                        <info.icon size={28} color="white" />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'var(--color-neutral-900)' }}>
                          {info.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                          {info.value}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Stack>


            </Paper>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 5, 
                borderRadius: 3, 
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
              }}
            >
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                Send Me a Message
              </Typography>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 3, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      mb: 3,
                      boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
                    }}>
                      <CheckCircle size={48} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, color: '#10B981', fontWeight: 600 }}>
                      Message Sent Successfully!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      Thank you for reaching out! I'll review your message and get back to you within 24 hours.
                    </Typography>
                  </Box>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <TextField
                        name="name"
                        label="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.8)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                          },
                        }}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.8)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                          },
                        }}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <TextField
                        name="subject"
                        label="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.8)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                          },
                        }}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <TextField
                        name="message"
                        label="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.8)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'var(--color-primary-500)',
                            },
                          },
                        }}
                      />
                    </motion.div>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        py: 2.5,
                        px: 5,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                        boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(245, 158, 11, 0.4)',
                        },
                        '&:disabled': {
                          background: 'rgba(245, 158, 11, 0.5)',
                          transform: 'none',
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 20, height: 20, border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                          Sending Message...
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Send size={20} />
                          Send Message
                          <ArrowRight size={18} />
                        </Box>
                      )}
                    </Button>
                  </Stack>
                </form>
              )}
            </Paper>
          </motion.div>
        </Box>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 6, 
                borderRadius: 3, 
                background: 'linear-gradient(135deg, rgba(245,158,11,0.05), rgba(20,184,166,0.05))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(245,158,11,0.1)',
                display: 'inline-block',
                maxWidth: 800,
                width: '100%'
              }}
            >
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                Ready to Start Your Project?
              </Typography>
              <Typography variant="h6" sx={{ color: 'var(--color-neutral-600)', mb: 4, fontWeight: 400, lineHeight: 1.5 }}>
                Let's discuss your ideas, explore possibilities, and create something extraordinary together. 
                I genuinely love hearing about new projects and I'm excited to learn about your vision!
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                <Chip label="React & Next.js" sx={{ background: 'rgba(245,158,11,0.1)', color: 'var(--color-primary-700)', border: '1px solid rgba(245,158,11,0.2)', fontWeight: 500 }} />
                <Chip label="Full-Stack Solutions" sx={{ background: 'rgba(20,184,166,0.1)', color: 'var(--color-secondary-700)', border: '1px solid rgba(20,184,166,0.2)', fontWeight: 500 }} />
                <Chip label="Cloud Architecture" sx={{ background: 'rgba(245,158,11,0.1)', color: 'var(--color-primary-700)', border: '1px solid rgba(245,158,11,0.2)', fontWeight: 500 }} />
                <Chip label="Performance & SEO" sx={{ background: 'rgba(20,184,166,0.1)', color: 'var(--color-secondary-700)', border: '1px solid rgba(20,184,166,0.2)', fontWeight: 500 }} />
              </Stack>
            </Paper>
          </Box>
        </motion.div>
      </Container>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
}
