import { CACHE_NAME, Context, EXPECTED_FRAMES, SLIDE_ANCHORS, IS_MOBILE } from './engine-state.js';
import { drawScrubFrame, startRenderLoop } from './canvas-renderer.js';

export async function loadSingleFrame(index, totalFrames) {
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
        Context.scrubImages[index] = bitmap;
        Context.loadedCount++;
        
        if (typeof window.updateBootProgress === 'function') {
            window.updateBootProgress(Context.loadedCount, EXPECTED_FRAMES.length);
        }
    } catch (err) {
        console.log('Frame skip: ' + index);
        Context.loadedCount++;
    }
}

export async function preloadScrubSequence(smoothness, totalFrames) {
    const BOOT_CONCURRENCY = IS_MOBILE ? 10 : 16;
    const keyframePromises = SLIDE_ANCHORS.map(idx => loadSingleFrame(idx, totalFrames));
    await Promise.all(keyframePromises);
    
    Context.scrubberLoaded = true;
    drawScrubFrame(SLIDE_ANCHORS[0], totalFrames);
    startRenderLoop(smoothness, totalFrames);

    const remaining = [];
    for (const frameIndex of EXPECTED_FRAMES) {
        if (!Context.scrubImages[frameIndex]) remaining.push(frameIndex);
    }

    for (let i = 0; i < remaining.length;) {
        const batch = [];
        for (let j = 0; j < BOOT_CONCURRENCY && i < remaining.length; j++, i++) {
            batch.push(loadSingleFrame(remaining[i], totalFrames));
        }
        await Promise.all(batch);
    }

    console.log('[Scrubber] All ' + Context.loadedCount + ' frames cached' + (IS_MOBILE ? ' (mobile)' : ''));
    
    if (typeof window.onAllFramesCached === 'function') {
        window.onAllFramesCached();
    }
    window.dispatchEvent(new Event('bootComplete'));
}
