import { Box, Button, Chip, Container, Paper, Stack, Typography, Divider } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Globe, Code, Sparkles } from 'lucide-react';
import SocialIcons from '../common/SocialIcons';

/* ------------------------------- config -------------------------------- */

type Layer = { left: string; top: string; size: number; shape: 'dot' | 'square'; color: string; depth: number; Icon?: React.FC<any> };

const layers: Layer[] = [
  { left: '12%', top: '22%', size: 36, shape: 'dot',   color: 'var(--color-secondary-200)', depth: 10, Icon: Globe },
  { left: '78%', top: '24%', size: 36, shape: 'dot',   color: 'var(--color-primary-200)',   depth: 18, Icon: Code  },
  { left: '26%', top: '72%', size: 40, shape: 'square',color: 'var(--color-secondary-100)', depth: 26 },
  { left: '84%', top: '66%', size: 44, shape: 'square',color: 'var(--color-primary-100)',   depth: 18 },
];

const WORDS = ['Ideas', 'Products', 'Revenue', 'Reality'];

/* -------------------------------- Hero --------------------------------- */

export default function Hero() {
  // cursor tracking within hero
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  // normalized [-1, 1] relative to center
  const nx = useTransform(mx, (v) => {
    const w = containerRef.current?.clientWidth ?? 1;
    return (v - w / 2) / (w / 2);
  });
  const ny = useTransform(my, (v) => {
    const h = containerRef.current?.clientHeight ?? 1;
    return (v - h / 2) / (h / 2);
  });

  // springs for parallax/tilt
  const spring = (val: any, fac: number) =>
    useSpring(useTransform(val, (n: number) => n * fac), { stiffness: 120, damping: 18 });

  return (
    <Box
      ref={containerRef}
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient aurora gradients behind everything (non-repeating) */}
      <Aurora nx={nx} ny={ny} />

      {/* Light follower ring */}
      <motion.div style={{ position: 'absolute', x: spring(nx, 40), y: spring(ny, 40), zIndex: 1, pointerEvents: 'none' }}>
        <Box sx={{ width: 110, height: 110, borderRadius: '50%', border: '1.5px solid rgba(245,158,11,0.35)', opacity: 0.55, position: 'absolute', top: -55, left: -55 }} />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '0.95fr 1.1fr' }, // a touch more room for text
            gap: { xs: 6, lg: 10 }, // more breathing room overall
            alignItems: 'center',
          }}
        >
                  {/* Left: photo card (no shine effect) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <PhotoCard />
        </motion.div>

          {/* Right: headline + CTAs */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Sparkles size={18} color="var(--color-accent-amber)" />
              <Chip label="Available for new projects" color="primary" variant="outlined" size="small" sx={{ borderRadius: 999 }} />
            </Stack>



            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 1.5,
                fontSize: { xs: '2.6rem', sm: '3.1rem', md: '3.6rem' },
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: '-0.025em',
              }}
            >
              Build <Typewriter words={WORDS} /> with a{' '}
              <span style={{ color: 'var(--color-secondary-600)' }}>Full-Stack Engineer</span>
            </Typography>

            <Typography
              variant="h2"
              component="h2"
              sx={{ mb: 4, color: 'text.secondary', fontSize: { xs: '1.18rem', sm: '1.35rem', md: '1.55rem' }, maxWidth: 720 }}
            >
              I ship clean, scalable products—fast. From concept to launch, I turn complex challenges into elegant, human-friendly solutions.
            </Typography>

            {/* Magnetic CTAs */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mb: 5 }}>
              <Magnetic>
                <Button variant="contained" size="large" href="#contact" sx={{ px: 5, py: 2, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2 }}>
                  Let’s Work Together
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="outlined" size="large" href="#projects" sx={{ px: 5, py: 2, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, borderWidth: 1.5 }}>
                  View My Work
                </Button>
              </Magnetic>
            </Stack>

            {/* Stats – grouped in a soft card so it doesn’t feel scattered */}
            <StatCard
              items={[
                { k: 'Full-Stack', v: 'React • Node • Python' },
                { k: 'Cloud Native', v: 'Kubernetes • Docker • GCP' },
                { k: 'Data & AI', v: 'Analytics • ML • Automation' },
              ]}
            />

            {/* New: Tech stack showcase */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
                Tech Stack
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {['TypeScript', 'React', 'Angular', 'Node.js', 'Python', 'Kubernetes', 'Docker', 'GCP'].map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'var(--color-secondary-300)',
                      color: 'var(--color-secondary-700)',
                      '&:hover': {
                        borderColor: 'var(--color-secondary-500)',
                        backgroundColor: 'var(--color-secondary-50)',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* New: Key strengths */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
                What I Bring
              </Typography>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, borderRadius: 2, background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.1)', flex: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary-500)' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Rapid Prototyping
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, borderRadius: 2, background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', flex: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-secondary-500)' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Scalable Architecture
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, borderRadius: 2, background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.1)', flex: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary-500)' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Performance Focus
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, borderRadius: 2, background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', flex: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-secondary-500)' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Clean Code
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>





            {/* Social icons centered */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <SocialIcons />
            </Box>


          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

/* ---------------------------- Typewriter word --------------------------- */

function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  waitBeforeDelete = 1000,
  loop = true,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  waitBeforeDelete?: number;
  loop?: boolean;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex] ?? '';
    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), waitBeforeDelete);
      return () => clearTimeout(t);
    }
    if (deleting && display === '') {
      const next = (wordIndex + 1) % words.length;
      if (!loop && next === 0) return;
      setDeleting(false);
      setWordIndex(next);
      return;
    }
    const step = () => {
      const nextText = deleting
        ? current.slice(0, display.length - 1)
        : current.slice(0, display.length + 1);
      setDisplay(nextText);
    };
    const id = setTimeout(step, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(id);
  }, [display, deleting, wordIndex, words, typingSpeed, deletingSpeed, waitBeforeDelete, loop]);

  return (
    <span
      style={{
        backgroundImage:
          'linear-gradient(90deg, var(--color-primary-600), var(--color-secondary-600))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        whiteSpace: 'nowrap',
        position: 'relative',
      }}
    >
      {display}
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 2,
          height: '1em',
          marginLeft: 2,
          background: 'currentColor',
          color: 'var(--color-secondary-700)',
          transform: 'translateY(2px)',
          animation: 'blink 1s steps(2, start) infinite',
        }}
      />
      <style>{`@keyframes blink { to { visibility: hidden; } }`}</style>
    </span>
  );
}

