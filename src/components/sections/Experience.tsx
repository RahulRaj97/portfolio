import { Box, Container } from '@mui/material';
import { useMemo, useState } from 'react';

import { WORK } from '@/data/resume';

import {
  Education,
  tallyTech,
  SkillPulse,
  WorkTimeline,
  ExperienceHeader,
  ExperienceStats,
  ExperienceFilters,
  computeYears,
  uniqueCountries,
} from './experience';

type Category = 'All' | 'Frontend' | 'Backend' | 'Data/AI' | 'Cloud/DevOps';

const CATEGORIES = [
  { label: 'All' as Category, match: /.*/i },
  { label: 'Frontend' as Category, match: /(react|angular|typescript|vite|cypress)/i },
  { label: 'Backend' as Category, match: /(node|python|c\+\+|express|postgres|mongodb|dgraph)/i },
  { label: 'Data/AI' as Category, match: /(airflow|superset|insights|data|analytics|ml)/i },
  { label: 'Cloud/DevOps' as Category, match: /(kubernetes|docker|gcp|ci\/cd|jenkins|ros|ubuntu)/i },
];

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

  const handleToggleExpanded = (id: string) => {
    setExpanded(e => ({ ...e, [id]: !e[id] }));
  };

  return (
    <Box id="experience" sx={{ py: { xs: 8, md: 10 }, position: 'relative' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <ExperienceHeader />
        
        <ExperienceStats
          yearsLabel={yearsLabel}
          workCount={WORK.length}
          countries={countries}
          techTop={techTop}
        />

        <ExperienceFilters
          category={category}
          onCategoryChange={setCategory}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' }, gap: 6 }}>
          <WorkTimeline
            filteredWork={filteredWork}
            expanded={expanded}
            onToggleExpanded={handleToggleExpanded}
          />
          <Box>
            <Education />
            <SkillPulse techTop={techTop} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
