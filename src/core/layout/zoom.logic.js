export function updateZoomFromEvent(e, zoomBar, setZoom) {
    const rect = zoomBar.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = x / rect.width;
    let z = 0.1 + (percent * 1.9);
    setZoom(z);
}

export function applyZoomUI(z, elements) {
    z = Math.max(0.1, Math.min(z, 2.0));
    const percent = (z - 0.1) / 1.9;
    
    if (elements.zoomThumb) elements.zoomThumb.style.left = `${percent * 100}%`;
    if (elements.zoomLabel) elements.zoomLabel.textContent = `${Math.round(z * 100)}%`;
    
    if (elements.slideWrapper) {
        elements.slideWrapper.style.transform = `scale(${z})`;
        elements.slideWrapper.style.transformOrigin = 'center center';
        elements.slideWrapper.style.transition = 'transform 0.1s ease-out';
    }
    return z;
}
