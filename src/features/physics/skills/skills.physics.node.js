import { getMatterModules } from '../../../core/physics.config.js';

export function createSkillNode(x, y, radius, imgPath, wrapBounds, canvasEl) {
  const { Bodies, Body, Common } = getMatterModules();
  
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

  const el = document.createElement('div');
  el.className = 'dom-bubble';
  el.style.width = (radius * 2) + 'px';
  el.style.height = (radius * 2) + 'px';

  const imgEl = document.createElement('img');
  imgEl.src = imgPath;
  el.appendChild(imgEl);

  el.style.left = '0px';
  el.style.top = '0px';
  canvasEl.appendChild(el);

  return { body, el, r: radius };
}
