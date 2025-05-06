#!/bin/bash

# Kill any processes using ports 3000 and 5000
echo "Checking for processes using ports 3000 and 5000..."
kill $(lsof -t -i:3000) 2>/dev/null || true
kill $(lsof -t -i:5000) 2>/dev/null || true

# Start proxy in background
echo "Starting proxy server..."
node server.mjs &
PROXY_PID=$!

# Store proxy PID for later cleanup
echo $PROXY_PID > .proxy.pid

# Give the proxy a moment to start
sleep 1

# Start Next.js
echo "Starting Next.js on port 3000..."
npm run dev

# Cleanup on exit
kill $(cat .proxy.pid) 2>/dev/null || true
rm .proxy.pid 2>/dev/null || true
