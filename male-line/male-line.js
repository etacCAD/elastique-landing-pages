/* ============================================
   ELASTIQUE — MALE LINE LANDING PAGE JS
   Brody Launch · 2026
   ============================================ */

(function () {
  'use strict';

  // --- Affiliate UTM Tracking ---
  var params = new URLSearchParams(window.location.search);
  var trackingData = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref', 'aff', 'affiliate_id'].forEach(function (key) {
    var val = params.get(key);
    if (val) trackingData[key] = val;
  });
  window.__aff = trackingData;

  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      var qs = new URLSearchParams(trackingData).toString();
      console.log('CTA [' + el.getAttribute('data-cta') + '] → https://elastiqueathletics.com/collections/mens' + (qs ? '?' + qs : ''));
    });
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (fi) {
        fi.classList.remove('is-open');
        fi.querySelector('.faq-a').style.maxHeight = null;
      });
      // Open clicked (if wasn't already open)
      if (!isOpen) {
        item.classList.add('is-open');
        var answer = item.querySelector('.faq-a');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll Fade Animations ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });

  // --- Nav / Trust Bar Shadow on Scroll ---
  var trustBar = document.querySelector('.trust-bar');
  if (trustBar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        trustBar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.25)';
      } else {
        trustBar.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

})();
