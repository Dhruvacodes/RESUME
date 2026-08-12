document.addEventListener('DOMContentLoaded', () => {
  // ── Navigation ──
  // The frosted nav bar is always visible with its translucent panel bg
  // No scroll-based border toggle needed — the ash border is permanent

  // ── Mobile Menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('mobile-menu--open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(3px) rotate(45deg)';
        spans[1].style.transform = 'translateY(-3px) rotate(-45deg)';
        spans[1].style.width = '24px';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
        spans[1].style.width = '16px';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--open');
        hamburger.setAttribute('aria-expanded', 'false');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
        spans[1].style.width = '16px';
      });
    });
  }

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');

        // Animate stat counters
        const statNumber = entry.target.querySelector('.stat__number');
        if (statNumber) animateValue(statNumber);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Stat Counter Animation ──
  function animateValue(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  // ── Rotating Mood Text ──
  const moodEl = document.getElementById('rotating-mood');
  if (moodEl) {
    const moods = [
      'Building something ambitious',
      'Reading about macroeconomics',
      'Debugging firmware at 2am',
      'Tuning trading algorithms',
      'Training vision models',
      'Drinking too much coffee',
      'Simulating hypothetical economies',
    ];
    let idx = 0;

    setInterval(() => {
      moodEl.style.opacity = 0;
      moodEl.style.transform = 'translateY(4px)';
      moodEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(() => {
        idx = (idx + 1) % moods.length;
        moodEl.textContent = moods[idx];
        moodEl.style.opacity = 1;
        moodEl.style.transform = 'translateY(0)';
      }, 400);
    }, 4000);
  }

  // ── Coordinate Footer — Live GPS animation ──
  const coordEl = document.getElementById('footer-coordinate');
  if (coordEl) {
    // Manipal, India coordinates with subtle drift
    const baseLat = 13.3525;
    const baseLng = 74.7868;

    function updateCoordinate() {
      // Tiny random drift to simulate live feel
      const latDrift = (Math.random() - 0.5) * 0.002;
      const lngDrift = (Math.random() - 0.5) * 0.002;
      const lat = (baseLat + latDrift).toFixed(4);
      const lng = (baseLng + lngDrift).toFixed(4);
      coordEl.textContent = `${lat}° N, ${lng}° E`;
    }

    // Update every 3 seconds with a subtle fade
    setInterval(() => {
      coordEl.style.opacity = '0.5';
      coordEl.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        updateCoordinate();
        coordEl.style.opacity = '1';
      }, 300);
    }, 3000);
  }
});

// ── Expandable Panels ──
function togglePanel(id) {
  const panel = document.getElementById(id);
  if (panel) panel.classList.toggle('expandable--open');
}



