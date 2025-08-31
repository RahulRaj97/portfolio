import { Chip, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

type Category = 'All' | 'Frontend' | 'Backend' | 'Data/AI' | 'Cloud/DevOps';

interface ExperienceFiltersProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

const CATEGORIES: { label: Category; match: RegExp }[] = [
  { label: 'All', match: /.*/i },
  { label: 'Frontend', match: /(react|angular|typescript|vite|cypress)/i },
  { label: 'Backend', match: /(node|python|c\+\+|express|postgres|mongodb|dgraph)/i },
  { label: 'Data/AI', match: /(airflow|superset|insights|data|analytics|ml)/i },
  { label: 'Cloud/DevOps', match: /(kubernetes|docker|gcp|ci\/cd|jenkins|ros|ubuntu)/i },
];

export function ExperienceFilters({ category, onCategoryChange }: ExperienceFiltersProps) {
  return (
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
            onClick={() => onCategoryChange(c.label)}
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
  );
}
