// ===== BibTeX Toggle & Copy =====
(function () {
  // Toggle BibTeX visibility
  document.addEventListener('click', function (e) {
    var toggleBtn = e.target.closest('[data-bibtex-toggle]');
    if (toggleBtn) {
      var id = toggleBtn.getAttribute('aria-controls');
      var content = document.getElementById(id);
      if (!content) return;

      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !expanded);
      if (expanded) {
        content.setAttribute('hidden', '');
      } else {
        content.removeAttribute('hidden');
      }
    }
  });

  // Copy BibTeX to clipboard
  document.addEventListener('click', function (e) {
    var copyBtn = e.target.closest('[data-bibtex-copy]');
    if (!copyBtn) return;

    var pre = copyBtn.parentElement.querySelector('pre');
    if (!pre) return;

    var text = pre.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopied(copyBtn);
      });
    } else {
      // Fallback
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showCopied(copyBtn);
      } catch (err) {
        // silently fail
      }
      document.body.removeChild(textarea);
    }
  });

  function showCopied(btn) {
    var original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    btn.setAttribute('aria-label', 'Copied to clipboard');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('copied');
      btn.setAttribute('aria-label', 'Copy BibTeX to clipboard');
    }, 2000);
  }
})();
