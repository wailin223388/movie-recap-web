import { create } from 'zustand';
import type { ProcessingJob, JobStatus, WorkflowStep } from './types';

interface AppState {
  // Job Management
  currentJob: ProcessingJob | null;
  jobs: ProcessingJob[];
  
  // UI State
  isProcessing: boolean;
  uploadProgress: number;
  
  // Actions
  setCurrentJob: (job: ProcessingJob | null) => void;
  addJob: (job: ProcessingJob) => void;
  updateJob: (jobId: string, updates: Partial<ProcessingJob>) => void;
  setIsProcessing: (value: boolean) => void;
  setUploadProgress: (progress: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentJob: null,
  jobs: [],
  isProcessing: false,
  uploadProgress: 0,
  
  setCurrentJob: (job) => set({ currentJob: job }),
  
  addJob: (job) => set((state) => ({
    jobs: [job, ...state.jobs],
    currentJob: job,
  })),
  
  updateJob: (jobId, updates) => set((state) => {
    const updatedJobs = state.jobs.map((job) =>
      job.id === jobId ? { ...job, ...updates } : job
    );
    
    const updatedCurrentJob = state.currentJob?.id === jobId
      ? { ...state.currentJob, ...updates }
      : state.currentJob;
    
    return {
      jobs: updatedJobs,
      currentJob: updatedCurrentJob,
    };
  }),
  
  setIsProcessing: (value) => set({ isProcessing: value }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
}));
