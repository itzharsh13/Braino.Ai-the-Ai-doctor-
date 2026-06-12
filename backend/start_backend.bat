@echo off
cd /d C:\BrainoAi\backend
echo Starting BrainoAI Backend...
echo.
"C:\BrainoAi\backend\.venv\Scripts\python.exe" -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
pause
