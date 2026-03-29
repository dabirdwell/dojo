# CLAUDE.md — Dojo

## Scope
**Read:** `src/app/`, `src/components/`, `src/data/`, `src/lib/`
**Also read:** `package.json`, `tsconfig.json`, this file
**DO NOT read:** `node_modules/`, `.next/`, `.vercel/`

## Project
Dojo is a critical thinking training app with 5 game modes. Free app — no Stripe. Belt progression (white→black) based on demonstrated reasoning quality.

## Tech Stack
Next.js (App Router), Tailwind CSS, Anthropic API (source evaluation, steelman grading)

## Build
```bash
npm run build
```

## Key Routes
- `/` — Landing page
- `/play/daily/` — Daily challenge
- `/play/fallacy-flash/` — Fallacy identification
- `/play/socratic/` — Socratic dialogue
- `/play/source-check/` — Source evaluation (uses Anthropic API)
- `/play/steelman/` — Steel man arguments (uses Anthropic API)
- `/play/civic-check/` — Civic policy analysis
- `/play/argument-map/` — Visual argument mapping (highest-impact technique)
- `/play/real-world/` — Real-world practice scenarios
- `/achievements/` — Achievement system
- `/leaderboard/` — Score rankings
- `/profile/` — User profile + belt progress

## Git Rules
- `git add` specific files only — NEVER `git add -A`
