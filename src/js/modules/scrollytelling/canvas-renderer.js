import { Context } from './engine-state.js';

export function getStableCanvasSize(isMobile) {
    if (isMobile) {
        const maxH = Math.max(
            window.screen.availHeight || 0,
            window.screen.height || 0,
            window.innerHeight || 0
        );
        return { w: window.innerWidth, h: maxH };
    }
    return { w: window.innerWidth, h: window.innerHeight };
}

export function drawScrubFrame(index, totalFrames) {
    index = Math.max(0, Math.min(index, totalFrames - 1));
    let img = Context.scrubImages[index];
    
    if (!img || img.width === 0) {
        for (let offset = 1; offset < totalFrames; offset++) {
            if (Context.scrubImages[index - offset] && Context.scrubImages[index - offset].width > 0) {
                img = Context.scrubImages[index - offset];
                break;
            }
            if (Context.scrubImages[index + offset] && Context.scrubImages[index + offset].width > 0) {
                img = Context.scrubImages[index + offset];
                break;
            }
        }
        if (!img || img.width === 0) return;
    }
    
    if (!Context.scrubCtx) return;

    Context.scrubCtx.clearRect(0, 0, Context.scrubCanvas.width, Context.scrubCanvas.height);
    
    const cW = Context.scrubCanvas.width;
    const cH = Context.scrubCanvas.height;
    const scale = Math.max(cW / img.width, cH / img.height);
    const x = (cW / 2) - (img.width / 2) * scale;
    const y = (cH / 2) - (img.height / 2) * scale;
    
    Context.scrubCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

export function renderScrubberLoop(smoothness, totalFrames) {
    if (Context.presModeEl.classList.contains('active')) {
       Context.currentScrubFrame += (window.targetScrubFrame - Context.currentScrubFrame) * smoothness;
       Context.currentScrubFrame = Math.max(0, Math.min(Context.currentScrubFrame, totalFrames - 1));
       drawScrubFrame(Math.round(Context.currentScrubFrame), totalFrames);
    }
    requestAnimationFrame(() => renderScrubberLoop(smoothness, totalFrames));
}

export function startRenderLoop(smoothness, totalFrames) {
    if (Context.renderLoopRunning) return;
    Context.renderLoopRunning = true;
    renderScrubberLoop(smoothness, totalFrames);
}
