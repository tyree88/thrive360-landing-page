/**
 * Next.js starter script with explicit port 5000
 */

const { spawn } = require('child_process');

// Start Next.js with port 5000
console.log('Starting Next.js on port 5000...');

const nextProcess = spawn('npx', ['next', 'dev', '--port', '5000', '--hostname', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js process:', err);
  process.exit(1);
});

nextProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`Next.js process exited with code ${code} and signal ${signal}`);
    process.exit(code || 1);
  }
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Shutting down Next.js...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Shutting down Next.js...');
  nextProcess.kill('SIGTERM');
});
