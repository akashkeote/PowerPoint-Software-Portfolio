    // ---- MATTER.JS HERO BACKGROUND INITIATION ----
    Matter.use('matter-attractors');
    Matter.use('matter-wrap');

    function initMatterPhysics(containerId) {
      const canvasEl = document.getElementById(containerId);
      if (!canvasEl) return null;

      // Ensure canvas has dimensions before initializing, otherwise wait
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

      // Keep shapes within the bounding box of the slide canvas using matter-wrap
      const wrapBounds = {
        min: { x: 0, y: 0 },
        max: { x: render.options.width, y: render.options.height }
      };

      // Create an invisible attractor body that will follow the mouse and gently repulse particles
      const attractiveBody = Bodies.circle(
        render.options.width / 2,
        render.options.height / 2,
        100, 
        {
          isStatic: true,
          isSensor: true, // Prevents objects from bouncing off the mouse physically
          render: { visible: false },
          plugin: {
            attractors: [
              function (bodyA, bodyB) {
                // Calculate distance between mouse attractor (bodyA) and particle (bodyB)
                const dx = bodyA.position.x - bodyB.position.x;
                const dy = bodyA.position.y - bodyB.position.y;
                const distSq = dx * dx + dy * dy;
                
                // Repulse objects if within a radius (e.g., 250px)
                if (distSq < 62500 && distSq > 0) {
                  // Negative force to push away, getting stronger the closer they are
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

      // Data URIs for Cool Tech Geometry
      const svgs = [
        // Indigo Polygon (Hexagon)
        'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="%234f46e5" stroke-width="2" stroke-linejoin="round"/></svg>',
        // Cyan Triangle
        'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,3 21,20 3,20" fill="none" stroke="%2306b6d4" stroke-width="2" stroke-linejoin="round"/></svg>',
        // Purple Cross (Plus)
        'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,2 v16 M2,10 h16" fill="none" stroke="%238b5cf6" stroke-width="2" stroke-linecap="round"/></svg>',
        // Semi-transparent White/Gray Square
        'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linejoin="round"/></svg>',
        // Soft Blue Circle
        'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" fill="none" stroke="%233b82f6" stroke-width="2"/></svg>',
        // Subtle Transparent Asterisk
        'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,3 v18 M4.2,7.5 l15.6,9 M4.2,16.5 l15.6,-9" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/></svg>'
      ];

      // Hardcoded positions matching Riccardo Zanutta's edge-focused composition
      // Coordinates are percentages (0-1) of width and height so it scales
      const placements = [
        { x: 0.1, y: 0.2, type: 0, size: 1.0 }, // Top left
        { x: 0.25, y: 0.1, type: 1, size: 0.8 }, // Top left inner
        { x: 0.5, y: 0.05, type: 2, size: 0.9 }, // Top center
        { x: 0.75, y: 0.15, type: 3, size: 1.2 }, // Top right inner
        { x: 0.9, y: 0.25, type: 4, size: 0.8 },  // Top right
        { x: 0.05, y: 0.5, type: 5, size: 1.1 },  // Far left middle
        { x: 0.95, y: 0.45, type: 0, size: 0.9 }, // Far right middle
        { x: 0.15, y: 0.8, type: 1, size: 1.3 },  // Bottom left inner
        { x: 0.08, y: 0.9, type: 2, size: 0.7 },  // Bottom left
        { x: 0.4, y: 0.95, type: 3, size: 1.0 },  // Bottom center left
        { x: 0.6, y: 0.9, type: 4, size: 1.1 },   // Bottom center right
        { x: 0.85, y: 0.85, type: 5, size: 0.8 }, // Bottom right inner
        { x: 0.95, y: 0.75, type: 0, size: 1.2 }, // Bottom right
        { x: 0.2, y: 0.6, type: 1, size: 0.9 },   // Mid left lower
        { x: 0.8, y: 0.55, type: 2, size: 1.0 }   // Mid right lower
      ];

      const bodies = [attractiveBody];

      placements.forEach(p => {
        let x = render.options.width * p.x;
        let y = render.options.height * p.y;
        let svgUrl = svgs[p.type];
        
        let body = Bodies.circle(x, y, 12 * p.size, {
          mass: 1.0, 
          isSensor: true, 
          frictionAir: 0.15, 
          angle: Common.random(0, Math.PI * 2),
          render: {
            sprite: {
              texture: svgUrl,
              xScale: p.size,
              yScale: p.size
            }
          }
        });
        
        body.homeX = x;
        body.homeY = y;

        bodies.push(body);
      });

      World.add(engine.world, bodies);

      // Mouse control for interactivity
      let targetX = render.options.width / 2;
      let targetY = render.options.height / 2;

      // Add a non-physics event listener to the window so it works even over pointer-events:none elements
      window.addEventListener('mousemove', (e) => {
        const rect = canvasEl.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      });
      
      Events.on(engine, 'afterUpdate', function() {
        // Smoothly interpolate the attractor towards the mouse pos
        Body.translate(attractiveBody, {
          x: (targetX - attractiveBody.position.x) * 0.15,
          y: (targetY - attractiveBody.position.y) * 0.15
        });

        // Calculate a global parallax offset based on horizontal mouse position
        // Map mouse X from [0, width] to [-1, 1]
        const mouseXRatio = (targetX / render.options.width) * 2 - 1;
        const maxParallaxOffset = 60; // Max pixels to shift horizontally

        // Enforce springs pulling objects back to their dynamic parallax home positions
        for (let i = 1; i < bodies.length; i++) {
          const b = bodies[i];
          
          // Determine if object is in top half (-1) or bottom half (1) of screen
          const verticalDirection = b.homeY < render.options.height / 2 ? -1 : 1;
          
          // Calculate the current dynamic home position 
          // Top objects move opposite to mouse, bottom objects move with mouse
          const dynamicHomeX = b.homeX + (mouseXRatio * maxParallaxOffset * verticalDirection * (b.mass));
          
          // Calculate vector back to dynamic home
          const dx = dynamicHomeX - b.position.x;
          const dy = b.homeY - b.position.y;
          
          // Apply a spring-like force towards home
          // The further away it is, the stronger the pull back
          const springStrength = 0.0001; 
          
          Body.applyForce(b, b.position, {
            x: dx * springStrength,
            y: dy * springStrength
          });
        }
      });

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      // Handle Resize properly
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

    // Initialize only the presentation mode canvas for Matter.js
    setTimeout(() => {
      initMatterPhysics('pres-hero-canvas');
    }, 100);

  


    function initSkillsMatterPhysics(containerId) {
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
        
        // Use an inner img tag for the logo to avoid background-size cropping issues inside the sphere gradient
        const imgEl = document.createElement('img');
        imgEl.src = `./images/${img}`;
        el.appendChild(imgEl);
        
        el.style.left = '0px';
        el.style.top = '0px';
        
        canvasEl.appendChild(el);
        domBodies.push({ body: body, el: el, r: radius });
      }

      const mouse = Mouse.create(render.canvas);
      Events.on(engine, 'afterUpdate', function() {
        if (mouse.position.x && mouse.position.y) {
          Body.translate(attractiveBody, {
            x: (mouse.position.x - attractiveBody.position.x) * 0.1,
            y: (mouse.position.y - attractiveBody.position.y) * 0.1
          });
        }

        for(let i=0; i < domBodies.length; i++) {
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
        if(canvasEl.clientWidth === 0) return;
        render.canvas.width = canvasEl.clientWidth;
        render.canvas.height = canvasEl.clientHeight;
        render.options.width = canvasEl.clientWidth;
        render.options.height = canvasEl.clientHeight;
        wrapBounds.max.x = canvasEl.clientWidth;
        wrapBounds.max.y = canvasEl.clientHeight;
      });

      return { engine, render, runner };
    }

    setTimeout(() => {
      initMatterPhysics('pres-hero-canvas');
      const skCanvas = document.getElementById('skills-canvas');
      if(skCanvas) initSkillsMatterPhysics('skills-canvas');
    }, 100);

