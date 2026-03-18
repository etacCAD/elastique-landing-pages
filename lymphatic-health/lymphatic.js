// Elastique — Lymphatic Health Page JS
(function () {
  'use strict';

  // ── FAQ ──────────────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
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
    if (hero) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) stickyCta.classList.add('is-visible');
        });
      }, { threshold: 0.1 });
      io.observe(hero);
    }
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




  // ── SCROLL FADE-UPS ───────────────────────────────────────────────────────
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    var fadeIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); fadeIO.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { fadeIO.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ── CTA TRACKING ─────────────────────────────────────────────────────────
  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var label = btn.getAttribute('data-cta');
      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', { event_label: label, page: 'lymphatic-health' });
      }
    });
  });

  // ── HSA/FSA Toggle ────────────────────────────────────────────────────────
  var hsaToggle     = document.getElementById('hsa-toggle');
  var taxBracket    = document.getElementById('tax-bracket');
  var bracketRow    = document.getElementById('hsa-bracket-row');
  var hsaSavingsEl  = document.getElementById('hsa-savings');
  var hsaEffective  = document.getElementById('hsa-effective');
  var hsaSaved      = document.getElementById('hsa-saved');
  var hsaTotalSaved = document.getElementById('hsa-total-saved');
  var anchorPrice   = document.getElementById('anchor-price');
  var anchorMath    = document.getElementById('anchor-math');
  var anchorCard    = document.getElementById('anchor-elastique');
  var BASE_PRICE    = 235;
  var MASSAGE_COST  = 1920;

  function updateHSA() {
    var isActive = hsaToggle && hsaToggle.checked;
    var rate = parseFloat(taxBracket.value) || 0.30;

    if (isActive) {
      bracketRow.classList.add('is-active');
    } else {
      bracketRow.classList.remove('is-active');
      hsaSavingsEl.classList.remove('is-active');
      if (anchorCard) anchorCard.classList.remove('hsa-active');
      anchorPrice.innerHTML = '$' + BASE_PRICE + '<span> once</span>';
      anchorMath.textContent = 'One pair · 365 days of daily support';
      return;
    }

    var saved = Math.round(BASE_PRICE * rate);
    var effective = BASE_PRICE - saved;
    var totalSaved = MASSAGE_COST - effective;

    // Update anchor row
    anchorPrice.innerHTML = '$' + effective + '<span> effective</span>';
    anchorMath.innerHTML = 'Effective price with HSA/FSA <span class="hsa-badge">HSA/FSA</span>';
    if (anchorCard) anchorCard.classList.add('hsa-active');

    // Update savings callout
    hsaEffective.textContent = '$' + effective;
    hsaSaved.textContent = '$' + saved;
    hsaTotalSaved.textContent = '$' + totalSaved.toLocaleString();
    hsaSavingsEl.classList.add('is-active');
  }

  if (hsaToggle) {
    hsaToggle.addEventListener('change', updateHSA);
    taxBracket.addEventListener('change', updateHSA);
  }

})();
