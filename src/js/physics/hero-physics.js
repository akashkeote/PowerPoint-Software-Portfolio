export function initMatterPhysics(containerId) {
  const canvasEl = document.getElementById(containerId);
  if (!canvasEl) return null;

  if (canvasEl.clientWidth === 0 || canvasEl.clientHeight === 0) {
    setTimeout(() => initMatterPhysics(containerId), 200);
    return;
  }

  if (canvasEl.hasAttribute('data-matter-initialized')) return;
  canvasEl.setAttribute('data-matter-initialized', 'true');

  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Body = Matter.Body,
    Events = Matter.Events,
    Common = Matter.Common;

  const engine = Engine.create();
  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0;

  const render = Render.create({
    element: canvasEl,
    engine: engine,
    options: {
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio
    }
  });

  const wrapBounds = {
    min: { x: 0, y: 0 },
    max: { x: render.options.width, y: render.options.height }
  };

  const attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    100,
    {
      isStatic: true,
      isSensor: true,
      render: { visible: false },
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            const dx = bodyA.position.x - bodyB.position.x;
            const dy = bodyA.position.y - bodyB.position.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 62500 && distSq > 0) {
              const forceMagnitude = -0.002 * (1 - Math.sqrt(distSq) / 250);
              return {
                x: (dx / Math.sqrt(distSq)) * forceMagnitude,
                y: (dy / Math.sqrt(distSq)) * forceMagnitude,
              };
            }
            return { x: 0, y: 0 };
          }
        ]
      }
    }
  );

  const svgs = [
    'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="%234f46e5" stroke-width="2" stroke-linejoin="round"/></svg>',
    'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,3 21,20 3,20" fill="none" stroke="%2306b6d4" stroke-width="2" stroke-linejoin="round"/></svg>',
    'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,2 v16 M2,10 h16" fill="none" stroke="%238b5cf6" stroke-width="2" stroke-linecap="round"/></svg>',
    'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linejoin="round"/></svg>',
    'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" fill="none" stroke="%233b82f6" stroke-width="2"/></svg>',
    'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,3 v18 M4.2,7.5 l15.6,9 M4.2,16.5 l15.6,-9" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/></svg>'
  ];

  const placements = [
    { x: 0.1, y: 0.2, type: 0, size: 1.0 }, { x: 0.25, y: 0.1, type: 1, size: 0.8 },
    { x: 0.5, y: 0.05, type: 2, size: 0.9 }, { x: 0.75, y: 0.15, type: 3, size: 1.2 },
    { x: 0.9, y: 0.25, type: 4, size: 0.8 },  { x: 0.05, y: 0.5, type: 5, size: 1.1 },
    { x: 0.95, y: 0.45, type: 0, size: 0.9 }, { x: 0.15, y: 0.8, type: 1, size: 1.3 },
    { x: 0.08, y: 0.9, type: 2, size: 0.7 },  { x: 0.4, y: 0.95, type: 3, size: 1.0 },
    { x: 0.6, y: 0.9, type: 4, size: 1.1 },   { x: 0.85, y: 0.85, type: 5, size: 0.8 },
    { x: 0.95, y: 0.75, type: 0, size: 1.2 }, { x: 0.2, y: 0.6, type: 1, size: 0.9 },
    { x: 0.8, y: 0.55, type: 2, size: 1.0 }
  ];

  const bodies = [attractiveBody];

  placements.forEach(p => {
    let x = render.options.width * p.x;
    let y = render.options.height * p.y;
    let svgUrl = svgs[p.type];
    let body = Bodies.circle(x, y, 12 * p.size, {
      mass: 1.0, isSensor: true, frictionAir: 0.15,
      angle: Common.random(0, Math.PI * 2),
      render: { sprite: { texture: svgUrl, xScale: p.size, yScale: p.size } }
    });
    body.homeX = x; body.homeY = y;
    bodies.push(body);
  });

  World.add(engine.world, bodies);

  let targetX = render.options.width / 2;
  let targetY = render.options.height / 2;

  window.addEventListener('mousemove', (e) => {
    const rect = canvasEl.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  Events.on(engine, 'afterUpdate', function () {
    Body.translate(attractiveBody, {
      x: (targetX - attractiveBody.position.x) * 0.15,
      y: (targetY - attractiveBody.position.y) * 0.15
    });

    const mouseXRatio = (targetX / render.options.width) * 2 - 1;
    const maxParallaxOffset = 60;

    for (let i = 1; i < bodies.length; i++) {
      const b = bodies[i];
      const verticalDirection = b.homeY < render.options.height / 2 ? -1 : 1;
      const dynamicHomeX = b.homeX + (mouseXRatio * maxParallaxOffset * verticalDirection * (b.mass));
      const dx = dynamicHomeX - b.position.x;
      const dy = b.homeY - b.position.y;
      Body.applyForce(b, b.position, { x: dx * 0.0001, y: dy * 0.0001 });
    }
  });

  const runner = Runner.create();
  Runner.run(runner, engine);
  Render.run(render);

  window.addEventListener('resize', () => {
    if (!canvasEl.clientWidth) return;
    render.canvas.width = canvasEl.clientWidth;
    render.canvas.height = canvasEl.clientHeight;
    render.options.width = canvasEl.clientWidth;
    render.options.height = canvasEl.clientHeight;
    wrapBounds.max.x = canvasEl.clientWidth;
    wrapBounds.max.y = canvasEl.clientHeight;
  });

  return { engine, render, runner };
}
