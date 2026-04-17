import { initMatterPhysics } from './hero-physics.js';
import { initSkillsMatterPhysics } from './skills-physics.js';

// Setup matter-wrap and attractors
Matter.use('matter-attractors');
Matter.use('matter-wrap');

setTimeout(() => {
  initMatterPhysics('pres-hero-canvas');
  const skCanvas = document.getElementById('skills-canvas');
  if (skCanvas) initSkillsMatterPhysics('skills-canvas');
}, 100);
