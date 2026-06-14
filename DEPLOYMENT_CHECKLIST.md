# 🚀 Railway.app Deployment Checklist

ရုပ်ရှင် Recap ဗီဒီယို ဖန်တီးခြင်း Web Application ကို Railway.app သို့ Deploy လုပ်ရန် ကျေးဇူးပြု၍ ဤ Checklist ကို အသုံးပြုပါ။

---

## ✅ Pre-Deployment (Before You Start)

- [ ] **GitHub Account** — Created and logged in
- [ ] **Railway.app Account** — Created and logged in
- [ ] **OpenAI API Key** — Ready to use
- [ ] **ElevenLabs API Key** — Ready to use
- [ ] **Git installed** — On your Windows machine
- [ ] **Code ready** — All files in `/home/ubuntu/movie-recap-web`

---

## 📝 Step 1: Prepare Code (10 minutes)

- [ ] Copy project files from sandbox to Windows
- [ ] Or: Download as ZIP and extract
- [ ] Navigate to project folder in Command Prompt
- [ ] Verify `package.json` exists
- [ ] Verify `requirements.txt` exists
- [ ] Verify `src/server.ts` exists

---

## 🐙 Step 2: GitHub Setup (15 minutes)

- [ ] Create new repository on GitHub
  - [ ] Name: `movie-recap-web`
  - [ ] Visibility: Public
  - [ ] Initialize with README (optional)
- [ ] Create Personal Access Token (PAT)
  - [ ] Go to https://github.com/settings/tokens
  - [ ] Generate new token (classic)
  - [ ] Select: `repo` scope
  - [ ] Copy token (save it!)
- [ ] Initialize git locally
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/movie-recap-web.git
  git branch -M main
  git push -u origin main
  ```
- [ ] Verify code is on GitHub
  - [ ] Visit https://github.com/YOUR_USERNAME/movie-recap-web
  - [ ] See all files uploaded

---

## 🚂 Step 3: Railway.app Setup (10 minutes)

- [ ] Sign up at https://railway.app
- [ ] Authorize GitHub access
- [ ] Create new project
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose `movie-recap-web` repository
- [ ] Click "Deploy"
- [ ] Wait for initial build to complete

---

## 🔐 Step 4: Add Environment Variables (5 minutes)

In Railway dashboard, go to **Variables** tab:

- [ ] Add `OPENAI_API_KEY`
  - [ ] Paste your OpenAI key
  - [ ] Click Save
- [ ] Add `ELEVENLABS_API_KEY`
  - [ ] Paste your ElevenLabs key
  - [ ] Click Save
- [ ] Add `PORT`
  - [ ] Value: `3000`
  - [ ] Click Save
- [ ] Add `NODE_ENV`
  - [ ] Value: `production`
  - [ ] Click Save
- [ ] Add `MAX_FILE_SIZE`
  - [ ] Value: `500000000`
  - [ ] Click Save

---

## ⚙️ Step 5: Configure Build & Deploy (5 minutes)

In Railway dashboard, go to **Settings** tab:

- [ ] **Build Command**
  - [ ] Set to: `pnpm install && pnpm build`
  - [ ] Save
- [ ] **Start Command**
  - [ ] Set to: `pnpm start`
  - [ ] Save
- [ ] **Port**
  - [ ] Set to: `3000`
  - [ ] Save

---

## 🚀 Step 6: Deploy (5 minutes)

- [ ] Go to **Deployments** tab
- [ ] Watch build progress
- [ ] Wait for "✅ Deployment successful"
- [ ] Go to **Settings** tab
- [ ] Copy your **Public URL** (looks like: `https://your-project.up.railway.app`)
- [ ] Save this URL!

---

## ✨ Step 7: Test Deployment (10 minutes)

- [ ] Open your Railway URL in browser
- [ ] You should see the Movie Recap homepage
- [ ] Try uploading a small test video (< 50MB)
- [ ] Watch the 6-step processing workflow
- [ ] Check that progress updates in real-time
- [ ] Download the output video
- [ ] Verify video was created

---

## 🐛 Step 8: Troubleshooting (If Needed)

If something doesn't work:

- [ ] Check **Logs** tab in Railway
- [ ] Look for error messages
- [ ] Verify environment variables are set
- [ ] Verify API keys are correct
- [ ] Check that all files were uploaded to GitHub
- [ ] Try restarting deployment

Common issues:
- [ ] "Module not found" → Python dependencies missing
- [ ] "API key invalid" → Check environment variables
- [ ] "Cannot connect" → Wait for deployment to complete
- [ ] "Port error" → Change PORT to 8080

---

## 🎉 Step 9: Success! (Share Your App)

- [ ] Your app is live!
- [ ] Share URL with others
- [ ] Test from different devices
- [ ] Monitor logs for errors
- [ ] Celebrate! 🎊

---

## 📊 Your Live URL

```
https://your-project.up.railway.app
```

**Replace `your-project` with your actual Railway project name**

---

## 💡 Tips

- **Keep API keys safe** — Never share them
- **Monitor logs** — Check regularly for errors
- **Test thoroughly** — Try different video sizes
- **Update code** — Push changes to GitHub, Railway auto-deploys
- **Check quotas** — Monitor OpenAI/ElevenLabs usage

---

## 🆘 Need Help?

- **Railway Docs:** https://docs.railway.app
- **GitHub Help:** https://docs.github.com
- **Check logs:** Railway Dashboard → Logs tab
- **Common issues:** See RAILWAY_DEPLOYMENT.md

---

## 📝 Notes

Write down your information:

```
GitHub Username: ___________________
GitHub Repository: ___________________
Railway Project Name: ___________________
Railway Live URL: ___________________
OpenAI API Key: ✓ (set in Railway)
ElevenLabs API Key: ✓ (set in Railway)
```

---

**Ready to deploy? Follow the steps above and you'll have a live Movie Recap Web App in 30 minutes!** 🚀
