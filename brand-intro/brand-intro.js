/**
 * Elastique - Brand Intro JS
 * Handles animations, sticky CTA visibility, and FAQ toggles
 */

document.addEventListener('DOMContentLoaded', () => {

  /* 
   * 1. Scroll Fade-up Observer
   */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, unobserve
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  /*
   * 2. FAQ Accordion (Single-open)
   */
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /*
   * 3. Sticky CTA Toggle
   * Hidden when user is near the top (hero section contains main CTA)
   * Hidden when user reaches footer (avoid double CTA)
   */
  const stickyCta = document.querySelector('.sticky-cta-bar');
  const heroSection = document.querySelector('.hero');
  const footerSection = document.querySelector('.el-footer');
  
  if (stickyCta && heroSection) {
    window.addEventListener('scroll', () => {
      // Only run logic on mobile/tablet widths
      if (window.innerWidth <= 768) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const footerTop = footerSection ? footerSection.getBoundingClientRect().top : window.innerHeight + 1000;
        
        // Show sticky CTA if we've scrolled past hero AND haven't reached footer
        if (heroBottom < 0 && footerTop > window.innerHeight) {
          stickyCta.classList.add('visible');
        } else {
          stickyCta.classList.remove('visible');
        }
      }
    }, { passive: true });
  }

  /*
   * 4. UTM Passthrough & Tracking setup
   * Appends URL search params to all clickable Shop links that go outside the page
   */
  const urlParams = new URLSearchParams(window.location.search);
  const paramString = urlParams.toString();
  
  if (paramString) {
    document.querySelectorAll('a[href]').forEach(link => {
      try {
        const url = new URL(link.href);
        // Exclude anchor links on the same page
        if (url.origin === window.location.origin && link.getAttribute('href').startsWith('#')) {
          return;
        }
        
        // Add existing params to destination
        for (const [key, value] of urlParams) {
          if (!url.searchParams.has(key)) {
            url.searchParams.append(key, value);
          }
        }
        link.href = url.toString();
      } catch (e) {
        // Ignore invalid URLs
      }
    });
  }
});
