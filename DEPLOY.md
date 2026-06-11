# Deploy Braino AI for public use

## Option A — Docker (fastest, any VPS or your PC)

**Requirements:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```powershell
cd C:\BrainoAi
docker compose up --build -d
```

| Service | URL |
|---------|-----|
| **Website** | http://localhost:8080 |
| **API** | http://localhost:8000 |

To expose on the internet, use a VPS (DigitalOcean, AWS, etc.) and open ports **80/443** with a reverse proxy (Caddy/nginx), or map `8080:80` and share your public IP.

Stop: `docker compose down`

---

## Option B — Render (free tier, no server admin)

### 1. Push to GitHub

```powershell
cd C:\BrainoAi
git init
git add .
git commit -m "Prepare Braino AI for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USER/braino-ai.git
git push -u origin main
```

### 2. Deploy API

1. Go to [render.com](https://render.com) → **New** → **Blueprint**
2. Connect your GitHub repo (uses `render.yaml`)
3. Wait for **braino-api** to deploy; copy its URL, e.g. `https://braino-api.onrender.com`

### 3. Deploy frontend

1. In Render → **braino-web** → **Environment**
2. Set `VITE_API_URL` = your API URL (no trailing slash)
3. **Manual Deploy** → Deploy latest commit

Your public site URL will be like `https://braino-web.onrender.com`.

> Free Render APIs sleep after ~15 min idle; first request may take 30–60s.

---

## Option C — Vercel (frontend + API, one project) — recommended

Uses **Vercel Services** (`experimentalServices` in root `vercel.json`).

### Deploy steps

1. Push repo to GitHub (include the `trained model/` folder).
2. [vercel.com](https://vercel.com) → **Add New** → **Project** → import repo.
3. **Framework Preset:** **Services** (required — not Vite or Other).
4. **Root Directory:** `.` (repo root, not `frontend/`).
5. Deploy — no `VITE_API_URL` needed (API is same-origin at `/api/*`).

### Service layout (`vercel.json`)

| Service | Mount | Path |
|---------|-------|------|
| `web` | `/` | `frontend/` |
| `api` | `mount: "/api"` only | `backend/main.py` |

> Use **`mount` OR `routePrefix`** on each service — never both. The `api` service uses `mount` only.

### Common Vercel errors & fixes

| Error | Fix |
|-------|-----|
| `Web service "api" must specify mount, routePrefix, or subdomain` | Use latest `vercel.json` — backend service uses `"mount": { "path": "/api" }` |
| Framework not detected | Set preset to **Services** in project settings |
| Python deps missing | `backend/requirements.txt` + `backend/pyproject.toml` |
| ML model not found | Ensure `trained model/model.pkl` is committed; `includeFiles` bundles it |
| 404 on `/api/chat` | Redeploy after `vercel.json` fix; check `/api/health` first |

### Verify after deploy

- `https://YOUR-APP.vercel.app/api/health` → `{"status":"healthy"}`
- Open site → chat → send a message

CLI deploy (48.1.8+):

```powershell
cd C:\BrainoAi
npx vercel login
npx vercel deploy --prod
```

**Frontend-only fallback:** Vercel root = `frontend`, deploy API on Render, set `VITE_API_URL`.

---

## Environment variables

| Variable | Where | Purpose |
|----------|--------|---------|
| `VITE_API_URL` | Frontend build | Backend URL for chat, mood, etc. |
| `MODEL_DIR` | Backend | Path to `model.pkl` (Docker sets this automatically) |
| `PORT` | Backend | Host port (Render/Docker set automatically) |

---

## HTTPS & custom domain

- **Render / Vercel:** HTTPS is automatic; add a custom domain in dashboard settings.
- **Docker on VPS:** Use [Caddy](https://caddyserver.com/) or nginx + Let’s Encrypt in front of port 8080.

---

## Notes

- **Camera / face emotion** runs in the user’s browser; HTTPS is required on public domains (Render/Vercel provide this).
- **Mood data** on free Render is ephemeral unless you add a database later.
- Do **not** commit `.env` files with secrets.
