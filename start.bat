@echo off
cd /d "%~dp0backend"
start "ResumeFit Backend" cmd /k "call venv\Scripts\activate && python app.py"
cd /d "%~dp0frontend"
start "ResumeFit Frontend" cmd /k "npm run dev"
ping -n 9 127.0.0.1 >nul
start http://localhost:5173