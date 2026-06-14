import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Directories
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const OUTPUT_DIR = process.env.OUTPUT_DIR || './outputs';
const TEMP_DIR = process.env.TEMP_DIR || './temp';

// Create directories if they don't exist
[UPLOAD_DIR, OUTPUT_DIR, TEMP_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist/client'));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '500000000'), // 500MB
  },
});

// In-memory job store (in production, use a database)
interface Job {
  id: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  inputFile: string;
  outputFile?: string;
  progress: number;
  currentStep?: string;
  steps: any[];
  createdAt: number;
  completedAt?: number;
  error?: string;
}

const jobs = new Map<string, Job>();

// API Routes

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded',
    });
  }

  const jobId = uuidv4();
  const job: Job = {
    id: jobId,
    status: 'uploading',
    inputFile: req.file.filename,
    progress: 0,
    steps: [],
    createdAt: Date.now(),
  };

  jobs.set(jobId, job);

  res.json({
    success: true,
    data: {
      jobId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
    },
  });
});

// Get processing status
app.get('/api/status/:jobId', (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      error: 'Job not found',
    });
  }

  res.json({
    success: true,
    data: {
      job,
    },
  });
});

// Start processing
app.post('/api/process/:jobId', async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      error: 'Job not found',
    });
  }

  job.status = 'processing';
  job.progress = 0;

  // Simulate processing workflow
  processVideo(jobId).catch((error) => {
    const job = jobs.get(jobId);
    if (job) {
      job.status = 'error';
      job.error = error.message;
    }
  });

  res.json({
    success: true,
    message: 'Processing started',
  });
});

// Download result
app.get('/api/download/:jobId', (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      error: 'Job not found',
    });
  }

  if (job.status !== 'completed' || !job.outputFile) {
    return res.status(400).json({
      success: false,
      error: 'Video not ready for download',
    });
  }

  const filePath = path.join(OUTPUT_DIR, job.outputFile);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: 'Output file not found',
    });
  }

  res.download(filePath, `movie-recap-${jobId}.mp4`);
});

// Get all jobs
app.get('/api/jobs', (req: Request, res: Response) => {
  const jobList = Array.from(jobs.values()).sort(
    (a, b) => b.createdAt - a.createdAt
  );

  res.json({
    success: true,
    data: jobList,
  });
});

// Serve React app for all other routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Simulate video processing
async function processVideo(jobId: string) {
  const job = jobs.get(jobId);
  if (!job) return;

  const steps = [
    { name: 'audio_processing', label: 'အသံ ဖယ်ရှားခြင်း', duration: 3 },
    { name: 'transcription', label: 'စာသားပြောင်းခြင်း', duration: 5 },
    { name: 'summarization', label: 'အနှစ်ချုပ်ခြင်း', duration: 3 },
    { name: 'voice_over', label: 'အသံထည့်သွင်းခြင်း', duration: 4 },
    { name: 'video_assembly', label: 'ဗီဒီယို စုစည်းခြင်း', duration: 4 },
    { name: 'copyright_protection', label: 'မူလခွင့်ကာကွယ်ခြင်း', duration: 2 },
  ];

  let totalProgress = 0;

  for (const step of steps) {
    const stepStartProgress = totalProgress;
    const stepDuration = step.duration * 1000; // Convert to ms
    const startTime = Date.now();

    while (Date.now() - startTime < stepDuration) {
      const elapsed = Date.now() - startTime;
      const stepProgress = Math.min(100, Math.round((elapsed / stepDuration) * 100));
      totalProgress = Math.round(stepStartProgress + stepProgress / steps.length);

      job.currentStep = step.name;
      job.progress = totalProgress;
      job.steps = [
        ...job.steps.filter((s) => s.step !== step.name),
        {
          step: step.name,
          progress: stepProgress,
          message: step.label,
          timestamp: Date.now(),
        },
      ];

      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Ensure step is marked as 100% complete
    job.steps = job.steps.map((s) =>
      s.step === step.name ? { ...s, progress: 100 } : s
    );
  }

  // Mark as completed
  job.status = 'completed';
  job.progress = 100;
  job.outputFile = `recap-${jobId}.mp4`;
  job.completedAt = Date.now();

  // Create a dummy output file
  const outputPath = path.join(OUTPUT_DIR, job.outputFile);
  fs.writeFileSync(outputPath, Buffer.from('Mock video file'));
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
