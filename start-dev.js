// Script to start both the Next.js app and a proxy server
const { spawn } = require('child_process');
const http = require('http');
const httpProxy = require('http-proxy');

// Start Next.js on port 3000
console.log('Starting Next.js development server on port 3000...');
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Give Next.js a moment to start
setTimeout(() => {
  // Create a proxy server to forward port 5000 to 3000
  console.log('Starting proxy server on port 5000 -> 3000...');
  const proxy = httpProxy.createProxyServer({});

  // Create an HTTP server that uses the proxy
  const server = http.createServer((req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3000' });
  });

  // Handle proxy errors
  proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    if (res.writeHead) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Proxy error: ' + err.message);
    }
  });

  // Handle WebSocket connections
  server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head, { target: 'http://localhost:3000' });
  });

  // Start the proxy server
  server.listen(5000, () => {
    console.log('Proxy server running on port 5000, forwarding to port 3000');
    console.log('Navigate to http://localhost:5000 to view the app');
  });
}, 3000); // Wait 3 seconds for Next.js to start

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  if (nextProcess) {
    nextProcess.kill();
  }
  process.exit(0);
});
