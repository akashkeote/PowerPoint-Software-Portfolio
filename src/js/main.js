import '../css/style.css';

// Modular physics
import { initHeroPhysics } from '../features/physics/hero/hero.physics.js';
import { initSkillsPhysics } from '../features/physics/skills/skills.physics.js';

// Modular tutorial
import { initTutorial } from '../features/tutorial/tutorial.controller.js';

// Context menu (self-initializing IIFE)
import '../features/context-menu/context.menu.js';

// Chat (self-initializing)
import '../features/chat/chat.controller.js';

// MVC Controllers
import { initBootSequence } from '../core/boot/boot.controller.js';
import { initThemeController } from '../core/theme/theme.controller.js';
import { initEditorController } from '../core/layout/editor.controller.js';
import { initPresentationController } from '../features/presentation/presentation.controller.js';
import { initRibbonController } from '../features/ribbon/ribbon.controller.js';
import { initFileMenuController } from '../features/ribbon/file.menu.controller.js';
import { initZoomController } from '../core/layout/zoom.controller.js';
import { initScrollytellingController } from '../features/scrollytelling/scrollytelling.controller.js';

document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
    initThemeController();
    initEditorController();
    initPresentationController();
    initRibbonController();
    initFileMenuController();
    initZoomController();
    initScrollytellingController();
    initTutorial();

    // Initialize physics after a small delay for DOM readiness
    setTimeout(() => {
        initHeroPhysics('pres-hero-canvas');
        const skCanvas = document.getElementById('skills-canvas');
        if (skCanvas) initSkillsPhysics('skills-canvas');
    }, 100);

    // Initialize Feather icons after the UI binds
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
