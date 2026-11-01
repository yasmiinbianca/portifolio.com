/**
 * ==========================================================================
 * LADYBUG CURSOR FOLLOWER — YASMIN RAMOS PORTFOLIO
 * Smooth physics lerping, directional facing, non-blocking pointer events
 * and touch-friendly adaptation.
 * ==========================================================================
 */

(function () {
  'use strict';

  // Check if touch device
  const isTouchDevice = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  };

  const ladybug = document.getElementById('ladybug-follower');
  if (!ladybug) return;

  const ladybugImg = ladybug.querySelector('.ladybug-sprite');

  // If mobile touch device, adapt behavior:
  if (isTouchDevice()) {
    // Keep in corner as an interactive cute companion
    ladybug.setAttribute('title', 'Olá! Sou a joaninha da Yasmin ♡');
    ladybug.addEventListener('click', () => {
      ladybug.classList.add('crawling');
      // Create a cute mini heart or sparkle when tapped
      if (window.createSparkleBurst) {
        const rect = ladybug.getBoundingClientRect();
        window.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      setTimeout(() => {
        ladybug.classList.remove('crawling');
      }, 1000);
    });
    return;
  }

  // Desktop smooth cursor follow with lerp
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let lastX = mouseX;
  let lastY = mouseY;
  let currentAngle = 0;
  let targetAngle = 0;
  let isMoving = false;
  let stopTimeout = null;

  // Track real mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    ladybug.style.opacity = '1';

    isMoving = true;
    if (ladybugImg) ladybugImg.classList.add('crawling');

    clearTimeout(stopTimeout);
    stopTimeout = setTimeout(() => {
      isMoving = false;
      if (ladybugImg) ladybugImg.classList.remove('crawling');
    }, 140);
  }, { passive: true });

  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => {
    ladybug.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    ladybug.style.opacity = '1';
  });

  // Smooth animation frame loop
  function updatePosition() {
    // Lerp position (0.14 provides responsive yet fluid organic movement)
    const lerpFactor = 0.14;
    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;

    // Calculate velocity and angle
    const dx = currentX - lastX;
    const dy = currentY - lastY;
    const distance = Math.hypot(dx, dy);

    if (distance > 0.4) {
      // Rotate facing the moving vector (+90 degrees because sprite faces up)
      targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      
      // Smooth angle interpolation avoiding 360 wrap snap
      let diff = (targetAngle - currentAngle) % 360;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;
      currentAngle += diff * 0.18;
    }

    lastX = currentX;
    lastY = currentY;

    // Render transform
    ladybug.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg)`;

    requestAnimationFrame(updatePosition);
  }

  // Start loop
  requestAnimationFrame(updatePosition);
})();
