import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Divider,
  Dialog,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Link2,
  ImageIcon as ImageIc,
  PlayCircle,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Layers,
  Info,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import type { Project } from '../../data/projects';
import { PROJECTS } from '../../data/projects';

/* ------------------------------- helpers ------------------------------- */

const DEFAULT_CATEGORIES = ['All', 'Web App', 'Data', 'Mobile', 'Open Source', 'Platform'] as const;
type Category = (typeof DEFAULT_CATEGORIES)[number];

function categoriesFromProjects(projects: Project[]): Category[] {
  const set = new Set<Category>(['All', ...DEFAULT_CATEGORIES]);
  projects.forEach(p => (p.tags || []).forEach(t => set.add(t as Category)));
  return Array.from(set);
}

function matchesCategory(p: Project, cat: Category) {
  if (cat === 'All') return true;
  return (p.tags || []).some(t => t.toLowerCase() === cat.toLowerCase());
}

function matchesSearch(p: Project, q: string) {
  if (!q) return true;
  const hay = [
    p.title,
    p.summary,
    p.description || '',
    (p.tech || []).join(' '),
    (p.tags || []).join(' '),
  ]
    .join(' ')
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}

/* ------------------------------- component ----------------------------- */

export default function Projects() {
  const [category, setCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Project | null>(null);
  const [slide, setSlide] = useState(0);

  const categories = useMemo(() => categoriesFromProjects(PROJECTS), []);
  const filtered = useMemo(
    () =>
      PROJECTS.filter(p => matchesCategory(p, category) && matchesSearch(p, query)),
    [category, query]
  );

  // reset slide when active changes
  useEffect(() => setSlide(0), [active]);

  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 10 }, position: 'relative' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                lineHeight: 1.1,
              }}
            >
              Projects &{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Case Studies
              </span>
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 780, mx: 'auto' }}>
              Real products, measurable impact. Images, videos, links, and the stack that shipped them.
            </Typography>
          </Box>
        </motion.div>

        {/* Filters / search */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Filter size={16} />
            {categories.map(c => (
              <Chip
                key={c}
                label={c}
                onClick={() => setCategory(c)}
                color={category === c ? 'primary' : undefined}
                variant={category === c ? 'filled' : 'outlined'}
                sx={{ borderRadius: 999, height: 30, fontWeight: 600 }}
              />
            ))}
          </Stack>

          <TextField
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search projects..."
            size="small"
            sx={{ width: { xs: '100%', md: 320 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 16,
          }}
        >
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
            >
              <ProjectCard project={p} onOpen={() => setActive(p)} />
            </motion.div>
          ))}
        </Box>

        {/* Lightbox / details */}
        <ProjectDialog
          project={active}
          slide={slide}
          setSlide={setSlide}
          onClose={() => setActive(null)}
        />
      </Container>
    </Box>
  );
}

/* --------------------------------- Card -------------------------------- */

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const hero = project.media[0];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(255,255,255,0.4)',
        backdropFilter: 'blur(14px)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxShadow: '0 14px 28px rgba(0,0,0,0.08)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Media preview */}
      <Box sx={{ position: 'relative', aspectRatio: '16 / 10', background: 'var(--color-neutral-100)' }}>
        {hero?.type === 'image' && (
          <Box
            component="img"
            src={hero.src}
            alt={hero.alt || project.title}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {hero?.type === 'video' && (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Box
              component="video"
              src={hero.src}
              poster={hero.poster}
              muted
              loop
              autoPlay
              playsInline
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: 8,
                bottom: 8,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                background: 'rgba(0,0,0,0.45)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: 12,
              }}
            >
              <PlayCircle size={14} /> preview
            </Box>
          </Box>
        )}
        {hero?.type === 'iframe' && (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <iframe
              src={hero.src}
              title={(hero as any).title || project.title}
              loading="lazy"
              style={{ border: 0, width: '100%', height: '100%' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        )}

        {/* featured badge */}
        {project.featured && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: 999,
              background: 'rgba(245,158,11,0.9)',
              color: 'white',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            <Star size={14} /> Featured
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.25 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: 'var(--color-primary-500)' }}>
            <Layers size={16} color="white" />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
            {project.title}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
          {project.summary}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
          {project.tech.slice(0, 5).map(t => (
            <Chip
              key={t}
              label={t}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'var(--color-primary-300)',
                color: 'var(--color-primary-700)',
                height: 24,
                fontWeight: 600,
              }}
            />
          ))}
          {project.tech.length > 5 && <Chip size="small" label={`+${project.tech.length - 5}`} />}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button size="small" variant="contained" onClick={onOpen} sx={{ borderRadius: 2 }}>
            View Case
          </Button>
          {project.links?.demo && (
            <Button
              size="small"
              variant="outlined"
              component="a"
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<ExternalLink size={16} />}
              sx={{ borderRadius: 2 }}
            >
              Live
            </Button>
          )}
          {project.links?.repo && (
            <Button
              size="small"
              variant="outlined"
              component="a"
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Github size={16} />}
              sx={{ borderRadius: 2 }}
            >
              Code
            </Button>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}

/* ------------------------------ Modal view ----------------------------- */

