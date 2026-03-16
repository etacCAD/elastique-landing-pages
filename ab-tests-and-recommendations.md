# Headline A/B Tests & Conversion Recommendations

## 5 Headline A/B Test Variants

All variants target the same **hero H1** slot. Test one at a time against the current control.

| Variant | Headline | Rationale |
|---------|----------|-----------|
| **A (Control)** | *The Travel Secret Most Celebrities Won't Tell You* | Celebrity curiosity + exclusivity. High intrigue for cold traffic. |
| **B** | *Stop Feeling Bloated After Flights* | Direct pain-point language. Resonates with problem-aware searchers. |
| **C** | *Why Frequent Travelers Swear By This* | Social proof in the headline. Leverages herd mentality for skimmers. |
| **D** | *Land Feeling Like You Never Left* | Aspirational / outcome-focused. Paints the end-state, not the problem. |
| **E** | *2,400+ Travelers Ditched Swollen Legs — Here's How* | Specific number + curiosity gap. High click-through potential from social ads. |

**Testing protocol:** Run each variant for ≥1,000 mobile sessions. Measure scroll depth past hero + CTA click-through rate on "See Why People Love These."

---

## Mobile Wireframe Structure

```
┌──────────────────────┐
│  ✈️ Badge            │
│  [Hero Image]        │
│  HEADLINE            │
│  subheadline         │
│  [CTA Primary]       │
│  [CTA Secondary]     │
├──────────────────────┤  ← 1st scroll
│  ⚠ Travel Problem    │
│  • bullet list       │
│  1 sentence          │
├──────────────────────┤  ← 2nd scroll (reviews visible)
│  ★★★★★ Review 1     │
│  ★★★★★ Review 2     │
│  ★★★★★ Review 3     │
│  [CTA]               │
├──────────────────────┤
│  🌟 Celebrity angle  │
│  ✦ list              │
│  [CTA]               │
├──────────────────────┤
│  "Just Wear Them"    │
│  1 paragraph         │
├──────────────────────┤
│  [Product Card]      │
│  image / rating      │
│  ✔ ✔ ✔ benefits     │
│  [CTA]               │
├──────────────────────┤
│  Review Grid (6)     │
│  [CTA]               │
├──────────────────────┤
│  FAQ Accordion (5)   │
├──────────────────────┤
│  Final CTA Banner    │
│  trust badges        │
└──────────────────────┘
┃  STICKY: Shop Now   ┃  ← always visible after hero
```

---

## Conversion Optimization Recommendations

### 1. Get Reviews Above the Fold (Done ✔)
Reviews appear within 2 scrolls. Affiliate traffic that doesn't see social proof early will bounce.

### 2. Use a Sticky CTA (Done ✔)
The sticky "Shop Now" bar appears after the hero and stays visible. This eliminates scroll-to-buy friction.

### 3. Add UTM-Aware Dynamic Headlines
Swap the hero headline based on `utm_source`:
- **Instagram** → "The Travel Hack Going Viral on Instagram"
- **TikTok** → "The Legging TikTok Can't Stop Talking About"
- **Blog** → "Why Wellness Bloggers Pack These Every Trip"

Implement with a small JS snippet reading `URLSearchParams`.

### 4. Add Countdown / Urgency Element
A subtle "Free shipping ends tonight" or "Limited stock" banner below the hero increases urgency without feeling spammy.

### 5. Lazy-Load Below-Fold Images
Only the hero image loads eagerly. All other images use `loading="lazy"` to keep initial paint under 1.5s on 4G.

### 6. Track Scroll Depth Events
Fire analytics events at 25%, 50%, 75%, 100% scroll depth. This reveals exactly where affiliate traffic drops off so copy can be tightened.

### 7. Exit-Intent Popup (Desktop Only)
For the ~10% of desktop visitors, trigger a popup on mouse-leave with a discount code or free shipping offer.

### 8. Review Authenticity Cues
Add "Verified Buyer" badges to reviews. Affiliate traffic is skeptical by default — authenticity markers increase trust.
