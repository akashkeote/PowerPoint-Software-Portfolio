import { getMatterModules } from '../../../core/physics.config.js';
import { createSkillsAttractor } from './skills.physics.attractor.js';
import { createSkillNode } from './skills.physics.node.js';

export const SKILL_IMAGES = [
  "react2.webp", "next2.webp", "node2.webp", "express.webp",
  "mongo.webp", "mysql.webp", "typescript.webp", "javascript.webp"
];

export function createSkillsBodies(engine, render, canvasEl) {
  const { World, Common } = getMatterModules();
  
  const wrapBounds = {
    min: { x: 0, y: 0 },
    max: { x: render.options.width, y: render.options.height }
  };

  const attractiveBody = createSkillsAttractor(render);
  World.add(engine.world, attractiveBody);

  const domBodies = [];
  for (let i = 0; i < 20; i++) {
    let x = render.options.width / 2 + Common.random(-150, 150);
    let y = render.options.height / 2 + Common.random(-150, 150);
    let radius = Common.random(40, 75);
    let img = SKILL_IMAGES[Math.floor(Math.random() * SKILL_IMAGES.length)];

    const node = createSkillNode(x, y, radius, `./images/${img}`, wrapBounds, canvasEl);
    World.add(engine.world, node.body);
    domBodies.push(node);
  }

  return { attractiveBody, domBodies, wrapBounds };
}
