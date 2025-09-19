export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  jobs: {
    list: '/jobs',
    create: '/jobs',
    get: (id: string) => `/jobs/${id}`,
    update: (id: string) => `/jobs/${id}`,
    delete: (id: string) => `/jobs/${id}`,
  },
} as const;

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public response?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const formatSalaryRange = (min?: number, max?: number): string => {
  if (!min && !max) return '';
  if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  if (min) return `$${min.toLocaleString()}+`;
  if (max) return `Up to $${max.toLocaleString()}`;
  return '';
};

export const parseSalaryRange = (salaryRange?: string): { min?: number; max?: number } => {
  if (!salaryRange) return {};

  const cleanRange = salaryRange.replace(/[$,]/g, '');
  const rangeMatch = cleanRange.match(/(\d+)\s*-\s*(\d+)/);

  if (rangeMatch) {
    return {
      min: parseInt(rangeMatch[1]),
      max: parseInt(rangeMatch[2]),
    };
  }

  const minMatch = cleanRange.match(/(\d+)\+/);
  if (minMatch) {
    return { min: parseInt(minMatch[1]) };
  }

  const maxMatch = cleanRange.match(/up\s+to\s+(\d+)/i);
  if (maxMatch) {
    return { max: parseInt(maxMatch[1]) };
  }

  const singleMatch = cleanRange.match(/(\d+)/);
  if (singleMatch) {
    return { min: parseInt(singleMatch[1]) };
  }

  return {};
};