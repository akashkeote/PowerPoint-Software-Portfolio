import { startPresentation } from './presentation.nav.js';
import { checkMobileMode } from './presentation.mobile.js';
import { bindLinkEvents } from './presentation.events.links.js';
import { bindKeyboardEvents } from './presentation.events.keyboard.js';
import { bindTouchEvents } from './presentation.events.touch.js';

export const MOBILE_BREAKPOINT = 768;

export function bindPresentationEvents() {
    document.querySelectorAll('.start-presentation-btn').forEach(btn => btn.addEventListener('click', startPresentation));
    
    const statusPresentBtn = document.getElementById('status-present-btn');
    if (statusPresentBtn) statusPresentBtn.addEventListener('click', startPresentation);

    bindLinkEvents();
    bindKeyboardEvents();
    bindTouchEvents();

    window.addEventListener('bootComplete', () => checkMobileMode(MOBILE_BREAKPOINT, startPresentation));

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
}
