import { Context, VIRTUAL_SCROLL_HEIGHT, SCRUB_TOTAL_FRAMES, SLIDE_ANCHORS } from './engine-state.js';
import { state } from '../state.js';
import { goToPresSlide } from '../presentation-controller.js';

export function handleScrubDelta(deltaY, e) {
    if (!Context.presModeEl.classList.contains('active')) return;
    
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
    for (let i = SLIDE_ANCHORS.length - 1; i >= 0; i--) {
       if (window.targetScrubFrame >= SLIDE_ANCHORS[i] - 11) { mappedSlide = i; break; }
    }
    
    if (mappedSlide !== state.presSlide) {
        goToPresSlide(mappedSlide, false);
    }
}

export function attachScrollListeners() {
    Context.presModeEl.addEventListener('wheel', (e) => {
        handleScrubDelta(e.deltaY, e);
    }, { passive: false });

    let scrubTouchLastY = 0;
    
    Context.presModeEl.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) scrubTouchLastY = e.touches[0].clientY;
    }, { passive: true });

    Context.presModeEl.addEventListener('touchmove', (e) => {
        if (e.touches.length === 0) return;
        const currentY = e.touches[0].clientY;
        const deltaY = scrubTouchLastY - currentY; 
        scrubTouchLastY = currentY;
        
        if (Math.abs(deltaY) > 2) {
            handleScrubDelta(deltaY, e);
        }
    }, { passive: false });
}
