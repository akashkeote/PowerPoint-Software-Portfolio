export function setupHeroPhysicsLoop(Events, Body, engine, render, attractiveBody, bodies, getMouseTarget) {
  Events.on(engine, 'afterUpdate', function () {
    const target = getMouseTarget();
    Body.translate(attractiveBody, {
      x: (target.x - attractiveBody.position.x) * 0.15,
      y: (target.y - attractiveBody.position.y) * 0.15
    });

    const mouseXRatio = (target.x / render.options.width) * 2 - 1;
    const maxParallaxOffset = 60;

    for (let i = 1; i < bodies.length; i++) {
      const b = bodies[i];
      const verticalDirection = b.homeY < render.options.height / 2 ? -1 : 1;
      const dynamicHomeX = b.homeX + (mouseXRatio * maxParallaxOffset * verticalDirection * (b.mass));
      const dx = dynamicHomeX - b.position.x;
      const dy = b.homeY - b.position.y;
      const springStrength = 0.0001;
      Body.applyForce(b, b.position, { x: dx * springStrength, y: dy * springStrength });
    }
  });
}
