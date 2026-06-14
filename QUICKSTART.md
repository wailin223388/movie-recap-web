# Movie Recap Web App — Quick Start

ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း Web Application ကို လျင်မြန်စွာ စတင်ရန်

## 🚀 5-Minute Setup

### 1. Install & Setup (2 minutes)

```bash
cd /home/ubuntu/movie-recap-web

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Edit .env and add your API keys:
# OPENAI_API_KEY=sk-your-key
# ELEVENLABS_API_KEY=your-key
```

### 2. Start Development Server (1 minute)

```bash
pnpm dev
```

### 3. Open in Browser (1 minute)

Go to: **http://localhost:5173**

### 4. Upload & Process (1 minute)

1. Drag & drop a video file (or click to select)
2. Watch the 6-step processing workflow
3. Download your Recap video when done!

## 📋 What's Included

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | React 18 + TypeScript | Video upload, progress tracking, download |
| **Backend** | Express.js + Node.js | API endpoints, file handling |
| **Processing** | Python 3.10+ | 6-step workflow automation |
| **State** | Zustand | Client-side state management |
| **Styling** | CSS3 | Responsive dark theme |

## 🎬 Workflow Steps

1. **🎵 Audio Processing** — Remove original audio
2. **📝 Transcription** — Convert dialog to English (Whisper)
3. **📋 Summarization** — Create Burmese summary (GPT-4)
4. **🎙️ Voice-over** — Generate Burmese audio (ElevenLabs)
5. **🎬 Video Assembly** — Combine all elements (MoviePy)
6. **🛡️ Copyright Protection** — Anti-detection techniques

## 📁 Project Structure

```
movie-recap-web/
├── src/
│   ├── components/          # React UI components
│   ├── styles/              # CSS files
│   ├── utils/               # API client
│   ├── App.tsx              # Main component
│   ├── server.ts            # Express backend
│   └── server/processor.py  # Python workflow
├── dist/                    # Built files
├── uploads/                 # Uploaded videos
├── outputs/                 # Output videos
├── temp/                    # Job state files
└── README.md                # Full documentation
```

## 🔑 Get API Keys

### OpenAI (Whisper + GPT-4)
1. Go to https://platform.openai.com/api-keys
2. Create new key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`

### ElevenLabs (Voice-over)
1. Go to https://elevenlabs.io/api
2. Get API key from Profile
3. Add to `.env`: `ELEVENLABS_API_KEY=...`

## 🎯 Common Tasks

### Run Development Server
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
pnpm start
```

### Run Frontend Only
```bash
pnpm dev:client
```

### Run Backend Only
```bash
pnpm dev:server
```

### Test Setup
```bash
bash test-setup.sh
```

## 🌐 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/upload` | Upload video |
| GET | `/api/status/:jobId` | Get processing status |
| POST | `/api/process/:jobId` | Start processing |
| GET | `/api/download/:jobId` | Download result |
| GET | `/api/jobs` | List all jobs |

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
- Check disk space

### Processing Stuck
- Check `temp/{jobId}.json` for status
- Verify Python dependencies installed
- Check API quotas

## 📚 Full Documentation

- **[README.md](./README.md)** — Project overview
- **[INSTALLATION.md](./INSTALLATION.md)** — Detailed setup guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Production deployment

## 🚀 Next Steps

1. ✅ Setup environment variables
2. ✅ Run development server
3. ✅ Test with sample video
4. 📖 Read full documentation
5. 🚀 Deploy to production

## 💡 Tips

- Use smaller videos for testing (< 100MB)
- Keep terminal open to see logs
- Check browser console (F12) for errors
- Monitor `temp/` directory for job state

## 📞 Support

- Check logs in `temp/{jobId}.json`
- Review API responses in Network tab
- Read error messages carefully
- Verify all dependencies installed

---

**Ready to create recap videos?** 🎬

Start with: `pnpm dev`
