# Space Portfolio – Full-stack Template

## Architecture
```
Browser ──> Frontend (React + TS + Tailwind + Framer Motion, served by Nginx)
              │  fetch("/api/contact")
              ▼
           Backend (FastAPI) ──> PostgreSQL (stores contact messages)
```
- **frontend/** everything visual. All YOUR content lives in ONE file: `src/data/portfolio.ts`.
- **backend/** small API: receives contact-form messages, saves to DB, health check.
- **docker-compose.yml** runs db + backend + frontend with one command.

## Folder guide
| Path | Purpose |
|---|---|
| frontend/src/data/portfolio.ts | **EDIT THIS**: name, role, photo, skills, experience, projects, links, theme colors |
| frontend/public/profile.jpg | **Your photo** (replace file). Resume: `public/resume.pdf` |
| frontend/src/App.tsx | Page layout: orders all sections |
| frontend/src/main.tsx | React entry point |
| frontend/src/index.css | Tailwind + galaxy/nebula background + global styles |
| frontend/tailwind.config.js | Custom animations (orbit, float), fonts, colors |
| components/StarField.tsx | Canvas stars with mouse parallax |
| components/Reveal.tsx | Scroll reveal wrapper (fade/slide) |
| components/TiltCard.tsx | 3D hover tilt + colored glow, reused by skills/projects |
| components/TopNav.tsx | Fixed glass navbar + links + scroll progress bar |
| components/Hero.tsx | Letter-by-letter name, photo, orbit rings, floating tech chips |
| components/About / Skills / Experience / Projects / Contact / Footer.tsx | One section each |
| backend/app/main.py | FastAPI routes + CORS |
| backend/app/database.py | SQLAlchemy engine/session (reads DATABASE_URL) |
| backend/app/models.py | DB table `messages` |
| backend/Dockerfile, frontend/Dockerfile | Container builds |

## Run locally
```
# frontend
cd frontend && npm install && npm run dev        # http://localhost:5173
# backend
cd backend && pip install -r requirements.txt
DATABASE_URL=sqlite:///./dev.db uvicorn app.main:app --reload   # :8000
# everything with Docker
docker compose up --build                          # http://localhost:8080
```

## Free deployment
- **Frontend**: Vercel / Netlify / Cloudflare Pages (set `VITE_API_URL` to backend URL).
- **Backend**: Render free web service (Docker, root `backend/`). Sleeps when idle (~30s wake-up).
- **Database**: Neon or Supabase free PostgreSQL (free MySQL options are limited, so Postgres is recommended). Paste its URL into `DATABASE_URL`.
- No-backend fallback: the contact form also shows a `mailto:` link.

## Roadmap (next steps)
1. Fill `portfolio.ts`, add photo + resume.  2. Run locally.  3. Tune colors/animations.  4. Deploy DB → backend → frontend.
