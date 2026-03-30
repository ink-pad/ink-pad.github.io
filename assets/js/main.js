// ===== Theme Toggle =====
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', theme === 'dark');
    localStorage.setItem('theme', theme);

    // Sync utterances iframe theme
    var frame = document.querySelector('.utterances-frame');
    if (frame) {
      frame.contentWindow.postMessage(
        { type: 'set-theme', theme: theme === 'dark' ? 'github-dark' : 'github-light' },
        'https://utteranc.es'
      );
    }
  }

  btn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Update aria-pressed on load
  var current = document.documentElement.getAttribute('data-theme') || 'light';
  btn.setAttribute('aria-pressed', current === 'dark');

  // Listen for system theme changes when no manual preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

// ===== Mobile Navigation =====
(function () {
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    toggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
    nav.classList.toggle('is-open');

    // Prevent body scroll when menu is open
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
})();

// ===== Bio Expand/Collapse =====
(function () {
  var btn = document.getElementById('bio-toggle');
  var full = document.getElementById('bio-full');
  var collapsed = document.querySelector('.bio__collapsed');
  if (!btn || !full) return;

  btn.addEventListener('click', function () {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    full.classList.toggle('is-expanded');
    btn.querySelector('.bio__toggle-text').textContent = expanded ? 'Read more' : 'Show less';

    // Hide collapsed text when expanded
    if (collapsed) {
      collapsed.style.display = expanded ? '' : 'none';
    }
  });
})();

// ===== Blog Tag Filter =====
(function () {
  var buttons = document.querySelectorAll('.tag-filter__btn[data-tag]');
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag = btn.getAttribute('data-tag');

      // Update active button
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Filter posts
      var posts = document.querySelectorAll('.post-card[data-tags]');
      posts.forEach(function (post) {
        if (!tag) {
          post.removeAttribute('hidden');
          return;
        }
        var tags = post.getAttribute('data-tags') || '';
        if (tags.split(' ').indexOf(tag) !== -1) {
          post.removeAttribute('hidden');
        } else {
          post.setAttribute('hidden', '');
        }
      });
    });
  });
})();
