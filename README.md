# lipsync-proxy

Vercel proxy to bypass CORS for Hugging Face Spaces (LatentSync + SadTalker).

## Deploy

1. Push this repo to GitHub
2. Import on [vercel.com](https://vercel.com) → New Project
3. Deploy (no env vars needed)

## Usage

### LatentSync (default)
```
POST https://your-project.vercel.app/api/proxy
Content-Type: application/json

{
  "data": [null, "<audio_base64>", "<image_base64>", 20, 2.0]
}
```

### SadTalker
```
POST https://your-project.vercel.app/api/proxy?model=sadtalker
Content-Type: application/json

{
  "data": ["<image_base64>", "<audio_base64>", true, true, 1.0]
}
```

## Stack
- Vercel Serverless Functions (free tier)
- Max duration: 300 seconds (enough for AI generation)
