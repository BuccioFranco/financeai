@echo off
title FinanceAI — Setup y arranque
cd /d "%~dp0"

echo ============================================
echo  FinanceAI — Verificando dependencias...
echo ============================================
echo.

:: Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no encontrado. Instalando...
    winget install Python.Python.3.12 --accept-package-agreements --accept-source-agreements
    echo Por favor reinicia esta ventana despues de la instalacion.
    pause
    exit /b 1
) else (
    python --version
    echo [OK] Python encontrado
)

:: Verificar Node
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no encontrado. Instalando...
    winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    echo Por favor reinicia esta ventana despues de la instalacion.
    pause
    exit /b 1
) else (
    node --version
    echo [OK] Node.js encontrado
)

echo.
echo ============================================
echo  Instalando dependencias del backend...
echo ============================================
cd backend
pip install -r requirements.txt
cd ..

echo.
echo ============================================
echo  Instalando dependencias del frontend...
echo ============================================
cd frontend
call npm install
cd ..

echo.
echo ============================================
echo  Arrancando FinanceAI...
echo ============================================
echo.
echo Verificar que Ollama este corriendo: ollama serve
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.

:: Arrancar backend en ventana nueva
start "FinanceAI Backend" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --reload --port 8000"

:: Esperar 2 segundos y arrancar frontend
timeout /t 2 /nobreak >nul
start "FinanceAI Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Abriendo navegador en 5 segundos...
timeout /t 5 /nobreak >nul
start http://localhost:5173

echo.
echo Presiona cualquier tecla para cerrar esta ventana (backend y frontend siguen corriendo)
pause >nul
