import {
  Box, Chip, Container, Dialog, Divider, IconButton, Paper,
  Stack, Typography, Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ExternalLink, Play, Image as ImageIcon, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { PROJECTS } from '@/data/projects';
import type { Project, ProjectMedia } from '@/data/projects';


export default function Projects() {
  const ordered = useMemo(() => {
    const s = PROJECTS.filter(p => p.spotlight);
    const rest = PROJECTS.filter(p => !p.spotlight);
    return [...s, ...rest];
  }, []);

  const [openId, setOpenId] = useState<string | null>(null);
  const activeIndex = useMemo(() => ordered.findIndex(p => p.id === openId), [ordered, openId]);
  const active = activeIndex >= 0 ? ordered[activeIndex] : null;
  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => { setMediaIndex(0); }, [openId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === 'Escape') setOpenId(null);
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, active]);

  const nextProject = () => {
    if (!ordered.length) return;
    const next = (activeIndex + 1) % ordered.length;
    setOpenId(ordered[next].id);
  };
  const prevProject = () => {
    if (!ordered.length) return;
    const prev = (activeIndex - 1 + ordered.length) % ordered.length;
    setOpenId(ordered[prev].id);
  };

  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2, p: 1.5, borderRadius: 999, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)' }}>
              <Sparkles size={16} color="var(--color-primary-600)" />
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--color-primary-700)' }}>
                Real products. Real results.
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              Featured Projects
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto', mt: 1.5 }}>
              Showcasing enterprise-level applications and full-stack solutions that demonstrate technical expertise and business impact.
            </Typography>
          </Box>
        </motion.div>



        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <AnimatePresence>
            {ordered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <ProjectCard project={p} onOpen={() => setOpenId(p.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <Dialog
          open={!!active}
          onClose={() => setOpenId(null)}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.96)',
              border: '1px solid rgba(0,0,0,0.06)',
              backdropFilter: 'blur(24px)',
            },
          }}
        >
          {active && (
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ p: 2.5, pb: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{active.title}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton aria-label="Previous project" onClick={prevProject}><ChevronLeft /></IconButton>
                    <IconButton aria-label="Next project" onClick={nextProject}><ChevronRight /></IconButton>
                    <IconButton aria-label="Close" onClick={() => setOpenId(null)}><X /></IconButton>
                  </Stack>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {active.description}
                </Typography>
              </Box>
              <Divider />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: 0 }}>
                <Box sx={{ p: 2 }}>
                  <Gallery media={active.media} index={mediaIndex} onChange={setMediaIndex} />
                </Box>

                <Box sx={{ p: 2 }}>
                  {active.longDescription && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {active.longDescription}
                    </Typography>
                  )}

                  <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary' }}>Tech</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    {active.tech.map(t => (
                      <Chip key={t} label={t} size="small" variant="outlined"
                        sx={{
                          borderColor: 'var(--color-secondary-300)',
                          color: 'var(--color-secondary-700)',
                          '&:hover': { borderColor: 'var(--color-secondary-500)', backgroundColor: 'var(--color-secondary-50)' }
                        }}
                      />
                    ))}
                  </Stack>

                  <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary' }}>Tags</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    {active.tags.map(t => (
                      <Chip key={t} label={t} size="small" sx={{ background: 'rgba(245,158,11,0.08)', color: '#78350f' }} />
                    ))}
                  </Stack>

                  {active.links?.length ? (
                    <>
                      <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary' }}>Links</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                        {active.links.map(l => (
                          <Button
                            key={l.href}
                            size="small"
                            endIcon={<ExternalLink size={14} />}
                            onClick={() => window.open(l.href, '_blank')}
                          >
                            {l.label}
                          </Button>
                        ))}
                      </Stack>
                    </>
                  ) : null}
                </Box>
              </Box>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}

