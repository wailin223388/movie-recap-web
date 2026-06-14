# Movie Recap Web App — Installation & Usage Guide

ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း Web Application ကို ထည့်သွင်းပြီး အသုံးပြုရန် လမ်းညွှန်

## System Requirements

- **Node.js:** 18+ (recommended 22+)
- **Python:** 3.10+
- **npm/pnpm:** Latest version
- **Disk Space:** 5GB+ (for dependencies and processing)
- **RAM:** 4GB+ (8GB+ recommended for video processing)

## Installation Steps

### 1. Clone or Extract Project

```bash
cd /home/ubuntu/movie-recap-web
```

### 2. Install Node Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Install Python Dependencies

```bash
# Create virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Setup Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```
# OpenAI API Key
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-actual-key-here

# ElevenLabs API Key
# Get from: https://elevenlabs.io/api
ELEVENLABS_API_KEY=your-actual-key-here

# Server Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=500000000
UPLOAD_DIR=./uploads
TEMP_DIR=./temp
OUTPUT_DIR=./outputs
```

### 5. Build Frontend (Optional for Development)

```bash
pnpm build
```

This creates optimized production build in `dist/client/`.

## Running the Application

### Development Mode

Start both frontend and backend together:

```bash
pnpm dev
```

This will:
- Start Vite dev server on **http://localhost:5173**
- Start Express backend on **http://localhost:3000**
- Enable hot module reloading (HMR)

### Run Frontend and Backend Separately

**Terminal 1 - Frontend (Vite):**
```bash
pnpm dev:client
```
Access at: **http://localhost:5173**

**Terminal 2 - Backend (Express):**
```bash
pnpm dev:server
```
API available at: **http://localhost:3000/api**

### Production Mode

Build and run for production:

```bash
# Build frontend
pnpm build

# Start production server
pnpm start
```

Access at: **http://localhost:3000**

## Usage

### 1. Open the Web App

Open your browser and go to:
- **Development:** http://localhost:5173
- **Production:** http://localhost:3000

### 2. Upload a Video

1. Click on the upload area or drag & drop a video file
2. Supported formats: MP4, MKV, AVI, MOV, FLV, etc.
3. Maximum file size: 500MB

### 3. Monitor Processing

Once uploaded, the app will:
1. **Audio Processing** — Remove original audio
2. **Transcription** — Convert dialog to English text
3. **Summarization** — Create Burmese summary
4. **Voice-over** — Generate Burmese audio
5. **Video Assembly** — Combine video + audio + subtitles
6. **Copyright Protection** — Apply anti-detection techniques

Each step shows real-time progress.

### 4. Download Result

When processing completes:
1. Click "⬇️ ဗီဒီယို ဒေါင်းလုပ်းပါ" button
2. The recap video will download as `movie-recap-{jobId}.mp4`

## Project Structure

```
movie-recap-web/
├── src/
│   ├── components/
│   │   ├── UploadSection.tsx      # Video upload UI
│   │   └── ProcessingStatus.tsx   # Progress tracking UI
│   ├── styles/
│   │   ├── index.css              # Global styles
│   │   ├── app.css                # App layout
│   │   ├── upload.css             # Upload styles
│   │   └── processing.css         # Processing styles
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── utils/
│   │   └── api.ts                 # API client
│   ├── store.ts                   # Zustand state management
│   ├── App.tsx                    # Main React component
│   ├── main.tsx                   # React entry point
│   └── server/
│       ├── server.ts              # Express server
│       └── processor.py           # Python workflow
├── dist/                          # Built files
│   ├── client/                    # Frontend build
│   └── server.js                  # Server build (if built)
├── uploads/                       # Uploaded videos
├── outputs/                       # Output videos
├── temp/                          # Temporary files & job state
├── index.html                     # HTML template
├── package.json                   # Node dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite config
├── requirements.txt               # Python dependencies
├── .env.example                   # Environment template
├── README.md                      # Project overview
├── INSTALLATION.md                # This file
└── DEPLOYMENT.md                  # Deployment guide
```

## Workflow Details

### Step 1: Audio Processing
- **Tool:** Spleeter / Demucs
- **Purpose:** Remove original audio from video
- **Output:** Video without audio

### Step 2: Transcription
- **Tool:** OpenAI Whisper
- **Purpose:** Convert dialog to English text
- **Output:** English transcript

### Step 3: Summarization & Translation
- **Tool:** GPT-4 API
- **Purpose:** Summarize and translate to Burmese
- **Output:** Burmese summary text

### Step 4: Voice-over Generation
- **Tool:** ElevenLabs API
- **Purpose:** Generate Burmese voice-over
- **Output:** Burmese audio file

### Step 5: Video Assembly
- **Tool:** MoviePy
- **Purpose:** Combine video + audio + subtitles
- **Output:** Complete recap video

### Step 6: Copyright Protection
- **Tool:** MoviePy + FFmpeg
- **Purpose:** Apply anti-detection techniques
- **Techniques:**
  - Cut/slice video segments
  - Vary playback speed
  - Add transitions
  - Apply filters
- **Output:** Copyright-protected video

## API Endpoints

### Upload Video
```
POST /api/upload
Content-Type: multipart/form-data
Body: { file: File }
```

### Get Job Status
```
GET /api/status/:jobId
```

### Start Processing
```
POST /api/process/:jobId
```

### Download Result
```
GET /api/download/:jobId
```

### Get All Jobs
```
GET /api/jobs
```

## Troubleshooting

### Issue: "Port already in use"
```bash
# Kill process on port 3000
lsof -i :3000 | grep -v COMMAND | awk '{print $2}' | xargs kill -9

