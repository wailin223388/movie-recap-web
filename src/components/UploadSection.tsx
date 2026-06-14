import React, { useRef, useState } from 'react';
import { useAppStore } from '../store';
import { uploadVideo, startProcessing } from '../utils/api';
import { v4 as uuidv4 } from 'uuid';
import type { ProcessingJob } from '../types';
import '../styles/upload.css';

export function UploadSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addJob, setUploadProgress, setIsProcessing } = useAppStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = async (file: File) => {
    setError(null);
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('ဗီဒီယို ဖိုင်သာ လက်ခံပါသည်။');
      return;
    }

    // Validate file size (500MB max)
    const MAX_SIZE = 500 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError('ဖိုင်အရွယ်အစား 500MB ထက်မကျော်သင့်ပါ။');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload file
      const uploadResult = await uploadVideo(file, (progress) => {
        setUploadProgress(progress);
      });

      // Create job
      const job: ProcessingJob = {
        id: uploadResult.jobId,
        status: 'uploading',
        inputFile: uploadResult.fileName,
        progress: 0,
        steps: [],
        createdAt: Date.now(),
      };

      addJob(job);

      // Start processing
      setIsProcessing(true);
      await startProcessing(uploadResult.jobId);

      setUploadProgress(0);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="upload-section">
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">🎬</div>
        <h2>ရုပ်ရှင်ဖိုင်ကို ဒီနေရာတွင် ရွှေ့ခြင်း</h2>
        <p>သို့မဟုတ် ဖိုင်ရွေးချယ်ရန် နှိပ်ပါ</p>
        <p className="upload-hint">ဗီဒီယို ဖိုင် (MP4, MKV, AVI, etc.) - အများဆုံး 500MB</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileInputChange}
        disabled={isUploading}
        style={{ display: 'none' }}
      />

      {error && <div className="error-message">{error}</div>}

      {isUploading && (
        <div className="upload-progress">
          <p>ဖိုင်ကို အပ်လုပ်နေသည်...</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${useAppStore((s) => s.uploadProgress)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
