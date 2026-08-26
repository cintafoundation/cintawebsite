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

  /* ------------------------------------------------- Titip Cinta step flow */
  (function () {
    var flow = $('[data-titip-flow]');
    if (!flow) return;

    var state = { step: 1, program: '', amount: '', custom: '', name: '', contact: '', recipient: '', recipientName: '' };
    var steps = $$('[data-step]', flow);
    var rail = $$('[data-rail]', flow);
    var nav = $('[data-flow-nav]', flow);
    var back = $('[data-flow-back]', flow);
    var next = $('[data-flow-next]', flow);

    var programTitles = {};
    $$('[data-program]', flow).forEach(function (b) {
      programTitles[b.getAttribute('data-program')] = b.getAttribute('data-program-title');
    });

    function render() {
      steps.forEach(function (s) {
        s.classList.toggle('is-on', Number(s.getAttribute('data-step')) === state.step);
      });
      rail.forEach(function (r) {
        var n = Number(r.getAttribute('data-rail'));
        r.setAttribute('data-state', n === state.step ? 'active' : (n < state.step ? 'done' : 'todo'));
      });
      if (nav) nav.classList.toggle('is-off', state.step >= 6);
      if (back) back.classList.toggle('is-off', state.step <= 1);
      if (next) next.textContent = state.step === 5 ? 'Konfirmasi Donasi →' : 'Lanjut →';

      var amount = state.amount || (state.custom ? 'Rp ' + state.custom : '—');
      var recipient = state.recipient
        ? (state.recipientName ? state.recipient + ' · ' + state.recipientName : state.recipient)
        : 'Atas nama sendiri';
      set('program', programTitles[state.program] || '—');
      set('amount', amount);
      set('donor', state.name || 'Hamba Allah');
      set('recipient', recipient);
    }
    function set(key, value) {
      var el = $('[data-summary="' + key + '"]', flow);
      if (el) el.textContent = value;
    }

    $$('[data-program]', flow).forEach(function (b) {
      b.addEventListener('click', function () {
        state.program = b.getAttribute('data-program');
        $$('[data-program]', flow).forEach(function (o) {
          o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
        render();
      });
    });

    $$('[data-amount]', flow).forEach(function (b) {
      b.addEventListener('click', function () {
        state.amount = b.getAttribute('data-amount');
        state.custom = '';
        var custom = $('[data-custom-amount]', flow);
        if (custom) custom.value = '';
        $$('[data-amount]', flow).forEach(function (o) {
          o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
        render();
      });
    });

    $$('[data-recipient]', flow).forEach(function (b) {
      b.addEventListener('click', function () {
        state.recipient = b.getAttribute('data-recipient');
        $$('[data-recipient]', flow).forEach(function (o) {
          o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
        render();
      });
    });

    var skip = $('[data-skip-recipient]', flow);
    if (skip) skip.addEventListener('click', function () {
      state.recipient = '';
      state.recipientName = '';
      $$('[data-recipient]', flow).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      var rn = $('[data-recipient-name]', flow);
      if (rn) rn.value = '';
      render();
    });

    function bind(sel, key, extra) {
      var el = $(sel, flow);
      if (!el) return;
      el.addEventListener('input', function () {
        state[key] = el.value;
        if (extra) extra();
        render();
      });
    }
    bind('[data-custom-amount]', 'custom', function () {
      state.amount = '';
      $$('[data-amount]', flow).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
    });
    bind('[data-donor-name]', 'name');
    bind('[data-donor-contact]', 'contact');
    bind('[data-recipient-name]', 'recipientName');

    if (next) next.addEventListener('click', function () {
      state.step = Math.min(6, state.step + 1);
      render();
    });
    if (back) back.addEventListener('click', function () {
      state.step = Math.max(1, state.step - 1);
      render();
    });
    var reset = $('[data-flow-reset]', flow);
    if (reset) reset.addEventListener('click', function () {
      state = { step: 1, program: '', amount: '', custom: '', name: '', contact: '', recipient: '', recipientName: '' };
      $$('input', flow).forEach(function (i) { i.value = ''; });
      $$('[aria-pressed]', flow).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      render();
    });

    render();
  })();
})();