// ══════════════════════════════════════════════════════════════════
// BLACK PANTHER GEOMETRIC TESSELLATION BACKGROUND
// Triangular grid with pulsing violet kinetic energy ripples
// ══════════════════════════════════════════════════════════════════
(function() {
  const canvas = document.getElementById('panther-grid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let triangles = [];
  let ripples = [];
  let mouseX = -1000, mouseY = -1000;
  let animFrame;

  // Triangle size — controls the density of the tessellation
  const CELL = 60;
  const HALF = CELL / 2;
  const TRI_H = CELL * Math.sin(Math.PI / 3); // equilateral triangle height

  // Colors
  const VIOLET = { r: 175, g: 80, b: 255 };   // #af50ff

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  }

  function buildGrid() {
    nodes = [];
    lines = [];
    const cols = Math.ceil(width / CELL) + 2;
    const rows = Math.ceil(height / CELL) + 2;

    // Create grid of nodes
    const grid = [];
    for (let row = -1; row < rows; row++) {
      grid[row] = [];
      for (let col = -1; col < cols; col++) {
        const node = {
          x: col * CELL,
          y: row * CELL,
          energy: 0,
          baseEnergy: 0
        };
        nodes.push(node);
        grid[row][col] = node;
      }
    }

    // Connect nodes with straight angular lines (Horizontal, Vertical, Diagonal)
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const n = grid[row][col];
        if (!n) continue;

        // Horizontal right
        if (grid[row][col + 1] && Math.random() > 0.4) {
          lines.push({ n1: n, n2: grid[row][col + 1], cx: n.x + CELL/2, cy: n.y, energy: 0, baseEnergy: 0 });
        }
        // Vertical down
        if (grid[row + 1] && grid[row + 1][col] && Math.random() > 0.4) {
          lines.push({ n1: n, n2: grid[row + 1][col], cx: n.x, cy: n.y + CELL/2, energy: 0, baseEnergy: 0 });
        }
        // Diagonal down-right
        if (grid[row + 1] && grid[row + 1][col + 1] && Math.random() > 0.6) {
          lines.push({ n1: n, n2: grid[row + 1][col + 1], cx: n.x + CELL/2, cy: n.y + CELL/2, energy: 0, baseEnergy: 0 });
        }
        // Diagonal down-left
        if (grid[row + 1] && grid[row + 1][col - 1] && Math.random() > 0.6) {
          lines.push({ n1: n, n2: grid[row + 1][col - 1], cx: n.x - CELL/2, cy: n.y + CELL/2, energy: 0, baseEnergy: 0 });
        }
      }
    }
  }

  function spawnRipple(x, y, strength) {
    ripples.push({
      x, y,
      strength,
      radius: 0,
      maxRadius: 300 + Math.random() * 200,
      speed: 4 + Math.random() * 2,
      life: 1.0
    });
  }

  let lastAutoSpawn = 0;
  function autoSpawn(time) {
    if (time - lastAutoSpawn > 4000) {
      if (Math.random() > 0.3) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        spawnRipple(rx, ry, 0.4 + Math.random() * 0.3);
      }
      lastAutoSpawn = time;
    }
  }

  function update(time) {
    // Decay line energy
    for (let i = 0; i < lines.length; i++) {
      lines[i].energy = lines[i].baseEnergy * 0.90;
      lines[i].baseEnergy *= 0.90;
    }

    // Update ripples
    for (let r = ripples.length - 1; r >= 0; r--) {
      const rip = ripples[r];
      rip.radius += rip.speed;
      rip.life = 1.0 - (rip.radius / rip.maxRadius);

      if (rip.life <= 0) {
        ripples.splice(r, 1);
        continue;
      }

      // Apply ripple energy to nearby lines
      const ringWidth = 80;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const dx = line.cx - rip.x;
        const dy = line.cy - rip.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const distFromRing = Math.abs(dist - rip.radius);
        if (distFromRing < ringWidth) {
          const ringIntensity = 1.0 - (distFromRing / ringWidth);
          const energy = ringIntensity * rip.strength * rip.life;
          line.energy = Math.max(line.energy, energy);
        }
      }
    }

    // Mouse proximity energy
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const dx = line.cx - mouseX;
      const dy = line.cy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 350) { // Increased radius
        const proximity = 1.0 - (dist / 350);
        line.energy = Math.max(line.energy, proximity * 1.5); // Increased max energy
        line.baseEnergy = Math.max(line.baseEnergy, proximity * 0.8);
      }
      
      // Ambient breathing
      const breathe = (Math.sin(time * 0.001 + line.cx * 0.01) + 1) * 0.1;
      line.energy = Math.max(line.energy, breathe);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient lines
    ctx.beginPath();
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      ctx.moveTo(line.n1.x, line.n1.y);
      ctx.lineTo(line.n2.x, line.n2.y);
    }
    ctx.strokeStyle = `rgba(${VIOLET.r}, ${VIOLET.g}, ${VIOLET.b}, 0.05)`; // Back to 0.05
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw energy-activated lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const e = line.energy;

      if (e < 0.05) continue;

      // Draw the bright electric line
      const strokeAlpha = Math.min(e * 0.6, 0.8); // Significantly cap max opacity
      ctx.beginPath();
      ctx.moveTo(line.n1.x, line.n1.y);
      ctx.lineTo(line.n2.x, line.n2.y);
      
      // Neon glow effect for high energy
      if (e > 0.4) {
        ctx.shadowBlur = 5 + (e * 3); // Minimal blur
        ctx.shadowColor = `rgba(${VIOLET.r}, ${VIOLET.g}, ${VIOLET.b}, ${strokeAlpha * 0.5})`;
      } else {
        ctx.shadowBlur = 0;
      }
      
      // Use Violet instead of Lavender for the highlight
      ctx.strokeStyle = `rgba(${VIOLET.r}, ${VIOLET.g}, ${VIOLET.b}, ${strokeAlpha})`;
      ctx.lineWidth = 1 + e; // Minimal thickness increase
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;

      // Draw nodes at intersections if energy is high
      if (e > 0.3) {
        const nodeAlpha = Math.min(e * 0.5, 0.7);
        ctx.beginPath();
        ctx.arc(line.n1.x, line.n1.y, 1.5 + e, 0, Math.PI * 2);
        ctx.arc(line.n2.x, line.n2.y, 1.5 + e, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${VIOLET.r}, ${VIOLET.g}, ${VIOLET.b}, ${nodeAlpha})`;
        ctx.fill();
      }
    }
  }

  function animate(time) {
    autoSpawn(time);
    update(time);
    draw();
    animFrame = requestAnimationFrame(animate);
  }

  // Mouse interaction
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .expandable__trigger, .nav, .boarding-pass')) return;
    spawnRipple(e.clientX, e.clientY, 1.2); // Stronger ripple on click
  });

  document.addEventListener('touchstart', (e) => {
    if (e.target.closest('a, button, .expandable__trigger, .nav, .boarding-pass')) return;
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    spawnRipple(touch.clientX, touch.clientY, 1.0);
  }, { passive: true });

  window.addEventListener('resize', resize);
  resize();

  // Initial energy bursts
  setTimeout(() => spawnRipple(width * 0.2, height * 0.3, 0.8), 200);
  setTimeout(() => spawnRipple(width * 0.8, height * 0.5, 0.7), 500);
  setTimeout(() => spawnRipple(width * 0.5, height * 0.2, 0.9), 800);
  setTimeout(() => spawnRipple(width * 0.3, height * 0.7, 0.6), 1100);
  setTimeout(() => spawnRipple(width * 0.7, height * 0.1, 0.7), 1500);
  setTimeout(() => spawnRipple(width * 0.1, height * 0.6, 0.8), 1900);

  animFrame = requestAnimationFrame(animate);
})();

// ════════════════════════════════════════════════════════════════
// 3D VOLATILITY SURFACE
// ════════════════════════════════════════════════════════════════
(function() {
  const canvas = document.getElementById('volatilityCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width;
  let height = canvas.height;
  let mouseX = width / 2;
  let mouseY = height / 2;

  const GRID_SIZE = 16;
  const points = [];

  for (let z = 0; z < GRID_SIZE; z++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      points.push({
        x: (x - GRID_SIZE / 2) * 12,
        y: 0,
        z: (z - GRID_SIZE / 2) * 12,
        baseY: 0
      });
    }
  }

  function project(p, angleX, angleY) {
    // Rotate Y
    let cosY = Math.cos(angleY), sinY = Math.sin(angleY);
    let x1 = p.x * cosY - p.z * sinY;
    let z1 = p.z * cosY + p.x * sinY;

    // Rotate X
    let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
    let y1 = p.y * cosX - z1 * sinX;
    let z2 = z1 * cosX + p.y * sinX;

    // Projection
    let fov = 250;
    let scale = fov / (fov + z2 + 100);
    return {
      x: x1 * scale + width / 2,
      y: y1 * scale + height / 2 + 10,
      scale: scale,
      z: z2
    };
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);
    
    // Slow auto rotation + mouse interaction
    const angleY = time * 0.0003 + (mouseX - width/2) * 0.002;
    const angleX = 0.4 + (mouseY - height/2) * 0.002;

    // Update Y values based on a complex wave function
    points.forEach(p => {
      const dist = Math.sqrt(p.x * p.x + p.z * p.z);
      // Create a rippling surface effect
      p.y = Math.sin(dist * 0.08 - time * 0.002) * 12 + Math.cos(p.x * 0.05 + time * 0.001) * 8;
    });

    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';

    // Draw X lines
    for (let z = 0; z < GRID_SIZE; z++) {
      ctx.beginPath();
      for (let x = 0; x < GRID_SIZE; x++) {
        const p = points[z * GRID_SIZE + x];
        const proj = project(p, angleX, angleY);
        if (x === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.strokeStyle = `rgba(175, 80, 255, 0.4)`;
      ctx.stroke();
    }

    // Draw Z lines
    for (let x = 0; x < GRID_SIZE; x++) {
      ctx.beginPath();
      for (let z = 0; z < GRID_SIZE; z++) {
        const p = points[z * GRID_SIZE + x];
        const proj = project(p, angleX, angleY);
        if (z === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.strokeStyle = `rgba(175, 80, 255, 0.4)`;
      ctx.stroke();
    }

    // Draw nodes
    points.forEach(p => {
      const proj = project(p, angleX, angleY);
      const size = Math.max(0.5, proj.scale * 1.5);
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
      // Highlight peaks
      const intensity = (p.y + 20) / 40; 
      ctx.fillStyle = `rgba(220, 200, 255, ${Math.max(0.2, intensity)})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  // Mouse interaction
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    // Normalize mouse coordinates to canvas dimensions
    mouseX = (e.clientX - rect.left) * (width / rect.width);
    mouseY = (e.clientY - rect.top) * (height / rect.height);
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouseX = width / 2;
    mouseY = height / 2;
  });

  requestAnimationFrame(animate);
})();
