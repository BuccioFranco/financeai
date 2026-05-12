# FinanceAI — Script de instalacion y arranque
# Ejecutar: powershell -ExecutionPolicy Bypass -File install.ps1

Set-Location $PSScriptRoot

Write-Host "============================================" -ForegroundColor Cyan
Write-Host " FinanceAI — Verificando dependencias..." -ForegroundColor Cyan
Write-Host "============================================"

# Python
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "[INFO] Instalando Python 3.12..." -ForegroundColor Yellow
    winget install Python.Python.3.12 --accept-package-agreements --accept-source-agreements
    Write-Host "Reinicia PowerShell y ejecuta este script de nuevo." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] $(python --version)" -ForegroundColor Green

# Node
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[INFO] Instalando Node.js LTS..." -ForegroundColor Yellow
    winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    Write-Host "Reinicia PowerShell y ejecuta este script de nuevo." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Node $(node --version)" -ForegroundColor Green

# Backend deps
Write-Host "`n[Backend] Instalando dependencias Python..." -ForegroundColor Cyan
Set-Location backend
pip install -r requirements.txt
Set-Location ..

# Frontend deps
Write-Host "`n[Frontend] Instalando dependencias npm..." -ForegroundColor Cyan
Set-Location frontend
npm install
Set-Location ..

# Ollama model
Write-Host "`n[Ollama] Descargando modelo qwen2.5:7b (puede tardar varios minutos)..." -ForegroundColor Cyan
ollama pull qwen2.5:7b

Write-Host "`n============================================" -ForegroundColor Green
Write-Host " Instalacion completa. Arrancando..." -ForegroundColor Green
Write-Host "============================================`n"

# Arrancar backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; python -m uvicorn main:app --reload --port 8000" -WindowStyle Normal

Start-Sleep 2

# Arrancar frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal

Start-Sleep 4

# Abrir browser
Start-Process "http://localhost:5173"

Write-Host "Backend:  http://localhost:8000" -ForegroundColor Blue
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Blue
Write-Host "`nFinanceAI corriendo. Cerrando este script." -ForegroundColor Green
