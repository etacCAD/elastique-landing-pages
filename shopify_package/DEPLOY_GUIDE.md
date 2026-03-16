# Shopify Deployment & A/B Testing Guide

This package contains the fully optimized Elastique landing page, ready for Shopify integration and A/B testing.

## Folder Structure
- `index.html`: The core landing page code (fully responsive with inlined CSS).
- `assets/`: Contains the official logo and high-tech hero visualization.

## Shopify Integration Steps

### Option A: Custom Page Template (Recommended for A/B Testing)
1. **Upload Assets**: Go to **Content > Files** in your Shopify admin and upload all files from the `assets/` folder.
2. **Copy URLs**: After uploading, copy the Shopify CDN URLs for each image.
3. **Update index.html**: Replace the relative paths in `src="..."` with the Shopify CDN URLs you just copied.
4. **Create Template**:
   - Go to **Online Store > Themes > Edit Code**.
   - Create a new **Page** template called `page.landing-ab.liquid`.
   - Paste the contents of `index.html` into this file.
5. **Assign and Test**: Create a new Page in Shopify and assign the `landing-ab` template.

### Option B: A/B Testing Platforms (VWO, Google Optimize, etc.)
If you are using an A/B testing tool:
1. Upload the assets to the tool's library or your Shopify Files.
2. Paste the HTML into the "Variant" section of your test.
3. Ensure the CSS (in the `<style>` tag) doesn't conflict with your theme's global styles (most A/B tools handle this by sandboxing).

## Key Features for the Test
- **Technical Mapping**: The hero visual uses the specific model and overlays optimized for scientific credibility.
- **MicroPerle® Science**: Explicitly mentions the Vodder Method and Laplace Formula.
- **Verified Social Proof**: Includes the 100+ categorized 5-star reviews.
- **SEO/AI Ready**: Includes JSON-LD structured data for rich snippets.
