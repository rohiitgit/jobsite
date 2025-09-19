import {
  ApiError,
  API_BASE_URL,
  API_ENDPOINTS,
  Job,
  JobResponse,
  CreateJobRequest,
  UpdateJobRequest,
  JobQuery,
} from '@cybermind/shared';

class ApiClient {
  private baseURL = API_BASE_URL;

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          errorData,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
    }
  }

  async getJobs(query?: JobQuery): Promise<JobResponse> {
    const searchParams = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }

    const queryString = searchParams.toString();
    const endpoint = `${API_ENDPOINTS.jobs.list}${queryString ? `?${queryString}` : ''}`;

    return this.request<JobResponse>(endpoint);
  }

  async getJob(id: string): Promise<Job> {
    return this.request<Job>(API_ENDPOINTS.jobs.get(id));
  }

  async createJob(data: CreateJobRequest): Promise<Job> {
    return this.request<Job>(API_ENDPOINTS.jobs.create, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateJob(id: string, data: UpdateJobRequest): Promise<Job> {
    return this.request<Job>(API_ENDPOINTS.jobs.update(id), {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteJob(id: string): Promise<void> {
    await this.request<void>(API_ENDPOINTS.jobs.delete(id), {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();