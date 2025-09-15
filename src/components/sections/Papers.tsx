import { Box, Chip, Container, IconButton, Paper as MuiPaper, Stack, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

import { PAPERS, type Paper } from '@/data/papers';

export default function Papers() {
  return (
    <Box id="papers" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2, p: 1.5, borderRadius: 999, border: '1px solid rgba(59,130,246,0.25)', background: 'rgba(59,130,246,0.08)' }}>
              <BookOpen size={16} color="var(--color-primary-600)" />
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--color-primary-700)' }}>
                Papers I’ve read
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              Reading Log
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto', mt: 1.5 }}>
              A curated list of research papers I’ve studied, with quick notes and links.
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          <AnimatePresence>
            {PAPERS.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 18, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}>
                <PaperCard paper={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        {/* CTA removed as per request */}
      </Container>
    </Box>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <MuiPaper
      elevation={0}
      sx={{
        overflow: 'hidden',
        borderRadius: 3,
        border: t => `1px solid ${t.palette.divider}`,
        background: 'rgba(255,255,255,0.85)',
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 25px 50px rgba(0,0,0,0.12)' },
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary' }}>
            {paper.venue ?? 'Paper'} {paper.year ? `• ${paper.year}` : ''}
          </Typography>
          {paper.links?.[0] ? (
            <IconButton aria-label="Open" size="small" onClick={() => window.open(paper.links![0].href, '_blank')}>
              <ExternalLink size={16} />
            </IconButton>
          ) : null}
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
          {paper.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {paper.authors}
        </Typography>

        {paper.summary ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.6 }}>
            {paper.summary}
          </Typography>
        ) : null}

        {paper.tags?.length ? (
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
            {paper.tags!.map(tag => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
        ) : null}

        {paper.links?.length ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
            {paper.links!.map(l => (
              <Button key={l.href} size="small" endIcon={<ExternalLink size={14} />} onClick={() => window.open(l.href, '_blank')}>
                {l.label}
              </Button>
            ))}
          </Stack>
        ) : null}
      </Box>
    </MuiPaper>
  );
}


