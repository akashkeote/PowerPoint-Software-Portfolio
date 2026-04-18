import { state } from '../../core/state.js';
import { goToPresSlide } from './presentation.nav.js';

export function bindTouchEvents() {
    const presMode = document.getElementById('presentation-mode');
    if (!presMode) return;

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
            if (diffX < 0) goToPresSlide(state.presSlide + 1);
            else goToPresSlide(state.presSlide - 1);
        }
    }, { passive: true });
}
