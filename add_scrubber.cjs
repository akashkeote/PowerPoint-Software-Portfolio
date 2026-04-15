const fs = require('fs');
const uiCode = fs.readFileSync('src/js/ui.js', 'utf8');

const scrubberCode = `
// ==========================================
// 🌌 CINEMATIC CANVAS SCRUBBER
// ==========================================
window.targetScrubFrame = 0;

(function initScrubber() {
  const SCRUB_TOTAL_FRAMES = 88;
  const SCRUB_SMOOTHNESS = 0.08;
  const slideAnchors = [0, 22, 44, 66, 87];
  
  const scrubImages = [];
  let currentScrubFrame = 0;
  let scrubCanvas = document.getElementById('hero-scrub-canvas');
  let scrubCtx = scrubCanvas ? scrubCanvas.getContext('2d') : null;
  let scrubberLoaded = false;
  let presModeEl = document.getElementById('presentation-mode');
  let presProgress = document.querySelector('.pres-progress');
  
  if (!scrubCanvas || !scrubCtx) return;

  function handleScrubResize() {
    scrubCanvas.width = window.innerWidth;
    scrubCanvas.height = window.innerHeight;
    drawScrubFrame(Math.round(currentScrubFrame));
  }
  
  window.addEventListener('resize', handleScrubResize);
  handleScrubResize();

  let loadedCount = 0;
  for (let i = 0; i < SCRUB_TOTAL_FRAMES; i++) {
    const img = new Image();
    const num = i.toString().padStart(2, '0');
    // Important: we moved sequence directly into public/sequence
    img.src = '/sequence/frame_' + num + '_delay-0.066s.png';
    img.onload = () => {
      loadedCount++;
      if (loadedCount >= SCRUB_TOTAL_FRAMES / 4 && !scrubberLoaded) {
        scrubberLoaded = true;
        renderScrubberLoop();
      }
    };
    scrubImages.push(img);
  }
  
  presModeEl.addEventListener('wheel', (e) => {
    if (!presModeEl.classList.contains('active')) return;
    
    // Allow native scroll inside the projects grid if needed
    const path = e.composedPath();
    const isProjectScroll = path.some(el => el.classList && el.classList.contains('s-projects'));
    const projGrid = document.querySelector('#presentation-mode .s-projects');
    
    if (isProjectScroll && projGrid) {
        const isAtTop = projGrid.scrollTop <= 0;
        const isAtBottom = projGrid.scrollTop + projGrid.clientHeight >= projGrid.scrollHeight;
        if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            return; // let native scroll happen
        }
    }
    
    e.preventDefault();
    
    window.targetScrubFrame += (e.deltaY > 0 ? 1 : -1) * 3.5;
    window.targetScrubFrame = Math.max(0, Math.min(window.targetScrubFrame, SCRUB_TOTAL_FRAMES - 1));
    
    // Sync Slide
    let mappedSlide = 0;
    for (let i = slideAnchors.length - 1; i >= 0; i--) {
       if (window.targetScrubFrame >= slideAnchors[i] - 11) { mappedSlide = i; break; }
    }
    
    // Trigger visual change without hard resetting the frame anchor via goToPresSlide
    if (typeof window.presSlide !== 'undefined' && mappedSlide !== window.presSlide) {
        const slides = document.querySelectorAll('#presentation-mode .pres-slide');
        slides.forEach(s => s.classList.remove('active'));
        window.presSlide = mappedSlide;
        slides[window.presSlide].classList.add('active');
        if (presProgress && typeof window.TOTAL_SLIDES !== 'undefined') {
            const pct = ((window.presSlide + 1) / window.TOTAL_SLIDES) * 100;
            presProgress.style.width = pct + '%';
        }
    }
  }, { passive: false });

  function renderScrubberLoop() {
    if (presModeEl.classList.contains('active')) {
       currentScrubFrame += (window.targetScrubFrame - currentScrubFrame) * SCRUB_SMOOTHNESS;
       drawScrubFrame(Math.round(currentScrubFrame));
    }
    requestAnimationFrame(renderScrubberLoop);
  }

  function drawScrubFrame(index) {
    index = Math.max(0, Math.min(index, SCRUB_TOTAL_FRAMES - 1));
    const img = scrubImages[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    const scale = Math.max(scrubCanvas.width / img.width, scrubCanvas.height / img.height);
    const x = (scrubCanvas.width / 2) - (img.width / 2) * scale;
    const y = (scrubCanvas.height / 2) - (img.height / 2) * scale;
    
    scrubCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }
})();
`;

if (!uiCode.includes('CINEMATIC CANVAS SCRUBBER')) {
  fs.appendFileSync('src/js/ui.js', "\n" + scrubberCode);
}
