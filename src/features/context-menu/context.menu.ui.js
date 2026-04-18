export function positionContextMenu(menu, e) {
    const x = e.clientX;
    const y = e.clientY;
    const menuW = 240;
    const menuH = menu.offsetHeight || 380;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    menu.style.left = (x + menuW > winW ? x - menuW : x) + 'px';
    menu.style.top = (y + menuH > winH ? Math.max(0, y - menuH) : y) + 'px';
}
