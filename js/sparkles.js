/**
 * ==========================================================================
 * DELICATE SPARKLES & STARS — YASMIN RAMOS PORTFOLIO
 * Gentle ambient twinkling and interactive sparkle burst on sticker clicks
 * ==========================================================================
 */

(function () {
  'use strict';

  const container = document.getElementById('sparkle-container');
  if (!container) return;

  const starSymbols = ['✦', '✧', '⋆', '˚｡', '₊'];
  const starColors = ['#F99FA9', '#FFC5C1', '#AA6581', '#FFF275', '#FFFFFF'];

  // Generate 18 delicate ambient twinkling stars across the screen
  const ambientStarCount = 18;
  for (let i = 0; i < ambientStarCount; i++) {
    createAmbientStar();
  }

  function createAmbientStar() {
    const star = document.createElement('span');
    star.className = 'ambient-star';
    star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
    
    // Position randomly
    const top = Math.random() * 92 + 4;
    const left = Math.random() * 94 + 3;
    const size = Math.random() * 0.9 + 0.65;
    const duration = Math.random() * 3 + 2.5;
    const delay = Math.random() * 4;
    const color = starColors[Math.floor(Math.random() * starColors.length)];

    star.style.top = `${top}%`;
    star.style.left = `${left}%`;
    star.style.fontSize = `${size}rem`;
    star.style.color = color;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    container.appendChild(star);
  }

  // Interactive sparkle burst function exposed globally for clicks
  window.createSparkleBurst = function (x, y) {
    const burstCount = 6;
    for (let i = 0; i < burstCount; i++) {
      const sparkle = document.createElement('span');
      sparkle.textContent = starSymbols[Math.floor(Math.random() * 2)];
      sparkle.style.position = 'fixed';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.fontSize = `${Math.random() * 0.8 + 0.7}rem`;
      sparkle.style.color = starColors[Math.floor(Math.random() * starColors.length)];
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '99998';
      sparkle.style.transition = 'all 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
      sparkle.style.transform = 'translate(-50%, -50%) scale(0.5)';
      sparkle.style.opacity = '1';

      document.body.appendChild(sparkle);

      // Random burst velocity
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() * 0.4);
      const distance = Math.random() * 35 + 25;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1.2) rotate(${Math.random() * 90}deg)`;
        sparkle.style.opacity = '0';
      });

      setTimeout(() => {
        if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
      }, 700);
    }
  };

  // Sparkle burst on clicking interactive stickers
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.sticker-interactive, .swatch, .interest-tag, .polaroid-frame');
    if (target) {
      window.createSparkleBurst(e.clientX, e.clientY);
    }
  });
})();
