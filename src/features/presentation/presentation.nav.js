import { state } from '../../core/state.js';

export function goToPresSlide(n, resetScrub = true) {
    const slides = document.querySelectorAll('#presentation-mode .pres-slide');
    if (slides.length === 0) return;
    const presProgress = document.getElementById('pres-progress');
    
    slides.forEach(s => s.classList.remove('active'));
    state.presSlide = Math.max(0, Math.min(n, state.TOTAL_SLIDES - 1));
    if (slides[state.presSlide]) slides[state.presSlide].classList.add('active');
    
    if (presProgress) {
        const pct = ((state.presSlide + 1) / state.TOTAL_SLIDES) * 100;
        presProgress.style.width = pct + '%';
    }
    
    const presModeEl = document.getElementById('presentation-mode');
    if (presModeEl) {
        presModeEl.classList.add('is-transitioning');
        clearTimeout(window.presTransitionTimeout);
        window.presTransitionTimeout = setTimeout(() => {
            presModeEl.classList.remove('is-transitioning');
        }, 1500);
    }

    if (resetScrub && typeof window.virtualScrollPos !== 'undefined') {
        const slideAnchors = [0, 43, 87, 130, 173];
        const VIRTUAL_SCROLL_HEIGHT = 4000;
        const SCRUB_TOTAL_FRAMES = 174;
        const targetFrame = slideAnchors[state.presSlide];
        window.virtualScrollPos = (targetFrame / (SCRUB_TOTAL_FRAMES - 1)) * VIRTUAL_SCROLL_HEIGHT;
        window.targetScrubFrame = targetFrame;
    }

    if (typeof window.mobileScrubToSlide === 'function') {
        window.mobileScrubToSlide(state.presSlide);
    }
}

export function startPresentation() {
    const presMode = document.getElementById('presentation-mode');
    if (presMode) {
        presMode.classList.add('active');
        state.isPresentationActive = true;
        goToPresSlide(state.currentSlide);
    }
}

export function exitPresentation() {
    const presMode = document.getElementById('presentation-mode');
    if (presMode) {
        presMode.classList.remove('active');
        state.isPresentationActive = false;
    }
}
