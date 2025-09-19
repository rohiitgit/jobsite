'use client';

import React from 'react';
import {
  Modal,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Button,
  Grid,
  Stack,
  Group,
  Title,
  Box,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { JobType, type CreateJobRequest } from '@cybermind/shared';
import { useCreateJob } from '@/hooks/useJobs';

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
}

const createJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  companyName: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  jobType: z.nativeEnum(JobType),
  salaryMin: z.number().min(0, 'Minimum salary must be positive'),
  salaryMax: z.number().min(0, 'Maximum salary must be positive'),
  description: z.string().min(1, 'Job description is required'),
});

type CreateJobFormData = z.infer<typeof createJobSchema>;

const JOB_TYPE_OPTIONS = [
  { value: JobType.INTERNSHIP, label: 'Internship' },
  { value: JobType.FULL_TIME, label: 'Full Time' },
  { value: JobType.PART_TIME, label: 'Partime' },
  { value: JobType.CONTRACT, label: 'Contract' },
];

const LOCATION_OPTIONS = [
  'Chennai',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Remote',
];

export function CreateJobModal({ opened, onClose }: CreateJobModalProps) {
  const createJobMutation = useCreateJob();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: '',
      companyName: '',
      location: '',
      jobType: JobType.FULL_TIME,
      salaryMin: 0,
      salaryMax: 1200000,
      description: '',
    },
  });

  const onSubmit = async (data: CreateJobFormData, isDraft: boolean = false) => {
    try {
      // Set application deadline to 30 days from now
      const applicationDeadline = new Date();
      applicationDeadline.setDate(applicationDeadline.getDate() + 30);

      const createJobData: CreateJobRequest = {
        title: data.title,
        companyName: data.companyName,
        location: data.location,
        jobType: data.jobType,
        salaryRange: `₹${data.salaryMin.toLocaleString()} - ₹${data.salaryMax.toLocaleString()}`,
        description: data.description,
        // Required fields with default values since they're not in the UI
        requirements: "Requirements will be updated based on the job description provided.",
        responsibilities: "Responsibilities will be updated based on the job description provided.",
        applicationDeadline: applicationDeadline.toISOString(),
      };

      await createJobMutation.mutateAsync(createJobData);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleSaveDraft = () => {
    handleSubmit((data) => onSubmit(data, true))();
  };

  const handlePublish = () => {
    handleSubmit((data) => onSubmit(data, false))();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title=""
      size="lg"
      centered
      styles={{
        content: {
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
        },
        header: {
          display: 'none',
        },
        body: {
          padding: 0,
        },
      }}
    >
      <Stack gap="xl">
        {/* Modal Title */}
        <Title
          order={2}
          ta="center"
          fw={600}
          c="#1f2937"
          style={{
            fontSize: '28px',
            marginBottom: '16px',
          }}
        >
          Create Job Opening
        </Title>

        {/* Form */}
        <form>
          <Stack gap="lg">
            {/* Job Title and Company Name Row */}
            <Grid>
              <Grid.Col span={6}>
                <Stack gap="xs">
                  <Box
                    component="label"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    Job Title
                  </Box>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="Full Stack Developer"
                        error={errors.title?.message}
                        styles={{
                          input: {
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '16px',
                            '&:focus': {
                              borderColor: '#1890ff',
                              boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack gap="xs">
                  <Box
                    component="label"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    Company Name
                  </Box>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="Amazon"
                        error={errors.companyName?.message}
                        styles={{
                          input: {
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '16px',
                            '&:focus': {
                              borderColor: '#1890ff',
                              boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Location and Job Type Row */}
            <Grid>
              <Grid.Col span={6}>
                <Stack gap="xs">
                  <Box
                    component="label"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    Location
                  </Box>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Chennai"
                        data={LOCATION_OPTIONS}
                        error={errors.location?.message}
                        styles={{
                          input: {
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '16px',
                            '&:focus': {
                              borderColor: '#1890ff',
                              boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack gap="xs">
                  <Box
                    component="label"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    Job Type
                  </Box>
                  <Controller
                    name="jobType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        data={JOB_TYPE_OPTIONS}
                        error={errors.jobType?.message}
                        styles={{
                          input: {
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '16px',
                            '&:focus': {
                              borderColor: '#1890ff',
                              boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Salary Range Row */}
            <Grid>
              <Grid.Col span={6}>
                <Stack gap="xs">
                  <Box
                    component="label"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    Salary Range
                  </Box>
                  <Group gap="md">
                    <Controller
                      name="salaryMin"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          {...field}
                          placeholder="₹0"
                          prefix="₹"
                          thousandSeparator=","
                          error={errors.salaryMin?.message}
                          styles={{
                            input: {
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              padding: '12px 16px',
                              fontSize: '16px',
                              '&:focus': {
                                borderColor: '#1890ff',
                                boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                              },
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="salaryMax"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          {...field}
                          placeholder="₹12,00,000"
                          prefix="₹"
                          thousandSeparator=","
                          error={errors.salaryMax?.message}
                          styles={{
                            input: {
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              padding: '12px 16px',
                              fontSize: '16px',
                              '&:focus': {
                                borderColor: '#1890ff',
                                boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* Empty column to maintain layout */}
              </Grid.Col>
            </Grid>

            {/* Job Description */}
            <Stack gap="xs">
              <Box
                component="label"
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#374151',
                }}
              >
                Job Description
              </Box>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Please share a description to let the candidate know..."
                    rows={6}
                    error={errors.description?.message}
                    styles={{
                      input: {
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '16px',
                        resize: 'none',
                        '&:focus': {
                          borderColor: '#1890ff',
                          boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)',
                        },
                      },
                    }}
                  />
                )}
              />
            </Stack>

            {/* Action Buttons */}
            <Group justify="space-between" mt="xl">
              <Button
                variant="outline"
                size="md"
                onClick={handleSaveDraft}
                loading={createJobMutation.isPending}
                styles={{
                  root: {
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                    },
                  },
                }}
              >
                Save Draft ▼
              </Button>
              <Button
                size="md"
                onClick={handlePublish}
                loading={createJobMutation.isPending}
                styles={{
                  root: {
                    background: 'linear-gradient(135deg, #1890ff 0%, #69b7ff 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                  },
                }}
              >
                Publish ≫
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}