/* ---------------------------- helpers & bits ---------------------------- */

/* photo card with glass and shadow (no shine, no tilt, bigger size) */
function PhotoCard() {
  return (
    <Box sx={{ position: 'relative', width: { xs: 320, sm: 360, md: 420 }, height: { xs: 320, sm: 360, md: 420 } }}>
      {/* image container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 28px 56px rgba(0,0,0,0.16)',
          border: '4px solid white',
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box
          component="img"
          src="/profile_picture.jpeg"
          alt="Rahul Raj - Full Stack Developer"
          sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
}

/* Magnetic wrapper for CTAs */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.3 });
  const dy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.2);
    y.set(my * 0.2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ display: 'inline-block', x: dx, y: dy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}

/* Stats card */
function StatCard({ items }: { items: { k: string; v: string }[] }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 2,
        border: (t) => `1px solid ${t.palette.divider}`,
        backgroundColor: 'rgba(255,255,255,0.7)',
        display: 'flex',
        gap: { xs: 2, md: 3 },
        flexWrap: 'wrap',
        alignItems: 'stretch',
      }}
    >
      {items.map((it, i) => (
        <Stack key={it.k} spacing={0.25} sx={{ minWidth: 140 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.01em' }}>
            {it.k}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {it.v}
          </Typography>
          {i < items.length - 1 && (
            <Divider
              flexItem
              orientation="vertical"
              sx={{ display: { xs: 'none', md: 'block' }, ml: 2 }}
            />
          )}
        </Stack>
      ))}
    </Paper>
  );
}

/* Soft aurora background that subtly reacts to cursor (no repeat) */
function Aurora({ nx, ny }: { nx: any; ny: any }) {
  const ax = useSpring(useTransform(nx, (n: number) => n * 20), { stiffness: 90, damping: 16 });
  const ay = useSpring(useTransform(ny, (n: number) => n * 16), { stiffness: 90, damping: 16 });

  return (
    <motion.div
      style={{ x: ax, y: ay }}
      aria-hidden
      children={
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            background:
              `
              radial-gradient(900px 320px at 10% 10%, rgba(245,158,11,0.12), transparent 60%),
              radial-gradient(900px 320px at 90% 18%, rgba(20,184,166,0.10), transparent 60%)
              `,
            backgroundRepeat: 'no-repeat',
            filter: 'blur(30px)',
          }}
        />
      }
    />
  );
}


