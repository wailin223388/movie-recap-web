import axios from 'axios';
import type { ApiResponse, UploadResponse, ProcessingStatusResponse, DownloadResponse } from '../types';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 600000, // 10 minutes for long-running operations
});

// Upload video file
export async function uploadVideo(
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<ApiResponse<UploadResponse>>(
    '/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          onProgress?.(progress);
        }
      },
    }
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Upload failed');
  }

  return response.data.data;
}

// Get processing status
export async function getProcessingStatus(jobId: string): Promise<ProcessingStatusResponse> {
  const response = await apiClient.get<ApiResponse<ProcessingStatusResponse>>(
    `/status/${jobId}`
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to get status');
  }

  return response.data.data;
}

// Start processing
export async function startProcessing(jobId: string): Promise<void> {
  const response = await apiClient.post<ApiResponse<void>>(
    `/process/${jobId}`
  );

  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to start processing');
  }
}

// Download result
export async function downloadResult(jobId: string): Promise<Blob> {
  const response = await apiClient.get(
    `/download/${jobId}`,
    {
      responseType: 'blob',
    }
  );

  return response.data;
}

// Get job list
export async function getJobList(): Promise<any[]> {
  const response = await apiClient.get<ApiResponse<any[]>>('/jobs');

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to get jobs');
  }

  return response.data.data;
}

export default apiClient;
