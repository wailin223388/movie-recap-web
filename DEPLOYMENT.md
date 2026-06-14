# Movie Recap Web App — Deployment Guide

ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း Web Application ကို Deploy လုပ်ရန် လမ်းညွှန်

## Quick Start (Local Development)

### 1. Install Dependencies

```bash
cd /home/ubuntu/movie-recap-web

# Install Node dependencies
pnpm install

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
OPENAI_API_KEY=sk-your-openai-key
ELEVENLABS_API_KEY=your-elevenlabs-key
PORT=3000
```

### 3. Run Development Server

```bash
# Start both frontend and backend
pnpm dev

# Or run separately:
# Terminal 1: Frontend (Vite dev server)
pnpm dev:client

# Terminal 2: Backend (Express + Node)
pnpm dev:server
```

Access the app at: **http://localhost:5173**

## Production Deployment

### Option 1: Deploy to Manus WebDev (Recommended)

WebDev provides managed hosting with automatic scaling and zero-ops deployment.

#### Steps:

1. **Create WebDev Project:**
   - Go to [manus.im](https://manus.im)
   - Click "Create New Project"
   - Select "Web App"

2. **Upload Project:**
   - Connect your Git repository or upload files
   - WebDev will automatically detect `package.json` and `vite.config.ts`

3. **Configure Environment:**
   - In WebDev dashboard, go to Settings → Secrets
   - Add your API keys:
     - `OPENAI_API_KEY`
     - `ELEVENLABS_API_KEY`

4. **Deploy:**
   - Click "Publish"
   - WebDev will build and deploy automatically
   - Your app will be available at `https://your-app.manus.space`

### Option 2: Deploy to Docker

Create a `Dockerfile`:

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build frontend
RUN pnpm build

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "start"]
```

Build and run:

```bash
docker build -t movie-recap-web .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  -e ELEVENLABS_API_KEY=your-key \
  movie-recap-web
```

### Option 3: Deploy to Cloud Run (Google Cloud)

```bash
# Build container
gcloud builds submit --tag gcr.io/your-project/movie-recap-web

# Deploy
gcloud run deploy movie-recap-web \
  --image gcr.io/your-project/movie-recap-web \
  --platform managed \
  --region us-central1 \
  --set-env-vars OPENAI_API_KEY=sk-your-key,ELEVENLABS_API_KEY=your-key
```

### Option 4: Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add buildpacks
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/python

# Set environment variables
heroku config:set OPENAI_API_KEY=sk-your-key
heroku config:set ELEVENLABS_API_KEY=your-key

# Deploy
git push heroku main
```

## Architecture

### Frontend (React + Vite)
- **Port:** 5173 (dev), served from `/dist/client` (prod)
- **Features:** Video upload, progress tracking, download
- **State Management:** Zustand
- **HTTP Client:** Axios

### Backend (Express + Node.js)
- **Port:** 3000
- **API Endpoints:** `/api/*`
- **File Handling:** Multer
- **Job Management:** In-memory store (use database in production)

### Python Processing
- **Entry Point:** `src/server/processor.py`
- **Workflow:** 6-step pipeline (audio, transcription, summarization, voice-over, assembly, copyright)
- **Execution:** Called by backend via subprocess

## File Structure

```
movie-recap-web/
├── src/
│   ├── components/          # React components
│   │   ├── UploadSection.tsx
│   │   └── ProcessingStatus.tsx
│   ├── styles/              # CSS files
│   ├── types/               # TypeScript types
│   ├── utils/               # API utilities
│   ├── store.ts             # Zustand state
│   ├── App.tsx              # Main component
│   ├── main.tsx             # Entry point
│   └── server/
│       ├── server.ts        # Express server
│       └── processor.py     # Python workflow
├── dist/                    # Built files
│   ├── client/              # Frontend build
│   └── server.js            # Server build
├── uploads/                 # Uploaded videos
├── outputs/                 # Output videos
├── temp/                    # Temporary files
├── package.json
├── vite.config.ts
├── tsconfig.json
├── requirements.txt
└── README.md
```

## API Endpoints

### Upload Video
```
POST /api/upload
Content-Type: multipart/form-data

Request:
{
  "file": <File>
}

Response:
{
  "success": true,
  "data": {
    "jobId": "uuid",
    "fileName": "movie.mp4",
    "fileSize": 123456
  }
}
```

### Get Status
```
GET /api/status/:jobId

Response:
{
  "success": true,
  "data": {
    "job": {
      "id": "uuid",
      "status": "processing",
      "progress": 45,
      "steps": [
        {
          "step": "audio_processing",
          "progress": 100,
          "message": "Audio processing completed"
        }
      ]
    }
  }
}
```

### Start Processing
```
POST /api/process/:jobId

Response:
{
  "success": true,
  "message": "Processing started"
}
```

### Download Result
```
GET /api/download/:jobId

Response: Video file (blob)
```

## Monitoring & Logging

### Local Development
- Check browser console for frontend errors
- Check terminal for backend logs
- Logs are written to stdout

### Production
- Use cloud provider's logging service
- Monitor job state files in `temp/` directory
- Track API response times and error rates

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000 | grep -v COMMAND | awk '{print $2}' | xargs kill -9

# Or use different port
PORT=3001 pnpm dev:server
```

### API Key Errors
- Verify keys are correctly set in `.env`
- Check OpenAI and ElevenLabs account quotas
- Ensure API keys have proper permissions

### File Upload Issues
- Check `MAX_FILE_SIZE` in `.env` (default 500MB)
- Verify `uploads/` directory has write permissions
- Check available disk space

### Python Processing Errors
- Verify Python 3.10+ is installed
- Check all Python dependencies: `pip list`
- Review processor logs in `temp/{jobId}.json`

## Performance Optimization

### Frontend
- Code splitting with Vite
- Lazy loading components
- Optimize images and assets
- Use production build: `pnpm build`

### Backend
- Use database instead of in-memory store for production
- Implement job queue (Bull, RabbitMQ) for scaling
- Add caching layer (Redis)
- Use CDN for output files

### Python Processing
- Use GPU acceleration for video processing
- Implement parallel processing for multiple jobs
- Cache models (Whisper, GPT-4)
- Optimize video codec settings

## Security Considerations

1. **API Keys:** Store in environment variables, never commit to git
2. **File Upload:** Validate file types and sizes, scan for malware
3. **CORS:** Configure CORS headers appropriately
4. **Rate Limiting:** Implement rate limiting on API endpoints
5. **Authentication:** Add user authentication if needed
6. **HTTPS:** Always use HTTPS in production

## Scaling

For production with multiple users:

1. **Database:** Replace in-memory job store with PostgreSQL/MongoDB
2. **Job Queue:** Use Bull or RabbitMQ for processing queue
3. **Load Balancer:** Use Nginx or cloud provider's load balancer
4. **Caching:** Add Redis for session and cache management
5. **CDN:** Serve static files and output videos via CDN
6. **Monitoring:** Use Prometheus + Grafana for metrics

## Support

For issues or questions:
- Check logs in `temp/` directory
- Review API responses in browser DevTools
- Verify environment variables are set correctly
- Test individual workflow steps with sample files
