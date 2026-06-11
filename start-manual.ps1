# Braino AI — start backend + frontend (opens two PowerShell windows)
$ProjectRoot = $PSScriptRoot
$BackendPath = Join-Path $ProjectRoot "backend"
$FrontendPath = Join-Path $ProjectRoot "frontend"
$VenvPython = Join-Path $BackendPath ".venv\Scripts\python.exe"

if (-not (Test-Path $VenvPython)) {
    $VenvPython = Join-Path $BackendPath "venv_new\Scripts\python.exe"
}

Write-Host "Starting Braino AI from $ProjectRoot" -ForegroundColor Green

Write-Host "Backend (FastAPI)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$BackendPath'; & '$VenvPython' -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"
)

Start-Sleep -Seconds 3

Write-Host "Frontend (Vite)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$FrontendPath'; npm run dev -- --host 127.0.0.1 --port 5173"
)

Write-Host ""
Write-Host "Backend:  http://127.0.0.1:8000" -ForegroundColor Green
Write-Host "Frontend: http://127.0.0.1:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Close each PowerShell window to stop that server." -ForegroundColor Yellow
