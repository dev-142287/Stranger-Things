// Device type detection
function getDeviceType() {
  const width = window.innerWidth;
  if (width >= 1200) return "Computer";
  if (width >= 992) return "Laptop";
  if (width >= 768) return "Tablet";
  return "Phone";
}

window.addEventListener("resize", () => {
  console.log("Current device type:", getDeviceType());
});

// Dropdown functionality
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(drop => {
  const header = drop.querySelector('.dropdown-header');
  const panel = drop.querySelector('.dropdown-window');

  header.addEventListener('click', () => {
    const isOpen = drop.classList.contains('open');

    dropdowns.forEach(d => {
      d.classList.remove('open');
      d.querySelector('.dropdown-window').style.maxHeight = null;
    });

    if (!isOpen) {
      drop.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

  panel.addEventListener('transitionend', () => {
    if (drop.classList.contains('open')) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

window.addEventListener('resize', () => {
  dropdowns.forEach(drop => {
    if (drop.classList.contains('open')) {
      const panel = drop.querySelector('.dropdown-window');
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

// Background particles
const particleCount = 50;
const background = document.getElementById('background');

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.width = 2 + Math.random() * 3 + "px";
  particle.style.height = 2 + Math.random() * 3 + "px";
  particle.style.animationDuration = 5 + Math.random() * 10 + "s";
  particle.style.animationDelay = Math.random() * 5 + "s";
  background.appendChild(particle);
}

// Create Upside Down floating particles
const flareCount = 60;
const flareContainer = document.getElementById('upsidedown-flares');

for (let i = 0; i < flareCount; i++) {
  const flare = document.createElement('div');
  flare.classList.add('flare');
  flare.style.left = Math.random() * 100 + '%';
  flare.style.bottom = Math.random() * 10 + 'vh';
  flare.style.width = 1 + Math.random() * 3 + 'px';
  flare.style.height = 1 + Math.random() * 3 + 'px';
  flare.style.animationDuration = 10 + Math.random() * 15 + 's';
  flare.style.animationDelay = Math.random() * 5 + 's';
  flareContainer.appendChild(flare);
}

// -------------------- Realistic Clouds --------------------
const cloudContainer = document.getElementById('upsidedown-clouds');
const cloudCount = 15;

for (let i = 0; i < cloudCount; i++) {
  const cloud = document.createElement('div');
  cloud.classList.add('cloud');
  cloud.style.width = 200 + Math.random() * 300 + 'px';
  cloud.style.height = 100 + Math.random() * 150 + 'px';
  cloud.style.top = Math.random() * 50 + 'vh';
  cloud.style.left = Math.random() * 100 + 'vw';
  cloud.style.animationDuration = 30 + Math.random() * 60 + 's';
  cloud.style.opacity = 0.1 + Math.random() * 0.2;
  cloudContainer.appendChild(cloud);
}

function createRealisticLightning() {
  const container = document.createElement('div');
  container.classList.add('realistic-lightning');

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  container.appendChild(svg);

  const startX = Math.random() * window.innerWidth;
  const segments = 12 + Math.floor(Math.random() * 8);

  function generateBolt(x, y, remainingSegments, branchChance) {
    let pathData = `M${x} ${y}`;
    let currentX = x;
    let currentY = y;

    for (let i = 0; i < remainingSegments; i++) {
      currentY += window.innerHeight / remainingSegments;
      currentX += (Math.random() - 0.5) * 50;
      pathData += ` L${currentX} ${currentY}`;

      if (Math.random() < branchChance && remainingSegments - i > 2) {
        const branchSegments = remainingSegments - i - 2;
        const branchPath = generateBolt(currentX, currentY, branchSegments, branchChance / 2);
        const branchElem = document.createElementNS(svgNS, "path");
        branchElem.setAttribute("d", branchPath);
        branchElem.setAttribute("stroke", "red");
        branchElem.setAttribute("stroke-width", 1 + Math.random());
        branchElem.setAttribute("fill", "none");
        branchElem.setAttribute("opacity", 0.5 + Math.random() * 0.3);
        branchElem.style.filter = "drop-shadow(0 0 10px red) drop-shadow(0 0 20px rgba(255,50,50,0.4))";
        svg.appendChild(branchElem);
      }
    }
    return pathData;
  }

  const mainBolt = document.createElementNS(svgNS, "path");
  mainBolt.setAttribute("d", generateBolt(startX, 0, segments, 0.3));
  mainBolt.setAttribute("stroke-width", 2 + Math.random() * 2);
  mainBolt.setAttribute("stroke", "red");
  mainBolt.setAttribute("fill", "none");
  mainBolt.setAttribute("opacity", 0.8);
  mainBolt.style.filter = "drop-shadow(0 0 20px red) drop-shadow(0 0 40px rgba(255,50,50,0.5))";
  svg.appendChild(mainBolt);

  document.body.appendChild(container);

  // --- Impact: glow pulse ---
  const glow = document.createElement('div');
  glow.classList.add('lightning-glow');
  document.body.appendChild(glow);

  // --- Slight shake ---
  document.body.style.animation = `impactShake 0.15s ease`;
  setTimeout(() => document.body.style.animation = '', 150);

  // Remove lightning and glow after animation
  setTimeout(() => {
    container.remove();
    glow.remove();
  }, 300 + Math.random() * 200);
}

// Random spawn
setInterval(() => {
  if (Math.random() < 0.8) createRealisticLightning();
}, 2500 + Math.random() * 800);

