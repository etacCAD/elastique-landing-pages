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

})();
