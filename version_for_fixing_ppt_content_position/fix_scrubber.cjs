const fs = require('fs');
let code = fs.readFileSync('src/js/ui.js', 'utf8');

// Replace the renderScrubberLoop with a bouncing/ping-pong loop when stationary!
const oldFunc = `  function renderScrubberLoop() {
    if (presModeEl.classList.contains('active')) {
       currentScrubFrame += (window.targetScrubFrame - currentScrubFrame) * SCRUB_SMOOTHNESS;
       drawScrubFrame(Math.round(currentScrubFrame));
    }
    requestAnimationFrame(renderScrubberLoop);
  }`;

const newFunc = `  let pingPongDir = 1;
  let autoPanSpeed = 0.08;

  function renderScrubberLoop() {
    if (presModeEl.classList.contains('active')) {
       // Approach target if needed, but if we are very close to target, trigger auto-breathing Ping-Pong
       if (Math.abs(window.targetScrubFrame - currentScrubFrame) > 1.5) {
           currentScrubFrame += (window.targetScrubFrame - currentScrubFrame) * SCRUB_SMOOTHNESS;
       } else {
           // Auto-float / cinematic breathing (Ping Pong up and down 10 frames smoothly)
           currentScrubFrame += autoPanSpeed * pingPongDir;
           if (currentScrubFrame > window.targetScrubFrame + 8) {
               pingPongDir = -1;
           } else if (currentScrubFrame < window.targetScrubFrame - 8) {
               pingPongDir = 1;
           }
           currentScrubFrame = Math.max(0, Math.min(currentScrubFrame, SCRUB_TOTAL_FRAMES - 1));
       }
       drawScrubFrame(Math.round(currentScrubFrame));
    }
    requestAnimationFrame(renderScrubberLoop);
  }`;

code = code.replace(oldFunc, newFunc);
fs.writeFileSync('src/js/ui.js', code);
