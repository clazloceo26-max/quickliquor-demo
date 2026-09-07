# Deployment Guide

## Vercel (Recommended)

### Option 1: CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repo
5. Click "Deploy"

## Environment Variables

Create `.env.local` for development:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_KEY=your_key_here
```

## Build & Test

```bash
# Development
npm run dev

# Build
npm run build

# Test build locally
npm run start
```

## Performance Tips

- Images: Use Next.js `<Image>` component
- Code splitting: Automatic via Next.js
- Caching: Configure in `next.config.js`
- Analytics: Add Vercel Analytics

## Troubleshooting

- **Build fails:** Check Node version (18+)
- **Missing dependencies:** Run `npm install`
- **Tailwind not working:** Clear `.next` and rebuild

## Mobile Testing

```bash
# Get your local IP
ipconfig getifaddr en0  # Mac/Linux

# Visit from mobile
http://<your-ip>:3000
```