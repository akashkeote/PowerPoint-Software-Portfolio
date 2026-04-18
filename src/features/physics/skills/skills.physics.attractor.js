import { getMatterModules } from '../../../core/physics.config.js';

export function createSkillsAttractor(render) {
  const { Bodies, World } = getMatterModules();
  const attractiveBody = Bodies.circle(
    render.options.width / 2, render.options.height / 2, 0,
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
  return attractiveBody;
}
