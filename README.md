# 🐘 The Journey of Ganesha

### *Learn the Story. Experience the Wisdom. Celebrate Ganesh Chaturthi.*

An interactive 5-level cultural learning adventure browser game built for the **Ganesh Chaturthi Game Design Contest**. Designed with premium Indian festive aesthetics, traditional motifs, respectful storytelling, responsive gameplay, collectible wisdom cards, verifiable certificates of completion, and an online/offline leaderboard.

---

## 🌟 1. Project Overview

*The Journey of Ganesha* transforms traditional Hindu cultural lore into an emotionally engaging, educational game where learning happens through play rather than textbook recitation. Players travel through five chapters in Ganesha's life and traditions:
1. **🌸 Chapter 1: Birth of Ganesha** — The sacred creation by Goddess Parvati and setting preparation.
2. **🛕 Chapter 2: The Guardian** — Standing steadfast by one's word and duty without violence.
3. **🐘 Chapter 3: The Transformation** — The sacred symbolism of the elephant head (ears for listening, trunk for discernment, tusk for knowledge).
4. **🧠 Chapter 4: The Wisdom Challenge** — The race around the universe with Kartikeya, showing that love and reverence for parents encompasses all creation.
5. **🪔 Chapter 5: Why We Celebrate Ganesh Chaturthi** — Arranging the community mandap, prayer offerings, and eco-friendly clay idol immersion (*Visarjan*).

---

## 🎮 2. Features

- **5 Engaging Interactive Levels**: Object collection, moral gatekeeper decisions, sacred iconography alignment, cosmic pradakshina, and festival mandap arrangement.
- **Respectful & Authentic Visual Design**: Warm Indian festive atmosphere with diyas, marigolds, lotus flowers, modaks, and a friendly, respectful vector SVG Ganesha.
- **5 Collectible Wisdom Cards**: Unlocked after each level with universal life lessons, quotes, and cultural contexts.
- **Dynamic Certificate of Completion**: Personalized certificate featuring player name (e.g. *Pranav Shahaji Chavan*), dynamic score, completion date, authentic certificate ID (e.g. `GJ-2026-928471`), and verification QR code.
- **Certificate Verification System**: Dedicated `/verify/:certificateId` lookup to check authentic records.
- **Dual Mode Leaderboard**: Connects automatically to **Supabase** when configured; smoothly falls back to verified `localStorage` with top 10 rankings.
- **Zero-Dependency Web Audio Synthesizer**: Acoustic Indian temple brass bell (*Ghanta*), auspicious chimes, and meditative tanpura drone created natively with the Web Audio API (zero broken audio links or 404s).
- **Accessibility**: Reduced-motion mode, audio mute controls, keyboard accessibility, touch-friendly 44px+ targets, high contrast.
- **Anti-Cheat & Validation**: Score range checks, player name sanitation, and client-server validation separation.

---

## 🛠️ 3. Tech Stack

- **Framework**: React 19 with TypeScript
- **Bundler & Server**: Vite 6
- **Styling**: Tailwind CSS v4 with custom festive Indian palette & gold borders
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Database (Optional)**: Supabase (PostgreSQL) for cloud leaderboard and certificate verification
- **Local Fallback**: Browser `localStorage`
- **Deployment**: Vercel ready (`vercel.json` included with SPA rewrite rules)

---

## 🚀 4. Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd journey-of-ganesha

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## ☁️ 5. Supabase Setup & Database Schema

The game operates seamlessly offline using `localStorage`. To enable the cloud leaderboard and cloud certificate verification across multiple players:

### SQL Table Definition
Run this in the **Supabase SQL Editor**:

```sql
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL CHECK (char_length(player_name) >= 2 AND char_length(player_name) <= 50),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10000),
  achievement_title TEXT NOT NULL,
  certificate_id TEXT NOT NULL UNIQUE,
  completed_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow public read access to leaderboard
CREATE POLICY "Public can view leaderboard"
  ON leaderboard
  FOR SELECT
  USING (true);

-- Allow verified insert of scores
CREATE POLICY "Public can insert scores"
  ON leaderboard
  FOR INSERT
  WITH CHECK (score >= 0 AND score <= 10000);
```

---

## 🔑 6. Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: Supabase credentials
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

If these keys are left empty, the game automatically operates in **Local Storage Mode** without throwing any runtime errors.

---

## 📦 7. Vercel Deployment

This project is configured for one-click deployment on Vercel:

1. Push this repository to GitHub or GitLab.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. The included `vercel.json` ensures that all single-page application routes redirect smoothly to `/index.html`:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
4. Add any optional environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the Vercel project settings.
5. Click **Deploy**.

---

## 🏆 8. How Leaderboard & Anti-Cheat Work

1. Each level awards scores based on correct answers, speed bonuses, and perfect completion (up to ~10,000 max).
2. Scores are stored in descending order.
3. Submissions validate player names (non-empty, 2-50 chars) and verify that score totals do not exceed maximum achievable thresholds.
4. If network connectivity or Supabase is unavailable, scores are preserved in local storage and labeled with an offline badge.

---

## 📜 9. Certificate Verification

Upon completing all 5 levels:
- A unique certificate ID (e.g. `GJ-2026-928471`) is registered.
- Clicking **Verify Online** or entering `/verify/:certificateId` queries the registry.
- Displays player name, score, completion date, and `VALID & AUTHENTIC` status badge.
- Print styles format the certificate perfectly for saving as PDF or printing.

---

## 🙏 Cultural Respect & Educational Disclaimer

*Lord Ganesha is portrayed respectfully with traditional symbolism throughout the experience. No violent, disturbing, or satirical depictions are included. The game distinguishes timeless traditional narratives from modern eco-conscious community practices.*
