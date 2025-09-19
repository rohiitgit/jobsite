'use client';

import React, { useState } from 'react';
import {
  Container,
  Group,
  Button,
  Text,
  Box,
} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { CreateJobModal } from '@/components/jobs/CreateJobModal';

const LogoIcon = () => (
  <Image
    src="/icon.svg"
    alt="Logo"
    width={40}
    height={40}
    style={{ display: 'block' }}
  />
);

interface SimpleHeaderProps {}

export function SimpleHeader() {
  const [createJobModalOpened, setCreateJobModalOpened] = useState(false);
  const navigationItems = [
    { label: 'Home', href: '/', active: false },
    { label: 'Find Jobs', href: '/', active: false },
    { label: 'Find Talents', href: '/talents', active: false },
    { label: 'About us', href: '/about', active: false },
    { label: 'Testimonials', href: '/testimonials', active: false },
  ];

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
      <Container size="xl" style={{ padding: '20px' }}>
        <Box style={{
          padding: '20px 0',
        }}>
          <Box style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '50px',
            padding: '12px 32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            maxWidth: '800px',
            margin: '0 auto',
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