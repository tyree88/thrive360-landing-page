/**
 * Run Next.js and a proxy server in the same process
 * This script starts Next.js on port 3000 and proxies port 5000 to it
 */

const { execSync, spawn } = require('child_process');
const http = require('http');
const httpProxy = require('http-proxy');

// Display startup message
console.log('Starting Thrive360 application setup...');

// Start Next.js in a separate process
const nextProcess = spawn('next', ['dev'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

console.log('Next.js process started. Waiting for port 3000 to be available...');

// Function to check if a port is in use
function isPortInUse(port) {
  try {
    execSync(`nc -z localhost ${port}`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Poll until port 3000 is available (Next.js is running)
const checkPort = () => {
  if (isPortInUse(3000)) {
    console.log('Next.js detected running on port 3000. Starting proxy...');
    startProxy();
  } else {
    console.log('Waiting for Next.js to start...');
    setTimeout(checkPort, 1000);
  }
};

// Start polling after a short delay
setTimeout(checkPort, 2000);

// Function to start the proxy server
function startProxy() {
  // Create a proxy server instance
  const proxy = httpProxy.createProxyServer({});
  
  // Create the HTTP server for the proxy
  const server = http.createServer((req, res) => {
    // Log the request (optional)
    console.log(`Proxy: ${req.method} ${req.url}`);
    
    // Forward the request to port 3000
    proxy.web(req, res, {
      target: 'http://localhost:3000',
      ws: true,
      changeOrigin: true
    });
  });
  
  // Handle websocket connections (needed for HMR)
  server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head, {
      target: 'http://localhost:3000',
      ws: true
    });
  });
  
  // Handle proxy errors
  proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    if (res.writeHead) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Proxy error: ${err.message}`);
    }
  });
  
  // Listen on port 5000
  server.listen(5000, () => {
    console.log('Proxy server running on port 5000');
    console.log('Application is now accessible at http://localhost:5000');
  });
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down application...');
  if (nextProcess) {
    nextProcess.kill();
  }
  process.exit(0);
});
