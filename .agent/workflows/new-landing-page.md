---
description: How to build a new high-converting landing page from scratch
---

# New Landing Page Workflow

Follow this process end-to-end when creating a new landing page. **Copy first, design second, optimize always.**

---

## Phase 1: Strategy & Research

1. **Define the traffic source & audience**
   - Who is landing on this page? (cold social, warm retarget, referral, email)
   - What do they already know about the brand/product?
   - What device are they most likely on? (mobile for paid social)

2. **Define the single conversion goal**
   - One page = one CTA. Decide: Add to cart? Email capture? Book a call?
   - Every section on the page should ladder up to this one action.

3. **Research the audience**
   - Mine customer reviews, support tickets, Reddit, and social comments for exact language.
   - Identify top 3 pain points and top 3 objections.
   - Note the emotional triggers: fear, aspiration, identity, urgency.

4. **Competitive / aspirational audit**
   - Screenshot 3–5 competitor or aspirational landing pages.
   - Note: headline style, proof elements, CTA placement, visual tone.

5. **Compliance pre-check**
   - Review FDA/FTC guidelines (or relevant regulatory framework).
   - List banned terms, required disclaimers, and claim restrictions.
   - Flag any before/after imagery rules.

---

## Phase 2: Copywriting

> ⚠️ Do NOT start designing until copy is finalized. Design follows copy.

6. **Write 3–5 headline options**
   - Use one of these frameworks:
     - **Pattern interrupt**: Break expectations ("Stop icing your face.")
     - **Identity-based**: Speak to who they are ("For women who refuse to slow down.")
     - **Curiosity/mechanism**: Tease the how ("The 90-second ritual high-performers swear by.")
   - Pick the strongest. Save alternates for A/B testing.

7. **Outline page sections** using this proven structure:
   ```
   1. Hero — Hook headline + sub-headline + primary CTA
   2. Social Proof Bar — Press logos, star ratings, customer count
   3. Problem Agitation — Name the pain vividly
   4. Solution / Product Intro — Position as the answer
   5. Benefits (not features) — Outcome-focused, with icons or visuals
   6. Deeper Social Proof — Video testimonials, before/after, case studies
   7. Objection Handling / FAQ — Neutralize top 3 objections
   8. Price Anchoring — Compare value, show savings, use decoy pricing
   9. Final CTA — Urgency + guarantee + clear action
   ```

8. **Write full section copy**
   - Write conversationally. Read it aloud.
   - Cut 30% on the second pass — tighter is always better.
   - Ensure every section answers "why should I keep scrolling?"

9. **Compliance pass on copy**
   - Run all copy through compliance guidelines before design begins.
   - Replace any banned terms with approved alternatives.
   - Add required disclaimers in correct positions.

---

## Phase 3: Design & Build

10. **Create or source hero imagery**
    - Custom imagery > stock. AI-generated is acceptable if on-brand.
    - Hero image should reinforce the headline emotionally, not just decorate.
    - Optimize: WebP format, compressed, lazy-loaded below the fold.

11. **Set up project structure**
    ```
    /new-page-name/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── images/
    ```

12. **Build with the design system**
    - Use CSS custom properties (variables) for colors, spacing, typography.
    - Reuse existing component patterns from other landing pages for consistency.
    - Semantic HTML: proper heading hierarchy, `<section>`, `<article>`, `<figure>`.
    - Add unique IDs to all interactive elements (for analytics and testing).

13. **Implement interactions**
    - Scroll-triggered animations (fade-in, slide-up) — keep subtle.
    - Sticky header with CTA button.
    - Smooth-scroll anchor links.
    - Mobile hamburger menu (if needed).
    - FAQ accordion.

14. **Performance checklist**
    - [ ] All images compressed and in WebP where possible
    - [ ] Fonts loaded with `font-display: swap`
    - [ ] No render-blocking JS
    - [ ] Critical CSS inlined or loaded first
    - [ ] Lazy loading on below-fold images

---

## Phase 4: QA & Review

15. **Mobile-first QA**
    - Test at 375px, 390px, 428px, 768px, 1024px, 1440px.
    - Verify: text readability, CTA button size (min 44px tap target), image scaling.
    - Check that nothing overflows or breaks on small screens.

16. **Cross-browser check**
    - Safari, Chrome, Firefox (at minimum).
    - Check for CSS compatibility issues (backdrop-filter, grid, etc.).

17. **CRO review checklist**
    - [ ] CTA visible without scrolling (above the fold)
    - [ ] Social proof within first 2 scroll depths
    - [ ] No competing CTAs or navigation that leads away from the goal
    - [ ] Price anchoring makes the target option feel obvious
    - [ ] FAQ addresses the top 3 purchase objections
    - [ ] Page loads in under 3 seconds on mobile

18. **Compliance final review**
    - [ ] No banned medical/health claims
    - [ ] All required disclaimers present and correctly placed
    - [ ] Before/after imagery follows guidelines
    - [ ] Testimonials have proper disclosures

19. **Stakeholder review**
    - Share with CEO/CMO for messaging and positioning sign-off.
    - Collect feedback, iterate if needed.

---

## Phase 5: Deploy & Measure

20. **Deploy**
    - Push to GitHub, deploy via Render (or hosting platform).
    - Verify live URL loads correctly on mobile and desktop.
    - Test all links and CTAs point to correct destinations.

21. **Connect analytics & tracking**
    - UTM parameters on all inbound links.
    - Facebook/Meta Pixel, Google Analytics, or relevant tracking.
    - Heatmap tool (Hotjar or Microsoft Clarity) for scroll depth and click maps.

22. **Connect to storefront**
    - Shopify buy buttons, Storefront API integration, or direct product links.
    - Test the full purchase flow from landing page → checkout.

23. **Launch traffic (start small)**
    - Run a small test budget ($20–50/day) for 3–5 days.
    - Monitor: CTR, bounce rate, scroll depth, conversion rate.

24. **Iterate based on data**
    - A/B test in this priority order:
      1. **Headline** (highest impact)
      2. **Hero image**
      3. **CTA copy and placement**
      4. **Social proof type and position**
      5. **Price anchoring structure**
    - Optimize based on data, not opinions.
    - Re-run compliance check after any copy changes.

---

## Skills Checklist

The ideal landing page builder has strength across these areas:

| Skill | Why It Matters |
|---|---|
| **Copywriting & Persuasion** | Copy converts. Design supports. Never the other way around. |
| **CRO (Conversion Rate Optimization)** | Knowing *why* people convert, not just what looks good. |
| **Visual/UI Design** | Aesthetics build trust — especially for premium brands. |
| **Frontend Development** | Fast, semantic, responsive pages that actually work. |
| **Audience & Traffic Awareness** | The page must match the intent of whoever lands on it. |
| **Compliance & Legal** | One bad claim can cost more than a bad conversion rate. |
| **Analytics & Testing** | You can't improve what you don't measure. |
