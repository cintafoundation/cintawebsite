/* Ad landing pages (/donasi/*): tabs, copy buttons, sticky CTA, and the
   TikTok Pixel events. The pixel base code (and ViewContent) is in <head>;
   this file only fires the click events, and does nothing if the pixel is
   absent. Payment happens in the donor's banking app, which the pixel cannot
   see — so these events measure intent, never completed donations. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var page = $('[data-landing]');
  if (!page) return;
  var content = {
    content_id: page.getAttribute('data-landing'),
    content_name: page.getAttribute('data-landing-name'),
    content_type: 'product'
  };

  function track(event, label) {
    if (!window.ttq || !event) return;
    var props = { content_id: content.content_id, content_name: content.content_name, content_type: content.content_type };
    if (label) props.description = label;
    window.ttq.track(event, props);
  }

  /* ---------------------------------------------------------------- toast */
  var toastEl = $('[data-toast-el]');
  var toastTimer;
  function toast(msg) {
    if (!toastEl || !msg) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 1800);
  }

  /* ----------------------------------------------------------------- tabs */
  var tabs = $$('[data-dl-tab]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var name = tab.getAttribute('data-dl-tab');
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); });
      $$('[data-dl-panel]').forEach(function (p) {
        p.classList.toggle('is-on', p.getAttribute('data-dl-panel') === name);
      });
    });
  });

  /* ----------------------------------------------------------------- copy */
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {});
      }
    });
  });

  /* ------------------------------------------- pixel events + click toasts */
  $$('[data-ttq], [data-toast]').forEach(function (el) {
    el.addEventListener('click', function () {
      track(el.getAttribute('data-ttq'), el.getAttribute('data-ttq-label'));
      toast(el.getAttribute('data-toast'));
    });
  });

  /* ----------------------------------------------------------- sticky CTA */
  var box = $('#donasi');
  var sticky = $('[data-sticky]');
  if (box && sticky && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      sticky.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(box);
  }
})();
