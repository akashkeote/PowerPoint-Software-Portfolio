import '../css/style.css';
import './physics.js';
import './chat.js';
import './context-menu.js';

// MVC Controllers
import { initBootSequence } from './modules/boot-controller.js';
import { initThemeController } from './modules/theme-controller.js';
import { initEditorController } from './modules/editor-controller.js';
import { initPresentationController } from './modules/presentation-controller.js';
import { initRibbonController } from './modules/ribbon-controller.js';
import { initFileMenuController } from './modules/file-menu-controller.js';
import { initZoomController } from './modules/zoom-controller.js';
import { initScrollytellingController } from './modules/scrollytelling-controller.js';

document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
    initThemeController();
    initEditorController();
    initPresentationController();
    initRibbonController();
    initFileMenuController();
    initZoomController();
    initScrollytellingController();
    
    // Initialize Feather icons after the UI binds
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
