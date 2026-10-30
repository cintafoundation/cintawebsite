/* Cinta Foundation — in-page interactions only.
   Navigation between pages is now real links; nothing here routes.
   Every panel this script toggles is already present in the HTML. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------- mobile menu */
  (function () {
    var menu = $('#mobile-menu');
    var openBtn = $('[data-menu-open]');
    var closeBtn = $('[data-menu-close]');
    if (!menu || !openBtn) return;

    function set(open) {
      menu.classList.toggle('is-on', open);
      document.body.classList.toggle('menu-open', open);
      openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) openBtn.focus();
    }
    openBtn.addEventListener('click', function () { set(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-on')) set(false);
    });
    window.addEventListener('popstate', function () {
      if (menu.classList.contains('is-on')) set(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && menu.classList.contains('is-on')) set(false);
    });
  })();

  /* -------------------------------------------------------- donation tabs */
  (function () {
    var tabs = $$('[data-don-tab]');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var name = tab.getAttribute('data-don-tab');
        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        $$('[data-don-panel]').forEach(function (p) {
          p.classList.toggle('is-on', p.getAttribute('data-don-panel') === name);
        });
      });
    });
  })();

  /* ------------------------------------------- "Donasi Langsung" scroll-to */
  (function () {
    var trigger = $('[data-focus-donasi]');
    var panel = $('#donasi-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var qris = $('[data-don-tab="QRIS"]');
      if (qris) qris.click();
      var sc = document.scrollingElement || document.documentElement;
      sc.scrollTo({ top: sc.scrollTop + panel.getBoundingClientRect().top - 90, behavior: 'smooth' });
    });
  })();

  /* ------------------------------------------------ copy the account number */
  (function () {
    var btn = $('[data-copy-rek]');
    if (!btn) return;
    var idle = btn.textContent;
    var timer;
    btn.addEventListener('click', function () {
      var done = function () {
        btn.textContent = 'Nomor tersalin';
        clearTimeout(timer);
        timer = setTimeout(function () { btn.textContent = idle; }, 2200);
      };
      var n = btn.getAttribute('data-copy-rek');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(n).then(done, done);
      } else { done(); }
    });
  })();

  /* -------------------------------------------------- laporan archive filter */
  (function () {
    var chips = $$('[data-filter]');
    if (!chips.length) return;
    var items = $$('[data-category]');
    var empty = $('[data-feed-empty]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var want = chip.getAttribute('data-filter');
        chips.forEach(function (c) {
          c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
        });
        var shown = 0;
        items.forEach(function (it) {
          var on = want === 'Semua' || it.getAttribute('data-category') === want;
          it.classList.toggle('is-hidden', !on);
          if (on) shown++;
        });
        if (empty) empty.classList.toggle('is-on', shown === 0);
      });
    });
  })();
})();
