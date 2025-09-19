'use client';

import React from 'react';
import {
  Container,
  Title,
  Paper,
  Group,
  Button,
  Alert,
  Loader,
  Center,
} from '@mantine/core';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useJob } from '@/hooks/useJobs';
import { JobForm } from '@/components/jobs/JobForm';

interface EditJobPageProps {
  params: { id: string };
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const { data: job, isLoading, error } = useJob(params.id);

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
            href={`/jobs/${job.id}`}
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to Job Details
          </Button>
        </Group>

        <Title order={1} mb="xl">
          Edit Job: {job.title}
        </Title>

        <Paper p="xl" withBorder style={{ backgroundColor: '#ffffff' }}>
          <JobForm job={job} isEdit />
        </Paper>
      </Container>
    </div>
  );
}