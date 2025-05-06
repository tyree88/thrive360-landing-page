/**
 * Combined server script that runs Next.js on port 3000 and serves it via port 5000
 * This is needed because Replit workflows expect port 5000 but Next.js uses 3000
 */

const { spawn } = require('child_process');
const http = require('http');
const httpProxy = require('http-proxy');

// Start Next.js in the background
console.log('Starting Next.js development server...');
const nextProcess = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

console.log('Next.js process started, setting up proxy server...');

// Create proxy server with error handling
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:3000',
  ws: true // Enable WebSocket proxy (needed for Next.js hot reloading)
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (!res.headersSent && res.writeHead) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Proxy error: ' + err.message);
  }
});

// Create HTTP server
const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  console.log(`Proxy: ${req.method} ${req.url}`);
  proxy.web(req, res);
});

// Handle WebSocket connections (needed for Next.js HMR)
server.on('upgrade', (req, socket, head) => {
  console.log('Proxying websocket connection');
  proxy.ws(req, socket, head);
});

// Start the proxy server on port 5000
server.listen(5000, '0.0.0.0', () => {
  console.log('Proxy server running on http://0.0.0.0:5000');
  console.log('Forwarding all requests to Next.js on port 3000');
});

// Graceful shutdown handling
const shutdown = () => {
  console.log('Shutting down servers...');
  server.close(() => {
    console.log('Proxy server closed');
    if (nextProcess) {
      console.log('Terminating Next.js...');
      nextProcess.kill();
    }
    process.exit(0);
  });
};

// Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
