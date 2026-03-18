/* ============================================
   ELASTIQUE — ENDURANCE LANDING PAGE JS
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

  /* --- Dynamic Headline (endurance traffic sources) --- */
  var source = searchParams.get('utm_source');
  var heroHead = document.querySelector('.hero h1');
  if (heroHead && source) {
    var s = source.toLowerCase();
    if (s === 'strava') {
      heroHead.innerHTML = 'The Recovery Hack Strava Athletes Swear By';
    } else if (s === 'garmin') {
      heroHead.innerHTML = 'The Missing Metric: <em>Recovery.</em>';
    } else if (s === 'running' || s === 'runnersworld') {
      heroHead.innerHTML = 'Why Serious Runners Are Ditching Ice Baths';
    } else if (s === 'triathlon' || s === 'tri') {
      heroHead.innerHTML = 'Swim. Bike. Run. <em>Recover.</em>';
    } else if (s === 'instagram' || s === 'ig') {
      heroHead.innerHTML = 'The Recovery Tool Going Viral With Athletes';
    } else if (s === 'tiktok') {
      heroHead.innerHTML = 'The Legging Endurance Athletes Can\'t Stop Talking About';
    } else if (s === 'facebook' || s === 'fb') {
      heroHead.innerHTML = 'Stop Recovering. Start <em>Performing.</em>';
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

  /* --- Exit Intent Popup --- */
  var exitPopup = document.getElementById('exit-popup');
  var exitClose = document.getElementById('exit-close');
  var exitOverlay = document.getElementById('exit-overlay');
  var hasTriggeredExit = false;

  if (exitPopup) {
    var closePopup = function() {
      exitPopup.classList.remove('is-visible');
    };
    if (exitClose) exitClose.addEventListener('click', closePopup);
    if (exitOverlay) exitOverlay.addEventListener('click', closePopup);

    var exitForm = document.getElementById('exit-form');
    if (exitForm) {
      exitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        closePopup();
      });
    }

    document.addEventListener('mouseleave', function(e) {
      if (e.clientY < 5 && !hasTriggeredExit && window.scrollY > 300) {
        exitPopup.classList.add('is-visible');
        hasTriggeredExit = true;
      }
    });
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

  /* --- CTA tracking --- */
  document.querySelectorAll('[data-cta]').forEach(function(el) {
    el.addEventListener('click', function() {
      var qs = new URLSearchParams(utmParams).toString();
      var dest = 'https://elastiqueathletics.com/shop' + (qs ? '?' + qs : '');
      console.log('[Elastique CTA]', el.dataset.cta, '→', dest);
    });
  });

})();
