@echo off
echo ========================================
echo  ZANN WHATSAPP MULTI-BOT MANAGER
echo  Quick Start Script
echo ========================================
echo.

echo [1/4] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js 21+ from https://nodejs.org
    pause
    exit /b 1
)
node --version
echo.

echo [2/4] Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)
echo.

echo [3/4] Checking configuration...
if not exist settings.json (
    echo ERROR: settings.json not found!
    echo Please create settings.json from settings.json.example
    pause
    exit /b 1
)
echo Configuration file found.
echo.

echo [4/4] Starting bot...
echo.
echo ========================================
echo  Dashboard will be available at:
echo  http://localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the bot
echo.

node app.js

pause
