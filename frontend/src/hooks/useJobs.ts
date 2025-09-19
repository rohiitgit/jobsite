import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { apiClient } from '@/services/api';
import type { JobQuery, CreateJobRequest, UpdateJobRequest } from '@cybermind/shared';

export const JOBS_QUERY_KEY = 'jobs';

export function useJobs(query?: JobQuery) {
  return useQuery({
    queryKey: [JOBS_QUERY_KEY, query],
    queryFn: () => apiClient.getJobs(query),
    enabled: true,
  });
}

export function useJob(id: string | null) {
  return useQuery({
    queryKey: [JOBS_QUERY_KEY, id],
    queryFn: () => apiClient.getJob(id!),
    enabled: !!id,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobRequest) => apiClient.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
      notifications.show({
        title: 'Success',
        message: 'Job created successfully',
        color: 'green',
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to create job',
        color: 'red',
      });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobRequest }) =>
      apiClient.updateJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
      notifications.show({
        title: 'Success',
        message: 'Job updated successfully',
        color: 'green',
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to update job',
        color: 'red',
      });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
      notifications.show({
        title: 'Success',
        message: 'Job deleted successfully',
        color: 'green',
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to delete job',
        color: 'red',
      });
    },
  });
}