# Or use different port
PORT=3001 pnpm dev:server
```

### Issue: "API key not found"
- Verify `.env` file exists in project root
- Check API keys are correctly set
- Restart dev server after changing `.env`

### Issue: "Python dependencies not found"
```bash
# Reinstall Python dependencies
pip install --upgrade -r requirements.txt

# Or use specific versions
pip install -r requirements.txt --force-reinstall
```

### Issue: "Video upload fails"
- Check file size (max 500MB)
- Verify `uploads/` directory exists and is writable
- Check available disk space

### Issue: "Processing stuck or slow"
- Check system resources (CPU, RAM, disk)
- Verify API keys have sufficient quota
- Check logs in `temp/{jobId}.json`

## Performance Tips

### For Better Performance:
1. **Use SSD** — Faster video processing
2. **Allocate RAM** — More RAM = faster processing
3. **Use GPU** — Enable GPU acceleration if available
4. **Optimize Settings** — Adjust video codec and quality

### For Multiple Users:
1. **Database** — Use PostgreSQL instead of in-memory store
2. **Job Queue** — Use Bull or RabbitMQ
3. **Load Balancer** — Use Nginx
4. **Caching** — Use Redis

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to git
- Add `.env` to `.gitignore`
- Rotate API keys regularly
- Use HTTPS in production
- Validate all file uploads
- Implement rate limiting

## Getting API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or login
3. Create new API key
4. Copy and paste into `.env`

### ElevenLabs API Key
1. Go to https://elevenlabs.io/api
2. Sign up or login
3. Go to Profile → API Key
4. Copy and paste into `.env`

## Support & Help

### Common Issues:
- Check browser console for errors (F12)
- Check terminal for backend logs
- Review job state in `temp/{jobId}.json`
- Check API responses in Network tab

### Resources:
- [OpenAI Whisper Docs](https://github.com/openai/whisper)
- [ElevenLabs Docs](https://elevenlabs.io/docs)
- [MoviePy Docs](https://zulko.github.io/moviepy/)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)

## Next Steps

1. ✅ Install dependencies
2. ✅ Setup environment variables
3. ✅ Run development server
4. ✅ Upload a test video
5. ✅ Monitor processing
6. ✅ Download result
7. 📦 Deploy to production (see DEPLOYMENT.md)

Happy recap creation! 🎬
