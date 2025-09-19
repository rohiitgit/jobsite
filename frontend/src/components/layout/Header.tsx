'use client';

import React from 'react';
import {
  Container,
  Group,
  Button,
  Text,
  Box,
} from '@mantine/core';
import Link from 'next/link';

// 3D Cube logo matching the PNG design
const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Front face - Purple */}
    <path d="M8 8 L24 8 L28 12 L12 12 Z" fill="#7C3AED"/>
    {/* Top face - Pink */}
    <path d="M8 8 L12 4 L28 4 L24 8 Z" fill="#EC4899"/>
    {/* Right face - Orange */}
    <path d="M24 8 L28 4 L28 20 L24 24 Z" fill="#F59E0B"/>
    {/* Front face bottom */}
    <path d="M8 8 L12 12 L12 28 L8 24 Z" fill="#6366F1"/>
    {/* Bottom face */}
    <path d="M12 12 L28 12 L28 28 L12 28 Z" fill="#3B82F6"/>
  </svg>
);

interface HeaderProps {
  onCreateJobClick?: () => void;
}

export function Header({ onCreateJobClick }: HeaderProps) {
  const navigationItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Find Jobs', href: '/', active: false },
    { label: 'Find Talents', href: '/talents', active: false },
    { label: 'About us', href: '/about', active: false },
    { label: 'Testimonials', href: '/testimonials', active: false },
  ];

  return (
    <Box style={{
      backgroundColor: '#f9fafb',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '20px 0 10px 0',
    }}>
      <Container size="xl">
        <Box style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '16px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <Group justify="space-between" align="center">
            {/* Logo */}
            <Group gap="md">
              <LogoIcon />
              <Text
                size="xl"
                fw={700}
                c="dark"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  letterSpacing: '-0.5px'
                }}
              >
                CyberMind
              </Text>
            </Group>

            {/* Navigation */}
            <Group gap="lg" visibleFrom="md">
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
              component={Link}
              href="/jobs/create"
              onClick={onCreateJobClick}
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
      </Container>
    </Box>
  );
}