function ProjectDialog({
  project,
  slide,
  setSlide,
  onClose,
}: {
  project: Project | null;
  slide: number;
  setSlide: (n: number) => void;
  onClose: () => void;
}) {
  const open = Boolean(project);
  const total = project?.media.length ?? 0;

  const next = useCallback(() => {
    if (!project) return;
    setSlide((s) => (s + 1) % project.media.length);
  }, [project, setSlide]);

  const prev = useCallback(() => {
    if (!project) return;
    setSlide((s) => (s - 1 + project.media.length) % project.media.length);
  }, [project, setSlide]);

  // keyboard nav
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, next, prev]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(255,255,255,0.45)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      {project && (
        <Box>
          {/* header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'var(--color-primary-500)' }}>
                <ImageIc size={16} color="white" />
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                {project.title}
              </Typography>
              {project.period && (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
                  <Calendar size={14} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {project.period}
                  </Typography>
                </Stack>
              )}
              {project.role && (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
                  <Briefcase size={14} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {project.role}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <IconButton onClick={onClose} aria-label="Close">
              <X />
            </IconButton>
          </Stack>

          {/* media carousel */}
          <Box sx={{ position: 'relative', background: 'var(--color-neutral-100)' }}>
            <Carousel
              slides={project.media}
              index={slide}
              onNext={next}
              onPrev={prev}
              onJump={setSlide}
            />
          </Box>

          {/* body */}
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {project.description && (
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                {project.description}
              </Typography>
            )}

            {/* highlights */}
            {!!project.highlights?.length && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Info size={16} />
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    Highlights
                  </Typography>
                </Stack>
                {project.highlights.map((h, i) => (
                  <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    • {h}
                  </Typography>
                ))}
              </Box>
            )}

            {/* tech */}
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
              {project.tech.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'var(--color-primary-300)',
                    color: 'var(--color-primary-700)',
                    height: 24,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>

            {/* links */}
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {project.links?.demo && (
                <Button
                  variant="contained"
                  component="a"
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<ExternalLink size={16} />}
                  sx={{ borderRadius: 2 }}
                >
                  Live Site
                </Button>
              )}
              {project.links?.repo && (
                <Button
                  variant="outlined"
                  component="a"
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<Github size={16} />}
                  sx={{ borderRadius: 2 }}
                >
                  Repo
                </Button>
              )}
              {project.links?.caseStudy && (
                <Button
                  variant="outlined"
                  component="a"
                  href={project.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<Link2 size={16} />}
                  sx={{ borderRadius: 2 }}
                >
                  Case Study
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      )}
    </Dialog>
  );
}

/* ------------------------------- Carousel ------------------------------ */

function Carousel({
  slides,
  index,
  onNext,
  onPrev,
  onJump,
}: {
  slides: Project['media'];
  index: number;
  onNext: () => void;
  onPrev: () => void;
  onJump: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // For swipe on touch devices
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0;
    let dx = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      dx = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      dx = e.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      if (dx > 60) onPrev();
      else if (dx < -60) onNext();
    };

    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [onNext, onPrev]);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* slide area */}
      <Box ref={ref} sx={{ position: 'relative', height: { xs: 320, sm: 420, md: 460 }, overflow: 'hidden' }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          >
            <Media slide={slides[index]} />
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <IconButton
          aria-label="Previous"
          onClick={onPrev}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: 'white' },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          aria-label="Next"
          onClick={onNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: 'white' },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      {/* thumbnails */}
      <Stack direction="row" spacing={1} sx={{ p: 1.5, pt: 1, overflowX: 'auto' }}>
        {slides.map((s, i) => (
          <Tooltip key={i} title={s.type === 'image' ? 'Image' : s.type === 'video' ? 'Video' : 'Embed'} arrow>
            <Box
              onClick={() => onJump(i)}
              sx={{
                width: 72,
                height: 48,
                borderRadius: 1,
                overflow: 'hidden',
                border: i === index ? '2px solid var(--color-primary-500)' : '1px solid rgba(0,0,0,0.08)',
                cursor: 'pointer',
                position: 'relative',
                flex: '0 0 auto',
              }}
            >
              {s.type === 'image' && (
                <Box component="img" src={s.src} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              {s.type === 'video' && (
                <Box component="img" src={(s.poster || '/vite.svg')} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              {s.type === 'iframe' && (
                <Box sx={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: 'var(--color-neutral-100)' }}>
                  <PlayCircle size={16} />
                </Box>
              )}
            </Box>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
}

/* ------------------------------- Media cell ---------------------------- */

function Media({ slide }: { slide: Project['media'][number] }) {
  if (!slide) return null;

  if (slide.type === 'image') {
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <Box
          component="img"
          src={slide.src}
          alt={slide.alt || ''}
          loading="lazy"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    );
  }

  if (slide.type === 'video') {
    return (
      <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <Box
          component="video"
          src={slide.src}
          poster={slide.poster}
          controls
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    );
  }

  // iframe (YouTube, Vimeo...)
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <iframe
        src={slide.src}
        title={(slide as any).title || 'Embedded media'}
        loading="lazy"
        style={{ border: 0, width: '100%', height: '100%' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Box>
  );
}
