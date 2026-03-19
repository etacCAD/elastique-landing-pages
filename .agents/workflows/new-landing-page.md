---
description: How to build a new high-converting landing page from scratch
---

# New Elastique Landing Page Workflow

## Prerequisites
- Read the `elastique-landing-page` skill (SKILL.md) before starting
- Read the `elastique-brand-voice` skill for tone/copy guidelines
- Read the `elastique-compliance` skill — all copy must be FDA/FTC compliant

## Step 1: Planning
1. Understand the campaign goal, target audience, and traffic source (cold, retargeting, etc.)
2. Review existing landing pages in the repo for structural patterns
3. Create an implementation plan with section breakdown (typically 8-10 sections)
4. Get user approval on plan before building

## Step 2: Build the Foundation (Separate Files)
Build the landing page as **three separate files** in a new directory:

```
/Applications/Elastique Landing Pages/{page-name}/
├── index.html       # Full HTML page with <head>, meta tags, OG tags
├── {page-name}.css  # All styles
├── {page-name}.js   # Interactivity (accordion, carousel, sticky CTA, UTM passthrough)
└── assets/          # Local images (hero, textures, etc.)
```

### HTML Requirements
- Include proper `<head>` with meta description, canonical URL, OG tags
- Use semantic section structure with descriptive IDs
- All images should use CDN URLs (Shopify CDN preferred: `cdn.shopify.com/...`)
- Include the Elastique logo SVG in the hero: `https://cdn.shopify.com/s/files/1/1886/2193/files/elastique_logo.svg?v=1756493562`
- Use `data-cta="..."` attributes on all clickable CTAs for tracking
- Footer must use `<div class="el-footer">` (NOT `<footer>`) to avoid Shopify theme conflicts
- Reference external CSS/JS files for development: `<link rel="stylesheet" href="{page-name}.css">` and `<script defer src="{page-name}.js"></script>`

### CSS Requirements
- Use the established design system variables (`:root` block with `--black`, `--accent`, etc.)
- Use `.el-footer` selector (not `footer`)
- Include mobile (`≤600px`), and desktop (`768px+`) responsive breakpoints
- Include `.fade-up` animation classes
- Include sticky CTA styles (hidden on desktop `≥768px`)

### JS Requirements
- UTM parameter capture and passthrough to external links
- FAQ accordion (single-open behavior)
- Scroll fade-in via IntersectionObserver
- Product carousel with swipe/drag, dots, arrows, auto-advance
- Sticky CTA visibility toggle on scroll

## Step 3: Verify
1. Run a local server and check desktop + mobile rendering
2. Verify all links, carousel, FAQ, and sticky CTA functionality
3. Run the `elastique-compliance` skill on all copy

## Step 4: Generate Consolidated Shopify File ⚡ CRITICAL
// turbo
After the page is finalized, generate a **single consolidated `.txt` file** that the dev can copy-paste directly into Shopify. This is the final deliverable format.

Run this command to generate it (replace `{page-name}` with actual directory name):

```bash
python3 << 'PYEOF'
import re, sys

page_name = "{page-name}"  # REPLACE THIS
base = f"/Applications/Elastique Landing Pages/{page_name}"

with open(f"{base}/index.html", "r") as f:
    html = f.read()
with open(f"{base}/{page_name}.css", "r") as f:
    css = f.read()
with open(f"{base}/{page_name}.js", "r") as f:
    js = f.read()

# Extract body content
body_match = re.search(r'<body>(.*?)</body>', html, re.DOTALL)
body_content = body_match.group(1).strip() if body_match else ""

# Remove external script/css references
body_content = re.sub(r'<script defer src="[^"]*"></script>\s*', '', body_content)

# Add @import for fonts
css_with_import = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap');\n\n" + css

output = f"""<!-- ============================================
     ELASTIQUE {page_name.upper().replace('-', ' ')} LANDING PAGE
     ============================================ -->
<style>
/* ============================================
   FONTS
   ============================================ */
{css_with_import}
</style>

{body_content}

<!-- ============================================
     JAVASCRIPT — INLINE
     ============================================ -->
<script>
{js}
</script>
"""

output_path = f"{base}/elastique-{page_name}-page.txt"
with open(output_path, "w") as f:
    f.write(output)
print(f"✅ Consolidated file saved: {output_path} ({len(output)} bytes)")
PYEOF
```

### What the consolidated file contains:
- `<style>` block with `@import` for Google Fonts + all CSS inlined
- All HTML body content (no `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` wrappers)
- `<script>` block with all JS inlined
- All image `src` attributes must use absolute CDN URLs (no local `assets/` paths)
- Footer uses `.el-footer` class (not bare `<footer>` element)
- No external file dependencies — completely self-contained

## Step 5: Deliver
// turbo
1. Copy the consolidated `.txt` file to `~/Downloads/{page-name}/`
2. Also update the `shopify-travel.liquid` equivalent if the page has one
3. Inform the user the file is ready for handoff to the dev

```bash
mkdir -p ~/Downloads/{page-name} && cp "/Applications/Elastique Landing Pages/{page-name}/elastique-{page-name}-page.txt" ~/Downloads/{page-name}/
```

## Key Reminders
- **Images**: Always use Shopify CDN URLs in the final output, never local `assets/` paths
- **Footer**: Always use `<div class="el-footer">` — bare `<footer>` conflicts with Shopify themes
- **Fonts**: Use `@import` in the `<style>` block (not `<link>` tags) for the consolidated file
- **Tracking**: The consent banner (`consent-banner.js`) is NOT included in the consolidated file — Shopify handles this separately
- **Compliance**: Every landing page must pass the `elastique-compliance` skill check before delivery
