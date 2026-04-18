import { getMatterModules, createResizeHandler } from '../../../core/physics.config.js';
import { createHeroBodies } from './hero.physics.bodies.js';
import { setupHeroPhysicsLoop } from './hero.physics.loop.js';

export function initHeroPhysics(containerId) {
  const canvasEl = document.getElementById(containerId);
  if (!canvasEl) return null;

  if (canvasEl.clientWidth === 0 || canvasEl.clientHeight === 0) {
    setTimeout(() => initHeroPhysics(containerId), 200); return;
  }
  if (canvasEl.hasAttribute('data-matter-initialized')) return;
  canvasEl.setAttribute('data-matter-initialized', 'true');

  const { Engine, Render, Runner, Events, Body } = getMatterModules();
  const engine = Engine.create();
  engine.world.gravity.y = 0; engine.world.gravity.x = 0; engine.world.gravity.scale = 0;

  const render = Render.create({
    element: canvasEl, engine: engine,
    options: { width: canvasEl.clientWidth, height: canvasEl.clientHeight, wireframes: false, background: 'transparent', pixelRatio: window.devicePixelRatio }
  });

  const { attractiveBody, bodies } = createHeroBodies(engine, render);

  let targetX = render.options.width / 2; let targetY = render.options.height / 2;
  window.addEventListener('mousemove', (e) => {
    const rect = canvasEl.getBoundingClientRect(); targetX = e.clientX - rect.left; targetY = e.clientY - rect.top;
  });

  setupHeroPhysicsLoop(Events, Body, engine, render, attractiveBody, bodies, () => ({ x: targetX, y: targetY }));

  const runner = Runner.create(); Runner.run(runner, engine); Render.run(render);
  createResizeHandler(canvasEl, render, { min: { x: 0, y: 0 }, max: { x: render.options.width, y: render.options.height } });
  
  return { engine, render, runner };
}
