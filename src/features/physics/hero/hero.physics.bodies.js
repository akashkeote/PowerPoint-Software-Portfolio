import { getMatterModules } from '../../../core/physics.config.js';
import { HERO_SVGS, PLACEMENTS } from './hero.physics.config.js';

export function createHeroBodies(engine, render) {
  const { Bodies, World, Common } = getMatterModules();

  const attractiveBody = Bodies.circle(
    render.options.width / 2, render.options.height / 2, 100,
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

  const bodies = [attractiveBody];
  PLACEMENTS.forEach(p => {
    let x = render.options.width * p.x;
    let y = render.options.height * p.y;
    let body = Bodies.circle(x, y, 12 * p.size, {
      mass: 1.0, isSensor: true, frictionAir: 0.15,
      angle: Common.random(0, Math.PI * 2),
      render: { sprite: { texture: HERO_SVGS[p.type], xScale: p.size, yScale: p.size } }
    });
    body.homeX = x;
    body.homeY = y;
    bodies.push(body);
  });

  World.add(engine.world, bodies);

  return { attractiveBody, bodies };
}
