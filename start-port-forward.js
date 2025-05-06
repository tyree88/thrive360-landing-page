const { spawn } = require('child_process');
const path = require('path');

// Start Next.js development server
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

console.log('Started Next.js development server on port 3000');

// Wait for Next.js to start up
setTimeout(() => {
  // Start port forwarding server
  const forwardProcess = spawn('node', [path.join(__dirname, 'port-forward.js')], {
    stdio: 'inherit',
    shell: true
  });

  console.log('Started port forwarding from port 5000 to 3000');

  // Handle exit events
  forwardProcess.on('exit', (code) => {
    console.log(`Port forwarding server exited with code ${code}`);
    nextProcess.kill();
  });

  nextProcess.on('exit', (code) => {
    console.log(`Next.js server exited with code ${code}`);
    forwardProcess.kill();
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('Shutting down servers...');
    forwardProcess.kill();
    nextProcess.kill();
    process.exit(0);
  });
}, 5000);  // Wait 5 seconds for Next.js to start