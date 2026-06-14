import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { getProcessingStatus, downloadResult } from '../utils/api';
import type { ProcessingJob } from '../types';
import '../styles/processing.css';

const STEP_LABELS: Record<string, string> = {
  audio_processing: '🎵 အသံ ဖယ်ရှားခြင်း',
  transcription: '📝 စာသားပြောင်းခြင်း',
  summarization: '📋 အနှစ်ချုပ်ခြင်း',
  voice_over: '🎙️ အသံ ထည့်သွင်းခြင်း',
  video_assembly: '🎬 ဗီဒီယို စုစည်းခြင်း',
  copyright_protection: '🛡️ မူလခွင့်အခွင့်ကာကွယ်ခြင်း',
};

export function ProcessingStatus() {
  const { currentJob, updateJob } = useAppStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentJob || currentJob.status === 'completed' || currentJob.status === 'error') {
      return;
    }

    const pollInterval = setInterval(async () => {
      try {
        const response = await getProcessingStatus(currentJob.id);
        updateJob(currentJob.id, response.job);
      } catch (err) {
        console.error('Failed to get status:', err);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(pollInterval);
  }, [currentJob, updateJob]);

  const handleDownload = async () => {
    if (!currentJob) return;

    setIsDownloading(true);
    setError(null);

    try {
      const blob = await downloadResult(currentJob.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `movie-recap-${currentJob.id}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Download failed';
      setError(message);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!currentJob) {
    return null;
  }

  const isComplete = currentJob.status === 'completed';
  const isError = currentJob.status === 'error';

  return (
    <div className="processing-status">
      <div className="status-header">
        <h2>အလုပ်လုပ်ဆောင်နေသည်</h2>
        <p className="job-id">Job ID: {currentJob.id}</p>
      </div>

      {/* Overall Progress */}
      <div className="overall-progress">
        <div className="progress-label">
          <span>OverAll Progress</span>
          <span className="progress-percent">{currentJob.progress}%</span>
        </div>
        <div className="progress-bar-large">
          <div className="progress-fill" style={{ width: `${currentJob.progress}%` }} />
        </div>
      </div>

      {/* Step Progress */}
      <div className="steps-progress">
        <h3>အဆင့်ဆင့် တိုးတက်မှု</h3>
        {currentJob.steps.map((step, index) => (
          <div key={index} className="step-item">
            <div className="step-header">
              <span className="step-label">{STEP_LABELS[step.step] || step.step}</span>
              <span className="step-progress">{step.progress}%</span>
            </div>
            <div className="step-progress-bar">
              <div className="progress-fill" style={{ width: `${step.progress}%` }} />
            </div>
            <p className="step-message">{step.message}</p>
          </div>
        ))}
      </div>

      {/* Status Messages */}
      {isError && (
        <div className="error-box">
          <p className="error-title">❌ အမှားအယွင်း</p>
          <p className="error-message">{currentJob.error}</p>
        </div>
      )}

      {isComplete && (
        <div className="success-box">
          <p className="success-title">✅ အောင်မြင်ပြီးပါပြီ!</p>
          <p className="success-message">သင်၏ Recap ဗီဒီယို ပြင်ဆင်ခြင်း အပြီးသတ်ပါပြီ။</p>
        </div>
      )}

      {/* Download Button */}
      {isComplete && (
        <button
          className="download-button"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? 'ဒေါင်းလုပ်းလုပ်နေသည်...' : '⬇️ ဗီဒီယို ဒေါင်းလုပ်းပါ'}
        </button>
      )}

      {error && (
        <div className="error-message" style={{ marginTop: '1rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}
