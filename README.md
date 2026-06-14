# Movie Recap Web App

ရုပ်ရှင်တစ်ကားလုံးကို ထည့်လိုက်တာနဲ့ အလိုအလျောက် မြန်မာဘာသာ Recap ဗီဒီယို ထွက်လာမယ့် Web Application

## Features

- 🎬 **Video Upload** — ဗီဒီယို ဖိုင်များကို Browser မှ တိုက်ရိုက် Upload တင်နိုင်ခြင်း
- 🎵 **Audio Processing** — Spleeter/Demucs သုံးပြီး အသံ ဖယ်ရှားခြင်း
- 📝 **Transcription** — OpenAI Whisper သုံးပြီး Dialog အား စာသားပြောင်းခြင်း
- 📋 **Summarization** — GPT-4 သုံးပြီး မြန်မာဘာသာ အနှစ်ချုပ်ခြင်း
- 🎙️ **Voice-over** — ElevenLabs သုံးပြီး မြန်မာအသံ ထည့်သွင်းခြင်း
- 🎬 **Video Assembly** — MoviePy သုံးပြီး Recap ဗီဒီယို စုစည်းခြင်း
- 🛡️ **Copyright Protection** — YouTube မှ copyright မိမ်ခြင်းကို ကာကွယ်ခြင်း
- ⬇️ **Download** — ပြီးစီးသော Recap ဗီဒီယို Download ပြန်ဆွဲနိုင်ခြင်း

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Zustand (State Management)
- Axios (HTTP Client)

### Backend
- Express.js
- Node.js
- Multer (File Upload)
- TypeScript

### Python Processing
- OpenAI Whisper (Transcription)
- OpenAI GPT-4 (Summarization)
- ElevenLabs (Voice-over)
- MoviePy (Video Assembly)
- Spleeter/Demucs (Audio Processing)

## Installation

### Prerequisites
- Node.js 18+
- Python 3.10+
- pnpm (or npm/yarn)

### Setup

1. Clone or extract the project:
```bash
cd /home/ubuntu/movie-recap-web
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```
OPENAI_API_KEY=sk-your-key
ELEVENLABS_API_KEY=your-key
```

5. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Development

Run the development server:
```bash
pnpm dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Production Build

Build for production:
```bash
pnpm build
```

Start production server:
```bash
pnpm start
```

## Project Structure

```
movie-recap-web/
├── src/
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── styles/            # CSS files
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── store.ts           # Zustand store
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── server.ts          # Express server
├── index.html             # HTML template
├── vite.config.ts         # Vite config
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
└── README.md              # This file
```

## API Endpoints

### Upload Video
```
POST /api/upload
Content-Type: multipart/form-data
Body: { file: File }
Response: { jobId, fileName, fileSize }
```

### Get Processing Status
```
GET /api/status/:jobId
Response: { job: ProcessingJob }
```

### Start Processing
```
POST /api/process/:jobId
Response: { success, message }
```

### Download Result
```
GET /api/download/:jobId
Response: Video file (blob)
```

### Get All Jobs
```
GET /api/jobs
Response: { jobs: ProcessingJob[] }
```

## Workflow Steps

1. **Audio Processing** — ရုပ်ရှင်ထဲက မူလအသံကို ဖယ်ရှားခြင်း
2. **Transcription** — Dialog အား English text အဖြစ် ပြောင်းခြင်း
3. **Summarization** — Transcript ကို GPT-4 သုံးပြီး မြန်မာ အနှစ်ချုပ် ရေးခြင်း
4. **Voice-over** — မြန်မာ အနှစ်ချုပ်ကို ElevenLabs သုံးပြီး အသံထည့်သွင်းခြင်း
5. **Video Assembly** — ရုပ်ရှင်ထဲက ရုပ်ပုံတွေ + မြန်မာ အသံ + Subtitles ပေါင်းစပ်ခြင်း
6. **Copyright Protection** — YouTube မှ copyright မိမ်ခြင်းကို ကာကွယ်ရန် cutting, speed change, transitions ထည့်သွင်းခြင်း

## License

MIT
