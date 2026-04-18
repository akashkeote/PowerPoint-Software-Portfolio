import { getStableCanvasSize, bindCanvasResize } from './scrollytelling.resize.js';
import { renderImageToCanvas, getValidImage } from './scrollytelling.draw.js';

export function initScrollytellingRenderer(scrubImages, SCRUB_TOTAL_FRAMES) {
  let scrubCanvas = document.getElementById('hero-scrub-canvas');
  let scrubCtx = scrubCanvas ? scrubCanvas.getContext('2d') : null;
  let currentScrubFrame = 0;
  let renderLoopRunning = false;
  let presModeEl = document.getElementById('presentation-mode');
  const IS_MOBILE = window.innerWidth <= 768;
  const SCRUB_SMOOTHNESS = IS_MOBILE ? 0.05 : 0.08;

  if (!scrubCanvas || !scrubCtx) return null;

  let canvasSize = getStableCanvasSize(IS_MOBILE);
  scrubCanvas.width = canvasSize.w;
  scrubCanvas.height = canvasSize.h;

  bindCanvasResize(scrubCanvas, IS_MOBILE, () => drawScrubFrame(Math.round(currentScrubFrame)));

  function startRenderLoop() {
      if (renderLoopRunning) return;
      renderLoopRunning = true;
      renderScrubberLoop();
  }

  function renderScrubberLoop() {
      if (presModeEl && presModeEl.classList.contains('active')) {
         currentScrubFrame += (window.targetScrubFrame - currentScrubFrame) * SCRUB_SMOOTHNESS;
         currentScrubFrame = Math.max(0, Math.min(currentScrubFrame, SCRUB_TOTAL_FRAMES - 1));
         drawScrubFrame(Math.round(currentScrubFrame));
      }
      requestAnimationFrame(renderScrubberLoop);
  }

  function drawScrubFrame(index) {
      index = Math.max(0, Math.min(index, SCRUB_TOTAL_FRAMES - 1));
      let img = getValidImage(scrubImages, index, SCRUB_TOTAL_FRAMES);
      if (!img) return;
      renderImageToCanvas(scrubCtx, scrubCanvas, img);
  }

  return { startRenderLoop, drawScrubFrame };
}
