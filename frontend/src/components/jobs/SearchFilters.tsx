'use client';

import React from 'react';
import {
  Paper,
  TextInput,
  Select,
  RangeSlider,
  Group,
  Stack,
  Text,
  Box,
  Container,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { JobType } from '@cybermind/shared';
import type { JobQuery } from '@cybermind/shared';

interface SearchFiltersProps {
  filters: JobQuery;
  onFiltersChange: (filters: Partial<JobQuery>) => void;
}

const JOB_TYPE_OPTIONS = [
  { value: JobType.FULL_TIME, label: 'Full-time' },
  { value: JobType.PART_TIME, label: 'Part-time' },
  { value: JobType.CONTRACT, label: 'Contract' },
  { value: JobType.INTERNSHIP, label: 'Internship' },
];

const SALARY_MIN = 50000;
const SALARY_MAX = 80000;

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const salaryRange: [number, number] = [
    filters.salaryMin ?? SALARY_MIN,
    filters.salaryMax ?? SALARY_MAX,
  ];

  const handleSalaryRangeChange = (value: [number, number]) => {
    onFiltersChange({
      salaryMin: value[0] === SALARY_MIN ? undefined : value[0],
      salaryMax: value[1] === SALARY_MAX ? undefined : value[1],
    });
  };

  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(0)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}k`;
  };

  return (
    <Container size="xl" py={0} mb="lg">
      {/* Single Row with all filters */}
      <Box
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '8px'
        }}
      >
        <Group gap="md" align="end">
        {/* Search Input */}
        <Box style={{ flex: 1, minWidth: 280 }}>
          <TextInput
            placeholder="Search By Job Title, Role"
            leftSection={<IconSearch size={18} color="#9ca3af" />}
            size="lg"
            value={filters.title || ''}
            onChange={(event) =>
              onFiltersChange({ title: event.currentTarget.value || undefined })
            }
            styles={{
              input: {
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '14px 16px 14px 45px',
                fontSize: '14px',
                fontWeight: 500,
                '&:focus': {
                  borderColor: '#1890ff',
                  boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                },
                '&::placeholder': {
                  color: '#9ca3af',
                  fontWeight: 400,
                },
              },
            }}
          />
        </Box>

        {/* Location Filter */}
        <Box style={{ minWidth: 180 }}>
          <Select
            placeholder="Preferred Location"
            leftSection={<IconMapPin size={18} color="#9ca3af" />}
            data={[
              'Remote',
              'San Francisco, CA',
              'New York, NY',
              'Los Angeles, CA',
              'Boston, MA',
              'Seattle, WA',
              'Austin, TX',
              'Chicago, IL',
            ]}
            value={filters.location || null}
            onChange={(value) =>
              onFiltersChange({ location: value || undefined })
            }
            clearable
            size="lg"
            styles={{
              input: {
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '14px 16px 14px 45px',
                fontSize: '14px',
                fontWeight: 500,
                '&:focus': {
                  borderColor: '#1890ff',
                  boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                },
                '&::placeholder': {
                  color: '#9ca3af',
                  fontWeight: 400,
                },
              },
            }}
          />
        </Box>

        {/* Job Type Filter */}
        <Box style={{ minWidth: 160 }}>
          <Select
            placeholder="Job type"
            leftSection={<IconBriefcase size={18} color="#9ca3af" />}
            data={JOB_TYPE_OPTIONS}
            value={filters.jobType || null}
            onChange={(value) =>
              onFiltersChange({ jobType: value as JobType | undefined })
            }
            clearable
            size="lg"
            styles={{
              input: {
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '14px 16px 14px 45px',
                fontSize: '14px',
                fontWeight: 500,
                '&:focus': {
                  borderColor: '#1890ff',
                  boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                },
                '&::placeholder': {
                  color: '#9ca3af',
                  fontWeight: 400,
                },
              },
            }}
          />
        </Box>

        {/* Salary Filter - Right Side */}
        <Box style={{ minWidth: 280 }}>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={600} c="#374151">
                Salary Per Month
              </Text>
              <Text size="sm" fw={700} c="#1890ff">
                {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
              </Text>
            </Group>

            <RangeSlider
              min={SALARY_MIN}
              max={SALARY_MAX}
              step={5000}
              value={salaryRange}
              onChange={handleSalaryRangeChange}
              color="blue"
              size="md"
              thumbSize={18}
              styles={{
                track: {
                  backgroundColor: '#e9ecef',
                  height: 6,
                },
                range: {
                  backgroundColor: '#1890ff',
                },
                thumb: {
                  borderColor: '#1890ff',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
              }}
              marks={[
                { value: 50000, label: '₹50k' },
                { value: 80000, label: '₹80k' },
              ]}
            />
          </Stack>
        </Box>
        </Group>
      </Box>
    </Container>
  );
}