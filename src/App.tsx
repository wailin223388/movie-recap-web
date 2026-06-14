import React from 'react';
import { UploadSection } from './components/UploadSection';
import { ProcessingStatus } from './components/ProcessingStatus';
import { useAppStore } from './store';
import './styles/app.css';

function App() {
  const { currentJob } = useAppStore();

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">🎬</div>
          <h1>Movie Recap</h1>
          <p>ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* Info Section */}
          <section className="info-section">
            <h2>ဘယ်လို အလုပ်လုပ်သည်</h2>
            <div className="workflow-grid">
              <div className="workflow-card">
                <div className="card-icon">🎵</div>
                <h3>အဆင့် 1</h3>
                <p>အသံ ဖယ်ရှားခြင်း</p>
              </div>
              <div className="workflow-card">
                <div className="card-icon">📝</div>
                <h3>အဆင့် 2</h3>
                <p>စာသားပြောင်းခြင်း</p>
              </div>
              <div className="workflow-card">
                <div className="card-icon">📋</div>
                <h3>အဆင့် 3</h3>
                <p>အနှစ်ချုပ်ခြင်း</p>
              </div>
              <div className="workflow-card">
                <div className="card-icon">🎙️</div>
                <h3>အဆင့် 4</h3>
                <p>အသံထည့်သွင်းခြင်း</p>
              </div>
              <div className="workflow-card">
                <div className="card-icon">🎬</div>
                <h3>အဆင့် 5</h3>
                <p>ဗီဒီယို စုစည်းခြင်း</p>
              </div>
              <div className="workflow-card">
                <div className="card-icon">🛡️</div>
                <h3>အဆင့် 6</h3>
                <p>မူလခွင့်ကာကွယ်ခြင်း</p>
              </div>
            </div>
          </section>

          {/* Upload or Processing */}
          {!currentJob ? (
            <UploadSection />
          ) : (
            <ProcessingStatus />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Movie Recap Web App • Python Automation Workflow</p>
        <p>OpenAI Whisper • GPT-4 • ElevenLabs • MoviePy</p>
      </footer>
    </div>
  );
}

export default App;
