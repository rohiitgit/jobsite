import { z } from 'zod';
import { JobType } from '../types/job.types';

export const jobTypeSchema = z.nativeEnum(JobType);

export const createJobSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(255, 'Company name must be less than 255 characters'),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(255, 'Location must be less than 255 characters'),
  jobType: jobTypeSchema,
  salaryRange: z
    .string()
    .max(100, 'Salary range must be less than 100 characters')
    .optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  requirements: z
    .string()
    .min(10, 'Requirements must be at least 10 characters')
    .max(5000, 'Requirements must be less than 5000 characters'),
  responsibilities: z
    .string()
    .min(10, 'Responsibilities must be at least 10 characters')
    .max(5000, 'Responsibilities must be less than 5000 characters'),
  applicationDeadline: z
    .string()
    .refine((date) => new Date(date) > new Date(), {
      message: 'Application deadline must be in the future',
    })
    .transform((date) => new Date(date)),
});

export const updateJobSchema = createJobSchema.partial();

export const jobQuerySchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  jobType: jobTypeSchema.optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
});

export type CreateJobData = z.infer<typeof createJobSchema>;
export type UpdateJobData = z.infer<typeof updateJobSchema>;
export type JobQueryData = z.infer<typeof jobQuerySchema>;