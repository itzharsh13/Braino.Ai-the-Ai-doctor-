# Start Braino AI Backend and Frontend

Write-Host "Starting Braino AI Backend and Frontend..." -ForegroundColor Green

# Start Backend
Write-Host "Starting Backend (FastAPI)..." -ForegroundColor Cyan
$ProjectRoot = $PSScriptRoot
$backendPath = Join-Path $ProjectRoot "backend"
$frontendPath = Join-Path $ProjectRoot "frontend"
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot'; .\backend\venv_new\Scripts\Activate.ps1; uvicorn backend.main:app --reload" -PassThru

# Wait a few seconds for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend (React/Vite)..." -ForegroundColor Cyan
$frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$frontendPath'; npm run dev" -PassThru

Write-Host ""
Write-Host "✓ Backend running on http://localhost:8000" -ForegroundColor Green
Write-Host "✓ Frontend running on http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C in either window to stop the respective server" -ForegroundColor Yellow
