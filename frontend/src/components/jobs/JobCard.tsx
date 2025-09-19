'use client';

import React from 'react';
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  Box,
  ActionIcon,
  Menu,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconMapPin,
  IconCurrencyDollar,
  IconBriefcase,
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconCheck,
} from '@tabler/icons-react';
import Link from 'next/link';
import { modals } from '@mantine/modals';
import { Job, JobType } from '@cybermind/shared';
import { getCompanyLogo } from '@/components/ui/CompanyLogos';

interface JobCardProps {
  job: Job;
  onDelete?: (id: string) => void;
}

const JOB_TYPE_LABELS: Record<JobType, string> = {
  [JobType.FULL_TIME]: 'Full-time',
  [JobType.PART_TIME]: 'Part-time',
  [JobType.CONTRACT]: 'Contract',
  [JobType.INTERNSHIP]: 'Internship',
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours}h Ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '24h Ago';
    return `${diffInDays}d Ago`;
  }
};

export function JobCard({ job, onDelete }: JobCardProps) {
  const CompanyLogo = getCompanyLogo(job.companyName);
  const timeAgo = getTimeAgo(job.createdAt);

  const handleDeleteJob = () => {
    modals.openConfirmModal({
      title: 'Delete Job',
      children: (
        <Text size="sm">
          Are you sure you want to delete the job "{job.title}"? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => onDelete?.(job.id),
    });
  };

  const handleApplyClick = () => {
    notifications.show({
      title: 'Application Submitted Successfully!',
      message: `Your application for "${job.title}" at ${job.companyName} has been submitted. We'll notify you about the next steps.`,
      color: 'green',
      icon: <IconCheck size={20} />,
      autoClose: 6000,
      style: {
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.15)',
      },
      styles: {
        root: {
          backgroundColor: '#f0fdf4',
          borderColor: '#bbf7d0',
        },
        title: {
          color: '#15803d',
          fontWeight: 600,
          fontSize: '16px',
        },
        description: {
          color: '#166534',
          fontSize: '14px',
          lineHeight: 1.5,
        },
        icon: {
          backgroundColor: '#22c55e',
          color: 'white',
        },
        closeButton: {
          color: '#15803d',
          '&:hover': {
            backgroundColor: '#dcfce7',
          },
        },
      },
    });
  };

  // Extract bullet points from description (simplified)
  const getDescriptionPoints = (description: string): string[] => {
    const points = description.split('\n').filter(line => line.trim().length > 0);
    return points.slice(0, 2); // Show only first 2 points
  };

  const descriptionPoints = getDescriptionPoints(job.description);

  return (
    <Card
      p="md"
      style={{
        height: '320px', // Fixed height for consistent square-like appearance
        position: 'relative',
        background: '#ffffff',
        border: '1px solid #f5f5f5',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header with logo and timestamp */}
      <Group justify="space-between" mb="sm">
        <CompanyLogo size={50} />
        <Badge
          color="blue"
          variant="light"
          size="sm"
          style={{
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            fontWeight: 600,
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '6px',
          }}
        >
          {timeAgo}
        </Badge>
      </Group>

      {/* Admin actions menu */}
      <Box style={{ position: 'absolute', top: 12, right: 12 }}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray" size="sm">
              <IconDots style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              href={`/jobs/${job.id}`}
              leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
            >
              View Details
            </Menu.Item>
            <Menu.Item
              component={Link}
              href={`/jobs/${job.id}/edit`}
              leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
            >
              Edit Job
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              onClick={handleDeleteJob}
            >
              Delete Job
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>

      <Stack gap="sm" style={{ flex: 1 }}>
        {/* Job title */}
        <Text
          fw={700}
          size="lg"
          c="#1f2937"
          lineClamp={1}
          style={{
            lineHeight: 1.3,
            fontSize: '18px',
            letterSpacing: '-0.025em'
          }}
        >
          {job.title}
        </Text>

        {/* Job metadata */}
        <Group gap="md">
          <Group gap="xs">
            <IconBriefcase size={12} color="#9ca3af" />
            <Text size="xs" c="#6b7280" fw={500}>1-3 yr Exp</Text>
          </Group>
          <Group gap="xs">
            <IconMapPin size={12} color="#9ca3af" />
            <Text size="xs" c="#6b7280" fw={500}>
              {job.location.includes('Remote') ? 'Remote' : 'Onsite'}
            </Text>
          </Group>
          <Group gap="xs">
            <IconCurrencyDollar size={12} color="#9ca3af" />
            <Text size="xs" c="#6b7280" fw={500}>
              {job.salaryRange || '12LPA'}
            </Text>
          </Group>
        </Group>

        {/* Description points */}
        <Stack gap="xs" style={{ flex: 1, minHeight: '80px' }}>
          {descriptionPoints.map((point, index) => (
            <Group key={index} gap="xs" align="flex-start">
              <Box
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  backgroundColor: '#9ca3af',
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
              <Text
                size="xs"
                c="#6b7280"
                style={{
                  flex: 1,
                  lineHeight: 1.5,
                  fontSize: '12px',
                  fontWeight: 400
                }}
              >
                {point.replace(/^[•\-\*]\s*/, '')}
              </Text>
            </Group>
          ))}
        </Stack>

        {/* Apply Now Button */}
        <Button
          onClick={handleApplyClick}
          fullWidth
          size="md"
          style={{
            background: 'linear-gradient(135deg, #1890ff 0%, #69b7ff 100%)',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            marginTop: 'auto',
          }}
        >
          Apply Now
        </Button>
      </Stack>
    </Card>
  );
}