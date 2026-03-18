/* ============================================
   ELASTIQUE — COLD TRAFFIC JS
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

  /* --- Dynamic Headline --- */
  var source = searchParams.get('utm_source');
  var heroHead = document.querySelector('.hero h1');
  if (heroHead && source) {
    var s = source.toLowerCase();
    if (s === 'instagram' || s === 'ig') {
      heroHead.innerHTML = 'The Travel Hack Going Viral on Instagram';
    } else if (s === 'tiktok') {
      heroHead.innerHTML = 'The Legging TikTok Can\'t Stop Talking About';
    } else if (s === 'blog') {
      heroHead.innerHTML = 'Why Wellness Bloggers Pack These Every Trip';
    }
  }

  /* --- Sticky CTA Visibility --- */
  var stickyCta = document.getElementById('sticky-cta');
  if (stickyCta && 'IntersectionObserver' in window) {
    var hero = document.getElementById('hero');
    var observerSticky = new IntersectionObserver(function(entries) {
      if (!entries[0].isIntersecting) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    }, { threshold: 0 });
    if (hero) observerSticky.observe(hero);
  }




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

  /* --- CTA tracking + redirect --- */
  var shopifyBase = 'https://www.elastiqueathletics.com/products/loriginal-leggings';
  document.querySelectorAll('[data-cta]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      var qs = new URLSearchParams(utmParams).toString();
      var href = el.getAttribute('href');
      // If the link already points to Shopify, append UTMs
      if (href && href.indexOf('elastiqueathletics.com') !== -1) {
        var separator = href.indexOf('?') !== -1 ? '&' : '?';
        if (qs) el.setAttribute('href', href + separator + qs);
        return; // let the native link navigate
      }
      // For anchor links (#shop, #proof, etc.), redirect to PDP
      if (!href || href.charAt(0) === '#') {
        e.preventDefault();
        var dest = shopifyBase + (qs ? '?' + qs : '');
        window.open(dest, '_blank', 'noopener');
      }
    });
  });

})();
