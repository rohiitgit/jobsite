'use client';

import { UnifiedHeader } from '@/components/layout/UnifiedHeader';
import { JobGrid } from '@/components/jobs/JobGrid';
import { useState } from 'react';
import type { JobQuery } from '@cybermind/shared';

export default function HomePage() {
  const [filters, setFilters] = useState<JobQuery>({
    page: 1,
    limit: 12, // Changed to 12 for better grid layout
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });

  const handleFiltersChange = (newFilters: Partial<JobQuery>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1, // Reset to page 1 when filters change (except when changing page directly)
    }));
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      paddingBottom: '40px'
    }}>
      <UnifiedHeader filters={filters} onFiltersChange={handleFiltersChange} />
      <JobGrid filters={filters} onFiltersChange={handleFiltersChange} />
    </div>
  );
}