export function initSkillsMatterPhysics(containerId) {
  const canvasEl = document.getElementById(containerId);
  if (!canvasEl) return null;

  if (canvasEl.clientWidth === 0 || canvasEl.clientHeight === 0) {
    setTimeout(() => initSkillsMatterPhysics(containerId), 200);
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

  const wrapBounds = {
    min: { x: 0, y: 0 },
    max: { x: render.options.width, y: render.options.height }
  };

  const attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    0,
    {
      isStatic: true,
      render: { visible: false },
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * -4e-6,
              y: (bodyA.position.y - bodyB.position.y) * -4e-6,
            };
          }
        ]
      }
    }
  );
  World.add(engine.world, attractiveBody);

  const imageUrls = [
    "react2.webp", "next2.webp", "node2.webp", "express.webp", "mongo.webp",
    "mysql.webp", "typescript.webp", "javascript.webp"
  ];

  const domBodies = [];

  for (let i = 0; i < 20; i++) {
    let x = render.options.width / 2 + Common.random(-150, 150);
    let y = render.options.height / 2 + Common.random(-150, 150);
    let radius = Common.random(40, 75);
    let img = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    let body = Bodies.circle(x, y, radius, {
      restitution: 0.9,
      frictionAir: 0.02 + Common.random(0, 0.02),
      friction: 0.1,
      density: 0.05,
      plugin: { wrap: wrapBounds },
      render: { visible: false }
    });

    Body.setVelocity(body, {
      x: Common.random(-6, 6),
      y: Common.random(-6, 6)
    });

    World.add(engine.world, body);

    const el = document.createElement('div');
    el.className = 'dom-bubble';
    el.style.width = (radius * 2) + 'px';
    el.style.height = (radius * 2) + 'px';

    const imgEl = document.createElement('img');
    imgEl.src = `./images/${img}`;
    el.appendChild(imgEl);

    el.style.left = '0px';
    el.style.top = '0px';

    canvasEl.appendChild(el);
    domBodies.push({ body: body, el: el, r: radius });
  }

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

  window.addEventListener('resize', () => {
    if (canvasEl.clientWidth === 0) return;
    render.canvas.width = canvasEl.clientWidth;
    render.canvas.height = canvasEl.clientHeight;
    render.options.width = canvasEl.clientWidth;
    render.options.height = canvasEl.clientHeight;
    wrapBounds.max.x = canvasEl.clientWidth;
    wrapBounds.max.y = canvasEl.clientHeight;
  });

  return { engine, render, runner };
}
