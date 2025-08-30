import { Box, Container, Typography, Paper, Chip, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Code2, 
  Database, 
  Cloud, 
  Smartphone
} from 'lucide-react';
import { WORK, EDUCATION } from '../../data/resume';

export default function Experience() {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatRange = (start: string, end?: string) => {
    const startFormatted = formatDate(start);
    const endFormatted = end ? formatDate(end) : 'Present';
    return `${startFormatted} — ${endFormatted}`;
  };

  const getTechFromBullets = (bullets: string[]) => {
    const techKeywords = [
      'React', 'TypeScript', 'Angular', 'Node', 'Python', 'C++', 'Electron',
      'Kubernetes', 'Docker', 'GCP', 'MongoDB', 'Dgraph', 'Jenkins',
      'Airflow', 'Superset', 'Cypress', 'Vite', 'ROS', 'Ubuntu'
    ];
    
    const foundTech = techKeywords.filter(tech => 
      bullets.some(bullet => bullet.includes(tech))
    );
    
    return foundTech.slice(0, 4);
  };

  const getJobSummary = (bullets: string[]) => {
    const summaryPoints = bullets.slice(0, 3);
    return summaryPoints.map((point) => {
      let cleanPoint = point.replace(/^Core contributor on /, 'Leading development of ');
      cleanPoint = cleanPoint.replace(/^Enhanced /, 'Improved ');
      cleanPoint = cleanPoint.replace(/^Built features for /, 'Developed ');
      cleanPoint = cleanPoint.replace(/^React, TypeScript, Node, MongoDB, Kubernetes, Dgraph; deployed on GCP\./, '');
      return cleanPoint;
    });
  };

  return (
    <Box 
      id="experience" 
      sx={{ 
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden'
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
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                mb: 3, 
                color: 'var(--color-neutral-900)', 
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.1
              }}
            >
              My Journey in
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Tech & Innovation
              </span>
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'var(--color-neutral-600)', 
                maxWidth: 600, 
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.4
              }}
            >
              From university projects to enterprise solutions, every step has shaped my passion for 
              creating technology that makes a difference.
            </Typography>
          </Box>
        </motion.div>

        {/* Main Content - Two Columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6 }}>
          
          {/* Left Column - Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
              Professional Experience
            </Typography>
            
            <Box sx={{ position: 'relative' }}>
              {/* Enhanced Timeline Line */}
              <Box sx={{
                position: 'absolute',
                left: '20px',
                top: 0,
                bottom: 0,
                width: '4px',
                background: 'linear-gradient(180deg, var(--color-primary-500) 0%, var(--color-secondary-500) 50%, var(--color-primary-400) 100%)',
                borderRadius: '2px',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
              }} />

              {WORK.map((work, index) => (
                <motion.div
                  key={`${work.company}-${work.start}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    mb: 4,
                    position: 'relative'
                  }}>
                    {/* Enhanced Timeline Dot */}
                    <Box sx={{
                      position: 'absolute',
                      left: '20px',
                      top: '30px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                      border: '4px solid white',
                      boxShadow: '0 0 25px rgba(245, 158, 11, 0.4), 0 4px 20px rgba(0,0,0,0.1)',
                      transform: 'translateX(-50%)',
                      zIndex: 2,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-8px',
                        left: '-8px',
                        right: '-8px',
                        bottom: '-8px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
                        animation: 'pulse 2s infinite'
                      }
                    }} />

                    {/* Content Card */}
                    <Box sx={{
                      width: '100%',
                      ml: '50px'
                    }}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 4, 
                          borderRadius: 3, 
                          background: 'rgba(255,255,255,0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.4)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-1px',
                            right: '-1px',
                            height: '3px',
                            background: 'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))',
                            opacity: 0.8
                          },
                          '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                            '&::before': {
                              opacity: 1
                            }
                          }
                        }}
                      >
                        {/* Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                          <Avatar sx={{ 
                            bgcolor: 'var(--color-primary-500)', 
                            width: 48, 
                            height: 48,
                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                          }}>
                            <Building2 size={22} color="white" />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-neutral-900)', mb: 0.5 }}>
                              {work.role}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                              {work.company}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Meta Info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Calendar size={14} color="var(--color-neutral-500)" />
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                              {formatRange(work.start, work.end)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MapPin size={14} color="var(--color-neutral-500)" />
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                              {work.location}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Job Summary - Multiple Points */}
                        <Box sx={{ mb: 3 }}>
                          {getJobSummary(work.bullets).map((summary, idx) => (
                            <Typography 
                              key={idx}
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ 
                                mb: 1.5, 
                                lineHeight: 1.6,
                                position: 'relative',
                                pl: 2,
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: 0,
                                  top: '8px',
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: 'var(--color-primary-400)',
                                  opacity: 0.7
                                }
                              }}
                            >
                              {summary}
                            </Typography>
                          ))}
                        </Box>

                        {/* Tech Stack */}
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--color-neutral-600)', mb: 1.5, display: 'block' }}>
                            Technologies Used:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {getTechFromBullets(work.bullets).map((tech) => (
                              <Chip 
                                key={tech} 
                                label={tech} 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                  borderColor: 'var(--color-primary-300)',
                                  color: 'var(--color-primary-700)',
                                  fontSize: '0.7rem',
                                  height: '22px',
                                  fontWeight: 500,
                                  '&:hover': {
                                    borderColor: 'var(--color-primary-500)',
                                    background: 'rgba(245, 158, 11, 0.05)'
                                  }
                                }} 
                              />
                            ))}
                          </Box>
                        </Box>
                      </Paper>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {/* Right Column - Education & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Education */}
            <Box>
              <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                Education
              </Typography>
              
              {EDUCATION.map((edu, index) => (
                <motion.div
                  key={`${edu.institution}-${edu.start}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 4, 
                      borderRadius: 3, 
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-1px',
                        right: '-1px',
                        height: '3px',
                        background: 'linear-gradient(90deg, var(--color-secondary-500), var(--color-primary-500))',
                        opacity: 0.8
                      },
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                        '&::before': {
                          opacity: 1
                        }
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                      <Avatar sx={{ 
                        bgcolor: 'var(--color-secondary-500)', 
                        width: 48, 
                        height: 48,
                        boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)'
                      }}>
                        <GraduationCap size={22} color="white" />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                          {edu.degree}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'var(--color-secondary-600)', fontWeight: 600 }}>
                          {edu.institution}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Calendar size={14} color="var(--color-neutral-500)" />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {formatRange(edu.start, edu.end)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MapPin size={14} color="var(--color-neutral-500)" />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {edu.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>

            {/* Key Skills */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                Key Skills
              </Typography>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3, 
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-1px',
                    right: '-1px',
                    height: '3px',
                    background: 'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))',
                    opacity: 0.8
                  }
                }}
              >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                  {[
                    { icon: Code2, label: 'Frontend', skills: 'React, Angular, TypeScript' },
                    { icon: Database, label: 'Backend', skills: 'Node.js, Python, C++' },
                    { icon: Cloud, label: 'Cloud & DevOps', skills: 'GCP, Kubernetes, Docker' },
                    { icon: Smartphone, label: 'Mobile & Desktop', skills: 'Electron, ROS, Ubuntu' }
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Box sx={{ 
                          display: 'inline-flex', 
                          p: 2.5, 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, var(--color-primary-100), var(--color-secondary-100))',
                          mb: 2,
                          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)'
                        }}>
                          <skill.icon size={20} color="var(--color-primary-600)" />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--color-neutral-700)' }}>
                          {skill.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                          {skill.skills}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </Box>
          </motion.div>
        </Box>
      </Container>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </Box>
  );
}
