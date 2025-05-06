const http = require('http');
const httpProxy = require('http-proxy');

// Create a new proxy server
const proxy = httpProxy.createProxyServer({});

// Error handling
proxy.on('error', function(err, req, res) {
  console.error('Proxy error:', err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Proxy error: ' + err.message);
});

// Create a server that forwards to the Next.js dev server
const server = http.createServer(function(req, res) {
  // Forward requests to port 3000 (Next.js)
  proxy.web(req, res, { target: 'http://localhost:3000' });
});

// Listen on port 5000
server.listen(5000, () => {
  console.log('Port forwarding server running on port 5000 -> 3000');
});