/* --------------------------- Subcomponents --------------------------- */

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [imgOk, setImgOk] = useState(true);
  const cover = project.cover ?? (project.media.find(m => m.type === 'image') as ProjectMedia | undefined)?.src;

  return (
    <Paper
      elevation={0}
      onClick={onOpen}
      sx={{
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 3,
        border: t => `1px solid ${t.palette.divider}`,
        background: 'rgba(255,255,255,0.85)',
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: '56.25%', background: 'linear-gradient(135deg, rgba(245,158,11,.12), rgba(20,184,166,.12))' }}>
        {cover && imgOk ? (
          <Box
            component="img"
            src={cover}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onError={() => setImgOk(false)}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '40px',
              maxWidth: '80%',
              maxHeight: '80%',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--color-primary-600)' }}>
            <ImageIcon />
          </Box>
        )}

        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {project.tags.slice(0, 3).map(t => (
            <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)' }} />
          ))}
          {project.spotlight && (
            <Chip label="Spotlight" size="small" sx={{ bgcolor: 'rgba(245,158,11,0.9)', color: '#fff' }} />
          )}
        </Box>

        {project.media.some(m => m.type === 'video') && (
          <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
            <Chip icon={<Play size={14} />} label="Video" size="small" sx={{ bgcolor: 'rgba(0,0,0,0.65)', color: 'white' }} />
          </Box>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>{project.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {project.description}
        </Typography>
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
          {project.tech.slice(0, 4).map(t => (
            <Chip key={t} label={t} size="small" variant="outlined" />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}

function Gallery({
  media, index, onChange,
}: {
  media: ProjectMedia[];
  index: number;
  onChange: (n: number) => void;
}) {
  const has = media.length;
  const clamp = (n: number) => (has ? (n + has) % has : 0);

  if (!has) {
    return (
      <Box sx={{ p: 3, border: t => `1px solid ${t.palette.divider}`, borderRadius: 2, textAlign: 'center', color: 'text.secondary' }}>
        No media yet.
      </Box>
    );
  }

  const next = () => onChange(clamp(index + 1));
  const prev = () => onChange(clamp(index - 1));

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0;
    const onDown = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onUp = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) prev();
      else if (dx < -40) next();
    };
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchend', onUp, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchend', onUp);
    };
  }, [index]);

  const item = media[index];

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          border: t => `1px solid ${t.palette.divider}`,
          background: 'rgba(255,255,255,0.6)',
        }}
      >
        <AnimatePresence mode="wait">
          {item?.type === 'image' ? (
            <motion.img
              key={index + '-img'}
              src={item.src}
              alt={item.alt ?? 'Project image'}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0.0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          ) : item?.type === 'video' ? (
            <motion.div
              key={index + '-vid'}
              initial={{ opacity: 0.0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'relative', width: '100%', background: 'black' }}
            >
              {item.provider === 'youtube' || item.provider === 'vimeo' ? (
                <Box sx={{ position: 'relative', pt: '56.25%' }}>
                  <Box
                    component="iframe"
                    src={item.src}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    sx={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0,
                      borderRadius: 0,
                    }}
                  />
                </Box>
              ) : (
                <Box component="video" src={item.src} poster={item.poster} controls autoPlay={false} sx={{ width: '100%', display: 'block' }} />
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {has > 1 && (
          <>
            <IconButton
              aria-label="Previous media"
              onClick={prev}
              sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)' }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              aria-label="Next media"
              onClick={next}
              sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.9)' }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>

      {has > 1 && (
        <Stack direction="row" spacing={1} sx={{ mt: 1.5, overflowX: 'auto', pb: 0.5 }}>
          {media.map((m, i) => (
            <Box
              key={i}
              onClick={() => onChange(i)}
              sx={{
                width: 72,
                height: 48,
                borderRadius: 1.5,
                overflow: 'hidden',
                border: i === index ? '2px solid var(--color-primary-500)' : '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer',
                flex: '0 0 auto',
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(245,158,11,.12), rgba(20,184,166,.12))',
              }}
            >
              {m.type === 'image' ? (
                <Box component="img" src={m.src} alt="" loading="lazy" decoding="async" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Box sx={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: 'white', background: 'black' }}>
                  <Play size={18} />
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}