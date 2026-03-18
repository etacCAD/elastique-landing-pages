/**
 * Elastique Cookie Consent Banner
 * Self-contained — injects HTML, CSS, and handles all consent logic.
 * Include via: <script src="/tracking/consent-banner.js"></script>
 *
 * Consent categories:
 *   - essential   (always on — session, cart, consent preference)
 *   - analytics   (GA4, scroll/time tracking)
 *   - marketing   (Meta Pixel, retargeting, ad attribution)
 *
 * Usage from other scripts:
 *   window.__consent.has('analytics')   → boolean
 *   window.__consent.has('marketing')   → boolean
 *   window.addEventListener('consent-updated', handler)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'elastique_consent';
  var CONSENT_VERSION = 1;

  /* ── helpers ─────────────────────────────────────────── */
  function getStored() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed.v !== CONSENT_VERSION) return null;
      return parsed;
    } catch (e) { return null; }
  }

  function setStored(categories) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      v: CONSENT_VERSION,
      categories: categories,
      ts: Date.now()
    }));
  }

  /* ── public API ──────────────────────────────────────── */
  var currentCategories = [];
  var stored = getStored();
  if (stored) currentCategories = stored.categories;

  window.__consent = {
    has: function (cat) {
      return currentCategories.indexOf(cat) !== -1;
    },
    all: function () { return currentCategories.slice(); },
    /** Called by tracking scripts to wait for consent */
    onReady: function (cat, fn) {
      if (window.__consent.has(cat)) { fn(); return; }
      window.addEventListener('consent-updated', function handler() {
        if (window.__consent.has(cat)) {
          fn();
          window.removeEventListener('consent-updated', handler);
        }
      });
    }
  };

  /* If user already consented, don't show banner */
  if (stored) return;

  /* ── inject CSS  ─────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '#eq-consent{position:fixed;bottom:0;left:0;right:0;z-index:99999;font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;}',
    '#eq-consent .eq-c-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.35);opacity:0;transition:opacity .35s ease;pointer-events:none;}',
    '#eq-consent.eq-c-visible .eq-c-backdrop{opacity:1;pointer-events:auto;}',
    '#eq-consent .eq-c-bar{position:relative;z-index:1;background:#1a1a1a;border-top:1px solid rgba(255,255,255,.08);padding:20px 24px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;transform:translateY(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);box-shadow:0 -4px 32px rgba(0,0,0,.25);}',
    '#eq-consent.eq-c-visible .eq-c-bar{transform:translateY(0);}',
    '#eq-consent .eq-c-text{flex:1 1 400px;color:rgba(255,255,255,.78);font-size:13px;line-height:1.6;}',
    '#eq-consent .eq-c-text a{color:#dbb896;text-decoration:underline;}',
    '#eq-consent .eq-c-actions{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;}',
    '#eq-consent .eq-c-btn{padding:10px 22px;border:none;border-radius:50px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all .25s ease;letter-spacing:.02em;white-space:nowrap;}',
    '#eq-consent .eq-c-accept{background:#c4956a;color:#fff;box-shadow:0 2px 12px rgba(196,149,106,.3);}',
    '#eq-consent .eq-c-accept:hover{background:#a87d56;transform:translateY(-1px);box-shadow:0 4px 16px rgba(196,149,106,.4);}',
    '#eq-consent .eq-c-reject{background:transparent;color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.15);}',
    '#eq-consent .eq-c-reject:hover{color:rgba(255,255,255,.9);border-color:rgba(255,255,255,.3);}',
    '#eq-consent .eq-c-customize{background:transparent;color:rgba(255,255,255,.5);border:none;padding:10px 12px;font-size:12px;text-decoration:underline;}',
    '#eq-consent .eq-c-customize:hover{color:rgba(255,255,255,.8);}',
    /* Preferences panel */
    '#eq-consent .eq-c-panel{display:none;position:fixed;bottom:0;left:0;right:0;z-index:2;background:#1a1a1a;border-top:1px solid rgba(255,255,255,.08);padding:28px 24px 24px;max-height:80vh;overflow-y:auto;box-shadow:0 -4px 32px rgba(0,0,0,.3);}',
    '#eq-consent .eq-c-panel.eq-c-panel-open{display:block;}',
    '#eq-consent .eq-c-panel h3{color:#fff;font-family:"Playfair Display",Georgia,serif;font-size:18px;margin-bottom:16px;}',
    '#eq-consent .eq-c-category{padding:14px 0;border-bottom:1px solid rgba(255,255,255,.06);}',
    '#eq-consent .eq-c-cat-header{display:flex;justify-content:space-between;align-items:center;}',
    '#eq-consent .eq-c-cat-name{color:rgba(255,255,255,.9);font-size:14px;font-weight:600;}',
    '#eq-consent .eq-c-cat-desc{color:rgba(255,255,255,.45);font-size:12px;margin-top:4px;line-height:1.5;}',
    '#eq-consent .eq-c-cat-required{color:rgba(255,255,255,.3);font-size:11px;font-weight:500;letter-spacing:.05em;text-transform:uppercase;}',
    /* Toggle */
    '#eq-consent .eq-c-toggle{position:relative;width:42px;height:24px;cursor:pointer;}',
    '#eq-consent .eq-c-toggle input{opacity:0;width:0;height:0;position:absolute;}',
    '#eq-consent .eq-c-toggle span{position:absolute;inset:0;background:rgba(255,255,255,.12);border-radius:12px;transition:.25s ease;}',
    '#eq-consent .eq-c-toggle span::before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.25s ease;}',
    '#eq-consent .eq-c-toggle input:checked+span{background:#c4956a;}',
    '#eq-consent .eq-c-toggle input:checked+span::before{transform:translateX(18px);}',
    '#eq-consent .eq-c-panel-actions{display:flex;gap:10px;margin-top:20px;justify-content:flex-end;}',
    '@media(max-width:600px){',
    '  #eq-consent .eq-c-bar{flex-direction:column;align-items:stretch;padding:16px 16px 18px;gap:14px;}',
    '  #eq-consent .eq-c-actions{justify-content:stretch;}',
    '  #eq-consent .eq-c-btn{flex:1;}',
    '  #eq-consent .eq-c-panel{padding:20px 16px;}',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── inject HTML ─────────────────────────────────────── */
  var wrapper = document.createElement('div');
  wrapper.id = 'eq-consent';
  wrapper.innerHTML = [
    '<div class="eq-c-backdrop"></div>',
    '<div class="eq-c-bar">',
    '  <div class="eq-c-text">',
    '    We use cookies to measure how well our landing pages perform and to support ad attribution. Essential cookies are always active. ',
    '    <a href="https://www.elastiqueathletics.com/pages/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>',
    '  </div>',
    '  <div class="eq-c-actions">',
    '    <button class="eq-c-btn eq-c-accept" id="eq-accept-all">Accept All</button>',
    '    <button class="eq-c-btn eq-c-reject" id="eq-reject">Essential Only</button>',
    '    <button class="eq-c-btn eq-c-customize" id="eq-customize">Customize</button>',
    '  </div>',
    '</div>',
    '<div class="eq-c-panel" id="eq-panel">',
    '  <h3>Cookie Preferences</h3>',
    '  <div class="eq-c-category">',
    '    <div class="eq-c-cat-header">',
    '      <div><div class="eq-c-cat-name">Essential</div><div class="eq-c-cat-desc">Required for the site to function. Cannot be disabled.</div></div>',
    '      <div class="eq-c-cat-required">Always on</div>',
    '    </div>',
    '  </div>',
    '  <div class="eq-c-category">',
    '    <div class="eq-c-cat-header">',
    '      <div><div class="eq-c-cat-name">Analytics</div><div class="eq-c-cat-desc">Help us understand how visitors interact with our pages (Google Analytics).</div></div>',
    '      <label class="eq-c-toggle"><input type="checkbox" id="eq-cat-analytics" checked><span></span></label>',
    '    </div>',
    '  </div>',
    '  <div class="eq-c-category">',
    '    <div class="eq-c-cat-header">',
    '      <div><div class="eq-c-cat-name">Marketing</div><div class="eq-c-cat-desc">Used for ad measurement and retargeting (Meta Pixel).</div></div>',
    '      <label class="eq-c-toggle"><input type="checkbox" id="eq-cat-marketing" checked><span></span></label>',
    '    </div>',
    '  </div>',
    '  <div class="eq-c-panel-actions">',
    '    <button class="eq-c-btn eq-c-accept" id="eq-save-prefs">Save Preferences</button>',
    '  </div>',
    '</div>'
  ].join('\n');
  document.body.appendChild(wrapper);

  /* ── show with slight delay for smoothness ───────────── */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      wrapper.classList.add('eq-c-visible');
    });
  });

  /* ── event handlers ──────────────────────────────────── */
  function applyConsent(categories) {
    currentCategories = categories;
    setStored(categories);
    wrapper.classList.remove('eq-c-visible');
    setTimeout(function () { wrapper.remove(); }, 500);
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: { categories: categories } }));
  }

  document.getElementById('eq-accept-all').addEventListener('click', function () {
    applyConsent(['essential', 'analytics', 'marketing']);
  });

  document.getElementById('eq-reject').addEventListener('click', function () {
    applyConsent(['essential']);
  });

  document.getElementById('eq-customize').addEventListener('click', function () {
    var bar = wrapper.querySelector('.eq-c-bar');
    var panel = document.getElementById('eq-panel');
    bar.style.display = 'none';
    panel.classList.add('eq-c-panel-open');
  });

  document.getElementById('eq-save-prefs').addEventListener('click', function () {
    var cats = ['essential'];
    if (document.getElementById('eq-cat-analytics').checked) cats.push('analytics');
    if (document.getElementById('eq-cat-marketing').checked) cats.push('marketing');
    applyConsent(cats);
  });

  /* Close panel on backdrop click */
  wrapper.querySelector('.eq-c-backdrop').addEventListener('click', function () {
    applyConsent(['essential']);
  });

})();
