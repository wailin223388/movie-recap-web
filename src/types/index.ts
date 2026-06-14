// Processing Job Status
export type JobStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

// Workflow Step
export type WorkflowStep = 
  | 'audio_processing'
  | 'transcription'
  | 'summarization'
  | 'voice_over'
  | 'video_assembly'
  | 'copyright_protection';

// Job Progress
export interface JobProgress {
  step: WorkflowStep;
  progress: number; // 0-100
  message: string;
  timestamp: number;
}

// Processing Job
export interface ProcessingJob {
  id: string;
  status: JobStatus;
  inputFile: string;
  outputFile?: string;
  progress: number; // 0-100
  currentStep?: WorkflowStep;
  steps: JobProgress[];
  createdAt: number;
  completedAt?: number;
  error?: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Upload Response
export interface UploadResponse {
  jobId: string;
  fileName: string;
  fileSize: number;
}

// Processing Status Response
export interface ProcessingStatusResponse {
  job: ProcessingJob;
}

// Download Response
export interface DownloadResponse {
  url: string;
  fileName: string;
}
