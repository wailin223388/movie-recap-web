# Movie Recap Web App — Railway.app Deployment Guide

ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း Web Application ကို Railway.app သို့ Deploy လုပ်ရန် လမ်းညွှန်

---

## 📋 Prerequisites

Before starting, make sure you have:

1. ✅ **GitHub Account** — To upload your code
2. ✅ **Railway.app Account** — Free tier available
3. ✅ **OpenAI API Key** — Already have this
4. ✅ **ElevenLabs API Key** — Already have this
5. ✅ **Git installed** — On your Windows machine

---

## 🚀 Step-by-Step Deployment

### Step 1: Create GitHub Repository (5 minutes)

#### 1.1 Create a new repository on GitHub

1. Go to https://github.com/new
2. Repository name: `movie-recap-web`
3. Description: `Movie Recap Web App - Convert movies to Burmese recap videos`
4. Choose: **Public** (easier for Railway to access)
5. Click **Create repository**

#### 1.2 Push your code to GitHub

On your Windows machine, open Command Prompt or PowerShell:

```bash
# Navigate to the project directory
cd C:\path\to\movie-recap-web

# Or if you need to copy it first from the sandbox
# (I'll provide the files as a ZIP)

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Movie Recap Web App"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/movie-recap-web.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** You'll be prompted for GitHub credentials. Use your GitHub username and a Personal Access Token (PAT):
- Go to https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select scopes: `repo`, `read:user`
- Copy the token and use it as password when prompted

---

### Step 2: Create Railway.app Account & Project (5 minutes)

#### 2.1 Sign up for Railway.app

1. Go to https://railway.app
2. Click **Sign Up**
3. Choose **GitHub** for authentication
4. Authorize Railway to access your GitHub account

#### 2.2 Create a new project

1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Find and select `movie-recap-web` repository
4. Click **Deploy**

Railway will automatically detect:
- Node.js backend (from `package.json`)
- Python dependencies (from `requirements.txt`)

---

### Step 3: Configure Environment Variables (5 minutes)

#### 3.1 Add secrets to Railway

1. In Railway dashboard, go to your project
2. Click **Variables** tab
3. Click **Add Variable**
4. Add these variables:

| Variable Name | Value | Source |
|---|---|---|
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI key |
| `ELEVENLABS_API_KEY` | `...` | Your ElevenLabs key |
| `PORT` | `3000` | Default |
| `NODE_ENV` | `production` | Default |
| `MAX_FILE_SIZE` | `500000000` | Default (500MB) |

#### 3.2 Save variables

Click **Save** after adding each variable.

---

### Step 4: Configure Build & Deployment Settings (5 minutes)

#### 4.1 Set build command

1. In Railway dashboard, go to **Settings**
2. Find **Build Command**
3. Set to: `pnpm install && pnpm build`

#### 4.2 Set start command

1. Find **Start Command**
2. Set to: `pnpm start`

#### 4.3 Set port

1. Find **Port**
2. Set to: `3000`

---

### Step 5: Deploy (2 minutes)

#### 5.1 Trigger deployment

1. Railway should automatically start building when you pushed to GitHub
2. Go to **Deployments** tab
3. Watch the build progress
4. Wait for "✅ Deployment successful" message

#### 5.2 Get your live URL

1. Go to **Settings** tab
2. Find **Public URL** or **Domain**
3. Your app will be at: `https://your-project.up.railway.app`

---

## ✅ Testing Your Deployment

### Test the app

1. Open your Railway URL in browser
2. You should see the Movie Recap Web App homepage
3. Try uploading a small test video
4. Monitor the processing workflow

### Check logs

If something goes wrong:

1. In Railway dashboard, go to **Logs** tab
2. Look for error messages
3. Common issues:
   - API keys not set correctly
   - Python dependencies not installed
   - Port conflicts

---

## 📊 Monitoring & Troubleshooting

### View logs

```
Railway Dashboard → Logs tab
```

### Common Issues & Solutions

#### Issue: "Module not found: openai"
**Solution:** Python dependencies not installed
- Check `requirements.txt` is in root directory
- Verify all packages are listed
- Restart deployment

#### Issue: "API key invalid"
**Solution:** Environment variables not set
- Go to Variables tab
- Verify keys are correct
- Restart deployment

#### Issue: "Port already in use"
**Solution:** Railway port conflict
- Change PORT to 8080 in Variables
- Update start command if needed

#### Issue: "Build fails"
**Solution:** Check build logs
- Go to Logs tab
- Look for error messages
- Common: missing dependencies, syntax errors

---

## 🎯 Your Live URL

Once deployed, your app will be accessible at:

```
https://your-project.up.railway.app
```

Share this URL with anyone to let them use your Movie Recap Web App!

---

## 💰 Railway.app Pricing

**Free Tier:**
- $5 free credits per month
- Enough for light testing
- Auto-pause after inactivity

**Paid Tier:**
- $5/month minimum
- Pay-as-you-go after that
- Suitable for production use

---

## 🔄 Updating Your App

To update your app after deployment:

1. Make changes to code on your Windows machine
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: your changes"
   git push origin main
   ```
3. Railway automatically redeploys
4. Your live URL updates automatically

---

## 📱 Accessing from Windows

After deployment, you can:

1. **Open in browser:** Just visit your Railway URL
2. **Share with others:** Send them the URL
3. **No local setup needed:** Works from anywhere

---

## 🆘 Need Help?

### Railway.app Documentation
- https://docs.railway.app

### Common Commands

```bash
# Check git status
git status

# View git log
git log --oneline

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature-name
```

---

## 📝 Checklist

Before deploying, verify:

- [ ] GitHub account created
- [ ] Repository pushed to GitHub
- [ ] Railway.app account created
- [ ] Project connected to GitHub repo
- [ ] Environment variables set (OPENAI_API_KEY, ELEVENLABS_API_KEY)
- [ ] Build command configured
- [ ] Start command configured
- [ ] Deployment successful
- [ ] Live URL accessible
- [ ] Test video upload works

---

## 🎉 You're Done!

Your Movie Recap Web App is now live on Railway.app!

**Share your URL:** `https://your-project.up.railway.app`

Users can now:
- Upload videos from their browser
- Watch the 6-step processing workflow
- Download recap videos in Burmese

---

**Next Steps:**
1. Complete the deployment following this guide
2. Test the app with a sample video
3. Share the URL with others
4. Monitor logs for any issues
5. Update code as needed

Happy deploying! 🚀
