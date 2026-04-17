import { state } from './state.js';

export function goToSlide(n) {
    const slides = document.querySelectorAll('.slide-wrapper .slide');
    const thumbs = document.querySelectorAll('.slide-thumb');
    const slideCount = document.getElementById('slide-count');

    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove('active'));
    thumbs.forEach(t => t.classList.remove('active'));

    state.currentSlide = Math.max(0, Math.min(n, state.TOTAL_SLIDES - 1));
    
    if (slides[state.currentSlide]) slides[state.currentSlide].classList.add('active');
    if (thumbs[state.currentSlide]) thumbs[state.currentSlide].classList.add('active');
    if (slideCount) slideCount.textContent = `Slide ${state.currentSlide + 1} of ${state.TOTAL_SLIDES}`;
}

export function initEditorController() {
    document.querySelectorAll('.slide-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            goToSlide(parseInt(thumb.dataset.slide));
        });
    });
}
