// src/components/common/CommandPalette.tsx
import {
    Box, Dialog, TextField, InputAdornment, Stack, Paper, Typography,
    IconButton, Button, Tooltip
  } from '@mui/material';
  import { useEffect, useMemo, useState } from 'react';
  import { Search, Command, X, ExternalLink, Github, Linkedin, Mail, CornerDownRight } from 'lucide-react';
  import { SOCIAL } from '../../config/site';
  
  type Cmd = {
    id: string;
    label: string;
    group: 'Navigate' | 'Social' | 'Action';
    hint?: string;
    run: () => void;
  };
  
  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.hash = hash;
  };
  
  export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');
  
    // keyboard: Cmd/Ctrl + K
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        const mod = e.metaKey || e.ctrlKey;
        if (mod && (e.key.toLowerCase() === 'k')) {
          e.preventDefault();
          setOpen(v => !v);
        } else if (e.key === 'Escape') {
          setOpen(false);
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, []);
  
    const social = SOCIAL.reduce<Record<string, string>>((acc, s) => {
      acc[s.label] = s.href;
      return acc;
    }, {});
  
    const cmds = useMemo<Cmd[]>(() => [
      // Navigate
      { id: 'nav-home', label: 'Go to: Home', group: 'Navigate', hint: '#home', run: () => scrollTo('#home') },
      { id: 'nav-exp',  label: 'Go to: Experience', group: 'Navigate', hint: '#experience', run: () => scrollTo('#experience') },
      { id: 'nav-proj', label: 'Go to: Projects', group: 'Navigate', hint: '#projects', run: () => scrollTo('#projects') },
      { id: 'nav-contact', label: 'Go to: Contact', group: 'Navigate', hint: '#contact', run: () => scrollTo('#contact') },
  
      // Social
      { id: 'soc-ln', label: 'Open: LinkedIn', group: 'Social', hint: new URL(social['LinkedIn']).host, run: () => window.open(social['LinkedIn'], '_blank') },
      { id: 'soc-gh', label: 'Open: GitHub', group: 'Social', hint: new URL(social['GitHub']).host, run: () => window.open(social['GitHub'], '_blank') },
      { id: 'soc-mail', label: 'Email: rahule.lohana97@gmail.com', group: 'Social', hint: 'Copy to clipboard', run: async () => {
        try {
          await navigator.clipboard.writeText('rahule.lohana97@gmail.com');
        } catch {
          // fallback: open mailto
          window.location.href = social['Email'];
        }
      }},
  
      // Actions (extend anytime)
      { id: 'act-start', label: 'Start a project (scroll to contact)', group: 'Action', hint: 'Smooth scroll', run: () => scrollTo('#contact') },
    ], [social]);
  
    const results = useMemo(() => {
      if (!q) return cmds;
      const s = q.toLowerCase();
      return cmds.filter(c => (c.label + ' ' + (c.hint ?? '')).toLowerCase().includes(s));
    }, [q, cmds]);
  
    return (
      <>
        {/* Floating opener */}
        <Tooltip title="Open Command Palette (⌘/Ctrl + K)">
          <IconButton
            aria-label="Open command palette"
            onClick={() => setOpen(true)}
            sx={{
              position: 'fixed',
              right: 16,
              bottom: 16,
              zIndex: 1400,
              bgcolor: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
              '&:hover': { bgcolor: 'white', transform: 'translateY(-2px)' }
            }}
          >
            <Command size={18} />
          </IconButton>
        </Tooltip>
  
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,0.45)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden'
            }
          }}
        >
          {/* Header / Search */}
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              autoFocus
              fullWidth
              placeholder="Type a command…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton onClick={() => setOpen(false)} aria-label="Close palette">
              <X />
            </IconButton>
          </Box>
  
          {/* Results */}
          <Box sx={{ p: 1.5, maxHeight: 420, overflowY: 'auto' }}>
            <Stack spacing={1}>
              {results.map((c) => (
                <Paper
                  key={c.id}
                  onClick={() => { setOpen(false); setTimeout(c.run, 0); }}
                  elevation={0}
                  sx={{
                    p: 1.25,
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.06)',
                    background: 'rgba(255,255,255,0.85)',
                    cursor: 'pointer',
                    '&:hover': { background: 'rgba(255,255,255,1)', transform: 'translateY(-1px)' }
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {c.label}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                      {c.group === 'Social' && <ExternalLink size={14} />}
                      {c.group === 'Navigate' && <CornerDownRight size={14} />}
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{c.hint}</Typography>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
              {!results.length && (
                <Typography variant="body2" color="text.secondary" sx={{ px: 1.5, py: 6, textAlign: 'center' }}>
                  No matches. Try “Projects”, “LinkedIn”, “Contact”, …
                </Typography>
              )}
            </Stack>
          </Box>
  
          {/* Footer quicks */}
          <Box sx={{ p: 1.5, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button size="small" startIcon={<Github size={14} />} onClick={() => window.open(social['GitHub'], '_blank')}>GitHub</Button>
            <Button size="small" startIcon={<Linkedin size={14} />} onClick={() => window.open(social['LinkedIn'], '_blank')}>LinkedIn</Button>
            <Button size="small" startIcon={<Mail size={14} />} onClick={async () => {
              try { await navigator.clipboard.writeText('rahule.lohana97@gmail.com'); } catch { location.href = social['Email']; }
            }}>Copy Email</Button>
          </Box>
        </Dialog>
      </>
    );
  }
  