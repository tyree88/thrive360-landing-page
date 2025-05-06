// Custom starter script that runs the Next.js application on port 3000
import { spawn } from 'child_process';

// Run Next.js with custom port
const nextProcess = spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '3000' }
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js process:', err);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Next.js process exited with code ${code}`);
    process.exit(code);
  }
});

// Handle termination signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    nextProcess.kill(signal);
    process.exit(0);
  });
});
