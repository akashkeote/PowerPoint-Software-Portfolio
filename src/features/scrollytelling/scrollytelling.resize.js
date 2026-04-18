export function getStableCanvasSize(IS_MOBILE) {
    if (IS_MOBILE) {
        const maxH = Math.max(window.screen.availHeight || 0, window.screen.height || 0, window.innerHeight || 0);
        return { w: window.innerWidth, h: maxH };
    }
    return { w: window.innerWidth, h: window.innerHeight };
}

export function bindCanvasResize(canvas, IS_MOBILE, onResizeCb) {
    let lastKnownWidth = canvas.width;
    window.addEventListener('resize', () => {
        if (IS_MOBILE) {
            const currentWidth = window.innerWidth;
            if (Math.abs(currentWidth - lastKnownWidth) < 2) return;
            lastKnownWidth = currentWidth;
            const size = getStableCanvasSize(IS_MOBILE);
            canvas.width = size.w;
            canvas.height = size.h;
            onResizeCb();
        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            onResizeCb();
        }
    });
}
