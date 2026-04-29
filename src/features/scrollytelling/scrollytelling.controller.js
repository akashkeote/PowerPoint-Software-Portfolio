import { buildExpectedFrames, preloadAllFrames } from './scrollytelling.loader.js';
import { initScrollytellingRenderer } from './scrollytelling.renderer.js';
import { initScrollytellingInput } from './scrollytelling.input.js';

export function initScrollytellingController() {
    window.virtualScrollPos = 0;
    window.targetScrubFrame = 0;

    const SCRUB_TOTAL_FRAMES = 174;
    const IS_MOBILE = window.innerWidth <= 768;
    const VIRTUAL_SCROLL_HEIGHT = 4000;
    const slideAnchors = [0, 43, 87, 130, 173];
    const BOOT_CONCURRENCY = IS_MOBILE ? 10 : 16;

    const EXPECTED_FRAMES = buildExpectedFrames(SCRUB_TOTAL_FRAMES, IS_MOBILE, slideAnchors);

    const scrubImages = [];
    const counter = { loaded: 0, total: EXPECTED_FRAMES.length };

    const renderer = initScrollytellingRenderer(scrubImages, SCRUB_TOTAL_FRAMES);

    preloadAllFrames(
        EXPECTED_FRAMES, slideAnchors, scrubImages,
        counter, BOOT_CONCURRENCY,
        () => {
            // Keyframes are ready — first render + notify boot controller
            if (renderer) {
                renderer.drawScrubFrame(slideAnchors[0]);
                renderer.startRenderLoop();
            }
            // Signal boot controller that keyframes are loaded
            if (typeof window.onKeyframesReady === 'function') {
                window.onKeyframesReady();
            }
        },
        IS_MOBILE
    );

    initScrollytellingInput(slideAnchors, SCRUB_TOTAL_FRAMES, VIRTUAL_SCROLL_HEIGHT);
}
