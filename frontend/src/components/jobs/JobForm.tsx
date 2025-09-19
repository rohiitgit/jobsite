'use client';

import React from 'react';
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Stack,
  Grid,
  Group,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useCreateJob, useUpdateJob } from '@/hooks/useJobs';
import { createJobSchema, JobType } from '@cybermind/shared';
import type { Job, CreateJobRequest } from '@cybermind/shared';

interface JobFormProps {
  job?: Job;
  isEdit?: boolean;
}

const JOB_TYPE_OPTIONS = [
  { value: JobType.FULL_TIME, label: 'Full-time' },
  { value: JobType.PART_TIME, label: 'Part-time' },
  { value: JobType.CONTRACT, label: 'Contract' },
  { value: JobType.INTERNSHIP, label: 'Internship' },
];

export function JobForm({ job, isEdit = false }: JobFormProps) {
  const router = useRouter();
  const createJobMutation = useCreateJob();
  const updateJobMutation = useUpdateJob();

  const form = useForm<CreateJobRequest>({
    validate: zodResolver(createJobSchema),
    initialValues: {
      title: job?.title || '',
      companyName: job?.companyName || '',
      location: job?.location || '',
      jobType: job?.jobType || JobType.FULL_TIME,
      salaryRange: job?.salaryRange || '',
      description: job?.description || '',
      requirements: job?.requirements || '',
      responsibilities: job?.responsibilities || '',
      applicationDeadline: job?.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().split('T')[0]
        : '',
    },
  });

  const handleSubmit = async (values: CreateJobRequest) => {
    try {
      if (isEdit && job) {
        await updateJobMutation.mutateAsync({
          id: job.id,
          data: values,
        });
      } else {
        await createJobMutation.mutateAsync(values);
      }
      router.push('/');
    } catch (error) {
      // Error handling is done in the hooks
    }
  };

  const isLoading = createJobMutation.isPending || updateJobMutation.isPending;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Job Title"
              placeholder="Enter job title"
              required
              {...form.getInputProps('title')}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Company Name"
              placeholder="Enter company name"
              required
              {...form.getInputProps('companyName')}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Location"
              placeholder="Enter job location"
              required
              {...form.getInputProps('location')}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Job Type"
              placeholder="Select job type"
              data={JOB_TYPE_OPTIONS}
              required
              {...form.getInputProps('jobType')}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Salary Range"
              placeholder="e.g., $80,000 - $120,000"
              {...form.getInputProps('salaryRange')}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <DateInput
              label="Application Deadline"
              placeholder="Select deadline date"
              required
              minDate={new Date()}
              value={form.values.applicationDeadline ? new Date(form.values.applicationDeadline) : null}
              onChange={(date) => {
                form.setFieldValue(
                  'applicationDeadline',
                  date ? date.toISOString().split('T')[0] : ''
                );
              }}
              error={form.errors.applicationDeadline}
            />
          </Grid.Col>
        </Grid>

        <Textarea
          label="Job Description"
          placeholder="Describe the job position, responsibilities, and what the candidate will be doing..."
          required
          minRows={4}
          {...form.getInputProps('description')}
        />

        <Textarea
          label="Requirements"
          placeholder="List the required skills, experience, education, and qualifications..."
          required
          minRows={4}
          {...form.getInputProps('requirements')}
        />

        <Textarea
          label="Responsibilities"
          placeholder="Detail the key responsibilities and duties of this role..."
          required
          minRows={4}
          {...form.getInputProps('responsibilities')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
          >
            {isEdit ? 'Update Job' : 'Create Job'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}