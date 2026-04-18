import { getMatterModules } from '../../../core/physics.config.js';

export function createMatterEngineAndRender(canvasEl) {
  const { Engine, Render, Runner, Events, Mouse, Body } = getMatterModules();

  const engine = Engine.create();
  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;

  const render = Render.create({
    element: canvasEl,
    engine: engine,
    options: {
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight,
      wireframes: false,
      showAngleIndicator: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio
    }
  });
  
  return { engine, render, Runner, Events, Mouse, Body };
}
