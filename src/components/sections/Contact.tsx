import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import {
  Mail,
  Linkedin,
  CheckCircle,
  Send,
  ArrowRight,
  Clock,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

export default function Contact() {
  /* ------------------------------- state -------------------------------- */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // honeypot — bots will often fill this
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; type: 'success' | 'error'; msg: string }>({
    open: false,
    type: 'success',
    msg: '',
  });
  const [copied, setCopied] = useState(false);

  const messageCount = formData.message.length;
  const emailAddress = useMemo(() => 'rahule.lohana97@gmail.com', []);

  /* ---------------------------- handlers -------------------------------- */
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setSnack({ open: true, type: 'error', msg: 'Could not copy email.' });
    }
  }, [emailAddress]);

  const submitForm = async (payload: typeof formData) => {
    // SPA-friendly placeholder: simulate network then resolve.
    // Swap this with a real POST to your backend (or Formspree/Netlify).
    await new Promise((r) => setTimeout(r, 1200));
    return { ok: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot: if filled, silently succeed without sending.
    if (formData.company.trim().length > 0) {
      setSnack({ open: true, type: 'success', msg: 'Thanks! I will get back to you shortly.' });
      setFormData({ name: '', email: '', subject: '', message: '', company: '' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitForm(formData);
      if (res?.ok) {
        setSnack({ open: true, type: 'success', msg: 'Message sent! I’ll reply within 24 hours.' });
        setFormData({ name: '', email: '', subject: '', message: '', company: '' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setSnack({
        open: true,
        type: 'error',
        msg: 'Something went wrong. Try email instead — it’s instant.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------------------ UI ------------------------------------ */
  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                mb: 2.5,
                p: 1.25,
                borderRadius: 999,
                background: 'rgba(245,158,11,0.10)',
                border: '1px solid rgba(245,158,11,0.20)',
              }}
            >
              <ShieldCheck size={18} color="var(--color-primary-600)" />
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--color-primary-700)' }}>
                Replies within ~24 hours
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                mb: 2,
                color: 'var(--color-neutral-900)',
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                lineHeight: 1.1,
              }}
            >
              Ready to build something
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                amazing?
              </span>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'var(--color-neutral-600)',
                maxWidth: 720,
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.45,
              }}
            >
              Whether you're in Germany, Pakistan, or anywhere else in the world, I'm always excited to discuss new projects, collaborations, or just chat about technology. I respond quickly and love hearing about innovative ideas.
            </Typography>
          </Box>
        </motion.div>

        {/* Top CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6, flexWrap: 'wrap' }}>
            <Button
              component="a"
              href={`mailto:${emailAddress}`}
              size="large"
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 3.5,
                py: 2,
                fontWeight: 700,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mail size={20} />
                Email Rahul
                <ArrowRight size={18} />
              </Box>
            </Button>

            <Button
              component="a"
              href="https://linkedin.com/in/rahulraj97"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3.5,
                py: 2,
                fontWeight: 700,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Linkedin size={20} />
                Connect on LinkedIn
              </Box>
            </Button>
          </Stack>
        </motion.div>

        {/* Two columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 6,
            alignItems: 'start',
          }}
        >
          {/* Left: direct info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 800 }}>
                Contact details
              </Typography>

              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#EA4335',
                      width: 48,
                      height: 48,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Mail size={22} color="white" />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
                    >
                      {emailAddress}
                      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <IconButton size="small" onClick={copyEmail} aria-label="Copy email">
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#3B82F6',
                      width: 48,
                      height: 48,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Clock size={22} color="white" />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Location
                    </Typography>
                    <Typography variant="body1">Munich, Germany (CET)</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#10B981',
                      width: 48,
                      height: 48,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Clock size={22} color="white" />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Response time
                    </Typography>
                    <Typography variant="body1">Within 24 hours</Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 800 }}>
                Send a message
              </Typography>

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={formData.company}
                  onChange={handleInput}
                  style={{
                    position: 'absolute',
                    left: '-10000px',
                    top: 'auto',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                  }}
                />

                <Stack spacing={2.5}>
                  <TextField
                    name="name"
                    label="Your name"
                    value={formData.name}
                    onChange={handleInput}
                    required
                    fullWidth
                    autoComplete="name"
                    variant="outlined"
                    inputProps={{ maxLength: 80 }}
                    sx={fieldSx}
                  />

                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInput}
                    required
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                    inputProps={{ maxLength: 120 }}
                    sx={fieldSx}
                  />

                  <TextField
                    name="subject"
                    label="Subject (optional)"
                    value={formData.subject}
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 120 }}
                    sx={fieldSx}
                  />

                  <Box>
                    <TextField
                      name="message"
                      label="Your message"
                      value={formData.message}
                      onChange={handleInput}
                      required
                      fullWidth
                      multiline
                      minRows={5}
                      variant="outlined"
                      inputProps={{ maxLength: 2000 }}
                      sx={fieldSx}
                    />
                    <Typography
                      variant="caption"
                      sx={{ display: 'block', textAlign: 'right', color: 'text.secondary', mt: 0.5 }}
                      aria-live="polite"
                    >
                      {messageCount}/2000
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      background:
                        'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                      boxShadow: '0 8px 24px rgba(245,158,11,0.28)',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 32px rgba(245,158,11,0.38)',
                      },
                      '&:disabled': {
                        background: 'rgba(245,158,11,0.55)',
                        transform: 'none',
                      },
                    }}
                    aria-live="polite"
                  >
                    {isSubmitting ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            border: '2px solid white',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                          }}
                        />
                        Sending…
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Send size={20} />
                        Send message
                        <ArrowRight size={18} />
                      </Box>
                    )}
                  </Button>

                  {/* Secondary direct link */}
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', textAlign: 'center' }}
                  >
                    Prefer not to use forms?{' '}
                    <a href={`mailto:${emailAddress}`} style={{ fontWeight: 600 }}>
                      Email me directly
                    </a>
                    .
                  </Typography>
                </Stack>
              </form>
            </Paper>
          </motion.div>
        </Box>
      </Container>

      {/* Toasts */}
      <Snackbar
        open={snack.open}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.type}
          variant="filled"
          iconMapping={{ success: <CheckCircle fontSize="inherit" />, error: <ShieldCheck fontSize="inherit" /> }}
          sx={{ borderRadius: 2 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>

      {/* local spinner keyframes (scoped) */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </Box>
  );
}

/* ------------------------------- styles --------------------------------- */
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    background: 'rgba(255,255,255,0.8)',
    transition: 'all 0.25s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 26px rgba(245, 158, 11, 0.12)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-primary-500)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-primary-500)',
    },
  },
};
