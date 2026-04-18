import { state } from './state.js';
import { goToSlide } from './editor-controller.js';

const MOBILE_BREAKPOINT = 768;

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

function showSwipeTutorial() {
    if (localStorage.getItem('swipeTutorialSeen')) return;
    const tutorial = document.getElementById('swipe-tutorial');
    if (!tutorial) return;

    setTimeout(() => {
        tutorial.classList.add('active');
        localStorage.setItem('swipeTutorialSeen', 'true');

        const autoDismiss = setTimeout(() => dismissTutorial(tutorial), 4000);

        tutorial.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            dismissTutorial(tutorial);
        }, { once: true });
    }, 1000);
}

function dismissTutorial(el) {
    if (!el.classList.contains('active')) return;
    el.classList.add('fade-out');
    setTimeout(() => {
        el.classList.remove('active', 'fade-out');
    }, 500);
}

function checkMobileMode() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
        const presMode = document.getElementById('presentation-mode');
        if (presMode && !presMode.classList.contains('active')) {
            startPresentation();
            showSwipeTutorial();
        }
    }
}

export function initPresentationController() {
    document.querySelectorAll('.start-presentation-btn').forEach(btn => btn.addEventListener('click', startPresentation));
    
    const statusPresentBtn = document.getElementById('status-present-btn');
    if (statusPresentBtn) statusPresentBtn.addEventListener('click', startPresentation);

    document.querySelectorAll('.download-engineering-notes-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://drive.google.com/drive/folders/14gwS2GpMkEbUhupOc-_rJtEkGLhwNldQ', '_blank', 'noopener,noreferrer');
        });
    });

    document.querySelectorAll('.download-resume-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://drive.google.com/drive/folders/1ID1uHzPu7DBdMX9e4SsYGLmeYbclXA76?usp=drive_link', '_blank', 'noopener,noreferrer');
        });
    });

    window.addEventListener('bootComplete', checkMobileMode);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                const presMode = document.getElementById('presentation-mode');
                if (presMode && !presMode.classList.contains('active')) {
                    startPresentation();
                }
            }
        }, 300);
    });

    const presMode = document.getElementById('presentation-mode');
    if (presMode) {
        let touchStartX = 0;
        let touchStartY = 0;

        presMode.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        presMode.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX < 0) {
                    goToPresSlide(state.presSlide + 1);
                } else {
                    goToPresSlide(state.presSlide - 1);
                }
            }
        }, { passive: true });
    }

    document.addEventListener('keydown', e => {
        const inPres = state.isPresentationActive;
        if (e.key === 'Escape') { exitPresentation(); return; }
        if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) {
            e.preventDefault();
            if (inPres) goToPresSlide(state.presSlide + 1);
            else goToSlide(state.currentSlide + 1);
        }
        if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
            e.preventDefault();
            if (inPres) goToPresSlide(state.presSlide - 1);
            else goToSlide(state.currentSlide - 1);
        }
    });
}
