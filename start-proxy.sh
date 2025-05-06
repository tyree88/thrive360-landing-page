#!/bin/bash

# Start the Next.js application in the background
npm run dev &

# Store the PID of the Next.js process
NEXTJS_PID=$!

# Wait for Next.js to start (listening on port 3000)
echo "Waiting for Next.js to start on port 3000..."
while ! nc -z localhost 3000; do
  sleep 0.1
done
echo "Next.js is running on port 3000."

# Start the port-forwarding proxy
echo "Starting proxy from port 5000 to port 3000..."
node -e "const http = require('http'); const httpProxy = require('http-proxy'); const proxy = httpProxy.createProxyServer({}); const server = http.createServer((req, res) => { proxy.web(req, res, { target: 'http://localhost:3000' }); }); server.on('upgrade', (req, socket, head) => { proxy.ws(req, socket, head, { target: 'http://localhost:3000' }); }); server.listen(5000); console.log('Proxy listening on port 5000, forwarding to Next.js on port 3000');"

# If the proxy crashes, kill the Next.js process
trap "kill $NEXTJS_PID; exit" EXIT

# Keep the script running
wait $NEXTJS_PID
