# Run Braino AI manually

Project folder: `C:\Braino.Ai\Braino.Ai-main`

## Quick start (one command)

Open **PowerShell** in the project folder, then run:

```powershell
cd C:\Braino.Ai\Braino.Ai-main
powershell -ExecutionPolicy Bypass -File .\start-manual.ps1
```

Or double-click **`start.bat`** in the project folder.

Then open in your browser: **http://127.0.0.1:5173**

---

## Manual start (two terminals)

### Terminal 1 — Backend (API)

```powershell
cd C:\Braino.Ai\Braino.Ai-main\backend
.\.venv\Scripts\Activate.ps1
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

If `.venv` is missing, use `venv_new` instead:

```powershell
cd C:\Braino.Ai\Braino.Ai-main\backend
.\venv_new\Scripts\Activate.ps1
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

API docs: http://127.0.0.1:8000/docs

### Terminal 2 — Frontend (website)

```powershell
cd C:\Braino.Ai\Braino.Ai-main\frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Website: http://127.0.0.1:5173

---

## First-time setup (once)

### Backend

```powershell
cd C:\Braino.Ai\Braino.Ai-main\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r ..\requirements.txt
```

### Frontend

```powershell
cd C:\Braino.Ai\Braino.Ai-main\frontend
npm install
```

---

## Stop the app

Press **Ctrl+C** in each terminal window (backend and frontend).

---

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Chat says "Server error" | Start the backend (Terminal 1) first |
| `npm` not found | Install Node.js from https://nodejs.org |
| `python` not found | Install Python 3.8+ and add to PATH |
| Port 8000 in use | Change port: `--port 8001` and set `VITE_API_URL=http://127.0.0.1:8001` if using a custom API URL |
