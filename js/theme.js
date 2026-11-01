/**
 * ==========================================================================
 * THEME TOGGLE — YASMIN RAMOS PORTFOLIO
 * Supports light mode (scrapbook cream) & dark mode (Y2K starry plum),
 * with persistent localStorage and adorable visual feedback.
 * ==========================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'yasmin_portfolio_theme';
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = toggleBtn ? toggleBtn.querySelector('.theme-icon') : null;

  // Determine initial theme: saved preference -> system dark mode -> default light
  const getPreferredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '✨' : '🌙';
      toggleBtn.setAttribute('title', theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    }
  };

  // Initialize
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Toggle Listener
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);

      if (window.createSparkleBurst) {
        window.createSparkleBurst(e.clientX, e.clientY);
      }
    });
  }

  // System preference change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
