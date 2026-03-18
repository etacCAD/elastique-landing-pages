// Elastique — Smoother Skin Page JS
(function () {
  'use strict';

  // ── FAQ ──────────────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      // close all
      document.querySelectorAll('.faq-item.is-open').forEach(function (open) {
        open.classList.remove('is-open');
        open.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  // ── STICKY CTA (mobile) ───────────────────────────────────────────────────
  var stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    var hero = document.getElementById('hero');
    var final = document.getElementById('final');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) {
          stickyCta.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    if (hero) io.observe(hero);
    if (final) {
      var hideIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) stickyCta.classList.remove('is-visible');
          else stickyCta.classList.add('is-visible');
        });
      }, { threshold: 0.5 });
      hideIO.observe(final);
    }
  }




  // ── SCROLL FADE-UPS ────────────────────────────────────────────────────────
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    var fadeIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          fadeIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { fadeIO.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ── CTA CLICKS ─────────────────────────────────────────────────────────────
  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var label = btn.getAttribute('data-cta');
      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', { event_label: label, page: 'social-proof-skin' });
      }
    });
  });

})();
