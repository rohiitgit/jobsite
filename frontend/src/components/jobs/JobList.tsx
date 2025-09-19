'use client';

import React from 'react';
import {
  Table,
  Paper,
  Badge,
  Group,
  Text,
  Pagination,
  Center,
  Loader,
  Alert,
  ActionIcon,
  Menu,
  rem,
  Select,
  Stack,
} from '@mantine/core';
import {
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconAlertCircle,
} from '@tabler/icons-react';
import { useJobs, useDeleteJob } from '@/hooks/useJobs';
import { modals } from '@mantine/modals';
import Link from 'next/link';
import { JobType } from '@cybermind/shared';
import type { JobQuery } from '@cybermind/shared';

interface JobListProps {
  filters: JobQuery;
  onFiltersChange: (filters: Partial<JobQuery>) => void;
}

const JOB_TYPE_COLORS: Record<JobType, string> = {
  [JobType.FULL_TIME]: 'blue',
  [JobType.PART_TIME]: 'green',
  [JobType.CONTRACT]: 'orange',
  [JobType.INTERNSHIP]: 'purple',
};

const JOB_TYPE_LABELS: Record<JobType, string> = {
  [JobType.FULL_TIME]: 'Full-time',
  [JobType.PART_TIME]: 'Part-time',
  [JobType.CONTRACT]: 'Contract',
  [JobType.INTERNSHIP]: 'Internship',
};

export function JobList({ filters, onFiltersChange }: JobListProps) {
  const { data, isLoading, error } = useJobs(filters);
  const deleteJobMutation = useDeleteJob();

  const handleDeleteJob = (id: string, title: string) => {
    modals.openConfirmModal({
      title: 'Delete Job',
      children: (
        <Text size="sm">
          Are you sure you want to delete the job "{title}"? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteJobMutation.mutate(id),
    });
  };

  const handlePageChange = (page: number) => {
    onFiltersChange({ page });
  };

  const handleLimitChange = (limit: string | null) => {
    if (limit) {
      onFiltersChange({ limit: parseInt(limit), page: 1 });
    }
  };

  const handleSortChange = (sortBy: string | null) => {
    if (sortBy) {
      onFiltersChange({ sortBy, page: 1 });
    }
  };

  const handleSortOrderChange = (sortOrder: string | null) => {
    if (sortOrder) {
      onFiltersChange({ sortOrder: sortOrder as 'ASC' | 'DESC', page: 1 });
    }
  };

  if (isLoading) {
    return (
      <Paper p="xl" withBorder>
        <Center>
          <Loader size="lg" />
        </Center>
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        {error.message || 'Failed to load jobs'}
      </Alert>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Paper p="xl" withBorder>
        <Center>
          <Stack align="center" gap="md">
            <Text size="lg" c="dimmed">
              No jobs found
            </Text>
            <Text size="sm" c="dimmed">
              Try adjusting your filters or create a new job posting
            </Text>
          </Stack>
        </Center>
      </Paper>
    );
  }

  return (
    <Stack gap="md">
      <Paper withBorder>
        <Group justify="space-between" p="md" bg="gray.1">
          <Group gap="md">
            <Text size="sm" fw={500}>
              Sort by:
            </Text>
            <Select
              size="xs"
              value={filters.sortBy || 'createdAt'}
              onChange={handleSortChange}
              data={[
                { value: 'createdAt', label: 'Created Date' },
                { value: 'title', label: 'Job Title' },
                { value: 'companyName', label: 'Company' },
                { value: 'location', label: 'Location' },
                { value: 'applicationDeadline', label: 'Deadline' },
              ]}
              w={150}
            />
            <Select
              size="xs"
              value={filters.sortOrder || 'DESC'}
              onChange={handleSortOrderChange}
              data={[
                { value: 'DESC', label: 'Newest First' },
                { value: 'ASC', label: 'Oldest First' },
              ]}
              w={130}
            />
          </Group>

          <Group gap="md">
            <Text size="sm" c="dimmed">
              {data.total} total jobs
            </Text>
            <Group gap="xs">
              <Text size="sm">Show:</Text>
              <Select
                size="xs"
                value={String(filters.limit || 10)}
                onChange={handleLimitChange}
                data={[
                  { value: '5', label: '5' },
                  { value: '10', label: '10' },
                  { value: '25', label: '25' },
                  { value: '50', label: '50' },
                ]}
                w={70}
              />
            </Group>
          </Group>
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Job Title</Table.Th>
              <Table.Th>Company</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Salary</Table.Th>
              <Table.Th>Deadline</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.data.map((job) => (
              <Table.Tr key={job.id}>
                <Table.Td>
                  <Text fw={500} lineClamp={1}>
                    {job.title}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text lineClamp={1}>{job.companyName}</Text>
                </Table.Td>
                <Table.Td>
                  <Text lineClamp={1}>{job.location}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={JOB_TYPE_COLORS[job.jobType]}
                    variant="light"
                    size="sm"
                  >
                    {JOB_TYPE_LABELS[job.jobType]}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c={job.salaryRange ? undefined : 'dimmed'}>
                    {job.salaryRange || 'Not specified'}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <IconDots style={{ width: rem(16), height: rem(16) }} />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        component={Link}
                        href={`/jobs/${job.id}`}
                        leftSection={
                          <IconEye style={{ width: rem(14), height: rem(14) }} />
                        }
                      >
                        View Details
                      </Menu.Item>
                      <Menu.Item
                        component={Link}
                        href={`/jobs/${job.id}/edit`}
                        leftSection={
                          <IconEdit style={{ width: rem(14), height: rem(14) }} />
                        }
                      >
                        Edit Job
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        color="red"
                        leftSection={
                          <IconTrash style={{ width: rem(14), height: rem(14) }} />
                        }
                        onClick={() => handleDeleteJob(job.id, job.title)}
                      >
                        Delete Job
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {data.totalPages > 1 && (
        <Center>
          <Pagination
            total={data.totalPages}
            value={data.page}
            onChange={handlePageChange}
          />
        </Center>
      )}
    </Stack>
  );
}