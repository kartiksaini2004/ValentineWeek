# Deployment Instructions for GitHub Pages

## Prerequisites
1. Your project must be on GitHub
2. You need to set up GitHub Secrets for environment variables

## Setup Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Valentine's Week Proposal"
git branch -M main
git remote add origin https://github.com/yourusername/valentine-proposal.git
git push -u origin main
```

### 2. Set GitHub Secrets
Go to your repository Settings → Secrets and variables → Actions, and add:
- `VITE_SUPABASE_URL`: Your Supabase URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Enable GitHub Pages
1. Go to repository Settings → Pages
2. Under "Build and deployment"
3. Select "GitHub Actions" as the source
4. The workflow will automatically deploy on push to main/master

### 4. Custom Domain (Optional)
Edit `.github/workflows/deploy.yml` line 35 and change `cname: valentine.kartik.dev` to your domain, or remove it if not using a custom domain.

## What Happens
- On every push to main/master, the workflow will:
  1. Install dependencies
  2. Build the project with Vite
  3. Deploy to GitHub Pages

## Access Your Site
- Default URL: `https://yourusername.github.io/valentine-proposal/`
- Custom domain: Your configured domain

## Troubleshooting
- Check Actions tab in your GitHub repo for build logs
- Ensure all environment variables are set in GitHub Secrets
- Verify the `base` in vite.config.ts matches your repository name

