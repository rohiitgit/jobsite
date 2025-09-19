'use client';

import React from 'react';
import {
  SimpleGrid,
  Center,
  Loader,
  Alert,
  Stack,
  Text,
  Container,
  Pagination,
  Group,
  Select,
  Button,
} from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';
import { useJobs, useDeleteJob } from '@/hooks/useJobs';
import { JobCard } from './JobCard';
import type { JobQuery } from '@cybermind/shared';

interface JobGridProps {
  filters: JobQuery;
  onFiltersChange: (filters: Partial<JobQuery>) => void;
}

export function JobGrid({ filters, onFiltersChange }: JobGridProps) {
  const { data, isLoading, error, refetch } = useJobs(filters);
  const deleteJobMutation = useDeleteJob();

  const handleDeleteJob = (id: string) => {
    deleteJobMutation.mutate(id);
  };

  const handlePageChange = (page: number) => {
    onFiltersChange({ page });
  };

  const handleLimitChange = (limit: string | null) => {
    if (limit) {
      onFiltersChange({ limit: parseInt(limit), page: 1 });
    }
  };

  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Center style={{ minHeight: 400 }}>
          <Stack align="center" gap="md">
            <Loader size="lg" color="#1890ff" />
            <Text c="#6b7280" fw={500}>Loading jobs...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Failed to load jobs"
          color="red"
          variant="light"
        >
          <Stack gap="md">
            <Text size="sm">
              {error.message || 'Something went wrong while fetching jobs.'}
            </Text>
            <Button
              leftSection={<IconRefresh size={16} />}
              variant="outline"
              size="sm"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </Stack>
        </Alert>
      </Container>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Container size="xl" py="xl">
        <Center style={{ minHeight: 400 }}>
          <Stack align="center" gap="md">
            <Text size="xl" fw={600} c="#374151">
              No jobs found
            </Text>
            <Text size="md" c="#6b7280" fw={500}>
              Try adjusting your search criteria or filters
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" py="lg">
      <Stack gap="lg">
        {/* Results info and pagination controls */}
        <Group justify="space-between" mb="md">
          <Text size="xl" fw={700} c="#1f2937">
            {data.total} jobs found
          </Text>

          <Group gap="md">
            <Group gap="xs">
              <Text size="sm" c="#6b7280" fw={500}>Show:</Text>
              <Select
                size="sm"
                value={String(filters.limit || 12)}
                onChange={handleLimitChange}
                data={[
                  { value: '8', label: '8' },
                  { value: '12', label: '12' },
                  { value: '16', label: '16' },
                  { value: '24', label: '24' },
                ]}
                w={70}
                styles={{
                  input: {
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                  },
                }}
              />
              <Text size="sm" c="#6b7280" fw={500}>per page</Text>
            </Group>
          </Group>
        </Group>

        {/* Job Cards Grid */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="md"
          verticalSpacing="md"
          style={{
            gap: '16px',
          }}
        >
          {data.data.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDeleteJob}
            />
          ))}
        </SimpleGrid>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <Center py="xl">
            <Stack align="center" gap="md">
              <Pagination
                total={data.totalPages}
                value={data.page}
                onChange={handlePageChange}
                size="md"
                radius="md"
                styles={{
                  control: {
                    border: '1px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    fontWeight: 500,
                    '&[data-active]': {
                      background: 'linear-gradient(135deg, #1890ff 0%, #69b7ff 100%)',
                      borderColor: '#1890ff',
                      color: '#ffffff',
                    },
                    '&:hover:not([data-active])': {
                      backgroundColor: '#f9fafb',
                      borderColor: '#1890ff',
                    },
                  },
                }}
              />
              <Text size="sm" c="#6b7280" fw={500}>
                Page {data.page} of {data.totalPages} ({data.total} total jobs)
              </Text>
            </Stack>
          </Center>
        )}
      </Stack>
    </Container>
  );
}