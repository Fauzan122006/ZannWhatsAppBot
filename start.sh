#!/bin/bash

echo "========================================"
echo " ZANN WHATSAPP MULTI-BOT MANAGER"
echo " Quick Start Script"
echo "========================================"
echo ""

echo "[1/4] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found!"
    echo "Please install Node.js 21+ from https://nodejs.org"
    exit 1
fi
node --version
echo ""

echo "[2/4] Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies!"
        exit 1
    fi
else
    echo "Dependencies already installed."
fi
echo ""

echo "[3/4] Checking configuration..."
if [ ! -f "settings.json" ]; then
    echo "ERROR: settings.json not found!"
    echo "Please create settings.json"
    exit 1
fi
echo "Configuration file found."
echo ""

echo "[4/4] Starting bot..."
echo ""
echo "========================================"
echo " Dashboard will be available at:"
echo " http://localhost:3000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop the bot"
echo ""

node app.js
