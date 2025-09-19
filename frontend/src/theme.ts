import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  primaryColor: 'blue',
  white: '#ffffff',
  colors: {
    blue: [
      '#e7f5ff',
      '#d0ebff',
      '#a5d8ff',
      '#74c0fc',
      '#4dabf7',
      '#339af0',
      '#1890ff', // Main blue from design
      '#1c7ed6',
      '#1971c2',
      '#1864ab',
    ],
    purple: [
      '#f3f0ff',
      '#e5dbff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7048e8', // Main purple for buttons
      '#6741d9',
      '#5f3dc4',
      '#5729c1',
    ],
    gray: [
      '#f8f9fa',
      '#f1f3f4',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#6c757d',
      '#495057',
      '#343a40',
      '#212529',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
    Textarea: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
      },
    },
    Badge: {
      defaultProps: {
        size: 'sm',
        radius: 'md',
      },
    },
  },
});