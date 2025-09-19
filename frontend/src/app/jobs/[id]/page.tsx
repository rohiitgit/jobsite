'use client';

import React from 'react';
import {
  Container,
  Title,
  Paper,
  Group,
  Button,
  Text,
  Badge,
  Stack,
  Divider,
  Grid,
  Alert,
  Loader,
  Center,
} from '@mantine/core';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconCalendar,
  IconMapPin,
  IconBuilding,
  IconAlertCircle,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useJob, useDeleteJob } from '@/hooks/useJobs';
import { modals } from '@mantine/modals';
import { JobType } from '@cybermind/shared';

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

interface JobDetailPageProps {
  params: { id: string };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const router = useRouter();
  const { data: job, isLoading, error } = useJob(params.id);
  const deleteJobMutation = useDeleteJob();

  const handleDeleteJob = () => {
    if (!job) return;

    modals.openConfirmModal({
      title: 'Delete Job',
      children: (
        <Text size="sm">
          Are you sure you want to delete the job "{job.title}"? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteJobMutation.mutate(job.id);
        router.push('/');
      },
    });
  };

  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <SimpleHeader />
        <Container size="md" py="xl">
          <Paper p="xl" withBorder>
            <Center>
              <Loader size="lg" />
            </Center>
          </Paper>
        </Container>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <SimpleHeader />
        <Container size="md" py="xl">
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            {error?.message || 'Job not found'}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <SimpleHeader />
      <Container size="md" py="xl">
      <Group mb="lg">
        <Button
          component={Link}
          href="/"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Jobs
        </Button>
      </Group>

      <Paper p="md" withBorder>
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Title order={1}>{job.title}</Title>
              <Group gap="md">
                <Group gap="xs">
                  <IconBuilding size={16} />
                  <Text size="lg" fw={500}>
                    {job.companyName}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text size="lg">{job.location}</Text>
                </Group>
              </Group>
              <Group gap="md">
                <Badge
                  color={JOB_TYPE_COLORS[job.jobType]}
                  variant="light"
                  size="lg"
                >
                  {JOB_TYPE_LABELS[job.jobType]}
                </Badge>
                {job.salaryRange && (
                  <Text size="lg" fw={500} c="green">
                    {job.salaryRange}
                  </Text>
                )}
              </Group>
            </Stack>

            <Group gap="md">
              <Button
                component={Link}
                href={`/jobs/${job.id}/edit`}
                leftSection={<IconEdit size={16} />}
                variant="outline"
              >
                Edit
              </Button>
              <Button
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={handleDeleteJob}
                loading={deleteJobMutation.isPending}
              >
                Delete
              </Button>
            </Group>
          </Group>

          <Group gap="md">
            <Group gap="xs">
              <IconCalendar size={16} />
              <Text size="sm" c="dimmed">
                Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </Text>
            {job.updatedAt !== job.createdAt && (
              <Text size="sm" c="dimmed">
                Updated: {new Date(job.updatedAt).toLocaleDateString()}
              </Text>
            )}
          </Group>

          <Divider />

          <Grid>
            <Grid.Col span={12}>
              <Stack gap="md">
                <div>
                  <Title order={3} mb="sm">
                    Job Description
                  </Title>
                  <Text style={{ whiteSpace: 'pre-line' }}>
                    {job.description}
                  </Text>
                </div>

                <div>
                  <Title order={3} mb="sm">
                    Requirements
                  </Title>
                  <Text style={{ whiteSpace: 'pre-line' }}>
                    {job.requirements}
                  </Text>
                </div>

                <div>
                  <Title order={3} mb="sm">
                    Responsibilities
                  </Title>
                  <Text style={{ whiteSpace: 'pre-line' }}>
                    {job.responsibilities}
                  </Text>
                </div>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
      </Container>
    </div>
  );
}