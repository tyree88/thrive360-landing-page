// Port forwarding script to handle the port mismatch in Replit
// This script will listen on port 5000 and forward all traffic to port 3000

const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create a server that uses the proxy to forward requests
const server = http.createServer((req, res) => {
  // Forward requests to the Next.js app running on port 3000
  proxy.web(req, res, { target: 'http://localhost:3000' });
});

// Listen on port 5000
server.listen(5000);

console.log('Port forwarding proxy running on port 5000, forwarding to port 3000');

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Proxy error: ' + err.message);
});
