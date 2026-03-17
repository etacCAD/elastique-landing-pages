const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Set viewport for desktop
  await page.setViewportSize({ width: 1200, height: 800 });
  
  // Hide sticky CTA to not cover things up
  await page.evaluate(() => {
    const el = document.getElementById('stickyCta');
    if (el) el.style.display = 'none';
  });

  // Take screenshot of product card section
  const productSection = await page.locator('#shop');
  await productSection.screenshot({ path: '/Users/evanhopkins/.gemini/antigravity/brain/ef852509-dc66-460f-9ed5-a5a9d0a6a656/product_card_science.png' });

  // Take screenshot of anchor section
  const anchorSection = await page.locator('#value');
  await anchorSection.screenshot({ path: '/Users/evanhopkins/.gemini/antigravity/brain/ef852509-dc66-460f-9ed5-a5a9d0a6a656/anchor_section_middle.png' });

  await browser.close();
})();
