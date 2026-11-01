/**
 * ==========================================================================
 * MAIN INTERACTIVITY — YASMIN RAMOS PORTFOLIO
 * Scrapbook interactive features: Polaroid switcher, palette clipboard copy,
 * 3D tilt physics, sticker animations.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Polaroid Photo Switcher (Anime / Pixel / Chibi) ---
  const polaroidImg = document.getElementById('polaroid-avatar-img');
  const avatarCaption = document.getElementById('polaroid-avatar-caption');
  const switchDots = document.querySelectorAll('.switch-dot');

  const avatarData = [
    {
      src: 'assets/images/avatar-pixel.png',
      caption: 'yasmin . pixel edition',
      tag: 'pixel art'
    },
    {
      src: 'assets/images/avatar-anime.png',
      caption: 'yasmin . anime mood',
      tag: 'aesthetic'
    },
    {
      src: 'assets/images/avatar-chibi.png',
      caption: 'yasmin . chibi cutie',
      tag: 'kawaii'
    }
  ];

  let currentAvatarIndex = 0;

  function switchAvatar(index) {
    if (!polaroidImg || index < 0 || index >= avatarData.length) return;
    currentAvatarIndex = index;

    // Fade effect
    polaroidImg.style.opacity = '0';
    setTimeout(() => {
      polaroidImg.src = avatarData[index].src;
      polaroidImg.style.opacity = '1';

      if (avatarCaption) {
        avatarCaption.innerHTML = `${avatarData[index].caption} <span class="polaroid-caption-tag">${avatarData[index].tag}</span>`;
      }
    }, 200);

    // Update dots
    switchDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Click on dots
  switchDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(dot.getAttribute('data-index'), 10);
      switchAvatar(index);
    });
  });

  // Clicking on the photo cycles to next avatar
  const polaroidFrame = document.querySelector('.polaroid-frame');
  if (polaroidFrame) {
    polaroidFrame.addEventListener('click', () => {
      const nextIndex = (currentAvatarIndex + 1) % avatarData.length;
      switchAvatar(nextIndex);
    });
  }

  // --- 2. Palette Color Swatches: Click to Copy HEX with cute tooltip ---
  const swatches = document.querySelectorAll('.swatch');
  swatches.forEach((swatch) => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      const hex = swatch.getAttribute('data-hex');
      if (hex && navigator.clipboard) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Cor copiada: ${hex} ♡`, e.clientX, e.clientY);
        });
      }
    });
  });

  // Cute scrapbook toast
  function showToast(text, x, y) {
    const toast = document.createElement('div');
    toast.className = 'scrapbook-toast';
    toast.textContent = text;
    toast.style.position = 'fixed';
    toast.style.left = `${x || window.innerWidth / 2}px`;
    toast.style.top = `${y ? y - 30 : window.innerHeight / 2}px`;
    toast.style.transform = 'translate(-50%, -100%) scale(0.8)';
    toast.style.background = 'var(--c-brown-dark)';
    toast.style.color = '#FFFFFF';
    toast.style.fontFamily = 'var(--font-pixel)';
    toast.style.fontSize = '0.72rem';
    toast.style.padding = '5px 12px';
    toast.style.borderRadius = '20px';
    toast.style.border = '1px solid var(--c-pink-light)';
    toast.style.boxShadow = '0 6px 16px rgba(42,30,30,0.3)';
    toast.style.zIndex = '999999';
    toast.style.pointerEvents = 'none';
    toast.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    toast.style.opacity = '0';

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translate(-50%, -120%) scale(1)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translate(-50%, -140%) scale(0.85)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  }

  // --- 3. Subtle 3D Scrapbook Tilt on the Board (Desktop only) ---
  const board = document.querySelector('.scrapbook-board');
  if (board && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const handleMouseMove = (e) => {
      const rect = board.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      board.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      board.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      board.style.transition = 'transform 0.5s ease';
    };

    const handleMouseEnter = () => {
      board.style.transition = 'none';
    };

    board.addEventListener('mousemove', handleMouseMove);
    board.addEventListener('mouseleave', handleMouseLeave);
    board.addEventListener('mouseenter', handleMouseEnter);
  }

  // --- 4. Interactive Ladybug Stamp Bounce ---
  const ladybugStamp = document.querySelector('.sticker-ladybug-stamp');
  if (ladybugStamp) {
    ladybugStamp.addEventListener('click', () => {
      ladybugStamp.style.transform = 'rotate(360deg) scale(1.25)';
      setTimeout(() => {
        ladybugStamp.style.transform = '';
      }, 600);
    });
  }

  // --- 5. Contact Section Email Copy ---
  const copyEmailBtn = document.getElementById('copy-email-action');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'yasminbiancaramos29@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`E-mail copiado com sucesso! ♡`, e.clientX, e.clientY);
        });
      } else {
        showToast(email, e.clientX, e.clientY);
      }
    });
  }

  // --- 6. Scroll Spy for Navigation Links ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-item a');

  function updateActiveNavLink() {
    let currentId = 'inicio';
    const scrollPos = window.scrollY + 220;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();
});
