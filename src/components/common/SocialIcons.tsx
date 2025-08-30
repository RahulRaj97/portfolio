import { IconButton, Stack } from '@mui/material';
import { Github, Linkedin, Mail } from 'lucide-react';

import { SOCIAL } from '../../config/site';

const ICONS = {
  Mail,
  Github,
  Linkedin,
} as const;

export default function SocialIcons({ size = 24 }: { size?: number }) {
  return (
    <Stack direction="row" spacing={2}>
      {SOCIAL.map((s) => {
        const Icon = ICONS[s.icon];
        const isExternal = s.label !== 'Email';
        return (
          <IconButton
            key={s.label}
            component="a"
            href={s.href}
            aria-label={s.label}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            sx={{
              color: s.color,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid var(--color-neutral-200)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Icon size={size} />
          </IconButton>
        );
      })}
    </Stack>
  );
}
