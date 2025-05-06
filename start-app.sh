#!/bin/bash

# This script will start Next.js and then the proxy server
echo "Starting Thrive360 application with proxy..."

# Start Next.js in the background
npm run dev &
NEXT_PID=$!

# Wait for Next.js to start
echo "Waiting for Next.js to start on port 3000..."
sleep 5

# Start the proxy server
echo "Starting proxy server..."
node server.mjs

# Cleanup on exit
cleanup() {
    echo "Shutting down services..."
    kill $NEXT_PID 2>/dev/null || true
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Keep script running
wait
