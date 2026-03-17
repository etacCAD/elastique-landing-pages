/* ============================================
   ELASTIQUE — RECOVERY LANDING PAGE JS
   ============================================ */
(function() {

  /* --- UTM passthrough --- */
  var utmParams = {};
  var searchParams = new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','ref','aff'].forEach(function(k) {
    var v = searchParams.get(k);
    if (v) utmParams[k] = v;
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-item').forEach(function(item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    btn.addEventListener('click', function() {
      var isOpen = item.classList.contains('is-open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function(other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-a').style.maxHeight = '0';
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Scroll Fade-in --- */
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    fadeEls.forEach(function(el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function(el) { el.classList.add('is-visible'); });
  }

  /* --- CTA tracking + UTM passthrough --- */
  document.querySelectorAll('[data-cta]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      var qs = new URLSearchParams(utmParams).toString();
      // If anchor link, just log
      if (el.getAttribute('href') && el.getAttribute('href').charAt(0) === '#') {
        console.log('[Elastique Recovery CTA]', el.dataset.cta, '→ anchor');
        return;
      }
      // If external link with UTMs, append them
      if (el.getAttribute('href') && Object.keys(utmParams).length > 0) {
        e.preventDefault();
        var base = el.getAttribute('href');
        var separator = base.indexOf('?') !== -1 ? '&' : '?';
        window.open(base + separator + qs, el.getAttribute('target') || '_self');
      }
      console.log('[Elastique Recovery CTA]', el.dataset.cta);
    });
  });

  /* --- HSA/FSA Toggle --- */
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

  // Product card prices
  var PRODUCTS = [
    { id: 'price-classic',  base: 235 },
    { id: 'price-stirrup',  base: 275 },
    { id: 'price-lisse',    base: 150 }
  ];

  function updateHSA() {
    var isActive = hsaToggle && hsaToggle.checked;
    var rate = parseFloat(taxBracket.value) || 0.30;

    if (isActive) {
      bracketRow.classList.add('is-active');
    } else {
      bracketRow.classList.remove('is-active');
      hsaSavingsEl.classList.remove('is-active');
      if (anchorCard) anchorCard.classList.remove('hsa-active');

      // Reset anchor price
      anchorPrice.innerHTML = '$235<span> once</span>';
      anchorMath.textContent = 'Continuous lymphatic stimulation · every day · all day';

      // Reset product card prices
      PRODUCTS.forEach(function(p) {
        var el = document.getElementById(p.id);
        if (el) el.innerHTML = '$' + p.base + ' <span class="product-card__price-note">· HSA/FSA eligible</span>';
      });
      return;
    }

    var saved = Math.round(235 * rate);
    var effective = 235 - saved;
    var mldSaving = 1440 - effective;

    // Update anchor price card
    anchorPrice.innerHTML = '$' + effective + '<span> effective</span>';
    anchorMath.innerHTML = 'Effective price with HSA/FSA <span class="hsa-badge">HSA/FSA</span>';
    if (anchorCard) anchorCard.classList.add('hsa-active');

    // Update savings callout
    hsaEffective.textContent = '$' + effective;
    hsaSaved.textContent = '$' + saved;
    hsaTotalSaved.textContent = '$' + mldSaving;
    hsaSavingsEl.classList.add('is-active');

    // Update all product card prices
    PRODUCTS.forEach(function(p) {
      var el = document.getElementById(p.id);
      if (!el) return;
      var pSaved = Math.round(p.base * rate);
      var pEffective = p.base - pSaved;
      el.innerHTML = '<s style="opacity:0.4;font-size:0.75em">$' + p.base + '</s> $' + pEffective +
        ' <span class="product-card__price-note">· save $' + pSaved + ' with HSA/FSA</span>';
    });
  }

  if (hsaToggle) {
    hsaToggle.addEventListener('change', updateHSA);
    taxBracket.addEventListener('change', updateHSA);
  }

})();
