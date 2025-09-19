'use client';

import React, { useState } from 'react';
import {
  Container,
  Group,
  Button,
  Text,
  Box,
  TextInput,
  Select,
  RangeSlider,
  Stack,
  Divider,
} from '@mantine/core';
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { JobType } from '@cybermind/shared';
import type { JobQuery } from '@cybermind/shared';
import { CreateJobModal } from '@/components/jobs/CreateJobModal';

// Logo from public/icon.svg
const LogoIcon = () => (
  <Image
    src="/icon.svg"
    alt="Logo"
    width={40}
    height={40}
    style={{ display: 'block' }}
  />
);

interface UnifiedHeaderProps {
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

export function UnifiedHeader({ filters, onFiltersChange }: UnifiedHeaderProps) {
  const [createJobModalOpened, setCreateJobModalOpened] = useState(false);
  const navigationItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Find Jobs', href: '/', active: false },
    { label: 'Find Talents', href: '/talents', active: false },
    { label: 'About us', href: '/about', active: false },
    { label: 'Testimonials', href: '/testimonials', active: false },
  ];

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
    <>
    <Box style={{
      backgroundColor: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100vw',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb',
    }}>
      <Container size="xl" style={{ padding: '10px 20px' }}>
        <Box style={{
          padding: '10px 0',
        }}>
          {/* Navigation Section */}
          <Box style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '50px',
            padding: '12px 32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            maxWidth: '800px',
            margin: '0 auto 10px auto',
          }}>
            <Group justify="space-between" align="center" style={{ width: '100%' }}>
              {/* Logo */}
              <LogoIcon />

              {/* Navigation - Centered */}
              <Group gap="lg" style={{ flex: 1, justifyContent: 'center' }}>
                {navigationItems.map((item) => (
                  <Text
                    key={item.label}
                    component={Link}
                    href={item.href}
                    size="sm"
                    fw={item.active ? 600 : 500}
                    c={item.active ? 'dark' : '#6b7280'}
                    style={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      backgroundColor: item.active ? '#f3f4f6' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!item.active) {
                        e.currentTarget.style.color = '#374151';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!item.active) {
                        e.currentTarget.style.color = '#6b7280';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </Text>
                ))}
              </Group>

              {/* Create Jobs Button */}
              <Button
                onClick={() => setCreateJobModalOpened(true)}
                style={{
                  background: 'linear-gradient(135deg, #1890ff 0%, #69b7ff 100%)',
                  border: 'none',
                  fontWeight: 600,
                  padding: '10px 20px',
                }}
                size="md"
                radius="8"
              >
                Create Jobs
              </Button>
            </Group>
          </Box>

        </Box>

        {/* Search and Filters Section - Full Width */}
        <Box style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          backgroundColor: '#ffffff',
          padding: '10px 0'
        }}>
          <Container size="xl">
            <Group gap={0} align="center" style={{
              backgroundColor: 'transparent',
              width: '100%'
            }}>
              {/* Search Input */}
              <Box style={{ flex: 1 }}>
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
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0',
                      padding: '14px 16px 14px 45px',
                      fontSize: '14px',
                      fontWeight: 500,
                      '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                      },
                      '&::placeholder': {
                        color: '#9ca3af',
                        fontWeight: 400,
                      },
                    },
                  }}
                />
              </Box>

              {/* Vertical Divider */}
              <Box style={{
                width: '1px',
                height: '40px',
                backgroundColor: '#e5e7eb',
                flexShrink: 0
              }} />

              {/* Location Filter */}
              <Box style={{ flex: 1 }}>
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
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0',
                      padding: '14px 16px 14px 45px',
                      fontSize: '14px',
                      fontWeight: 500,
                      '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                      },
                      '&::placeholder': {
                        color: '#9ca3af',
                        fontWeight: 400,
                      },
                    },
                  }}
                />
              </Box>

              {/* Vertical Divider */}
              <Box style={{
                width: '1px',
                height: '40px',
                backgroundColor: '#e5e7eb',
                flexShrink: 0
              }} />

              {/* Job Type Filter */}
              <Box style={{ flex: 1 }}>
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
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0',
                      padding: '14px 16px 14px 45px',
                      fontSize: '14px',
                      fontWeight: 500,
                      '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                      },
                      '&::placeholder': {
                        color: '#9ca3af',
                        fontWeight: 400,
                      },
                    },
                  }}
                />
              </Box>

              {/* Vertical Divider */}
              <Box style={{
                width: '1px',
                height: '40px',
                backgroundColor: '#e5e7eb',
                flexShrink: 0
              }} />

              {/* Salary Filter */}
              <Box style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack gap="xs">
                  <Group justify="space-between" align="center">
                    <Text size="sm" fw={500} c="#6b7280">
                      Salary Per Month
                    </Text>
                    <Text size="sm" fw={600} c="#1890ff">
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
                    size="sm"
                    thumbSize={14}
                    styles={{
                      track: {
                        backgroundColor: '#e9ecef',
                        height: 4,
                      },
                      bar: {
                        backgroundColor: '#1890ff',
                      },
                      thumb: {
                        borderColor: '#1890ff',
                        backgroundColor: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        border: '2px solid #1890ff',
                      },
                      markLabel: {
                        fontSize: '11px',
                        color: '#9ca3af',
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
          </Container>
        </Box>
      </Container>
    </Box>

    {/* Create Job Modal */}
    <CreateJobModal
      opened={createJobModalOpened}
      onClose={() => setCreateJobModalOpened(false)}
    />
  </>
  );
}