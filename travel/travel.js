/* ============================================
   ELASTIQUE — TRAVEL LANDING PAGE JS
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
        console.log('[Elastique Travel CTA]', el.dataset.cta, '→ anchor');
        return;
      }
      // If external link with UTMs, append them
      if (el.getAttribute('href') && Object.keys(utmParams).length > 0) {
        e.preventDefault();
        var base = el.getAttribute('href');
        var separator = base.indexOf('?') !== -1 ? '&' : '?';
        window.open(base + separator + qs, el.getAttribute('target') || '_self');
      }
      console.log('[Elastique Travel CTA]', el.dataset.cta);
    });
  });

  /* --- Product Carousel --- */
  var carousel = document.getElementById('product-carousel');
  if (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var dots = carousel.querySelectorAll('.carousel__dot');
    var prevBtn = carousel.querySelector('.carousel__arrow--prev');
    var nextBtn = carousel.querySelector('.carousel__arrow--next');
    var current = 0;
    var total = slides.length;
    var startX = 0;
    var deltaX = 0;
    var isDragging = false;
    var autoTimer;

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) {
        d.classList.toggle('is-active', i === current);
      });
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); resetAuto(); });
    dots.forEach(function(dot) {
      dot.addEventListener('click', function() { goTo(parseInt(dot.dataset.slide)); resetAuto(); });
    });

    // Swipe / drag
    carousel.addEventListener('pointerdown', function(e) {
      if (e.target.closest('.btn') || e.target.closest('a') || e.target.closest('.carousel__arrow') || e.target.closest('.carousel__dot') || e.target.closest('.carousel__nav')) return;
      isDragging = true;
      startX = e.clientX;
      track.style.transition = 'none';
      carousel.setPointerCapture(e.pointerId);
    });
    carousel.addEventListener('pointermove', function(e) {
      if (!isDragging) return;
      deltaX = e.clientX - startX;
      track.style.transform = 'translateX(calc(-' + (current * 100) + '% + ' + deltaX + 'px))';
    });
    carousel.addEventListener('pointerup', function() {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = '';
      if (Math.abs(deltaX) > 50) {
        goTo(deltaX > 0 ? current - 1 : current + 1);
      } else {
        goTo(current);
      }
      deltaX = 0;
      resetAuto();
    });

    // Auto-advance every 6s
    function startAuto() { autoTimer = setInterval(function() { goTo(current + 1); }, 6000); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }
    startAuto();
  }

  /* --- Sticky CTA Visibility --- */
  var stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > window.innerHeight * 0.8) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    });
  }

})();
