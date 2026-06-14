# 🚀 Quick Start: Deploy to Railway.app from Windows

ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း Web Application ကို Railway.app သို့ Deploy လုပ်ရန် လျင်မြန်သော လမ်းညွှန်

---

## 🎯 What You'll Do (30 minutes total)

1. Download project files
2. Create GitHub repository
3. Push code to GitHub
4. Connect to Railway.app
5. Add API keys
6. Deploy and get live URL

---

## 📥 Step 1: Download Project Files (2 minutes)

Your project files are located at:
```
/home/ubuntu/movie-recap-web
```

**Option A: Download as ZIP** (Easiest)
- I'll provide a ZIP file with all project files
- Extract to your Windows machine
- Example: `C:\Users\YourName\movie-recap-web`

**Option B: Use Git to Clone**
```bash
git clone https://github.com/YOUR_USERNAME/movie-recap-web.git
cd movie-recap-web
```

---

## 🐙 Step 2: Create GitHub Repository (5 minutes)

1. Go to https://github.com/new
2. Repository name: `movie-recap-web`
3. Visibility: **Public**
4. Click **Create repository**

You'll see instructions like:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/movie-recap-web.git
git branch -M main
git push -u origin main
```

Copy these commands and run them in Command Prompt (in your project folder).

---

## 🚂 Step 3: Deploy to Railway.app (5 minutes)

1. Go to https://railway.app
2. Click **Sign Up** → **GitHub**
3. Authorize Railway
4. Click **New Project**
5. Select **Deploy from GitHub repo**
6. Choose `movie-recap-web`
7. Click **Deploy**

Railway will start building automatically!

---

## 🔐 Step 4: Add API Keys (5 minutes)

In Railway dashboard:

1. Go to your project
2. Click **Variables** tab
3. Add these variables:

| Name | Value |
|------|-------|
| OPENAI_API_KEY | sk-your-key |
| ELEVENLABS_API_KEY | your-key |
| PORT | 3000 |
| NODE_ENV | production |

4. Click **Save** for each one

---

## ⚙️ Step 5: Configure Deployment (5 minutes)

In Railway dashboard:

1. Go to **Settings** tab
2. Set **Build Command**: `pnpm install && pnpm build`
3. Set **Start Command**: `pnpm start`
4. Set **Port**: `3000`
5. Click **Save**

---

## 🚀 Step 6: Get Your Live URL (2 minutes)

1. Go to **Deployments** tab
2. Wait for build to complete (green checkmark)
3. Go to **Settings** tab
4. Copy your **Public URL**

It will look like:
```
https://movie-recap-web-production.up.railway.app
```

---

## ✅ Step 7: Test Your App (5 minutes)

1. Open your Railway URL in browser
2. You should see the Movie Recap homepage
3. Try uploading a small test video
4. Watch the workflow process
5. Download the result

**Congratulations! Your app is live!** 🎉

---

## 📱 Access from Anywhere

Now you can:
- Open your URL from any browser
- Share it with others
- Use it from your Windows computer
- No local setup needed!

---

## 🔄 Update Your App

To make changes:

```bash
# Make changes to code
# Then:
git add .
git commit -m "Your changes"
git push origin main
```

Railway automatically redeploys!

---

## 📞 Support

- **Railway Docs:** https://docs.railway.app
- **Check Logs:** Railway Dashboard → Logs tab
- **GitHub Help:** https://docs.github.com

---

**Your live URL will be:** 
```
https://your-project.up.railway.app
```

**Share this with anyone to let them use your Movie Recap Web App!** 🎬
