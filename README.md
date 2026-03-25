# Dojo

**Train your mind like a martial art.**

Dojo is a critical thinking trainer — the second app in the [Brain Mastery](https://humanityandai.com/products/) series by Humanity & AI. Five game modes teach you to spot fallacies, steel-man arguments, evaluate sources, debate an AI, and analyze daily news. Earn belts from White to Black as your reasoning sharpens.

## Game Modes

- **Fallacy Flash** — identify logical fallacies in real-time arguments
- **Steel Man** — rewrite weak arguments as their strongest possible version (AI-evaluated)
- **Source Check** — evaluate news credibility, identify bias, know what to verify
- **Daily Brief** — three news summaries, one flawed, one missing context, one solid. Find them.
- **Debate Dojo** — live argument practice against an AI opponent scored on logic, not rhetoric

## Belt Progression

White → Yellow → Green → Blue → Purple → Black. XP earned across all modes. Your profile tracks accuracy, streaks, and growth over time.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (dark warm aesthetic)
- **AI:** Anthropic Claude Haiku (Steel Man evaluation)
- **Hosting:** Vercel

## Run Locally

```bash
git clone https://github.com/your-org/dojo.git
cd dojo
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | For Steel Man mode | Claude API key from [console.anthropic.com](https://console.anthropic.com/) |

All other modes work without an API key.

## Part of Brain Mastery

Clarity (read) → **Dojo (think)** → TasteBud (taste) → Quiltographer (create) → Citizen (participate)

## License

MIT — see [LICENSE](LICENSE)

---

Built by [Humanity & AI, LLC](https://humanityandai.com) · Oklahoma City
