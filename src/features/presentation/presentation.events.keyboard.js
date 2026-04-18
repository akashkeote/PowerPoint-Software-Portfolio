import { state } from '../../core/state.js';
import { goToSlide } from '../../core/layout/editor.controller.js';
import { exitPresentation, goToPresSlide } from './presentation.nav.js';

export function bindKeyboardEvents() {
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
