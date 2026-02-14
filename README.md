# Alloc8

**Simulate ROI before you spend.**

Alloc8 is a decision engine that helps DTC brands simulate the expected ROAS of creator + ad budget combinations before spending money.

## Quick start

```bash
npm install && npm run dev
```

- **App:** http://localhost:5173  

All data is mocked in the frontend; no backend server required.  

## What’s included

- **Landing** — Hero, “How it works”, CTAs  
- **Sign up** — Brand name, website, budget, AOV, current ROAS  
- **Dashboard** — Revenue, ROAS, AOV, conversion rate, revenue chart, channel ROAS, opportunity insights  
- **Integrations** — Mock Shopify, Meta Ads, TikTok Ads with sync status  
- **Creators** — List, “Evaluate New Creator” modal with drag-and-drop (mock), Run Analysis with step-by-step progress  
- **Creator Analysis** — Predicted ROAS, funnel (Views → Clicks → Conversions → Revenue), AI insight  
- **Simulator** — Total budget slider, creator selection, allocation table, **blended ROAS with real-time animation**  
- **Reports** — Predicted vs Actual chart, accuracy, Download PDF (mock)  
- **Creator Share** — Read-only shareable page: brand fit, impact, hook style, messaging  

## Design

- Off-white `#F7F7F5`, panels `#ECECEC`, text `#1C1C1C`, accent `#1E2A38`  
- Success / Risk / Danger: `#5E8C61`, `#C68A2B`, `#B55252`  
- Inter, minimal, subtle shadows, soft transitions  

## Tech

- **Frontend:** Vue 3, Vue Router, Vite, Chart.js  
- **Data:** In-app mock API (`src/api/mock.js`) — no backend server. ROAS and revenue use the same formulas (views, CTR, CVR, AOV, cost).

## Deploy (Vercel / Render)

### Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import the repo.
3. Leave **Build Command** and **Output Directory** as auto-detected (or use `npm run build` and `dist`). The included `vercel.json` sets SPA rewrites so routes like `/dashboard` and `/creators` work.
4. Deploy. Your app will be at `https://your-project.vercel.app`.

CLI option:

```bash
npm i -g vercel
vercel
```

### Render

1. Push the repo to GitHub.
2. Go to [render.com](https://render.com) → **New** → **Static Site** → connect the repo.
3. Set:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. Under **Redirects/Rewrites** add a rewrite so client-side routing works:
   - **Type:** Rewrite  
   - **From:** `/*`  
   - **To:** `/index.html`
5. Create Static Site. Your app will be at `https://your-site.onrender.com`.

Without the rewrite, direct visits or refreshes on paths like `/dashboard` will 404.
