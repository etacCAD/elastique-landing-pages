// Elastique — Last Leggings Page JS
(function () {
  'use strict';

  // ── COST-PER-WEAR CALCULATOR ───────────────────────────────────────────────
  var wearsSlider = document.getElementById('wears-per-week');
  var wearsVal = document.getElementById('wears-per-week-val');
  var cheapCost = document.getElementById('cheap-cost');
  var elastiqueCost = document.getElementById('elastique-cost');
  var cheapTotal = document.getElementById('cheap-total');
  var calcNote = document.getElementById('calc-note');

  // HSA/FSA elements
  var hsaToggle = document.getElementById('hsa-toggle');
  var hsaBracketRow = document.getElementById('hsa-bracket-row');
  var taxBracket = document.getElementById('tax-bracket');
  var hsaSavingsEl = document.getElementById('hsa-savings');
  var hsaEffective = document.getElementById('hsa-effective');
  var hsaSaved = document.getElementById('hsa-saved');
  var hsaCpw = document.getElementById('hsa-cpw');

  var ELASTIQUE_PRICE = 235;
  var MONTHS = 12;

  // Elastique card elements
  var elastiqueLabel = document.getElementById('elastique-label');
  var elastiqueSub = document.getElementById('elastique-sub');
  var elastiqueCard = document.getElementById('elastique-card');

  function updateHSA(totalWears) {
    var isActive = hsaToggle && hsaToggle.checked;

    if (!isActive) {
      if (hsaSavingsEl) hsaSavingsEl.classList.remove('is-active');
      // Reset card to default
      elastiqueCost.textContent = '$' + (ELASTIQUE_PRICE / totalWears).toFixed(2);
      if (elastiqueLabel) elastiqueLabel.textContent = 'Elastique L\'Original';
      if (elastiqueSub) elastiqueSub.textContent = '/wear · + lymphatic health benefits every day';
      if (elastiqueCard) elastiqueCard.classList.remove('hsa-active');
      return;
    }

    var rate = parseFloat(taxBracket.value) || 0.30;
    var saved = Math.round(ELASTIQUE_PRICE * rate);
    var effective = ELASTIQUE_PRICE - saved;
    var perWear = effective / totalWears;

    // Update the Elastique card directly
    elastiqueCost.textContent = '$' + perWear.toFixed(2);
    if (elastiqueLabel) elastiqueLabel.innerHTML = 'Elastique L\'Original <span class="hsa-badge">HSA/FSA</span>';
    if (elastiqueSub) elastiqueSub.innerHTML = '/wear · effective price <strong>$' + effective + '</strong> (save $' + saved + ' pre-tax)';
    if (elastiqueCard) elastiqueCard.classList.add('hsa-active');

    // Update savings callout
    hsaEffective.textContent = '$' + effective;
    hsaSaved.textContent = '$' + saved;
    hsaCpw.textContent = '$' + perWear.toFixed(2);
    hsaSavingsEl.classList.add('is-active');
  }

  function calcCPW() {
    if (!wearsSlider) return;
    var wk = parseInt(wearsSlider.value, 10);

    // Update label
    wearsVal.textContent = wk + (wk === 1 ? ' day' : ' days');

    var totalWears = wk * 4.33 * MONTHS;

    // Cheap leggings: replace every 4 months, $80 each
    var cheapReplacements = Math.ceil(MONTHS / 4);
    var cheapSpend = cheapReplacements * 80;
    var cheapPerWear = cheapSpend / totalWears;

    // Elastique: $235 once (HSA may adjust display)
    var elastiquePerWear = ELASTIQUE_PRICE / totalWears;

    cheapCost.textContent = '$' + cheapPerWear.toFixed(2);
    if (!(hsaToggle && hsaToggle.checked)) {
      elastiqueCost.textContent = '$' + elastiquePerWear.toFixed(2);
    }
    cheapTotal.textContent = '$' + cheapSpend;

    // Update note
    calcNote.innerHTML = 'Over 12 months you\'d spend <strong>$' + cheapSpend + '</strong> replacing cheap leggings vs <strong>$' + ELASTIQUE_PRICE + ' once</strong> on Elastique — and Elastique supports your health every single wear.';

    // HSA/FSA calculation
    updateHSA(totalWears);
  }

  // HSA toggle handler
  if (hsaToggle) {
    hsaToggle.addEventListener('change', function () {
      if (hsaToggle.checked) {
        hsaBracketRow.classList.add('is-active');
      } else {
        hsaBracketRow.classList.remove('is-active');
        if (hsaSavingsEl) hsaSavingsEl.classList.remove('is-active');
      }
      calcCPW();
    });
  }
  if (taxBracket) {
    taxBracket.addEventListener('change', calcCPW);
  }

  if (wearsSlider) {
    wearsSlider.addEventListener('input', calcCPW);
    calcCPW();
  }

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
        gtag('event', 'cta_click', { event_label: label, page: 'last-leggings' });
      }
    });
  });

})();
