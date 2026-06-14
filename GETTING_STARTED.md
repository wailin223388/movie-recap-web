# 🎬 Movie Recap Web App — Getting Started

ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း Web Application

---

## 📍 Project Location

```
/home/ubuntu/movie-recap-web
```

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
cd /home/ubuntu/movie-recap-web
pnpm install
```

### Step 2: Setup Environment Variables

```bash
cp .env.example .env
```

Then edit `.env` and add your API keys:
- `OPENAI_API_KEY` — Get from https://platform.openai.com/api-keys
- `ELEVENLABS_API_KEY` — Get from https://elevenlabs.io/api

### Step 3: Start Development Server

```bash
pnpm dev
```

### Step 4: Open in Browser

Go to: **http://localhost:5173**

## 📚 Documentation

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | 5-minute setup guide |
| **INSTALLATION.md** | Detailed installation instructions |
| **README.md** | Project overview and features |
| **DEPLOYMENT.md** | Production deployment guide |

## 🔑 API Keys

### OpenAI (Required for Whisper + GPT-4)
1. Visit https://platform.openai.com/api-keys
2. Create new API key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`

### ElevenLabs (Required for Voice-over)
1. Visit https://elevenlabs.io/api
2. Get API key from Profile section
3. Add to `.env`: `ELEVENLABS_API_KEY=...`

## 🎬 What the App Does

### 6-Step Workflow

1. **🎵 Audio Processing** — Remove original audio from video
2. **📝 Transcription** — Convert dialog to English text (OpenAI Whisper)
3. **📋 Summarization** — Create Burmese summary (GPT-4)
4. **🎙️ Voice-over** — Generate Burmese voice-over (ElevenLabs)
5. **🎬 Video Assembly** — Combine video + audio + subtitles (MoviePy)
6. **🛡️ Copyright Protection** — Apply anti-detection techniques

### User Flow

1. Upload a video file (MP4, MKV, AVI, etc.)
2. Watch real-time progress as each step completes
3. Download the final recap video

## 📦 What's Included

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Zustand for state management
- Responsive dark theme UI
- Real-time progress tracking

### Backend
- Express.js server
- Multer for file uploads
- RESTful API endpoints
- Job state management

### Processing
- Python 3.10+ automation
- 6-step workflow pipeline
- Integration with OpenAI, ElevenLabs, MoviePy

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Zustand, Axios |
| Backend | Express.js, Node.js, Multer |
| Processing | Python 3.10+, Whisper, GPT-4, ElevenLabs, MoviePy |
| Styling | CSS3, Responsive Design |

## 📋 System Requirements

- **Node.js:** 18+ (recommended 22+)
- **Python:** 3.10+
- **Disk Space:** 5GB+
- **RAM:** 4GB+ (8GB+ for video processing)

## 🎯 Common Commands

```bash
# Start development (frontend + backend)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run frontend only
pnpm dev:client

# Run backend only
pnpm dev:server

# Test setup
bash test-setup.sh
```

## 📁 Project Structure

```
movie-recap-web/
├── src/
│   ├── components/          # React UI components
│   ├── styles/              # CSS files
│   ├── types/               # TypeScript types
│   ├── utils/               # API utilities
│   ├── App.tsx              # Main component
│   ├── main.tsx             # React entry
│   ├── store.ts             # Zustand store
│   ├── server.ts            # Express backend
│   └── server/
│       └── processor.py     # Python workflow
├── dist/                    # Built files
├── uploads/                 # Uploaded videos
├── outputs/                 # Output videos
├── temp/                    # Job state
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite config
├── tsconfig.json            # TypeScript config
├── requirements.txt         # Python deps
└── README.md                # Full docs
```

## 🌐 API Endpoints

```
POST   /api/upload              Upload video
GET    /api/status/:jobId       Get job status
POST   /api/process/:jobId      Start processing
GET    /api/download/:jobId     Download result
GET    /api/jobs                List all jobs
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
PORT=3001 pnpm dev:server
```

### API Keys Not Working
- Verify `.env` file exists
- Check keys are correct
- Restart dev server

### Video Upload Fails
- Check file size (max 500MB)
- Verify `uploads/` directory exists
- Check available disk space

### Processing Stuck
- Check `temp/{jobId}.json` for status
- Verify Python dependencies installed
- Check API quotas

## 💡 Tips

- Use smaller videos for testing (< 100MB)
- Keep terminal open to see logs
- Check browser console (F12) for errors
- Monitor `temp/` directory for job state

## 🚀 Next Steps

1. ✅ Install dependencies: `pnpm install`
2. ✅ Setup environment: `cp .env.example .env`
3. ✅ Add API keys to `.env`
4. ✅ Start server: `pnpm dev`
5. ✅ Open http://localhost:5173
6. ✅ Upload a test video
7. 📖 Read full documentation
8. 🚀 Deploy to production

## 📞 Support

- Check logs in `temp/{jobId}.json`
- Review API responses in Network tab (F12)
- Read error messages carefully
- Verify all dependencies installed

---

**Ready to create recap videos?** 🎬

Start with: `pnpm dev`
