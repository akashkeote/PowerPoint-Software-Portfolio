import { createSkillsBodies } from './skills.physics.bodies.js';
import { getMatterModules, createResizeHandler } from '../../../core/physics.config.js';

export function initSkillsPhysics(containerId) {
  const canvasEl = document.getElementById(containerId);
  if (!canvasEl) return null;

  if (canvasEl.clientWidth === 0 || canvasEl.clientHeight === 0) {
    setTimeout(() => initSkillsPhysics(containerId), 200);
    return;
  }

  if (canvasEl.hasAttribute('data-matter-initialized')) return;
  canvasEl.setAttribute('data-matter-initialized', 'true');

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

  const { attractiveBody, domBodies, wrapBounds } = createSkillsBodies(engine, render, canvasEl);

  const mouse = Mouse.create(render.canvas);
  Events.on(engine, 'afterUpdate', function () {
    if (mouse.position.x && mouse.position.y) {
      Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.1,
        y: (mouse.position.y - attractiveBody.position.y) * 0.1
      });
    }

    for (let i = 0; i < domBodies.length; i++) {
      const { body, el, r } = domBodies[i];
      el.style.transform = `translate(${body.position.x - r}px, ${body.position.y - r}px) rotate(${body.angle}rad)`;
    }
  });

  const runner = Runner.create();
  Runner.run(runner, engine);
  Render.run(render);

  setTimeout(() => {
    render.canvas.width = canvasEl.clientWidth;
    render.canvas.height = canvasEl.clientHeight;
    render.options.width = canvasEl.clientWidth;
    render.options.height = canvasEl.clientHeight;
    wrapBounds.max.x = canvasEl.clientWidth;
    wrapBounds.max.y = canvasEl.clientHeight;
  }, 50);

  createResizeHandler(canvasEl, render, wrapBounds);
  return { engine, render, runner };
}
