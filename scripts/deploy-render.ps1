# Quick checklist before Render deploy (run from project root)
Write-Host "Braino AI — Render deploy checklist" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Push this folder to GitHub (create repo first at github.com/new)"
Write-Host "   git init"
Write-Host "   git add ."
Write-Host "   git commit -m `"Deploy Braino AI`""
Write-Host "   git remote add origin https://github.com/YOUR_USER/braino-ai.git"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "2. render.com -> New -> Blueprint -> select repo (uses render.yaml)"
Write-Host ""
Write-Host "3. After API deploys, set on braino-web service:"
Write-Host "   VITE_API_URL = https://YOUR-braino-api.onrender.com"
Write-Host ""
Write-Host "4. Redeploy braino-web. Public URL will be on the Render dashboard."
Write-Host ""
Write-Host "Full guide: DEPLOY.md" -ForegroundColor Green
