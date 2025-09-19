export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: JobType;
  salaryRange?: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobRequest {
  title: string;
  companyName: string;
  location: string;
  jobType: JobType;
  salaryRange?: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {}

export interface JobQuery {
  title?: string;
  location?: string;
  jobType?: JobType;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface JobResponse {
  data: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}