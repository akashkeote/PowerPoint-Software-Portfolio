export const IS_MOBILE = window.innerWidth <= 768;
export const SCRUB_TOTAL_FRAMES = 174;
export const SCRUB_SMOOTHNESS = IS_MOBILE ? 0.05 : 0.08;
export const VIRTUAL_SCROLL_HEIGHT = 4000;
export const CACHE_NAME = 'ppt-scrub-frames-v1';
export const SLIDE_ANCHORS = [0, 43, 87, 130, 173];
export const EXPECTED_FRAMES = [];

for (let i = 0; i < SCRUB_TOTAL_FRAMES; i++) {
    if (IS_MOBILE && i % 2 !== 0 && !SLIDE_ANCHORS.includes(i)) continue;
    EXPECTED_FRAMES.push(i);
}

export const Context = {
    scrubImages: [],
    loadedCount: 0,
    currentScrubFrame: 0,
    scrubberLoaded: false,
    renderLoopRunning: false,
    scrubCanvas: null,
    scrubCtx: null,
    presModeEl: null,
    lastKnownWidth: 0,
    canvasSize: { w: 0, h: 0 }
};
