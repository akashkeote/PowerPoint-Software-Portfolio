// ---- Shared Matter.js utilities ----

/**
 * Destructure all commonly used Matter.js modules
 * @returns {Object} Matter.js modules
 */
export function getMatterModules() {
  return {
    Engine: Matter.Engine,
    Render: Matter.Render,
    Runner: Matter.Runner,
    World: Matter.World,
    Bodies: Matter.Bodies,
    Mouse: Matter.Mouse,
    Body: Matter.Body,
    Events: Matter.Events,
    Common: Matter.Common,
  };
}

/**
 * Create a resize handler that syncs render + canvas dimensions
 * @param {HTMLElement} canvasEl - Container element
 * @param {Object} render - Matter.js render instance
 * @param {Object} wrapBounds - Wrap bounds object to update
 * @param {Function} [onResize] - Optional callback after resize
 * @returns {Function} The resize listener function
 */
export function createResizeHandler(canvasEl, render, wrapBounds, onResize) {
  const handler = () => {
    if (!canvasEl.clientWidth) return;
    render.canvas.width = canvasEl.clientWidth;
    render.canvas.height = canvasEl.clientHeight;
    render.options.width = canvasEl.clientWidth;
    render.options.height = canvasEl.clientHeight;
    wrapBounds.max.x = canvasEl.clientWidth;
    wrapBounds.max.y = canvasEl.clientHeight;
    if (onResize) onResize();
  };
  window.addEventListener('resize', handler);
  return handler;
}
