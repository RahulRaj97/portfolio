import {
  Box,
  Chip,
  Container,
  Typography,
  Paper,
  Avatar,
  Stack,
  Button,
  Divider,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Filter,
  Flame,
  GraduationCap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { WORK, EDUCATION } from '../../data/resume';

/* ------------------------------- helpers ------------------------------- */

type Category = 'All' | 'Frontend' | 'Backend' | 'Data/AI' | 'Cloud/DevOps';

const TECH_KEYWORDS = [
  'React', 'TypeScript', 'Angular', 'Node', 'Python', 'C++', 'Electron',
  'Kubernetes', 'Docker', 'GCP', 'MongoDB', 'Dgraph', 'Jenkins',
  'Airflow', 'Superset', 'Cypress', 'Vite', 'ROS', 'Ubuntu'
];

const CATEGORIES: { label: Category; match: RegExp }[] = [
  { label: 'All', match: /.*/i },
  { label: 'Frontend', match: /(react|angular|typescript|vite|cypress)/i },
  { label: 'Backend', match: /(node|python|c\+\+|express|postgres|mongodb|dgraph)/i },
  { label: 'Data/AI', match: /(airflow|superset|insights|data|analytics|ml)/i },
  { label: 'Cloud/DevOps', match: /(kubernetes|docker|gcp|ci\/cd|jenkins|ros|ubuntu)/i },
];

function formatMonthRange(start: string, end?: string) {
  const toLabel = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    const d = new Date(y, (m || 1) - 1);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const s = toLabel(start);
  const e = end ? toLabel(end) : 'Present';
  return `${s} — ${e}`;
}

function getTechFromBullets(bullets: string[]) {
  return TECH_KEYWORDS.filter(tech =>
    bullets.some(b => b.toLowerCase().includes(tech.toLowerCase()))
  ).slice(0, 6);
}

function summarizeBullets(bullets: string[]) {
  // Keep your first 2–3 lines crisp
  return bullets.slice(0, 3).map((t) =>
    t
      .replace(/^Core contributor on /, 'Led development of ')
      .replace(/^Enhanced /, 'Improved ')
      .replace(/^Built features for /, 'Developed ')
  );
}

function computeYears(): string {
  try {
    const starts = WORK.map(w => new Date(w.start + '-01').getTime());
    const min = Math.min(...starts);
    const years = (Date.now() - min) / (1000 * 60 * 60 * 24 * 365.25);
    return years >= 4.5 ? '5+ yrs' : years >= 3.5 ? '4+ yrs' : `${Math.floor(years)} yrs`;
  } catch {
    return '4+ yrs';
  }
}

function uniqueCountries() {
  const all = WORK.map(w => (w.location.split(',').pop() || '').trim());
  return Array.from(new Set(all.filter(Boolean)));
}

function tallyTech() {
  const counts: Record<string, number> = {};
  for (const w of WORK) {
    for (const t of getTechFromBullets(w.bullets)) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
}

/* -------------------------------- main --------------------------------- */

export default function Experience() {
  const [category, setCategory] = useState<Category>('All');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filteredWork = useMemo(() => {
    const rule = CATEGORIES.find(c => c.label === category)?.match ?? /.*/i;
    return WORK.filter(w => rule.test((w.role + ' ' + w.company + ' ' + w.bullets.join(' '))));
  }, [category]);

  const yearsLabel = useMemo(() => computeYears(), []);
  const countries = useMemo(() => uniqueCountries(), []);
  const techTop = useMemo(() => tallyTech(), []);

  return (
    <Box id="experience" sx={{ py: { xs: 8, md: 10 }, position: 'relative' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                lineHeight: 1.1,
              }}
            >
              Experience &{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Impact
              </span>
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 760, mx: 'auto' }}>
              From Karachi to Munich, I’ve shipped production software across frontend, platforms, and data—always with a product mindset.
            </Typography>
          </Box>
        </motion.div>

        {/* At-a-glance stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 5,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.86)',
              border: '1px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" alignItems="center" justifyContent="center">
              <Stat label="Experience" value={yearsLabel} />
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
              <Stat label="Companies" value={`${WORK.length}`} />
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
              <Stat label="Regions" value={countries.join(' • ') || '—'} />
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
              <Stack direction="row" spacing={1} alignItems="center">
                <Flame size={16} />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Top tech:</Typography>
                {techTop.map(([t]) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'var(--color-primary-300)',
                      color: 'var(--color-primary-700)',
                      height: 24,
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Paper>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap' }}>
            <Filter size={16} />
            <Typography variant="body2" sx={{ fontWeight: 700, mr: 1 }}>Filter:</Typography>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.label}
                label={c.label}
                onClick={() => setCategory(c.label)}
                color={category === c.label ? 'primary' : undefined}
                variant={category === c.label ? 'filled' : 'outlined'}
                sx={{
                  borderRadius: 999,
                  height: 30,
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        </motion.div>

        {/* Layout: timeline + right column */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' }, gap: 6 }}>
          {/* Timeline */}
          <Box>
            <Box sx={{ position: 'relative' }}>
              {/* spine */}
              <Box sx={{
                position: 'absolute',
                left: 18,
                top: 0,
                bottom: 0,
                width: 4,
                background: 'linear-gradient(180deg, var(--color-primary-500), var(--color-secondary-500))',
                borderRadius: 2,
                opacity: 0.9
              }} />
              {filteredWork.map((work, index) => {
                const id = `${work.company}-${work.start}`;
                const isOpen = !!expanded[id];
                const summary = summarizeBullets(work.bullets);
                const rest = work.bullets.slice(summary.length);
                const tech = getTechFromBullets(work.bullets);
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Box sx={{ display: 'flex', position: 'relative', mb: 4 }}>
                      {/* node */}
                      <Box sx={{
                        position: 'absolute',
                        left: 18,
                        top: 28,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                        border: '4px solid white',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.12), 0 0 0 6px rgba(245,158,11,0.08)',
                        zIndex: 2
                      }} />
                      <Box sx={{ ml: '48px', width: '100%' }}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.94)',
                            border: '1px solid rgba(255,255,255,0.4)',
                            backdropFilter: 'blur(16px)',
                            boxShadow: '0 18px 36px rgba(0,0,0,0.08)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0, left: 0, right: 0, height: 3,
                              background: 'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))'
                            }
                          }}
                        >
                          {/* header */}
                          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                            <Avatar sx={{ bgcolor: 'var(--color-primary-500)', width: 44, height: 44 }}>
                              <Building2 size={20} color="white" />
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                                {work.role}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'var(--color-primary-700)', fontWeight: 700 }}>
                                {work.company}
                              </Typography>
                            </Box>
                            <Stack spacing={0.5} alignItems="flex-end">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Calendar size={14} color="var(--color-neutral-500)" />
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                  {formatMonthRange(work.start, work.end)}
                                </Typography>
                              </Stack>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <MapPin size={14} color="var(--color-neutral-500)" />
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                  {work.location}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>

                          {/* summary bullets */}
                          <Box sx={{ mb: rest.length ? 1.25 : 0 }}>
                            {summary.map((s, i) => (
                              <Typography
                                key={i}
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 1,
                                  lineHeight: 1.6,
                                  pl: 2,
                                  position: 'relative',
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    top: '10px',
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: 'var(--color-primary-400)',
                                  }
                                }}
                              >
                                {s}
                              </Typography>
                            ))}
                          </Box>

                          {/* expand */}
                          {rest.length > 0 && (
                            <Box sx={{ mb: 1.25 }}>
                              <Button
                                size="small"
                                onClick={() => setExpanded(e => ({ ...e, [id]: !isOpen }))}
                                endIcon={isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                sx={{ borderRadius: 2, fontWeight: 700 }}
                              >
                                {isOpen ? 'Hide details' : `Show ${rest.length} more`}
                              </Button>
                              {isOpen && (
                                <Box sx={{ mt: 1 }}>
                                  {rest.map((s, i) => (
                                    <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.75, pl: 2 }}>
                                      • {s}
                                    </Typography>
                                  ))}
                                </Box>
                              )}
                            </Box>
                          )}

                          {/* tech */}
                          {tech.length > 0 && (
                            <>
                              <Divider sx={{ my: 1.5 }} />
                              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {tech.map(t => (
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
                            </>
                          )}
                        </Paper>
                      </Box>
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </Box>

          {/* Right column */}
          <Box>
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <Typography variant="h3" sx={{ mb: 2.5, fontWeight: 800 }}>
                Education
              </Typography>

              <Stack spacing={2.5}>
                {EDUCATION.map((edu, idx) => (
                  <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.94)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      backdropFilter: 'blur(14px)',
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                      <Avatar sx={{ bgcolor: 'var(--color-secondary-500)', width: 42, height: 42 }}>
                        <GraduationCap size={18} color="white" />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                          {edu.degree}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--color-secondary-700)', fontWeight: 700 }}>
                          {edu.institution}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ color: 'text.secondary' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Calendar size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {formatMonthRange(edu.start, edu.end)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MapPin size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {edu.location}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </motion.div>

            {/* Skill pulse */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <Typography variant="h3" sx={{ mt: 5, mb: 2, fontWeight: 800 }}>
                Skill Pulse
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.94)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                  Most frequent technologies across roles:
                </Typography>
                <Stack spacing={1.25}>
                  {techTop.map(([tech, count]) => (
                    <Stack key={tech} direction="row" spacing={1} alignItems="center">
                      <Tooltip title={`${count} appearance${count > 1 ? 's' : ''} across roles`}>
                        <Box
                          aria-hidden
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 999,
                            background:
                              'linear-gradient(90deg, var(--color-primary-200), var(--color-secondary-200))',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              width: `${Math.min(100, count * 40)}%`,
                              background:
                                'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))',
                            }}
                          />
                        </Box>
                      </Tooltip>
                      <Chip
                        label={`${tech}`}
                        size="small"
                        sx={{ fontWeight: 700, height: 24 }}
                        variant="outlined"
                      />
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* --------------------------------- ui ---------------------------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0} sx={{ minWidth: 140, textAlign: 'center' }}>
      <Typography variant="overline" sx={{ letterSpacing: '0.06em', color: 'text.secondary', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 900 }}>{value}</Typography>
    </Stack>
  );
}
