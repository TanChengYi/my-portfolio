(function() {
  const THEME_KEY = 'preferred-theme';
  const THEMES = ['neon', 'corporate'];

  function getThemeFromURL() {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('theme');
    return THEMES.includes(t) ? t : null;
  }

  function getThemeFromStorage() {
    const t = localStorage.getItem(THEME_KEY);
    return THEMES.includes(t) ? t : null;
  }

  function getThemeFromSystem() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'neon' : 'corporate';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function init() {
    let theme = getThemeFromURL();
    if (theme) {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      theme = getThemeFromStorage() || getThemeFromSystem();
    }
    applyTheme(theme);

    document.addEventListener('DOMContentLoaded', () => {
      const selector = document.getElementById('theme-selector');
      if (!selector) return;
      const stored = getThemeFromStorage();
      selector.value = stored || 'system';
      selector.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value === 'system') {
          localStorage.removeItem(THEME_KEY);
          applyTheme(getThemeFromSystem());
        } else {
          localStorage.setItem(THEME_KEY, value);
          applyTheme(value);
        }
      });
    });
  }

  init();
})();
