import { state } from './state.js';
import { goToPresSlide } from './presentation-controller.js';

export function initScrollytellingController() {
    window.virtualScrollPos = 0;
    window.targetScrubFrame = 0;

    const SCRUB_TOTAL_FRAMES = 174;
    const IS_MOBILE = window.innerWidth <= 768;
    const SCRUB_SMOOTHNESS = IS_MOBILE ? 0.05 : 0.08;
    const VIRTUAL_SCROLL_HEIGHT = 4000;
    const slideAnchors = [0, 43, 87, 130, 173];
    const CACHE_NAME = 'ppt-scrub-frames-v1';
    
    const EXPECTED_FRAMES = [];
    for (let i = 0; i < SCRUB_TOTAL_FRAMES; i++) {
        if (IS_MOBILE && i % 2 !== 0 && !slideAnchors.includes(i)) continue;
        EXPECTED_FRAMES.push(i);
    }
    
    const scrubImages = [];
    let currentScrubFrame = 0;
    let scrubCanvas = document.getElementById('hero-scrub-canvas');
    let scrubCtx = scrubCanvas ? scrubCanvas.getContext('2d') : null;
    let scrubberLoaded = false;
    let renderLoopRunning = false;
    let presModeEl = document.getElementById('presentation-mode');
    
    if (!scrubCanvas || !scrubCtx || !presModeEl) return;

    function getStableCanvasSize() {
        if (IS_MOBILE) {
            const maxH = Math.max(
                window.screen.availHeight || 0,
                window.screen.height || 0,
                window.innerHeight || 0
            );
            return { w: window.innerWidth, h: maxH };
        }
        return { w: window.innerWidth, h: window.innerHeight };
    }

    let canvasSize = getStableCanvasSize();
    scrubCanvas.width = canvasSize.w;
    scrubCanvas.height = canvasSize.h;

    let lastKnownWidth = canvasSize.w;

    window.addEventListener('resize', () => {
        if (IS_MOBILE) {
            const currentWidth = window.innerWidth;
            if (Math.abs(currentWidth - lastKnownWidth) < 2) return; 
            lastKnownWidth = currentWidth;
            canvasSize = getStableCanvasSize();
            scrubCanvas.width = canvasSize.w;
            scrubCanvas.height = canvasSize.h;
            drawScrubFrame(Math.round(currentScrubFrame));
        } else {
            scrubCanvas.width = window.innerWidth;
            scrubCanvas.height = window.innerHeight;
            drawScrubFrame(Math.round(currentScrubFrame));
        }
    });

    let loadedCount = 0;

    async function loadSingleFrame(index) {
        const num = index.toString().padStart(3, '0');
        const url = '/sequence/frame_' + num + '_delay-0.033s.webp';
        
        try {
            let blob = null;
            
            if ('caches' in window) {
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(url);
                if (cachedResponse) {
                    blob = await cachedResponse.blob();
                } else {
                    const networkResponse = await fetch(url);
                    const clonedResponse = networkResponse.clone();
                    cache.put(url, clonedResponse);
                    blob = await networkResponse.blob();
                }
            } else {
                const res = await fetch(url, { cache: 'force-cache' });
                blob = await res.blob();
            }
            
            const bitmap = await createImageBitmap(blob);
            scrubImages[index] = bitmap;
            loadedCount++;
            
            if (typeof window.updateBootProgress === 'function') {
                window.updateBootProgress(loadedCount, EXPECTED_FRAMES.length);
            }
        } catch (err) {
            console.log('Frame skip: ' + index);
            loadedCount++;
        }
    }

    const BOOT_CONCURRENCY = IS_MOBILE ? 10 : 16;

    async function preloadScrubSequence() {
        const keyframePromises = slideAnchors.map(idx => loadSingleFrame(idx));
        await Promise.all(keyframePromises);
        
        scrubberLoaded = true;
        drawScrubFrame(slideAnchors[0]);
        startRenderLoop();

        const remaining = [];
        for (const frameIndex of EXPECTED_FRAMES) {
            if (!scrubImages[frameIndex]) remaining.push(frameIndex);
        }

        for (let i = 0; i < remaining.length;) {
            const batch = [];
            for (let j = 0; j < BOOT_CONCURRENCY && i < remaining.length; j++, i++) {
                batch.push(loadSingleFrame(remaining[i]));
            }
            await Promise.all(batch);
        }

        console.log('[Scrubber] All ' + loadedCount + ' frames cached' + (IS_MOBILE ? ' (mobile)' : ''));
        
        if (typeof window.onAllFramesCached === 'function') {
            window.onAllFramesCached();
        }
        window.dispatchEvent(new Event('bootComplete'));
    }

    window.mobileScrubToSlide = function(slideIndex) {
        if (!scrubberLoaded) return;
        const targetFrame = slideAnchors[Math.max(0, Math.min(slideIndex, slideAnchors.length - 1))];
        window.targetScrubFrame = targetFrame;
        window.virtualScrollPos = (targetFrame / (SCRUB_TOTAL_FRAMES - 1)) * VIRTUAL_SCROLL_HEIGHT;
    };

    preloadScrubSequence();
    
    function handleScrubDelta(deltaY, e) {
        if (!presModeEl.classList.contains('active')) return;
        
        const path = e.composedPath ? e.composedPath() : (e.path || []);
        const isProjectScroll = path.some(el => el.classList && el.classList.contains('s-projects'));
        const projGrid = document.querySelector('#presentation-mode .s-projects');
        
        if (isProjectScroll && projGrid) {
            const isAtTop = projGrid.scrollTop <= 0;
            const isAtBottom = projGrid.scrollTop + projGrid.clientHeight >= projGrid.scrollHeight - 2;
            if ((deltaY < 0 && !isAtTop) || (deltaY > 0 && !isAtBottom)) {
                return;
            }
        }
        
        if (e.cancelable) e.preventDefault();
        
        const multiplier = e.type === 'touchmove' ? 1.5 : 1;
        
        window.virtualScrollPos += deltaY * multiplier;
        window.virtualScrollPos = Math.max(0, Math.min(window.virtualScrollPos, VIRTUAL_SCROLL_HEIGHT));
        window.targetScrubFrame = (window.virtualScrollPos / VIRTUAL_SCROLL_HEIGHT) * (SCRUB_TOTAL_FRAMES - 1);
        
        let mappedSlide = 0;
        for (let i = slideAnchors.length - 1; i >= 0; i--) {
           if (window.targetScrubFrame >= slideAnchors[i] - 11) { mappedSlide = i; break; }
        }
        
        if (mappedSlide !== state.presSlide) {
            goToPresSlide(mappedSlide, false);
        }
    }

    presModeEl.addEventListener('wheel', (e) => {
        handleScrubDelta(e.deltaY, e);
    }, { passive: false });

    let scrubTouchLastY = 0;
    
    presModeEl.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) scrubTouchLastY = e.touches[0].clientY;
    }, { passive: true });

    presModeEl.addEventListener('touchmove', (e) => {
        if (e.touches.length === 0) return;
        const currentY = e.touches[0].clientY;
        const deltaY = scrubTouchLastY - currentY; 
        scrubTouchLastY = currentY;
        
        if (Math.abs(deltaY) > 2) {
            handleScrubDelta(deltaY, e);
        }
    }, { passive: false });

    function startRenderLoop() {
        if (renderLoopRunning) return;
        renderLoopRunning = true;
        renderScrubberLoop();
    }

    function renderScrubberLoop() {
        if (presModeEl.classList.contains('active')) {
           currentScrubFrame += (window.targetScrubFrame - currentScrubFrame) * SCRUB_SMOOTHNESS;
           currentScrubFrame = Math.max(0, Math.min(currentScrubFrame, SCRUB_TOTAL_FRAMES - 1));
           drawScrubFrame(Math.round(currentScrubFrame));
        }
        requestAnimationFrame(renderScrubberLoop);
    }

    function drawScrubFrame(index) {
        index = Math.max(0, Math.min(index, SCRUB_TOTAL_FRAMES - 1));
        let img = scrubImages[index];
        
        if (!img || img.width === 0) {
            for (let offset = 1; offset < SCRUB_TOTAL_FRAMES; offset++) {
                if (scrubImages[index - offset] && scrubImages[index - offset].width > 0) {
                    img = scrubImages[index - offset];
                    break;
                }
                if (scrubImages[index + offset] && scrubImages[index + offset].width > 0) {
                    img = scrubImages[index + offset];
                    break;
                }
            }
            if (!img || img.width === 0) return;
        }
        
        scrubCtx.clearRect(0, 0, scrubCanvas.width, scrubCanvas.height);
        
        const cW = scrubCanvas.width;
        const cH = scrubCanvas.height;
        const scale = Math.max(cW / img.width, cH / img.height);
        const x = (cW / 2) - (img.width / 2) * scale;
        const y = (cH / 2) - (img.height / 2) * scale;
        
        scrubCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
}
