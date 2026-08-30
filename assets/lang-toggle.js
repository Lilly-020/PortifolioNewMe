(function () {
  var STORAGE_KEY = 'site-lang';
  var FLAG_BR = '\u{1F1E7}\u{1F1F7}';
  var FLAG_GB = '\u{1F1EC}\u{1F1E7}';

  function detectLang() {
    var nav = navigator.language || (navigator.languages && navigator.languages[0]) || 'pt-BR';
    return /^pt/i.test(nav) ? 'pt' : 'en';
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.dataset.pt === undefined) {
        el.dataset.pt = el.innerHTML;
      }
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.pt;
    });

    var titleEl = document.querySelector('title[data-en]');
    if (titleEl) {
      if (titleEl.dataset.pt === undefined) {
        titleEl.dataset.pt = titleEl.textContent;
      }
      document.title = lang === 'en' ? titleEl.dataset.en : titleEl.dataset.pt;
    }

    var flagEl = document.querySelector('.lang-toggle__flag');
    var btn = document.getElementById('lang-toggle');
    if (flagEl) {
      flagEl.textContent = lang === 'en' ? FLAG_GB : FLAG_BR;
    }
    if (btn) {
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Portuguese' : 'Mudar para inglês');
    }
  }

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  var lang = (saved === 'pt' || saved === 'en') ? saved : detectLang();

  if (!saved) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  applyLang(lang);

  var toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      lang = lang === 'en' ? 'pt' : 'en';
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      applyLang(lang);
    });
  }
})();
