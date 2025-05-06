import http from 'http';
import httpProxy from 'http-proxy';

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create a server that forwards requests to port 3000
const server = http.createServer((req, res) => {
  console.log(`Forwarding request: ${req.method} ${req.url}`);
  proxy.web(req, res, { target: 'http://localhost:3000' });
});

// Handle WebSocket connections (necessary for Next.js HMR)
server.on('upgrade', (req, socket, head) => {
  console.log(`Forwarding WebSocket request`);
  proxy.ws(req, socket, head, { target: 'http://localhost:3000' });
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (res.writeHead) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error: ' + err.message);
  }
});

// Start listening on port 5000
server.listen(5000, () => {
  console.log('Proxy server running on port 5000, forwarding to port 3000');
});
