/**
 * Replit startup script to run Next.js with port forwarding
 * This script will enable the workflow to access the application through port 5000
 */

const { spawn } = require('child_process');

// Start our combined server-esm.js script
console.log('Starting Thrive360 application with port forwarding...');

const serverProcess = spawn('node', ['server-esm.js'], {
  stdio: 'inherit',
  shell: true
});

serverProcess.on('error', (err) => {
  console.error('Failed to start server process:', err);
  process.exit(1);
});

serverProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`Server process exited with code ${code} and signal ${signal}`);
    process.exit(code || 1);
  }
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  serverProcess.kill('SIGTERM');
});
