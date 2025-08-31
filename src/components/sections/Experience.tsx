import { Box, Container } from '@mui/material';
import { useState } from 'react';

import { WORK } from '@/data/resume';

import {
  Education,
  WorkTimeline,
  ExperienceHeader,
  ExperienceStats,
  computeYears,
  uniqueCountries,
} from './experience';

export default function Experience() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const yearsLabel = computeYears();
  const countries = uniqueCountries();

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
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' }, gap: 6 }}>
          <WorkTimeline
            work={WORK}
            expanded={expanded}
            onToggleExpanded={handleToggleExpanded}
          />
          <Box>
            <Education />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
