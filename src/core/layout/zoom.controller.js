export function initZoomController() {
    const zoomBar = document.getElementById('zoom-bar');
    const zoomThumb = document.getElementById('zoom-thumb');
    const zoomLabel = document.getElementById('zoom-label');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomFitBtn = document.getElementById('zoom-fit-btn');
    const slideWrapper = document.querySelector('.slide-wrapper');
    
    if (!zoomBar || !zoomThumb) return;

    let currentZoom = 0.72; // default 72%
    let isDraggingZoom = false;

    function setZoom(z) {
        z = Math.max(0.1, Math.min(z, 2.0));
        currentZoom = z;
        const percent = (z - 0.1) / 1.9;
        
        if (zoomThumb) zoomThumb.style.left = `${percent * 100}%`;
        if (zoomLabel) zoomLabel.textContent = `${Math.round(z * 100)}%`;
        
        if (slideWrapper) {
            slideWrapper.style.transform = `scale(${z})`;
            slideWrapper.style.transformOrigin = 'center center';
            slideWrapper.style.transition = 'transform 0.1s ease-out';
        }
    }

    zoomBar.addEventListener('mousedown', (e) => {
        isDraggingZoom = true;
        updateZoomFromEvent(e);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDraggingZoom) return;
        updateZoomFromEvent(e);
    });
    
    document.addEventListener('mouseup', () => {
        isDraggingZoom = false;
    });

    function updateZoomFromEvent(e) {
        const rect = zoomBar.getBoundingClientRect();
        let x = e.clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        const percent = x / rect.width;
        let z = 0.1 + (percent * 1.9);
        setZoom(z);
    }
    
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setZoom(currentZoom - 0.1));
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => setZoom(currentZoom + 0.1));
    if (zoomFitBtn) zoomFitBtn.addEventListener('click', () => setZoom(0.72));

    setZoom(currentZoom);
}
