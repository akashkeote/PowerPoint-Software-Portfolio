import { startPresentation, exitPresentation, goToPresSlide } from './presentation.nav.js';
import { bindPresentationEvents } from './presentation.events.js';

export { startPresentation, exitPresentation, goToPresSlide };

export function initPresentationController() {
    bindPresentationEvents();
}
