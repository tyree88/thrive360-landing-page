const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');

// Create Express server
const app = express();
const PORT = 5000;

// Start Next.js dev server
console.log('Starting Next.js development server...');
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Give Next.js time to start up
setTimeout(() => {
  // Set up proxy to forward requests to Next.js
  app.use('/', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true, // Support WebSockets
    logLevel: 'debug'
  }));

  // Start the proxy server
  app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT} -> forwarding to port 3000`);
  });

  // Handle termination
  process.on('SIGINT', () => {
    console.log('Shutting down servers...');
    nextProcess.kill();
    process.exit(0);
  });
}, 3000);

// Handle Next.js process exit
nextProcess.on('exit', (code) => {
  console.log(`Next.js server exited with code ${code}`);
  process.exit(code);
});