'use client';

import { Container, Title, Paper, Group, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { JobForm } from '@/components/jobs/JobForm';

export default function CreateJobPage() {
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

        <Title order={1} mb="xl">
          Create New Job
        </Title>

        <Paper p="xl" withBorder style={{ backgroundColor: '#ffffff' }}>
          <JobForm />
        </Paper>
      </Container>
    </div>
  );
}