'use client';

import React from 'react';
import {
  Paper,
  TextInput,
  Select,
  RangeSlider,
  Group,
  Button,
  Stack,
  Text,
  NumberInput,
  Grid,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconClearAll } from '@tabler/icons-react';
import { JobType } from '@cybermind/shared';
import type { JobQuery } from '@cybermind/shared';

interface JobFiltersProps {
  filters: JobQuery;
  onFiltersChange: (filters: Partial<JobQuery>) => void;
}

const JOB_TYPE_OPTIONS = [
  { value: JobType.FULL_TIME, label: 'Full-time' },
  { value: JobType.PART_TIME, label: 'Part-time' },
  { value: JobType.CONTRACT, label: 'Contract' },
  { value: JobType.INTERNSHIP, label: 'Internship' },
];

const SALARY_MIN = 0;
const SALARY_MAX = 300000;

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
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

  const clearFilters = () => {
    onFiltersChange({
      title: undefined,
      location: undefined,
      jobType: undefined,
      salaryMin: undefined,
      salaryMax: undefined,
      page: 1,
    });
  };

  const hasActiveFilters = !!(
    filters.title ||
    filters.location ||
    filters.jobType ||
    filters.salaryMin ||
    filters.salaryMax
  );

  return (
    <Paper p="md" withBorder>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <TextInput
            label="Job Title"
            placeholder="Search by title..."
            leftSection={<IconSearch size={16} />}
            value={filters.title || ''}
            onChange={(event) =>
              onFiltersChange({ title: event.currentTarget.value || undefined })
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <TextInput
            label="Location"
            placeholder="Search by location..."
            leftSection={<IconMapPin size={16} />}
            value={filters.location || ''}
            onChange={(event) =>
              onFiltersChange({ location: event.currentTarget.value || undefined })
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Select
            label="Job Type"
            placeholder="Select job type..."
            data={JOB_TYPE_OPTIONS}
            value={filters.jobType || null}
            onChange={(value) =>
              onFiltersChange({ jobType: value as JobType | undefined })
            }
            clearable
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Group justify="center" mt="lg">
            <Button
              variant="outline"
              leftSection={<IconClearAll size={16} />}
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
          </Group>
        </Grid.Col>

        <Grid.Col span={12}>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                Salary Range
              </Text>
              <Text size="sm" c="dimmed">
                ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
              </Text>
            </Group>
            <RangeSlider
              min={SALARY_MIN}
              max={SALARY_MAX}
              step={5000}
              value={salaryRange}
              onChange={handleSalaryRangeChange}
              marks={[
                { value: 0, label: '$0' },
                { value: 75000, label: '$75K' },
                { value: 150000, label: '$150K' },
                { value: 225000, label: '$225K' },
                { value: 300000, label: '$300K' },
              ]}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}