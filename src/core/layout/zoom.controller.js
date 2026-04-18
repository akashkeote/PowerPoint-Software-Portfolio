import { updateZoomFromEvent, applyZoomUI } from './zoom.logic.js';

export function initZoomController() {
    const els = {
        zoomThumb: document.getElementById('zoom-thumb'),
        zoomLabel: document.getElementById('zoom-label'),
        slideWrapper: document.querySelector('.slide-wrapper')
    };
    const zoomBar = document.getElementById('zoom-bar');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomFitBtn = document.getElementById('zoom-fit-btn');
    
    if (!zoomBar || !els.zoomThumb) return;

    let currentZoom = 0.72;
    let isDraggingZoom = false;

    const setZoom = (z) => { currentZoom = applyZoomUI(z, els); };

    zoomBar.addEventListener('mousedown', (e) => {
        isDraggingZoom = true;
        updateZoomFromEvent(e, zoomBar, setZoom);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDraggingZoom) return;
        updateZoomFromEvent(e, zoomBar, setZoom);
    });
    
    document.addEventListener('mouseup', () => {
        isDraggingZoom = false;
    });

    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setZoom(currentZoom - 0.1));
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => setZoom(currentZoom + 0.1));
    if (zoomFitBtn) zoomFitBtn.addEventListener('click', () => setZoom(0.72));

    setZoom(currentZoom);
}
