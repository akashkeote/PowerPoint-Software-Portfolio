import { Context, SCRUB_TOTAL_FRAMES, SCRUB_SMOOTHNESS, IS_MOBILE, SLIDE_ANCHORS, VIRTUAL_SCROLL_HEIGHT } from './engine-state.js';
import { getStableCanvasSize, drawScrubFrame } from './canvas-renderer.js';
import { preloadScrubSequence } from './frame-cache.js';
import { attachScrollListeners } from './scroll-sync.js';

export function initScrollytellingController() {
    window.virtualScrollPos = 0;
    window.targetScrubFrame = 0;

    Context.scrubCanvas = document.getElementById('hero-scrub-canvas');
    Context.scrubCtx = Context.scrubCanvas ? Context.scrubCanvas.getContext('2d') : null;
    Context.presModeEl = document.getElementById('presentation-mode');
    
    if (!Context.scrubCanvas || !Context.scrubCtx || !Context.presModeEl) return;

    Context.canvasSize = getStableCanvasSize(IS_MOBILE);
    Context.scrubCanvas.width = Context.canvasSize.w;
    Context.scrubCanvas.height = Context.canvasSize.h;
    Context.lastKnownWidth = Context.canvasSize.w;

    window.addEventListener('resize', () => {
        if (IS_MOBILE) {
            const currentWidth = window.innerWidth;
            if (Math.abs(currentWidth - Context.lastKnownWidth) < 2) return; 
            Context.lastKnownWidth = currentWidth;
            Context.canvasSize = getStableCanvasSize(IS_MOBILE);
            Context.scrubCanvas.width = Context.canvasSize.w;
            Context.scrubCanvas.height = Context.canvasSize.h;
            drawScrubFrame(Math.round(Context.currentScrubFrame), SCRUB_TOTAL_FRAMES);
        } else {
            Context.scrubCanvas.width = window.innerWidth;
            Context.scrubCanvas.height = window.innerHeight;
            drawScrubFrame(Math.round(Context.currentScrubFrame), SCRUB_TOTAL_FRAMES);
        }
    });

    window.mobileScrubToSlide = function(slideIndex) {
        if (!Context.scrubberLoaded) return;
        const targetFrame = SLIDE_ANCHORS[Math.max(0, Math.min(slideIndex, SLIDE_ANCHORS.length - 1))];
        window.targetScrubFrame = targetFrame;
        window.virtualScrollPos = (targetFrame / (SCRUB_TOTAL_FRAMES - 1)) * VIRTUAL_SCROLL_HEIGHT;
    };

    preloadScrubSequence(SCRUB_SMOOTHNESS, SCRUB_TOTAL_FRAMES);
    attachScrollListeners();
}
